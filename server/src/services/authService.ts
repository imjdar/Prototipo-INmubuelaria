/**
 * PROPIEDADES PREMIER - AUTH SERVICE
 * 
 * Capa de Lógica de Negocio (BLL) para autenticación, RBAC y gestión criptográfica de sesiones.
 * Cumple con SOLID (SRP y DIP) y estándares OWASP Top 10 A07 (Identification and Authentication Failures).
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { IAuthService } from '../types/service.types';
import { IUserRepository, ISubscriptionRepository, IRefreshTokenRepository } from '../types/repository.types';
import {
  UserEntity,
  RegisterUserDTO,
  LoginDTO,
  AuthTokens,
  UserRole
} from '../types/domain.types';
import { CONFIG } from '../config/constants';

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly subscriptionRepo: ISubscriptionRepository,
    private readonly refreshTokenRepo: IRefreshTokenRepository
  ) {}

  private generateTokens(user: { id: string; email: string; role: UserRole; fullName: string }): AuthTokens {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    };

    const accessToken = jwt.sign(payload, CONFIG.JWT_SECRET, {
      expiresIn: CONFIG.ACCESS_TOKEN_EXPIRES_IN as any
    });

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + CONFIG.REFRESH_TOKEN_EXPIRES_DAYS);

    this.refreshTokenRepo.save(user.id, tokenHash, expiresAt);

    return {
      accessToken,
      refreshToken,
      expiresInSeconds: 900 // 15 minutos
    };
  }

  register(dto: RegisterUserDTO): { user: Omit<UserEntity, 'passwordHash'>; tokens: AuthTokens } {
    // 1. Validar que el email no esté duplicado
    const existing = this.userRepo.findByEmail(dto.email);
    if (existing) {
      throw new Error('CORREO_REGISTRADO: Este correo electrónico ya se encuentra registrado.');
    }

    // 2. Hash de contraseña seguro (Bcrypt con 12 rondas de sal)
    const passwordHash = bcrypt.hashSync(dto.password, CONFIG.BCRYPT_SALT_ROUNDS);

    // Los agentes requieren verificación previa de licencia DMQ
    const isVerified = dto.role !== 'AGENT';

    const user = this.userRepo.create(dto, passwordHash, isVerified);

    // 3. Asignar plan por defecto (PRO_AGENT de bienvenida o FREE)
    const defaultPlanCode = dto.role === 'AGENT' ? 'PRO_AGENT' : 'FREE';
    const plan = this.subscriptionRepo.findPlanByCode(defaultPlanCode);
    if (plan) {
      this.subscriptionRepo.createSubscription(user.id, plan.id, 3);
    }

    const tokens = this.generateTokens(user);

    const { passwordHash: _, ...safeUser } = user;
    return { user: safeUser, tokens };
  }

  login(dto: LoginDTO): { user: Omit<UserEntity, 'passwordHash'>; subscription: any; tokens: AuthTokens } {
    const user = this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new Error('CREDENCIALES_INVALIDAS: El correo o la contraseña son incorrectos.');
    }

    const isMatch = bcrypt.compareSync(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('CREDENCIALES_INVALIDAS: El correo o la contraseña son incorrectos.');
    }

    const subData = this.subscriptionRepo.findActiveByUserId(user.id);
    const tokens = this.generateTokens(user);

    const { passwordHash: _, ...safeUser } = user;
    return {
      user: safeUser,
      subscription: subData ? {
        id: subData.subscription.id,
        planCode: subData.plan.code,
        planName: subData.plan.name,
        status: subData.subscription.status,
        maxListings: subData.plan.maxActiveListings,
        usedListings: subData.subscription.usedListings,
        currentPeriodEnd: subData.subscription.currentPeriodEnd
      } : null,
      tokens
    };
  }

  refreshTokens(rawRefreshToken: string): AuthTokens {
    if (!rawRefreshToken || rawRefreshToken.length < 10) {
      throw new Error('TOKEN_INVALIDO: Token de actualización malformado.');
    }

    const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
    const tokenRecord = this.refreshTokenRepo.findByHash(tokenHash);

    if (!tokenRecord) {
      throw new Error('TOKEN_INVALIDO: El token de sesión no existe.');
    }

    if (tokenRecord.revokedAt) {
      // Detección de Replay Attack: si intentan usar un refresh token revocado, revocamos toda la sesión del usuario
      this.refreshTokenRepo.revokeAllForUser(tokenRecord.userId);
      throw new Error('TOKEN_REVOCADO: Se ha detectado intento de reutilización no autorizada.');
    }

    if (new Date(tokenRecord.expiresAt) < new Date()) {
      throw new Error('TOKEN_EXPIRADO: La sesión ha expirado.');
    }

    // Revocar el token usado (Rotación estricta de tokens)
    this.refreshTokenRepo.revokeByHash(tokenHash);

    const user = this.userRepo.findById(tokenRecord.userId);
    if (!user) {
      throw new Error('USUARIO_NO_EXISTE: El usuario asociado ya no es válido.');
    }

    return this.generateTokens(user);
  }

  logout(rawRefreshToken: string): boolean {
    if (!rawRefreshToken) return false;
    const tokenHash = crypto.createHash('sha256').update(rawRefreshToken).digest('hex');
    return this.refreshTokenRepo.revokeByHash(tokenHash);
  }

  getUserProfile(userId: string): { user: Omit<UserEntity, 'passwordHash'>; subscription: any } {
    const user = this.userRepo.findById(userId);
    if (!user) {
      throw new Error('USUARIO_NO_ENCONTRADO: Usuario no encontrado.');
    }

    const subData = this.subscriptionRepo.findActiveByUserId(userId);
    const { passwordHash: _, ...safeUser } = user;

    return {
      user: safeUser,
      subscription: subData ? {
        id: subData.subscription.id,
        planCode: subData.plan.code,
        planName: subData.plan.name,
        status: subData.subscription.status,
        maxListings: subData.plan.maxActiveListings,
        usedListings: subData.subscription.usedListings,
        currentPeriodEnd: subData.subscription.currentPeriodEnd
      } : null
    };
  }
}
