import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { z } from 'zod';
import { db } from '../database/db';
import { CONFIG } from '../config/constants';

// Zod Validation Schemas
export const registerSchema = {
  body: z.object({
    email: z.string().email('Formato de correo electrónico inválido.'),
    password: z.string().min(8, 'La contraseña debe contener al menos 8 caracteres.'),
    fullName: z.string().min(3, 'El nombre completo debe tener al menos 3 caracteres.'),
    phone: z.string().optional(),
    role: z.enum(['BUYER', 'AGENT', 'SUPER_ADMIN']).default('BUYER'),
    companyName: z.string().optional(),
    licenseNumber: z.string().optional()
  })
};

export const loginSchema = {
  body: z.object({
    email: z.string().email('Formato de correo electrónico inválido.'),
    password: z.string().min(1, 'La contraseña es requerida.')
  })
};

export const refreshSchema = {
  body: z.object({
    refreshToken: z.string().min(10, 'Refresh token requerido.')
  })
};

function generateTokens(user: { id: string; email: string; role: string; full_name: string }) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    fullName: user.full_name
  };

  const accessToken = jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.ACCESS_TOKEN_EXPIRES_IN
  });

  const refreshToken = crypto.randomBytes(40).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

  // Insert refresh token into database
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + CONFIG.REFRESH_TOKEN_EXPIRES_DAYS);

  const insertToken = db.prepare(`
    INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at)
    VALUES (?, ?, ?, ?)
  `);
  insertToken.run(`rt-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`, user.id, tokenHash, expiresAt.toISOString());

  return { accessToken, refreshToken, expiresInSeconds: 900 };
}

export function register(req: Request, res: Response): void {
  const { email, password, fullName, phone, role, companyName, licenseNumber } = req.body;

  // Check if email already registered
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
  if (existingUser) {
    res.status(409).json({
      success: false,
      error: 'CORREO_REGISTRADO',
      message: 'Este correo electrónico ya se encuentra registrado en Propiedades Premier.'
    });
    return;
  }

  // Hash password with Bcrypt
  const passwordHash = bcrypt.hashSync(password, CONFIG.BCRYPT_SALT_ROUNDS);
  const userId = `usr-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, phone, role, company_name, license_number, is_verified)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    userId,
    email.toLowerCase(),
    passwordHash,
    fullName,
    phone || null,
    role || 'BUYER',
    companyName || null,
    licenseNumber || null,
    role === 'AGENT' ? 0 : 1 // Agents require verification
  );

  // Assign Free Membership Plan by default (or Pro if agent registering under promo)
  const defaultPlanCode = role === 'AGENT' ? 'PRO_AGENT' : 'FREE';
  const plan = db.prepare('SELECT id FROM membership_plans WHERE code = ?').get(defaultPlanCode) as { id: string };

  const subId = `sub-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
  const insertSub = db.prepare(`
    INSERT INTO user_subscriptions (id, user_id, plan_id, status, current_period_start, current_period_end, auto_renew, used_listings)
    VALUES (?, ?, ?, 'ACTIVE', datetime('now'), datetime('now', '+3 months'), 1, 0)
  `);
  insertSub.run(subId, userId, plan.id);

  const newUser = { id: userId, email: email.toLowerCase(), role: role || 'BUYER', full_name: fullName };
  const tokens = generateTokens(newUser);

  res.status(201).json({
    success: true,
    message: 'Usuario registrado exitosamente en Propiedades Premier.',
    data: {
      user: {
        id: userId,
        email: email.toLowerCase(),
        fullName,
        phone: phone || null,
        role: role || 'BUYER',
        companyName: companyName || null,
        licenseNumber: licenseNumber || null,
        isVerified: role !== 'AGENT'
      },
      tokens
    }
  });
}

