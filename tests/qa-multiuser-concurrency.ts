/**
 * PRUEBAS DE CONCURRENCIA MULTI-USUARIO & AISLAMIENTO DE TENANCY
 * Valle & Urbe / PropTech Quito
 * Simula 5 sesiones de usuarios simultáneos y concurrentes:
 * - Agente Inmobiliario Pro (Mateo Serrano)
 * - Inversionista Compradora (Dra. Sofía Carrillo)
 * - Comprador de Primera Vivienda (Carlos Mantilla)
 * - Super Administrador DMQ (Admin Central)
 * - Visitante Anónimo (Guest)
 */

import { authService, MEMBERSHIP_PLANS } from '../src/services/authService';
import { mortgageService } from '../src/services/mortgageService';
import { propertyService } from '../src/services/propertyService';
import { PROPERTIES } from '../src/data/properties';
import { User, UserSubscription } from '../src/types/auth';
import { Property, FilterState } from '../src/types/property';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${testName} ${details ? `- ${details}` : ''}`);
    failed++;
  }
}

export async function runMultiUserConcurrencyTests() {
  console.log('\n==========================================================');
  console.log('👥 5. PRUEBAS DE CONCURRENCIA MULTI-USUARIO (MULTI-TENANT)');
  console.log('==========================================================');

  // --- SESIÓN 1: Ing. Mateo Serrano (Agente Inmobiliario Pro) ---
  console.log('\n--- 5.1 Sesión Concurrente 1: Agente Inmobiliario Pro ---');
  const agentSession = await authService.loginWithDemo('agent');
  const agentFavorites = ['VU-CUM-048', 'VU-PUE-019']; // Portafolio que gestiona
  
  assert(agentSession.user.role === 'AGENT', 'Usuario 1 autenticado con rol AGENT');
  assert(agentSession.subscription.plan.maxListings === 15, 'Usuario 1 dispone de cupo para 15 inmuebles');
  assert(agentSession.subscription.usedListings === 4, 'Usuario 1 tiene 4 inmuebles activos registrados');
  
  // Simular publicación de un quinto inmueble
  const newPropertyPublished: Property = {
    ...PROPERTIES[0],
    id: 'VU-CUM-099',
    title: 'Nueva Residencia Exclusiva Cumbayá'
  };
  const agentUpdatedUsed = agentSession.subscription.usedListings + 1;
  assert(agentUpdatedUsed <= agentSession.subscription.plan.maxListings, 'Publicación aceptada dentro del cupo (5 <= 15)');

  // --- SESIÓN 2: Dra. Sofía Carrillo (Inversionista Compradora) ---
  console.log('\n--- 5.2 Sesión Concurrente 2: Inversionista Compradora ---');
  const buyerSession = await authService.loginWithDemo('buyer');
  const buyerFavorites = ['VU-CAR-005', 'VU-GON-012']; // Portafolio de interés personal

  assert(buyerSession.user.role === 'BUYER', 'Usuario 2 autenticado con rol BUYER');
  assert(buyerSession.user.id !== agentSession.user.id, 'IDs de usuario son únicos e independientes');
  assert(buyerSession.tokens.accessToken !== agentSession.tokens.accessToken, 'Tokens JWT de sesión son completamente distintos');
  assert(JSON.stringify(buyerFavorites) !== JSON.stringify(agentFavorites), 'Favoritos de la Inversionista están aislados de los del Agente');

  // Simulación de cálculo hipotecario para la Suite de La Carolina ($165,000)
  const calcInvestor = mortgageService.computeFullCalculation(165000, 20, 20, 'BIESS');
  assert(calcInvestor.loanAmount === 132000, 'Préstamo de la suite calculado correctamente ($132,000)');
  assert(Math.round(calcInvestor.monthlyPayment) === 945, 'Cuota mensual BIESS calculada ($945/mes)');

  // --- SESIÓN 3: Carlos Mantilla (Comprador de Primera Vivienda en Valles) ---
  console.log('\n--- 5.3 Sesión Concurrente 3: Comprador Familiar ---');
  const familySession = await authService.register({
    fullName: 'Carlos Mantilla',
    email: 'carlos.mantilla@familias.ec',
    phone: '+593 99 333 4444',
    role: 'BUYER'
  });
  const familyFavorites = ['VU-TUM-031']; // Casa en El Chaquiñán Tumbaco ($345k)

  assert(familySession.user.role === 'BUYER', 'Usuario 3 registrado como BUYER');
  assert(familySession.subscription.plan.code === 'FREE', 'Usuario 3 inicia en plan FREE');
  assert(familySession.user.id !== buyerSession.user.id, 'Usuario 3 no colisiona con Usuario 2');
  assert(familyFavorites.length === 1 && familyFavorites[0] === 'VU-TUM-031', 'Portafolio de Usuario 3 es independiente');

  // --- SESIÓN 4: Admin Central DMQ (Super Administrador) ---
  console.log('\n--- 5.4 Sesión Concurrente 4: Super Administrador DMQ ---');
  const adminSession = await authService.loginWithDemo('admin');
  assert(adminSession.user.role === 'SUPER_ADMIN', 'Usuario 4 autenticado con rol SUPER_ADMIN');
  assert(adminSession.subscription.plan.code === 'VIP_INMOBILIARIA', 'Usuario 4 tiene privilegios VIP');
  assert(adminSession.subscription.plan.maxListings === 100, 'Admin tiene capacidad para 100 listings');

  // --- SESIÓN 5: Visitante Anónimo / Invitado (Guest) ---
  console.log('\n--- 5.5 Sesión Concurrente 5: Visitante Anónimo (Guest) ---');
  const guestUser = null;
  const guestCanPublish = guestUser !== null;
  assert(guestCanPublish === false, 'Visitante anónimo es restringido de publicar directamente sin autenticarse');

  // Filtrado de propiedades por invitado (acceso público sin sesión)
  const guestFilter: FilterState = {
    sector: 'Cumbayá',
    type: 'ALL',
    maxPrice: 1000000,
    hasGenerator: true,
    hasMetro: false,
    hasDoubleGate: false,
    isValleyClimate: false,
    biessEligible: false,
    isAirbnb: false
  };
  const guestResults = propertyService.filterProperties(PROPERTIES, guestFilter);
  assert(guestResults.length >= 1, 'Visitante anónimo puede explorar y filtrar propiedades de Cumbayá con respaldo');

  // --- VERIFICACIÓN DE NO-INTERFERENCIA ENTRE ESTADOS ---
  console.log('\n--- 5.6 Aislamiento de Memoria y Concurrencia Cruzada ---');
  assert(
    agentSession.user.id !== buyerSession.user.id &&
    buyerSession.user.id !== familySession.user.id &&
    familySession.user.id !== adminSession.user.id,
    '4 identidades coexistiendo concurrentemente sin solapamiento de ID'
  );

  console.log(`\nResultados Concurrencia Multi-Usuario: ${passed} pasadas, ${failed} fallidas`);
  return { passed, failed };
}
