import { 
  User, 
  MembershipPlan, 
  UserSubscription, 
  AuthTokens, 
  AuthState, 
  LoginCredentials, 
  RegisterCredentials,
  PlanCode
} from '../types/auth';

const STORAGE_KEY = 'valle_urbe_auth_session_v1';

export const MEMBERSHIP_PLANS: Record<PlanCode, MembershipPlan> = {
  FREE: {
    id: 'plan-free-001',
    code: 'FREE',
    name: 'Particular / Comprador',
    monthlyPriceUsd: 0,
    maxListings: 1,
    featuredTokens: 0,
    hasVideoReels: false,
    hasAiGuardianPriority: false,
    features: [
      '1 publicación básica sin costo',
      'Búsqueda con filtros Quito & Metro',
      'Calculadora hipotecaria BIESS y Notarial',
      'Portafolio privado de favoritos'
    ]
  },
  PRO_AGENT: {
    id: 'plan-pro-002',
    code: 'PRO_AGENT',
    name: 'Agente Inmobiliario Pro',
    monthlyPriceUsd: 39,
    maxListings: 15,
    featuredTokens: 3,
    hasVideoReels: true,
    hasAiGuardianPriority: true,
    features: [
      'Hasta 15 propiedades simultáneas',
      'Feed vertical de videos 9:16 (Estilo TikTok)',
      'Sello de verificación notarial express DMQ',
      'Auditoría prioritaria con Bot Guardián IA',
      '3 destaques en mapa de Quito y valles',
      'Botón WhatsApp VIP directo'
    ]
  },
  VIP_INMOBILIARIA: {
    id: 'plan-vip-003',
    code: 'VIP_INMOBILIARIA',
    name: 'Inmobiliaria & Constructora VIP',
    monthlyPriceUsd: 119,
    maxListings: 100,
    featuredTokens: 15,
    hasVideoReels: true,
    hasAiGuardianPriority: true,
    features: [
      'Hasta 100 publicaciones de proyectos',
      'Videos 9:16 y tours virtuales 3D ilimitados',
      'CRM de leads con integración WhatsApp Concierge',
      'Banner patrocinado en Cumbayá y La Carolina',
      'Métricas avanzadas de visualización e intención',
      'Múltiples subcuentas de agentes'
    ]
  }
};

export const DEMO_USERS: Record<string, { user: User; planCode: PlanCode }> = {
  agent: {
    user: {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      email: 'mateo.serrano@valleyurbe.ec',
      fullName: 'Ing. Mateo Serrano',
      phone: '+593 99 876 5432',
      role: 'AGENT',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      isVerified: true,
      companyName: 'Valle & Urbe Patrimonial Cumbayá',
      licenseNumber: 'Lic. Notarial #0492 DMQ',
      createdAt: '2026-01-15T10:00:00Z'
    },
    planCode: 'PRO_AGENT'
  },
  buyer: {
    user: {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
      email: 'sofia.carrillo@investor.ec',
      fullName: 'Dra. Sofía Carrillo',
      phone: '+593 98 123 4567',
      role: 'BUYER',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      createdAt: '2026-02-10T14:30:00Z'
    },
    planCode: 'FREE'
  },
  admin: {
    user: {
      id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
      email: 'admin@propiedadespremier.ec',
      fullName: 'Admin Central DMQ',
      phone: '+593 2 399 9000',
      role: 'SUPER_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      companyName: 'Propiedades Premier Tech Admin',
      createdAt: '2026-01-01T08:00:00Z'
    },
    planCode: 'VIP_INMOBILIARIA'
  }
};

class AuthService {
  private generateTokens(): AuthTokens {
    const randomHash = () => Math.random().toString(36).substring(2) + Date.now().toString(36);
    return {
      accessToken: `jwt.eyJuYW1lIjoiUHJvcFRlY2gifQ.${randomHash()}`,
      refreshToken: `rt.${randomHash()}`,
      expiresInSeconds: 900, // 15 minutos estándar
      tokenType: 'Bearer'
    };
  }