export function login(req: Request, res: Response): void {
  const { email, password } = req.body;

  const user = db.prepare(`
    SELECT id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, license_number
    FROM users WHERE email = ?
  `).get(email.toLowerCase()) as any;

  if (!user) {
    res.status(401).json({
      success: false,
      error: 'CREDENCIALES_INVALIDAS',
      message: 'El correo electrónico o la contraseña ingresada son incorrectos.'
    });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
  if (!isPasswordValid) {
    res.status(401).json({
      success: false,
      error: 'CREDENCIALES_INVALIDAS',
      message: 'El correo electrónico o la contraseña ingresada son incorrectos.'
    });
    return;
  }

  // Fetch active subscription & plan
  const sub = db.prepare(`
    SELECT s.id, s.status, s.used_listings, s.current_period_end, p.code as plan_code, p.name as plan_name, p.max_active_listings
    FROM user_subscriptions s
    JOIN membership_plans p ON s.plan_id = p.id
    WHERE s.user_id = ? AND s.status = 'ACTIVE'
    ORDER BY s.created_at DESC LIMIT 1
  `).get(user.id) as any;

  const tokens = generateTokens(user);

  res.status(200).json({
    success: true,
    message: `Bienvenido de vuelta, ${user.full_name}.`,
    data: {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatar_url,
        isVerified: Boolean(user.is_verified),
        companyName: user.company_name,
        licenseNumber: user.license_number
      },
      subscription: sub ? {
        id: sub.id,
        planCode: sub.plan_code,
        planName: sub.plan_name,
        status: sub.status,
        maxListings: sub.max_active_listings,
        usedListings: sub.used_listings,
        currentPeriodEnd: sub.current_period_end
      } : null,
      tokens
    }
  });
}

export function refreshToken(req: Request, res: Response): void {
  const { refreshToken: rawToken } = req.body;
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  const tokenRecord = db.prepare(`
    SELECT rt.id, rt.user_id, rt.expires_at, rt.revoked_at, u.id as u_id, u.email, u.role, u.full_name
    FROM refresh_tokens rt
    JOIN users u ON rt.user_id = u.id
    WHERE rt.token_hash = ?
  `).get(tokenHash) as any;

  if (!tokenRecord || tokenRecord.revoked_at !== null) {
    res.status(401).json({
      success: false,
      error: 'REFRESH_TOKEN_INVALIDO',
      message: 'El refresh token provisto ha sido revocado o no existe.'
    });
    return;
  }

  if (new Date(tokenRecord.expires_at) < new Date()) {
    res.status(401).json({
      success: false,
      error: 'REFRESH_TOKEN_EXPIRADO',
      message: 'El refresh token ha expirado. Por favor inicia sesión nuevamente.'
    });
    return;
  }

  // Mark old token as revoked (Token Rotation)
  db.prepare("UPDATE refresh_tokens SET revoked_at = datetime('now') WHERE id = ?").run(tokenRecord.id);

  // Issue new pair
  const tokens = generateTokens({
    id: tokenRecord.u_id,
    email: tokenRecord.email,
    role: tokenRecord.role,
    full_name: tokenRecord.full_name
  });

  res.status(200).json({
    success: true,
    message: 'Sesión renovada con rotación criptográfica de token.',
    data: { tokens }
  });
}

export function logout(req: Request, res: Response): void {
  const { refreshToken: rawToken } = req.body;
  if (rawToken) {
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
    db.prepare("UPDATE refresh_tokens SET revoked_at = datetime('now') WHERE token_hash = ?").run(tokenHash);
  }

  res.status(200).json({
    success: true,
    message: 'Sesión cerrada y tokens invalidados exitosamente.'
  });
}

export function getMe(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const user = db.prepare(`
    SELECT id, email, full_name, phone, role, avatar_url, is_verified, company_name, license_number, created_at
    FROM users WHERE id = ?
  `).get(req.user.userId) as any;

  if (!user) {
    res.status(404).json({ success: false, error: 'USUARIO_NO_ENCONTRADO' });
    return;
  }

  const sub = db.prepare(`
    SELECT s.id, s.status, s.used_listings, s.current_period_end, p.code as plan_code, p.name as plan_name, p.max_active_listings
    FROM user_subscriptions s
    JOIN membership_plans p ON s.plan_id = p.id
    WHERE s.user_id = ? AND s.status = 'ACTIVE'
    ORDER BY s.created_at DESC LIMIT 1
  `).get(user.id) as any;

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatar_url,
        isVerified: Boolean(user.is_verified),
        companyName: user.company_name,
        licenseNumber: user.license_number
      },
      subscription: sub || null
    }
  });
}
