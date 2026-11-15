/**
 * PROPIEDADES PREMIER - REPOSITORY INTERFACES
 * 
 * Define los contratos para la Capa de Acceso a Datos (DAL).
 * Cumple con el Principio de Inversión de Dependencias (DIP) y Segregación de Interfaces (ISP).
 */

import {
  PropertyEntity,
  PropertyFilterQuery,
  CreatePropertyDTO,
  UserEntity,
  RegisterUserDTO,
  MembershipPlanEntity,
  UserSubscriptionEntity
} from './domain.types';

export interface IPropertyRepository {
  findById(id: string): PropertyEntity | null;
  findByCode(code: string): PropertyEntity | null;
  findMany(filters: PropertyFilterQuery): { properties: PropertyEntity[]; total: number };
  create(data: CreatePropertyDTO, userId?: string): PropertyEntity;
  update(id: string, data: Partial<PropertyEntity>): PropertyEntity | null;
  delete(id: string): boolean;
  countByUserId(userId: string): number;
}

export interface IUserRepository {
  findById(id: string): UserEntity | null;
  findByEmail(email: string): UserEntity | null;
  create(data: RegisterUserDTO, passwordHash: string, isVerified: boolean): UserEntity;
  update(id: string, data: Partial<UserEntity>): UserEntity | null;
  delete(id: string): boolean;
}

export interface ISubscriptionRepository {
  findPlanByCode(code: string): MembershipPlanEntity | null;
  findPlanById(id: string): MembershipPlanEntity | null;
  findAllPlans(): MembershipPlanEntity[];
  findActiveByUserId(userId: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } | null;
  createSubscription(userId: string, planId: string, durationMonths: number): UserSubscriptionEntity;
  incrementListingCount(subscriptionId: string): boolean;
  upgradeSubscription(userId: string, targetPlanCode: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } | null;
}

export interface IFavoriteRepository {
  getUserFavoriteIds(userId: string): string[];
  getUserFavorites(userId: string): PropertyEntity[];
  addFavorite(userId: string, propertyId: string): boolean;
  removeFavorite(userId: string, propertyId: string): boolean;
  isFavorite(userId: string, propertyId: string): boolean;
}

export interface IRefreshTokenRepository {
  save(userId: string, tokenHash: string, expiresAt: Date, ipAddress?: string, userAgent?: string): void;
  findByHash(tokenHash: string): { id: string; userId: string; expiresAt: string; revokedAt: string | null } | null;
  revokeByHash(tokenHash: string): boolean;
  revokeAllForUser(userId: string): boolean;
}
