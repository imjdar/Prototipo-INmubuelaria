/**
 * PRUEBAS DE CAJA GRIS (GRAY-BOX QA TESTING)
 * Valle & Urbe / PropTech Quito
 * Integración entre el estado de negocio, persistencia, tokens JWT, cuotas RBAC y dataset.
 */

import { authService, MEMBERSHIP_PLANS } from '../src/services/authService';
import { PROPERTIES } from '../src/data/properties';

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

export async function runGrayBoxTests() {
  console.log('\n==========================================================');
  console.log('🔍 2. PRUEBAS DE CAJA GRIS (GRAY-BOX TESTING)');
  console.log('==========================================================');

  // Test 1: Estructura de Tokens JWT & Sesión Segura
  console.log('\n--- 2.1 Emisión y Rotación de Tokens JWT ---');
  const agentLogin = await authService.loginWithDemo('agent');
  assert(agentLogin.user.role === 'AGENT', 'Inicio de sesión demo asigna rol AGENT');
  assert(agentLogin.tokens.tokenType === 'Bearer', 'Token type es Bearer');
  assert(agentLogin.tokens.expiresInSeconds === 900, 'Access Token tiene expiración estándar de 15 min (900s)');
  assert(agentLogin.tokens.accessToken.startsWith('jwt.'), 'Access Token tiene formato JWT');
  assert(agentLogin.tokens.refreshToken.startsWith('rt.'), 'Refresh Token emitido para rotación');

  // Test 2: Validación de Cuotas y Planes de Membresía (RBAC)
  console.log('\n--- 2.2 Gestión de Membresías y Cuotas de Publicación ---');
  const freePlan = MEMBERSHIP_PLANS.FREE;
  const proPlan = MEMBERSHIP_PLANS.PRO_AGENT;
  const vipPlan = MEMBERSHIP_PLANS.VIP_INMOBILIARIA;

  assert(freePlan.maxListings === 1, 'Plan Gratuito restringe a 1 publicación máxima');
  assert(proPlan.maxListings === 15, 'Plan Agente Pro amplía a 15 publicaciones');
  assert(proPlan.hasVideoReels === true, 'Plan Pro habilita videos 9:16 (TikTok style)');
  assert(proPlan.hasAiGuardianPriority === true, 'Plan Pro habilita auditoría prioritaria con Bot IA');
  assert(vipPlan.maxListings === 100, 'Plan Inmobiliaria VIP soporta hasta 100 publicaciones');

  // Test 3: Upgrade de Suscripción en Tiempo de Ejecución
  console.log('\n--- 2.3 Transición de Suscripción ---');
  const buyerLogin = await authService.loginWithDemo('buyer');
  assert(buyerLogin.subscription.plan.code === 'FREE', 'Usuario comprador inicia en plan FREE');

  const upgradedSub = await authService.upgradeSubscription(buyerLogin.user, 'PRO_AGENT');
  assert(upgradedSub.plan.code === 'PRO_AGENT', 'Upgrade a PRO_AGENT reflejado en la suscripción');
  assert(upgradedSub.status === 'ACTIVE', 'Estado de la suscripción mejorada es ACTIVE');
  assert(upgradedSub.usedListings === 0, 'Contador de propiedades usadas inicializado en 0');

  // Test 4: Integridad de Coordenadas y Cartografía Vectorial
  console.log('\n--- 2.4 Integridad Geoespacial y Cartográfica del Dataset ---');
  let coordsValid = true;
  for (const p of PROPERTIES) {
    if (p.coordinates.x < 0 || p.coordinates.x > 100 || p.coordinates.y < 0 || p.coordinates.y > 100) {
      coordsValid = false;
      break;
    }
  }
  assert(coordsValid, 'Todas las coordenadas (X, Y) están dentro del rango porcentual del mapa (0 - 100%)');

  // Test 5: Rutas y Referencias Multimedia Locales
  console.log('\n--- 2.5 Validación de Integridad de Medios Locales ---');
  let imagesValid = true;
  for (const p of PROPERTIES) {
    if (!p.image.startsWith('/images/')) {
      imagesValid = false;
      break;
    }
    for (const sub of p.subPhotos) {
      if (!sub.startsWith('/images/')) {
        imagesValid = false;
        break;
      }
    }
  }
  assert(imagesValid, 'Todas las propiedades apuntan a activos locales (/images/) para entrega sin caídas');

  // Test 6: Verificación de Tiempos Logísticos
  console.log('\n--- 2.6 Inteligencia Logística y Tiempos de Traslado ---');
  let logisticsComplete = true;
  for (const p of PROPERTIES) {
    if (!p.logistics.scalaShopping || !p.logistics.usfq || !p.logistics.aeropuerto || !p.logistics.quitoCentro) {
      logisticsComplete = false;
      break;
    }
  }
  assert(logisticsComplete, 'Todas las propiedades poseen tiempos calculados a Scala, USFQ, Aeropuerto UIO y Quito Centro');

  console.log(`\nResultados Caja Gris: ${passed} pasadas, ${failed} fallidas`);
  return { passed, failed };
}
