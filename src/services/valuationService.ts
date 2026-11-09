import { Sector, PropertyType } from '../types/property';

export interface SectorBenchmark {
  sector: Sector;
  avgPriceM2: number;
  minPriceM2: number;
  maxPriceM2: number;
  avgRentalM2: number; // Monthly rental $/m2
  annualAppreciationPct: number; // % anual de plusvalía
  metroProximityScore: number; // 1-10
}

export const SECTOR_BENCHMARKS: Record<Sector, SectorBenchmark> = {
  'Cumbayá': {
    sector: 'Cumbayá',
    avgPriceM2: 1650,
    minPriceM2: 1400,
    maxPriceM2: 2200,
    avgRentalM2: 7.8,
    annualAppreciationPct: 6.8,
    metroProximityScore: 4.5
  },
  'Puembo': {
    sector: 'Puembo',
    avgPriceM2: 1480,
    minPriceM2: 1250,
    maxPriceM2: 1950,
    avgRentalM2: 6.5,
    annualAppreciationPct: 7.4,
    metroProximityScore: 3.0
  },
  'González Suárez': {
    sector: 'González Suárez',
    avgPriceM2: 1780,
    minPriceM2: 1550,
    maxPriceM2: 2400,
    avgRentalM2: 8.9,
    annualAppreciationPct: 5.2,
    metroProximityScore: 8.0
  },
  'La Carolina': {
    sector: 'La Carolina',
    avgPriceM2: 1820,
    minPriceM2: 1600,
    maxPriceM2: 2500,
    avgRentalM2: 9.4,
    annualAppreciationPct: 6.1,
    metroProximityScore: 9.8
  },
  'Tumbaco': {
    sector: 'Tumbaco',
    avgPriceM2: 1350,
    minPriceM2: 1150,
    maxPriceM2: 1650,
    avgRentalM2: 6.2,
    annualAppreciationPct: 7.0,
    metroProximityScore: 4.0
  },
  'Nayón': {
    sector: 'Nayón',
    avgPriceM2: 1520,
    minPriceM2: 1300,
    maxPriceM2: 1850,
    avgRentalM2: 7.0,
    annualAppreciationPct: 6.5,
    metroProximityScore: 6.0
  }
};

export type OpportunityLevel = 'OPPORTUNITY' | 'FAIR' | 'PREMIUM';

export interface OpportunityAnalysis {
  pricePerM2: number;
  sectorAvgM2: number;
  diffPct: number;
  level: OpportunityLevel;
  badgeLabel: string;
  badgeColor: string;
  badgeBg: string;
  explanation: string;
}

export interface ValuationParams {
  sector: Sector;
  propertyType: PropertyType;
  areaBuild: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  hasGenerator: boolean;
  hasMetro: boolean;
  hasDoubleGate: boolean;
  isValleyClimate: boolean;
  condition: 'NUEVO' | 'BUENO' | 'REMODELAR';
}

export interface ValuationResult {
  estimatedPrice: number;
  priceRangeMin: number;
  priceRangeMax: number;
  estimatedPricePerM2: number;
  sectorAvgPricePerM2: number;
  diffVsSectorPct: number;
  estimatedMonthlyRent: number;
  rentRangeMin: number;
  rentRangeMax: number;
  grossYieldAnnualPct: number; // Cap Rate
  opportunityLevel: OpportunityLevel;
  confidenceScore: number; // 85-98%
}

