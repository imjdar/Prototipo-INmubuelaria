/**
 * PROPIEDADES PREMIER - SERVICE INTERFACES
 * 
 * Define los contratos para la Capa de Lógica de Negocio (BLL).
 * Cumple con el Principio de Responsabilidad Única (SRP) e Inversión de Dependencias (DIP).
 */

import {
  PropertyEntity,
  PropertyFilterQuery,
  CreatePropertyDTO,
  UserEntity,
  RegisterUserDTO,
  LoginDTO,
  AuthTokens,
  MembershipPlanEntity,
  UserSubscriptionEntity
} from './domain.types';

export interface IPropertyService {
  getProperties(filters: PropertyFilterQuery): { properties: PropertyEntity[]; total: number; page: number; limit: number };
  getPropertyById(id: string): PropertyEntity | null;
  createProperty(data: CreatePropertyDTO, userId: string, userRole: string): { property: PropertyEntity; remainingListings: number };
  deleteProperty(id: string, requesterUserId: string, requesterRole: string): boolean;
}

export interface IAuthService {
  register(dto: RegisterUserDTO): { user: Omit<UserEntity, 'passwordHash'>; tokens: AuthTokens };
  login(dto: LoginDTO): { user: Omit<UserEntity, 'passwordHash'>; subscription: any; tokens: AuthTokens };
  refreshTokens(refreshToken: string): AuthTokens;
  logout(refreshToken: string): boolean;
  getUserProfile(userId: string): { user: Omit<UserEntity, 'passwordHash'>; subscription: any };
}

export interface ISubscriptionService {
  getAllPlans(): MembershipPlanEntity[];
  getUserSubscription(userId: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } | null;
  upgradePlan(userId: string, targetPlanCode: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity };
  checkListingEligibility(userId: string, userRole: string): { eligible: boolean; reason?: string; maxListings: number; usedListings: number };
}

export interface IFavoriteService {
  getUserFavorites(userId: string): PropertyEntity[];
  getUserFavoriteIds(userId: string): string[];
  addFavorite(userId: string, propertyId: string): boolean;
  removeFavorite(userId: string, propertyId: string): boolean;
  toggleFavorite(userId: string, propertyId: string): { isFavorite: boolean; count: number };
}
