/**
 * PROPIEDADES PREMIER - DOMAIN TYPES & DATA CONTRACTS
 * 
 * Este módulo define las entidades de dominio y contratos de datos para la plataforma.
 * Diseñado bajo el principio de Segregación de Interfaces (ISP) de SOLID.
 */

// ==========================================
// 1. Roles y Permisos (RBAC)
// ==========================================
export type UserRole = 'BUYER' | 'AGENT' | 'SUPER_ADMIN';

export type OperationType = 'VENTA' | 'RENTA' | 'PROYECTO';

export type PropertyType = 
  | 'Casa' 
  | 'Penthouse' 
  | 'Suite' 
  | 'Terreno'
  | 'Departamento'
  | 'Oficina'
  | 'Bodega'
  | 'Local'
  | 'Proyecto';

export type Sector = 
  | 'Cumbayá' 
  | 'Puembo' 
  | 'González Suárez' 
  | 'La Carolina' 
  | 'Tumbaco' 
  | 'Nayón';

// ==========================================
// 2. Entidades de Dominio
// ==========================================
export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  phone: string | null;
  role: UserRole;
  avatarUrl: string | null;
  isVerified: boolean;
  companyName: string | null;
  licenseNumber: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipPlanEntity {
  id: string;
  code: string; // 'FREE', 'PRO_AGENT', 'VIP_INMOBILIARIA'
  name: string;
  monthlyPriceUsd: number;
  annualPriceUsd: number;
  maxActiveListings: number;
  featuredTokens: number;
  hasVideoReels: boolean;
  hasAiGuardianPriority: boolean;
  features: string[];
  isActive: boolean;
  createdAt: string;
}

export interface UserSubscriptionEntity {
  id: string;
  userId: string;
  planId: string;
  status: 'ACTIVE' | 'CANCELLED' | 'PAST_DUE';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  usedListings: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFeatures {
  hasGenerator: boolean;      // Generador Eléctrico 100% de respaldo
  hasMetro: boolean;          // A menos de 5 min del Metro de Quito
  hasDoubleGate: boolean;      // Doble garita / urbanización privada
  isValleyClimate: boolean;    // Microclima de valle (2,150 - 2,300 msnm)
  biessEligible: boolean;      // Apto crédito hipotecario BIESS
  isAirbnb: boolean;           // Apto para renta corta Airbnb
  hasMatterport: boolean;      // Tour virtual 3D
}

export interface PropertyAgent {
  name: string;
  role: string;
  license: string;
  phone: string;
  avatar: string;
}

export interface PropertyLogistics {
  scalaShopping: string;
  usfq: string;
  aeropuerto: string;
  quitoCentro: string;
}

export interface PropertyEntity {
  id: string;
  code: string;
  title: string;
  description: string;
  price: number;
  operation: OperationType;
  propertyType: PropertyType;
  sector: Sector;
  microzone: string;
  address?: string;
  areaBuild: number;
  areaLot?: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  hoaFee: number;
  elevation: number;
  temperature: string;
  image: string;
  subPhotos: string[];
  features: PropertyFeatures;
  legalStatus?: string;
  agent?: PropertyAgent;
  logistics?: PropertyLogistics;
  lat?: number;
  lng?: number;
  userId?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 3. DTOs (Data Transfer Objects)
// ==========================================
export interface PropertyFilterQuery {
  sector?: string;
  type?: string;
  operation?: string;
  minPrice?: number;
  maxPrice?: number;
  hasGenerator?: boolean;
  hasMetro?: boolean;
  biessEligible?: boolean;
  q?: string;
  sort?: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'efficiency';
  page?: number;
  limit?: number;
}

export interface CreatePropertyDTO {
  title: string;
  description: string;
  price: number;
  operation: 'VENTA' | 'RENTA';
  propertyType: PropertyType;
  sector: Sector;
  microzone?: string;
  address?: string;
  areaBuild: number;
  areaLot?: number;
  bedrooms: number;
  bathrooms: number;
  parking?: number;
  hoaFee?: number;
  image: string;
  subPhotos?: string[];
  features?: Partial<PropertyFeatures>;
  legalStatus?: string;
}

export interface RegisterUserDTO {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: UserRole;
  companyName?: string;
  licenseNumber?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
}
