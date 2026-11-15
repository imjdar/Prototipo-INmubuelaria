/**
 * PROPIEDADES PREMIER - AUTH CONTROLLER
 * 
 * Controlador HTTP para autenticación, registro, rotación de JWT y perfiles RBAC.
 * Principios SOLID:
 * - SRP: Maneja el transporte HTTP, esquemas Zod y códigos de estado.
 * - DIP: Lógica de credenciales delegada a authService.
 */

import { Request, Response } from 'express';
import { z } from 'zod';
import { authService } from '../container';

// ==========================================
// 1. Esquemas de Validación (Zod)
// ==========================================
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

// ==========================================
// 2. Controladores de Rutas
// ==========================================

export function register(req: Request, res: Response): void {
  try {
    const { email, password, fullName, phone, role, companyName, licenseNumber } = req.body;

    const result = authService.register({
      email,
      password,
      fullName,
      phone,
      role,
      companyName,
      licenseNumber
    });

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente en Propiedades Premier.',
      data: {
        user: {
          id: result.user.id,
          email: result.user.email,
          fullName: result.user.fullName,
          phone: result.user.phone,
          role: result.user.role,
          companyName: result.user.companyName,
          licenseNumber: result.user.licenseNumber,
          isVerified: result.user.isVerified
        },
        tokens: result.tokens
      }
    });
  } catch (error: any) {
    if (error.message?.includes('CORREO_REGISTRADO')) {
      res.status(409).json({
        success: false,
        error: 'CORREO_REGISTRADO',
        message: 'Este correo electrónico ya se encuentra registrado en Propiedades Premier.'
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: 'ERROR_REGISTRO',
      message: error.message || 'Error interno al registrar usuario.'
    });
  }
}

export function login(req: Request, res: Response): void {
  try {
    const { email, password } = req.body;
    const result = authService.login({ email, password });

    res.status(200).json({
      success: true,
      message: `Bienvenido de vuelta, ${result.user.fullName}.`,
      data: {
        user: {
          id: result.user.id,
          email: result.user.email,
          fullName: result.user.fullName,
          phone: result.user.phone,
          role: result.user.role,
          avatarUrl: result.user.avatarUrl,
          isVerified: result.user.isVerified,
          companyName: result.user.companyName,
          licenseNumber: result.user.licenseNumber
        },
        subscription: result.subscription,
        tokens: result.tokens
      }
    });
  } catch (error: any) {
    if (error.message?.includes('CREDENCIALES_INVALIDAS')) {
      res.status(401).json({
        success: false,
        error: 'CREDENCIALES_INVALIDAS',
        message: 'El correo electrónico o la contraseña ingresada son incorrectos.'
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: 'ERROR_LOGIN',
      message: error.message
    });
  }
}

export function refreshToken(req: Request, res: Response): void {
  try {
    const { refreshToken: rawToken } = req.body;
    const tokens = authService.refreshTokens(rawToken);

    res.status(200).json({
      success: true,
      message: 'Tokens renovados exitosamente.',
      data: { tokens }
    });
  } catch (error: any) {
    if (error.message?.includes('TOKEN_REVOCADO')) {
      res.status(401).json({
        success: false,
        error: 'TOKEN_REVOCADO',
        message: 'Intento de reutilización detectado. La sesión ha sido revocada por ciberseguridad.'
      });
      return;
    }
    if (error.message?.includes('TOKEN_EXPIRADO')) {
      res.status(401).json({
        success: false,
        error: 'TOKEN_EXPIRADO',
        message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
      });
      return;
    }
    res.status(401).json({
      success: false,
      error: 'TOKEN_INVALIDO',
      message: 'Token de actualización inválido o inexistente.'
    });
  }
}

export function getProfile(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  try {
    const profile = authService.getUserProfile(req.user.userId);
    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: 'USUARIO_NO_ENCONTRADO',
      message: error.message
    });
  }
}

export const getMe = getProfile;

export function logout(req: Request, res: Response): void {
  const { refreshToken: rawToken } = req.body;
  if (rawToken) {
    authService.logout(rawToken);
  }

  res.status(200).json({
    success: true,
    message: 'Sesión cerrada exitosamente en Propiedades Premier.'
  });
}
