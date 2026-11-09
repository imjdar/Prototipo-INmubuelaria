export type UserRole = 'SUPER_ADMIN' | 'AGENT' | 'BUYER';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  avatarUrl: string;
  isVerified: boolean;
  companyName?: string;
  licenseNumber?: string;
  createdAt: string;
}

export type PlanCode = 'FREE' | 'PRO_AGENT' | 'VIP_INMOBILIARIA';

export interface MembershipPlan {
  id: string;
  code: PlanCode;
  name: string;
  monthlyPriceUsd: number;
  maxListings: number;
  featuredTokens: number;
  hasVideoReels: boolean;
  hasAiGuardianPriority: boolean;
  features: string[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  plan: MembershipPlan;
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  usedListings: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresInSeconds: number;
  tokenType: 'Bearer';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  subscription: UserSubscription | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  provider?: 'google' | 'apple' | 'facebook';
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password?: string;
  phone: string;
  role: UserRole;
  companyName?: string;
  licenseNumber?: string;
  provider?: 'local' | 'google' | 'apple' | 'facebook';
}