export class ValuationService {
  /**
   * Analiza si una propiedad en venta representa una oportunidad de precio vs el promedio del sector
   */
  public analyzeOpportunity(price: number, areaBuild: number, sector: Sector): OpportunityAnalysis {
    const validArea = areaBuild > 0 ? areaBuild : 100;
    const pricePerM2 = Math.round(price / validArea);
    const benchmark = SECTOR_BENCHMARKS[sector] || SECTOR_BENCHMARKS['Cumbayá'];
    const sectorAvgM2 = benchmark.avgPriceM2;
    const diffPct = Math.round(((pricePerM2 - sectorAvgM2) / sectorAvgM2) * 100);

    if (diffPct <= -8) {
      return {
        pricePerM2,
        sectorAvgM2,
        diffPct,
        level: 'OPPORTUNITY',
        badgeLabel: `🔥 Oportunidad (${Math.abs(diffPct)}% bajo promedio)`,
        badgeColor: '#16A34A',
        badgeBg: '#DCFCE7',
        explanation: `El valor de $${pricePerM2.toLocaleString()}/m² está un ${Math.abs(diffPct)}% por debajo de la media de ${sector} ($${sectorAvgM2.toLocaleString()}/m²). Excelente potencial de plusvalía inmediata.`
      };
    }

    if (diffPct >= 14) {
      return {
        pricePerM2,
        sectorAvgM2,
        diffPct,
        level: 'PREMIUM',
        badgeLabel: `💎 Alta Gama / Exclusivo (+${diffPct}% vs promedio)`,
        badgeColor: '#7C3AED',
        badgeBg: '#F3E8FF',
        explanation: `Propiedad con estándares constructivos y amenidades de alta gama sobre el promedio de ${sector} ($${sectorAvgM2.toLocaleString()}/m²).`
      };
    }

    return {
      pricePerM2,
      sectorAvgM2,
      diffPct,
      level: 'FAIR',
      badgeLabel: `✓ Precio Justo de Mercado`,
      badgeColor: '#2563EB',
      badgeBg: '#EFF6FF',
      explanation: `Precio en línea con la tasación referencial del Municipio del DMQ y el índice del sector ${sector} ($${sectorAvgM2.toLocaleString()}/m²).`
    };
  }

  /**
   * Tasador Inteligente: Calcula estimación de mercado para venta, renta y rentabilidad
   */
  public calculateValuation(params: ValuationParams): ValuationResult {
    const benchmark = SECTOR_BENCHMARKS[params.sector] || SECTOR_BENCHMARKS['Cumbayá'];
    let baseM2 = benchmark.avgPriceM2;

    // Ajustes por tipo de inmueble
    if (params.propertyType === 'Penthouse') baseM2 *= 1.18;
    else if (params.propertyType === 'Suite') baseM2 *= 1.10;
    else if (params.propertyType === 'Casa') baseM2 *= 0.95;
    else if (params.propertyType === 'Oficina') baseM2 *= 0.92;
    else if (params.propertyType === 'Terreno') baseM2 *= 0.45;

    // Ajustes por estado de conservación
    if (params.condition === 'NUEVO') baseM2 *= 1.08;
    else if (params.condition === 'REMODELAR') baseM2 *= 0.82;

    // Ajustes por amenidades críticas en Quito
    if (params.hasGenerator) baseM2 *= 1.06; // +6% de valor por respaldo total ante apagones
    if (params.hasMetro) baseM2 *= 1.07;     // +7% de valor por conexión directa al Metro
    if (params.hasDoubleGate) baseM2 *= 1.05;// +5% por seguridad armada y doble filtro
    if (params.parking >= 3) baseM2 *= 1.03; // +3% por estacionamientos extra

    const estimatedPricePerM2 = Math.round(baseM2);
    const validArea = Math.max(30, params.areaBuild || 100);
    const estimatedPrice = Math.round(estimatedPricePerM2 * validArea);

    const priceRangeMin = Math.round(estimatedPrice * 0.93);
    const priceRangeMax = Math.round(estimatedPrice * 1.07);

    // Estimación de canon de alquiler
    let rentM2 = benchmark.avgRentalM2;
    if (params.hasGenerator) rentM2 *= 1.08;
    if (params.hasMetro) rentM2 *= 1.10;
    const estimatedMonthlyRent = Math.round(rentM2 * validArea);
    const rentRangeMin = Math.round(estimatedMonthlyRent * 0.92);
    const rentRangeMax = Math.round(estimatedMonthlyRent * 1.08);

    // Rendimiento bruto anual (Cap Rate)
    const annualRent = estimatedMonthlyRent * 12;
    const grossYieldAnnualPct = Number(((annualRent / estimatedPrice) * 100).toFixed(2));

    const opportunity = this.analyzeOpportunity(estimatedPrice, validArea, params.sector);

    return {
      estimatedPrice,
      priceRangeMin,
      priceRangeMax,
      estimatedPricePerM2,
      sectorAvgPricePerM2: benchmark.avgPriceM2,
      diffVsSectorPct: opportunity.diffPct,
      estimatedMonthlyRent,
      rentRangeMin,
      rentRangeMax,
      grossYieldAnnualPct,
      opportunityLevel: opportunity.level,
      confidenceScore: 94
    };
  }
}

export const valuationService = new ValuationService();
