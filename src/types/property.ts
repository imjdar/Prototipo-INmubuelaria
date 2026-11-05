export type Sector = 
  | 'Cumbayá' 
  | 'Puembo' 
  | 'González Suárez' 
  | 'La Carolina' 
  | 'Tumbaco' 
  | 'Nayón';

export type PropertyType = 'Casa' | 'Penthouse' | 'Suite' | 'Terreno';

export interface PropertyFeatures {
  hasGenerator: boolean;      // Generador Eléctrico 100% de respaldo
  hasMetro: boolean;          // A menos de 5 min a pie del Metro de Quito
  hasDoubleGate: boolean;      // Doble garita / urbanización privada
  isValleyClimate: boolean;    // Microclima de valle (2,150 - 2,300 msnm)
  biessEligible: boolean;      // Apto crédito BIESS / Banco Pichincha
  isAirbnb: boolean;           // Apto para renta corta Airbnb (reglamento PH)
  hasMatterport: boolean;      // Tour virtual 3D Matterport disponible
}

export interface AgentInfo {
  name: string;
  role: string;
  license: string;
  phone: string;
  avatar: string;
}

export interface LogisticsInfo {
  scalaShopping: string;
  usfq: string;
  aeropuerto: string;
  quitoCentro: string;
}

export interface MapCoordinates {
  x: number; // Porcentaje X en el mapa vectorial (0 - 100)
  y: number; // Porcentaje Y en el mapa vectorial (0 - 100)
}

export interface Property {
  id: string;
  title: string;
  sector: Sector;
  microzone: string;
  type: PropertyType;
  price: number;
  areaBuild: number;
  areaLot: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  hoaFee: number;
  elevation: number;
  temperature: string;
  image: string;
  subPhotos: string[];
  features: PropertyFeatures;
  legalStatus: string;
  description: string;
  agent: AgentInfo;
  logistics: LogisticsInfo;
  coordinates: MapCoordinates;
}

export interface FilterState {
  sector: Sector | 'ALL';
  type: PropertyType | 'ALL';
  maxPrice: number;
  hasGenerator: boolean;
  hasMetro: boolean;
  hasDoubleGate: boolean;
  isValleyClimate: boolean;
  biessEligible: boolean;
  isAirbnb: boolean;
}

export type LoanType = 'BIESS' | 'PRIVATE' | 'CASH';

export interface MortgageCalculation {
  price: number;
  downPaymentPct: number;
  downPaymentAmount: number;
  loanAmount: number;
  termYears: number;
  interestRate: number;
  monthlyPayment: number;
  closingCosts: {
    notaryFee: number;
    registryFee: number;
    alcabalaFee: number;        // 1% impuesto municipal DMQ
    provincialFee: number;      // 0.11% tasa consejo provincial
    totalClosingCosts: number;
  };
}
