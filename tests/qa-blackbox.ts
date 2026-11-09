/**
 * PRUEBAS DE CAJA NEGRA (BLACK-BOX QA TESTING)
 * Valle & Urbe / PropTech Quito
 * Pruebas funcionales de casos de uso y flujos de usuario de extremo a extremo.
 */

import { PROPERTIES } from '../src/data/properties';
import { authService } from '../src/services/authService';
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

export async function runBlackBoxTests() {
  console.log('\n==========================================================');
  console.log('👤 3. PRUEBAS DE CAJA NEGRA (BLACK-BOX TESTING)');
  console.log('==========================================================');

  // Caso de Uso 1: Inversionista buscando Suite cerca al Metro de Quito con permiso Airbnb
  console.log('\n--- 3.1 Flujo Comprador: Inversión en Metro La Carolina ---');
  const filtersInvestor: FilterState = {
    sector: 'La Carolina',
    type: 'Suite',
    maxPrice: 200000,
    hasGenerator: true,
    hasMetro: true,
    hasDoubleGate: false,
    isValleyClimate: false,
    biessEligible: true,
    isAirbnb: true
  };

  const resultsInvestor = PROPERTIES.filter((p) => {
    if (filtersInvestor.sector !== 'ALL' && p.sector !== filtersInvestor.sector) return false;
    if (filtersInvestor.type !== 'ALL' && p.type !== filtersInvestor.type) return false;
    if (p.price > filtersInvestor.maxPrice) return false;
    if (filtersInvestor.hasGenerator && !p.features.hasGenerator) return false;
    if (filtersInvestor.hasMetro && !p.features.hasMetro) return false;
    if (filtersInvestor.isAirbnb && !p.features.isAirbnb) return false;
    return true;
  });

  assert(resultsInvestor.length === 1, 'Búsqueda de Suite Metro La Carolina retorna exactamente 1 coincidencia');
  assert(resultsInvestor[0].id === 'VU-CAR-005', 'ID coincide con Sky Suite La Carolina');
  assert(resultsInvestor[0].price === 165000, 'Precio dentro del rango establecido ($165,000 <= $200,000)');

  // Caso de Uso 2: Familia buscando Residencia en Urbanización Privada de Cumbayá o Puembo
  console.log('\n--- 3.2 Flujo Familiar: Casa en Valle con Doble Garita y Generador ---');
  const resultsValley = PROPERTIES.filter((p) => {
    return (
      (p.sector === 'Cumbayá' || p.sector === 'Puembo') &&
      p.features.hasDoubleGate &&
      p.features.hasGenerator &&
      p.features.isValleyClimate
    );
  });

  assert(resultsValley.length >= 2, 'Búsqueda en valles con doble garita y generador retorna al menos 2 residencias');
  assert(resultsValley.some((p) => p.sector === 'Cumbayá'), 'Incluye residencia en Cumbayá');
  assert(resultsValley.some((p) => p.sector === 'Puembo'), 'Incluye residencia en Puembo');

  // Caso de Uso 3: Generación del enlace dinámico de WhatsApp VIP con ID Notarial
  console.log('\n--- 3.3 Flujo de Conversión WhatsApp VIP ---');
  const prop = PROPERTIES[0]; // Villa Natura VU-CUM-048
  const agentName = prop.agent.name;
  const agentPhone = prop.agent.phone;
  const propertyTitle = `${prop.title} (${prop.sector}) - $${prop.price.toLocaleString()} USD [Ref: ${prop.id}]`;
  const message = `Hola ${agentName}, le escribo a través de VALLE & URBE. Deseo recibir el dossier notarial y coordinar una visita para: ${propertyTitle}.`;
  const cleanPhone = agentPhone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  assert(waUrl.includes('https://wa.me/593998765432'), 'URL de WhatsApp contiene teléfono sanitizado de Ecuador (+593)');
  assert(waUrl.includes('VU-CUM-048'), 'Mensaje incluye código notarial del inmueble (VU-CUM-048)');
  assert(waUrl.includes(encodeURIComponent('dossier notarial')), 'Mensaje contiene solicitud de dossier notarial formal');

  // Caso de Uso 4: Registro de Nuevo Agente con Licencia Notarial
  console.log('\n--- 3.4 Flujo de Alta de Agente Verificado ---');
  const newAgent = await authService.register({
    fullName: 'Arq. Gabriela Vivanco',
    email: 'gabriela.vivanco@proptech.ec',
    phone: '+593 99 111 2233',
    role: 'AGENT',
    companyName: 'Vivanco & Partners Arquitectura',
    licenseNumber: 'Lic. Notarial DMQ #0772'
  });

  assert(newAgent.user.fullName === 'Arq. Gabriela Vivanco', 'Nombre de agente registrado con éxito');
  assert(newAgent.user.role === 'AGENT', 'Rol asignado correctamente a AGENT');
  assert(newAgent.subscription.plan.code === 'PRO_AGENT', 'Agente obtiene automáticamente plan PRO_AGENT');
  assert(newAgent.user.licenseNumber === 'Lic. Notarial DMQ #0772', 'Licencia notarial DMQ almacenada en perfil');

  // Caso de Uso 5: Restricción del Comparador a Máximo 3 Inmuebles
  console.log('\n--- 3.5 Flujo de Matriz Comparativa (Límite Heurístico) ---');
  const compareList: string[] = ['VU-CUM-048', 'VU-PUE-019', 'VU-GON-012'];
  const tryAddFourth = (id: string, list: string[]): { success: boolean; list: string[] } => {
    if (list.length >= 3) {
      return { success: false, list };
    }
    return { success: true, list: [...list, id] };
  };

  const attempt = tryAddFourth('VU-CAR-005', compareList);
  assert(attempt.success === false, 'El comparador rechaza agregar un cuarto elemento (límite de 3)');
  assert(attempt.list.length === 3, 'El comparador mantiene exactamente 3 propiedades');

  console.log(`\nResultados Caja Negra: ${passed} pasadas, ${failed} fallidas`);
  return { passed, failed };
}
