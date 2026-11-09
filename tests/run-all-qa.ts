/**
 * MASTER QA TEST RUNNER & CERTIFICATION SUITE
 * Valle & Urbe / Propiedades Premier PropTech Quito
 * Ejecuta suites de Caja Blanca, Caja Gris, Caja Negra y Estrés.
 */

import { runWhiteBoxTests } from './qa-whitebox';
import { runGrayBoxTests } from './qa-graybox';
import { runBlackBoxTests } from './qa-blackbox';
import { runStressTests } from './qa-stress';

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║       SUITE INTEGRAL DE CONTROL DE CALIDAD (QA) — VALLE & URBE     ║');
  console.log('║               Ecosistema PropTech Quito & Valles 2026              ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝');

  const start = performance.now();

  const whitebox = runWhiteBoxTests();
  const graybox = await runGrayBoxTests();
  const blackbox = await runBlackBoxTests();
  const stress = runStressTests();

  const totalTime = ((performance.now() - start) / 1000).toFixed(3);
  const totalPassed = whitebox.passed + graybox.passed + blackbox.passed + stress.passed;
  const totalFailed = whitebox.failed + graybox.failed + blackbox.failed + stress.failed;

  console.log('\n==========================================================');
  console.log('📊 RESUMEN EJECUTIVO DE CERTIFICACIÓN QA');
  console.log('==========================================================');
  console.log(`  • Pruebas de Caja Blanca: ${whitebox.passed} aprobadas / ${whitebox.failed} fallidas`);
  console.log(`  • Pruebas de Caja Gris:   ${graybox.passed} aprobadas / ${graybox.failed} fallidas`);
  console.log(`  • Pruebas de Caja Negra:  ${blackbox.passed} aprobadas / ${blackbox.failed} fallidas`);
  console.log(`  • Pruebas de Estrés:      ${stress.passed} aprobadas / ${stress.failed} fallidas`);
  console.log('──────────────────────────────────────────────────────────');
  console.log(`  TOTAL: ${totalPassed} pruebas APROBADAS / ${totalFailed} FALLIDAS en ${totalTime}s`);
  console.log('==========================================================\n');

  if (totalFailed > 0) {
    console.error('❌ ATENCIÓN: Se detectaron fallas en la suite de QA.');
    process.exit(1);
  } else {
    console.log('🌟 ¡CERTIFICACIÓN QA 100% EXITOSA! El MVP es sólido, matemáticamente preciso y resistente a estrés.');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal QA error:', err);
  process.exit(1);
});
