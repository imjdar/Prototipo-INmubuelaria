/**
 * PROPIEDADES PREMIER - DEPENDENCY INJECTION CONTAINER
 * 
 * Composition Root para la arquitectura de la aplicación.
 * Ensambla los Repositorios y Servicios cumpliendo con el Principio de Inversión de Dependencias (DIP).
 */

import { db } from './database/db';

// Repositorios
import { SqlitePropertyRepository } from './repositories/sqlitePropertyRepository';
import { SqliteUserRepository } from './repositories/sqliteUserRepository';
import { SqliteSubscriptionRepository } from './repositories/sqliteSubscriptionRepository';
import { SqliteFavoriteRepository } from './repositories/sqliteFavoriteRepository';
import { SqliteRefreshTokenRepository } from './repositories/sqliteRefreshTokenRepository';
import { SqliteAgentRepository } from './repositories/sqliteAgentRepository';
import { SqliteBillingRepository } from './repositories/sqliteBillingRepository';

// Servicios
import { PropertyService } from './services/propertyService';
import { AuthService } from './services/authService';
import { SubscriptionService } from './services/subscriptionService';
import { FavoriteService } from './services/favoriteService';
import { BillingService } from './services/billingService';

// 1. Instanciación de Repositorios (Capa de Acceso a Datos - DAL)
export const propertyRepository = new SqlitePropertyRepository(db);
export const userRepository = new SqliteUserRepository(db);
export const subscriptionRepository = new SqliteSubscriptionRepository(db);
export const favoriteRepository = new SqliteFavoriteRepository(db);
export const refreshTokenRepository = new SqliteRefreshTokenRepository(db);
export const agentRepository = new SqliteAgentRepository(db);
export const billingRepository = new SqliteBillingRepository(db);

// 2. Inyección de Repositorios en Servicios (Capa de Lógica de Negocio - BLL)
export const propertyService = new PropertyService(propertyRepository, subscriptionRepository);
export const authService = new AuthService(userRepository, subscriptionRepository, refreshTokenRepository);
export const subscriptionService = new SubscriptionService(subscriptionRepository);
export const favoriteService = new FavoriteService(favoriteRepository);
export const billingService = new BillingService(billingRepository);
