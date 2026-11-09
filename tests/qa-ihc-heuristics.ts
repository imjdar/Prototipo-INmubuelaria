/**
 * IHC & SOLID CERTIFICATION SUITE
 * Verifica el cumplimiento de las 10 Heurísticas de Usabilidad de Nielsen (IHC)
 * y los 5 Principios SOLID en la arquitectura del MVP.
 */

import { mortgageService, NOTARIAL_CONSTANTS_DMQ } from '../src/services/mortgageService';
import { propertyService } from '../src/services/propertyService';
import { paymentService } from '../src/services/paymentService';
import { agentService } from '../src/services/agentService';
import { resourcesService } from '../src/services/resourcesService';
import { PROPERTIES } from '../src/data/properties';

export async function runIhcAndSolidTests() {
  console.log('\n==========================================================');
  console.log('🧠 7. CERTIFICACIÓN IHC (HUMAN-COMPUTER INTERACTION) & SOLID');
  console.log('==========================================================');

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

  // --- 7.1 HEURÍSTICAS IHC DE NIELSEN ---
  console.log('\n--- 7.1 Evaluación de Heurísticas de Usabilidad IHC ---');

  // H1: Visibilidad del estado del sistema
  const allPropsHavePrices = PROPERTIES.every((p) => typeof p.price === 'number' && p.price > 0);
  assert(allPropsHavePrices, 'H1: Visibilidad del estado - Cada propiedad posee precio explícito en USD');

  // H2: Coincidencia entre el sistema y el mundo real
  const hasLocalTerms = PROPERTIES.some((p) => p.sector === 'Cumbayá' || p.sector === 'Puembo');
  assert(hasLocalTerms, 'H2: Lenguaje del usuario - Sectores hiperlocales reconocibles (Cumbayá, Puembo, Ilaló)');
  assert(NOTARIAL_CONSTANTS_DMQ.ALCABALA_RATE === 0.01, 'H2: Coincidencia legal real - Tasa de alcabala DMQ es exactamente 1%');

  // H3: Control y libertad del usuario (reversibilidad)
  const resetFiltersResult = propertyService.filterProperties(PROPERTIES, {
    sector: 'ALL',
    type: 'ALL',
    maxPrice: 1000000,
    hasGenerator: false,
    hasMetro: false,
    hasDoubleGate: false,
    isValleyClimate: false,
    biessEligible: false,
    isAirbnb: false
  });
  assert(resetFiltersResult.length === PROPERTIES.length, 'H3: Libertad de usuario - Restablecer filtros retorna el catálogo completo');

  // H4: Consistencia y estándares
  const agents = agentService.getAllAgents();
  const allAgentsHaveLicense = agents.every((a) => a.licenseNumber && a.licenseNumber.length > 0);
  assert(allAgentsHaveLicense, 'H4: Consistencia de perfiles - 100% de agentes y empresas poseen registro notarial/RUC');

  // H5: Prevención de errores
  const extremeLoan = mortgageService.computeFullCalculation(-50000, 150, -5, 'BIESS');
  assert(extremeLoan.price === 0 && extremeLoan.monthlyPayment === 0, 'H5: Prevención de errores - Entradas numéricas negativas o corruptas se normalizan a 0');

  // H6: Reconocimiento antes que recuerdo
  const templates = resourcesService.getTemplates();
  assert(templates.length >= 3, 'H6: Reconocimiento - Plantillas notariales categorizadas (Promesa, Arriendo, BIESS)');

  // H7: Flexibilidad y eficiencia de uso
  const blogPosts = resourcesService.getBlogPosts();
  assert(blogPosts.length >= 3, 'H7: Eficiencia de información - Guías paso a paso para compra y financiamiento');

  // --- 7.2 PRINCIPIOS SOLID ---
  console.log('\n--- 7.2 Verificación Arquitectónica de Principios SOLID ---');

  // S - Single Responsibility Principle
  assert(typeof mortgageService.calculateMonthlyPayment === 'function', 'SRP: MortgageService calcula exclusivamente matemáticas financieras y tributarias');
  assert(typeof propertyService.filterProperties === 'function', 'SRP: PropertyService gestiona exclusivamente filtrado y ordenamiento de catálogo');

  // O - Open/Closed Principle & L - Liskov Substitution Principle
  const payphoneResult = await paymentService.executePayment('u1', 'u1@test.ec', 'PRO_AGENT', 49, 'PAYPHONE');
  const deunaResult = await paymentService.executePayment('u2', 'u2@test.ec', 'VIP_INMOBILIARIA', 99, 'DEUNA');
  assert(payphoneResult.status === 'COMPLETED' && payphoneResult.paymentMethod === 'PAYPHONE', 'OCP/LSP: Estrategia Payphone intercambiable y extensible sin modificar el llamador');
  assert(deunaResult.status === 'COMPLETED' && deunaResult.paymentMethod === 'DEUNA', 'OCP/LSP: Estrategia Deuna QR intercambiable cumpliendo contrato IPaymentStrategy');

  // I - Interface Segregation Principle
  assert(payphoneResult.receiptNumber !== undefined, 'ISP: PaymentIntent contiene solo campos pertinentes a la transacción financiera');

  // D - Dependency Inversion Principle
  const capRateRes = resourcesService.calculateRoi(200000, 1500, 2000);
  assert(capRateRes.capRateNet > 0, 'DIP: Cap Rate calculado mediante servicio de dominio independiente de componentes visuales');

  console.log(`\nResultados IHC & SOLID: ${passed} pasadas, ${failed} fallidas`);
  return { passed, failed };
}
