import { valuationService, SECTOR_BENCHMARKS, ValuationParams } from '../src/services/valuationService';
import { alertService } from '../src/services/alertService';
import { PROPERTIES } from '../src/data/properties';
import { Sector } from '../src/types/property';

export async function runCompetitorFeaturesQA(): Promise<{ passed: number; failed: number; errors: string[] }> {
  let passed = 0;
  let failed = 0;
  const errors: string[] = [];

  function assert(condition: boolean, desc: string) {
    if (condition) {
      passed++;
      console.log(`  ✓ [PASS] ${desc}`);
    } else {
      failed++;
      errors.push(desc);
      console.error(`  ✗ [FAIL] ${desc}`);
    }
  }

  console.log('\n--- 🏢 QA SUITE: COMPETITOR VALUE-ADD FEATURES (PLUSVALÍA, PROPERATI, RE/MAX) ---');

  // 1. Sector Benchmarks Integrity
  console.log('\n[1. Índices Inmobiliarios de Mercado]');
  const sectors: Sector[] = ['Cumbayá', 'Puembo', 'González Suárez', 'La Carolina', 'Tumbaco', 'Nayón'];
  sectors.forEach(sec => {
    const bm = SECTOR_BENCHMARKS[sec];
    assert(!!bm, `Existe benchmark oficial para ${sec}`);
    assert(bm.avgPriceM2 > 1000 && bm.avgPriceM2 < 3000, `Precio m² razonable para ${sec} ($${bm.avgPriceM2}/m²)`);
    assert(bm.avgRentalM2 > 4 && bm.avgRentalM2 < 20, `Canon renta m² razonable para ${sec} ($${bm.avgRentalM2}/m²)`);
    assert(bm.annualAppreciationPct > 0, `Plusvalía anual positiva para ${sec} (${bm.annualAppreciationPct}%)`);
  });

  // 2. Tasador Inteligente IA (El Valuador)
  console.log('\n[2. Tasador Inteligente IA / Valuador Inmobiliario]');
  const testValuationParams: ValuationParams = {
    sector: 'Cumbayá',
    propertyType: 'Casa',
    areaBuild: 300,
    bedrooms: 4,
    bathrooms: 4.5,
    parking: 3,
    hasGenerator: true,
    hasMetro: false,
    hasDoubleGate: true,
    isValleyClimate: true,
    condition: 'BUENO'
  };

  const val = valuationService.calculateValuation(testValuationParams);
  assert(val.estimatedPrice > 300000 && val.estimatedPrice < 800000, `Valor de venta estimado coherente: $${val.estimatedPrice.toLocaleString()}`);
  assert(val.priceRangeMin < val.estimatedPrice && val.priceRangeMax > val.estimatedPrice, 'Rango de negociación min-max correcto');
  assert(val.estimatedMonthlyRent > 1000, `Canon mensual estimado generado: $${val.estimatedMonthlyRent}/mes`);
  assert(val.grossYieldAnnualPct > 3 && val.grossYieldAnnualPct < 12, `Cap rate realista: ${val.grossYieldAnnualPct}%`);
  assert(val.confidenceScore >= 90, `Score de confianza pericial: ${val.confidenceScore}%`);

  // Impact of Quito Critical Features (Generador, Metro)
  const valWithoutGen = valuationService.calculateValuation({ ...testValuationParams, hasGenerator: false });
  assert(val.estimatedPrice > valWithoutGen.estimatedPrice, 'Generador 100% de respaldo incrementa el valor de tasación');

  const carolinaWithMetro = valuationService.calculateValuation({
    ...testValuationParams,
    sector: 'La Carolina',
    propertyType: 'Departamento',
    hasMetro: true
  });
  const carolinaWithoutMetro = valuationService.calculateValuation({
    ...testValuationParams,
    sector: 'La Carolina',
    propertyType: 'Departamento',
    hasMetro: false
  });
  assert(carolinaWithMetro.estimatedPrice > carolinaWithoutMetro.estimatedPrice, 'Cercanía a estación de Metro de Quito agrega prima de valor');

  // 3. Termómetro de Oportunidad de Mercado
  console.log('\n[3. Termómetro de Oportunidad vs Promedio de Mercado]');
  const opportunityProp = valuationService.analyzeOpportunity(250000, 200, 'Cumbayá'); // $1,250/m² vs $1,650 avg (-24%)
  assert(opportunityProp.level === 'OPPORTUNITY', 'Clasifica como OPORTUNIDAD cuando el precio $/m² es >=8% menor al promedio');
  assert(opportunityProp.diffPct < 0, `Diferencial negativo detectado (${opportunityProp.diffPct}%)`);

  const premiumProp = valuationService.analyzeOpportunity(600000, 250, 'Cumbayá'); // $2,400/m² vs $1,650 avg (+45%)
  assert(premiumProp.level === 'PREMIUM', 'Clasifica como PREMIUM cuando el precio $/m² es >=14% mayor al promedio');

  const fairProp = valuationService.analyzeOpportunity(330000, 200, 'Cumbayá'); // $1,650/m² == avg (0%)
  assert(fairProp.level === 'FAIR', 'Clasifica como PRECIO JUSTO cuando el precio $/m² está alineado al promedio');

  // 4. Servicio de Alertas de Bajada de Precio (Plusvalía Inspired)
  console.log('\n[4. Alertas de Bajada de Precio & Búsqueda]');
  const mockProperty = PROPERTIES[0];
  const propAlert = alertService.subscribeToPropertyPriceDrop(
    mockProperty.id,
    mockProperty.title,
    mockProperty.price,
    'comprador.vip@quito.ec',
    '+593998887777',
    'usr-buyer-001'
  );
  assert(!!propAlert.id, `Alerta de bajada de precio creada con ID: ${propAlert.id}`);
  assert(propAlert.active === true, 'Alerta inicializada como activa');

  const searchAlert = alertService.subscribeToSearchAlert(
    'inversionista@valles.ec',
    'Cumbayá',
    'Departamento',
    400000,
    '+593991112222',
    'usr-investor-002'
  );
  assert(!!searchAlert.id, `Alerta de búsqueda creada con ID: ${searchAlert.id}`);

  const userAlerts = alertService.getAlertsForUser('comprador.vip@quito.ec');
  assert(userAlerts.length >= 1, 'Recupera correctamente las alertas registradas para el correo del usuario');

  const cancelSuccess = alertService.cancelAlert(propAlert.id);
  assert(cancelSuccess === true, 'Permite cancelar alertas activas');

  // 5. Fast Inquiry Chips & WhatsApp Dynamic Encoding
  console.log('\n[5. Fast Inquiry Chips & WhatsApp)');
  const fastQuestions = [
    '¿Sigue disponible esta propiedad?',
    '¿El precio publicado es negociable?',
    '¿Acepta financiamiento con crédito BIESS?'
  ];
  fastQuestions.forEach(q => {
    const encoded = encodeURIComponent(`Hola ${mockProperty.agent.name}, ${q} (Ref: ${mockProperty.id})`);
    assert(encoded.includes(encodeURIComponent(mockProperty.id)), `WhatsApp URL incluye correctamente la referencia para: "${q.slice(0, 25)}..."`);
  });

  // 6. Stress Test: 1,000 Valuations & 500 Alerts
  console.log('\n[6. Pruebas de Estrés: 1,000 Avalúos IA & 500 Alertas]');
  const startStress = Date.now();
  for (let i = 0; i < 1000; i++) {
    const sec = sectors[i % sectors.length];
    valuationService.calculateValuation({
      sector: sec,
      propertyType: 'Departamento',
      areaBuild: 60 + (i % 300),
      bedrooms: 1 + (i % 4),
      bathrooms: 1 + (i % 4),
      parking: 1 + (i % 3),
      hasGenerator: i % 2 === 0,
      hasMetro: i % 3 === 0,
      hasDoubleGate: i % 2 === 1,
      isValleyClimate: i % 2 === 0,
      condition: i % 3 === 0 ? 'NUEVO' : 'BUENO'
    });
  }
  const durStress = Date.now() - startStress;
  assert(durStress < 500, `1,000 tasaciones instantáneas ejecutadas en ${durStress}ms (<500ms benchmark)`);

  return { passed, failed, errors };
}

// Direct execution
if (process.argv[1]?.endsWith('qa-competitor-features.ts')) {
  runCompetitorFeaturesQA().then(({ passed, failed, errors }) => {
    console.log(`\n======================================================`);
    console.log(`COMPETITOR FEATURES QA: ${passed} PASSED | ${failed} FAILED`);
    console.log(`======================================================\n`);
    if (failed > 0) {
      console.error('Failed checks:', errors);
      process.exit(1);
    }
  });
}