  private createSubscription(userId: string, planCode: PlanCode, usedListings: number = 0): UserSubscription {
    const now = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(now.getFullYear() + 1);

    return {
      id: `sub-${Date.now()}`,
      userId,
      plan: MEMBERSHIP_PLANS[planCode],
      status: 'ACTIVE',
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: nextYear.toISOString(),
      autoRenew: true,
      usedListings
    };
  }

  public getInitialState(): AuthState {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return {
            isAuthenticated: true,
            user: parsed.user,
            subscription: parsed.subscription,
            tokens: parsed.tokens,
            isLoading: false
          };
        }
      }
    } catch (e) {
      console.warn('Error hydrating auth state:', e);
    }

    return {
      isAuthenticated: false,
      user: null,
      subscription: null,
      tokens: null,
      isLoading: false
    };
  }

  public saveSession(user: User, subscription: UserSubscription, tokens: AuthTokens): void {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, subscription, tokens }));
      }
    } catch (e) {
      console.error('Error saving session:', e);
    }
  }

  public clearSession(): void {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Error clearing session:', e);
    }
  }

  public async loginWithDemo(key: 'agent' | 'buyer' | 'admin'): Promise<{ user: User; subscription: UserSubscription; tokens: AuthTokens }> {
    const demo = DEMO_USERS[key];
    const tokens = this.generateTokens();
    const subscription = this.createSubscription(demo.user.id, demo.planCode, key === 'agent' ? 4 : 0);
    this.saveSession(demo.user, subscription, tokens);
    return { user: demo.user, subscription, tokens };
  }

  public async login(credentials: LoginCredentials): Promise<{ user: User; subscription: UserSubscription; tokens: AuthTokens }> {
    // Si coincide con el email de algún demo
    for (const key of Object.keys(DEMO_USERS)) {
      if (DEMO_USERS[key].user.email.toLowerCase() === credentials.email.toLowerCase()) {
        return this.loginWithDemo(key as 'agent' | 'buyer' | 'admin');
      }
    }

    // Usuario estándar nuevo por credencial
    const user: User = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      fullName: credentials.email.split('@')[0].replace('.', ' ').toUpperCase(),
      phone: '+593 99 000 0000',
      role: 'BUYER',
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(credentials.email)}`,
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    const tokens = this.generateTokens();
    const subscription = this.createSubscription(user.id, 'FREE', 0);
    this.saveSession(user, subscription, tokens);
    return { user, subscription, tokens };
  }

  public async socialLogin(provider: 'google' | 'apple' | 'facebook'): Promise<{ user: User; subscription: UserSubscription; tokens: AuthTokens }> {
    const providerNames = {
      google: 'Google User (Quito)',
      apple: 'Apple ID User',
      facebook: 'Meta PropTech User'
    };

    const email = `user.${provider}@proptech.ec`;
    const user: User = {
      id: `user-${provider}-${Date.now()}`,
      email,
      fullName: providerNames[provider],
      phone: '+593 99 777 8899',
      role: 'BUYER',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${provider}`,
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    const tokens = this.generateTokens();
    const subscription = this.createSubscription(user.id, 'FREE', 0);
    this.saveSession(user, subscription, tokens);
    return { user, subscription, tokens };
  }

  public async register(credentials: RegisterCredentials): Promise<{ user: User; subscription: UserSubscription; tokens: AuthTokens }> {
    const user: User = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      fullName: credentials.fullName,
      phone: credentials.phone,
      role: credentials.role,
      companyName: credentials.companyName,
      licenseNumber: credentials.licenseNumber,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(credentials.fullName)}`,
      isVerified: true,
      createdAt: new Date().toISOString()
    };

    const defaultPlan: PlanCode = credentials.role === 'AGENT' ? 'PRO_AGENT' : 'FREE';
    const tokens = this.generateTokens();
    const subscription = this.createSubscription(user.id, defaultPlan, 0);
    this.saveSession(user, subscription, tokens);
    return { user, subscription, tokens };
  }

  public async upgradeSubscription(user: User, newPlanCode: PlanCode): Promise<UserSubscription> {
    const newSubscription = this.createSubscription(user.id, newPlanCode, 0);
    const tokens = this.generateTokens();
    this.saveSession(user, newSubscription, tokens);
    return newSubscription;
  }
}

export const authService = new AuthService();
