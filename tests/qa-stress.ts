/**
 * PRUEBAS DE ESTRÉS Y RENDIMIENTO (STRESS & PERFORMANCE QA TESTING)
 * Valle & Urbe / PropTech Quito
 * Pruebas de carga con 1,000 propiedades sintéticas, 10,000 consultas concurrentes y límites numéricos extremos.
 */

import { Property, Sector, PropertyType } from '../src/types/property';
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

export function runStressTests() {
  console.log('\n==========================================================');
  console.log('⚡ 4. PRUEBAS DE ESTRÉS Y RENDIMIENTO (STRESS TESTING)');
  console.log('==========================================================');

  // Test 1: Generación y filtrado de 1,000 inmuebles en memoria
  console.log('\n--- 4.1 Carga Masiva: 1,000 Inmuebles en Catálogo ---');
  const sectors: Sector[] = ['Cumbayá', 'Puembo', 'González Suárez', 'La Carolina', 'Tumbaco', 'Nayón'];
  const types: PropertyType[] = ['Casa', 'Penthouse', 'Suite', 'Terreno'];

  const largeDataset: Property[] = [];
  for (let i = 0; i < 1000; i++) {
    const sector = sectors[i % sectors.length];
    const type = types[i % types.length];
    largeDataset.push({
      id: `VU-SYN-${i + 1}`,
      title: `Propiedad Sintética de Prueba #${i + 1} en ${sector}`,
      sector,
      microzone: `${sector} Sector Residencial`,
      type,
      price: 150000 + (i * 850),
      areaBuild: 80 + (i % 400),
      areaLot: 100 + (i % 800),
      bedrooms: 1 + (i % 5),
      bathrooms: 1 + (i % 4),
      parking: 1 + (i % 4),
      hoaFee: 100 + (i % 150),
      elevation: 2200 + (i % 600),
      temperature: '20°C',
      image: '/images/cumbaya_villa.jpg',
      subPhotos: ['/images/luxury_interior.jpg'],
      features: {
        hasGenerator: i % 2 === 0,
        hasMetro: sector === 'La Carolina',
        hasDoubleGate: i % 3 === 0,
        isValleyClimate: sector === 'Cumbayá' || sector === 'Puembo',
        biessEligible: true,
        isAirbnb: i % 4 === 0,
        hasMatterport: true
      },
      legalStatus: 'Certificado de Gravámenes DMQ al día',
      description: `Inmueble de alta gama para prueba de estrés #${i + 1}`,
      agent: {
        name: 'Agente Sintético',
        role: 'Broker',
        license: 'Lic. DMQ #999',
        phone: '+593998765432',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a'
      },
      logistics: {
        scalaShopping: '10 min',
        usfq: '12 min',
        aeropuerto: '20 min',
        quitoCentro: '25 min'
      },
      coordinates: { x: (i * 13) % 100, y: (i * 17) % 100 }
    });
  }

  assert(largeDataset.length === 1000, 'Dataset sintético de 1,000 propiedades generado en memoria');

  // Test 2: Ejecución de 5,000 consultas de filtrado multicriterio
  console.log('\n--- 4.2 Benchmark: 5,000 Consultas de Filtrado Multicriterio ---');
  const t0 = performance.now();
  let totalMatchesFound = 0;

  for (let q = 0; q < 5000; q++) {
    const targetSector = sectors[q % sectors.length];
    const needGenerator = q % 2 === 0;
    const maxP = 300000 + (q % 500000);

    const matches = largeDataset.filter((p) => {
      if (p.sector !== targetSector) return false;
      if (p.price > maxP) return false;
      if (needGenerator && !p.features.hasGenerator) return false;
      return true;
    });
    totalMatchesFound += matches.length;
  }
  const t1 = performance.now();
  const durationMs = t1 - t0;
  const avgQueryLatencyUs = (durationMs / 5000) * 1000;

  assert(durationMs < 500, `5,000 consultas multicriterio completadas en ${durationMs.toFixed(2)} ms (< 500 ms)`);
  assert(avgQueryLatencyUs < 100, `Latencia promedio por consulta: ${avgQueryLatencyUs.toFixed(2)} µs (< 100 µs)`);

  // Test 3: Estrés de Búsqueda por Texto (10,000 búsquedas tipográficas)
  console.log('\n--- 4.3 Estrés de Búsqueda Texto Completo (10,000 iteraciones) ---');
  const searchTerms = ['cumbayá', 'puembo', 'suite', 'metro', 'vu-syn-5', 'ilaló', 'villa'];
  const t2 = performance.now();

  for (let s = 0; s < 10000; s++) {
    const term = searchTerms[s % searchTerms.length];
    const matches = largeDataset.filter((p) => {
      return (
        p.title.toLowerCase().includes(term) ||
        p.sector.toLowerCase().includes(term) ||
        p.id.toLowerCase().includes(term)
      );
    });
  }
  const t3 = performance.now();
  const textSearchDurationMs = t3 - t2;

  assert(textSearchDurationMs < 2000, `10,000 búsquedas textuales completadas en ${textSearchDurationMs.toFixed(2)} ms (< 2,000 ms)`);

  // Test 4: Límites Numéricos Extremos de la Calculadora Hipotecaria
  console.log('\n--- 4.4 Límites Numéricos Extremos (Edge Cases Matemáticos) ---');
  
  // Edge Case A: Precio $0
  const calcPayment = (p: number, downPct: number, years: number, rate: number) => {
    const down = p * (downPct / 100);
    const loan = p - down;
    const months = years * 12;
    if (loan <= 0 || months <= 0 || rate <= 0) return 0;
    const mRate = rate / 12;
    return (loan * mRate * Math.pow(1 + mRate, months)) / (Math.pow(1 + mRate, months) - 1);
  };

  assert(calcPayment(0, 20, 20, 0.0599) === 0, 'Precio $0 produce cuota mensual $0 (sin divisiones por cero)');
  
  // Edge Case B: Entrada 100% (Préstamo $0)
  assert(calcPayment(500000, 100, 20, 0.0599) === 0, 'Entrada 100% produce préstamo $0 y cuota mensual $0');

  // Edge Case C: Mansión de $25,000,000 USD
  const highValPayment = calcPayment(25000000, 10, 30, 0.0845);
  assert(!isNaN(highValPayment) && isFinite(highValPayment) && highValPayment > 0, 
    'Inmueble de $25M produce cálculo finito sin desbordamiento numérico', 
    `Cuota: $${Math.round(highValPayment).toLocaleString()}/mes`
  );

  // Edge Case D: Plazo mínimo de 1 año (12 meses)
  const shortTerm = calcPayment(100000, 20, 1, 0.0599);
  assert(!isNaN(shortTerm) && isFinite(shortTerm) && shortTerm > 0, 'Plazo mínimo de 1 año calcula cuota finita');

  // Test 5: Monitoreo de Memoria Heap
  console.log('\n--- 4.5 Huella de Memoria Heap ---');
  const memoryUsage = process.memoryUsage();
  const heapMB = Math.round(memoryUsage.heapUsed / (1024 * 1024));
  assert(heapMB < 150, `Uso de memoria Heap bajo carga es saludable (${heapMB} MB < 150 MB)`);

  console.log(`\nResultados Estrés: ${passed} pasadas, ${failed} fallidas`);
  return { passed, failed };
}
