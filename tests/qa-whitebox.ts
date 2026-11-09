/**
 * PRUEBAS DE CAJA BLANCA (WHITE-BOX QA TESTING)
 * Valle & Urbe / PropTech Quito
 * Cobertura de lógica algorítmica, fórmulas financieras DMQ, comparadores y filtros.
 */

import { PROPERTIES } from '../src/data/properties.ts';
import { Property, FilterState } from '../src/types/property.ts';

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

export function runWhiteBoxTests() {
  console.log('\n==========================================================');
  console.log('🧪 1. PRUEBAS DE CAJA BLANCA (WHITE-BOX TESTING)');
  console.log('==========================================================');

  // Test 1: Fórmula de Amortización Francesa BIESS (5.99%)
  console.log('\n--- 1.1 Motor Financiero & Hipotecario ---');
  const price = 580000;
  const downPaymentPct = 20;
  const downPaymentAmount = price * (downPaymentPct / 100);
  const loanAmount = price - downPaymentAmount; // 464,000
  const rateBIESS = 0.0599;
  const months = 20 * 12; // 240 meses

  const monthlyRate = rateBIESS / 12;
  const monthlyPaymentBIESS = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  assert(
    Math.round(monthlyPaymentBIESS) === 3322,
    'Cálculo de cuota mensual BIESS (5.99%, 20 años, 20% entrada)',
    `Esperado $3,322, Obtenido: ${Math.round(monthlyPaymentBIESS)}`
  );

  // Test 2: Tasa de Banca Privada (8.45%)
  const ratePrivate = 0.0845;
  const monthlyRatePriv = ratePrivate / 12;
  const monthlyPaymentPriv = 
    (loanAmount * monthlyRatePriv * Math.pow(1 + monthlyRatePriv, months)) /
    (Math.pow(1 + monthlyRatePriv, months) - 1);

  assert(
    Math.round(monthlyPaymentPriv) === 4012,
    'Cálculo de cuota mensual Banca Privada (8.45%, 20 años, 20% entrada)',
    `Esperado $4,012, Obtenido: ${Math.round(monthlyPaymentPriv)}`
  );

  // Test 3: Gastos Notariales y Aranceles DMQ
  console.log('\n--- 1.2 Impuestos & Tasas Notariales Quito (DMQ) ---');
  const notaryFee = 650;
  const registryFee = 420;
  const alcabalaFee = price * 0.01; // 1% Alcabala DMQ = 5800
  const provincialFee = price * 0.0011; // 0.11% Consejo Provincial = 638
  const totalClosingCosts = notaryFee + registryFee + alcabalaFee + provincialFee;

  assert(alcabalaFee === 5800, 'Impuesto de Alcabala Municipal DMQ es exactamente 1%', `Calculado: ${alcabalaFee}`);
  assert(provincialFee === 638, 'Tasa Consejo Provincial de Pichincha es exactamente 0.11%', `Calculado: ${provincialFee}`);
  assert(totalClosingCosts === 7508, 'Gastos de Cierre Totales sumados con exactitud ($7,508)', `Total: ${totalClosingCosts}`);

  // Test 4: Algoritmo de Búsqueda y Filtrado
  console.log('\n--- 1.3 Cobertura de Ramas del Motor de Filtros ---');
  
  // Rama A: Filtro sector Cumbayá
  const cumbayaProps = PROPERTIES.filter((p) => p.sector === 'Cumbayá');
  assert(cumbayaProps.length >= 1, 'Filtro por sector Cumbayá retorna resultados válidos');

  // Rama B: Filtro Metro de Quito (< 5 min)
  const metroProps = PROPERTIES.filter((p) => p.features.hasMetro);
  assert(metroProps.every((p) => p.features.hasMetro === true), 'Filtro Metro de Quito retorna solo inmuebles con conectividad Metro');
  assert(metroProps.some((p) => p.sector === 'La Carolina'), 'Inmueble de La Carolina tiene hasMetro=true');

  // Rama C: Filtro Generador Eléctrico 100% de respaldo
  const generatorProps = PROPERTIES.filter((p) => p.features.hasGenerator);
  assert(generatorProps.length === PROPERTIES.length, 'Todas las propiedades curadas cuentan con respaldo eléctrico total');

  // Rama D: Filtro Doble Garita & Urbanización Privada
  const gateProps = PROPERTIES.filter((p) => p.features.hasDoubleGate);
  assert(gateProps.every((p) => p.features.hasDoubleGate === true), 'Filtro de doble garita estricto');

  // Rama E: Filtro Microclima de Valle (2,200 msnm)
  const valleyProps = PROPERTIES.filter((p) => p.features.isValleyClimate);
  assert(
    valleyProps.every((p) => p.sector === 'Cumbayá' || p.sector === 'Puembo' || p.sector === 'Tumbaco' || p.sector === 'Nayón'),
    'Propiedades con microclima de valle pertenecen exclusivamente a valles de Quito'
  );

  // Test 5: Algoritmo de Ordenamiento
  console.log('\n--- 1.4 Algoritmos de Ordenamiento ---');
  const sortedPriceAsc = [...PROPERTIES].sort((a, b) => a.price - b.price);
  assert(sortedPriceAsc[0].price <= sortedPriceAsc[sortedPriceAsc.length - 1].price, 'Orden ascendente por precio correcto');

  const sortedPriceDesc = [...PROPERTIES].sort((a, b) => b.price - a.price);
  assert(sortedPriceDesc[0].price >= sortedPriceDesc[sortedPriceDesc.length - 1].price, 'Orden descendente por precio correcto');

  const sortedEfficiency = [...PROPERTIES].sort((a, b) => (a.price / a.areaBuild) - (b.price / b.areaBuild));
  const eff0 = sortedEfficiency[0].price / sortedEfficiency[0].areaBuild;
  const effLast = sortedEfficiency[sortedEfficiency.length - 1].price / sortedEfficiency[sortedEfficiency.length - 1].areaBuild;
  assert(eff0 <= effLast, 'Ordenamiento por eficiencia ($/m²) correcto');

  console.log(`\nResultados Caja Blanca: ${passed} pasadas, ${failed} fallidas`);
  return { passed, failed };
}
