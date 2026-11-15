import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/constants';
import { db } from '../database/db';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: 'BUYER' | 'AGENT' | 'SUPER_ADMIN';
  fullName: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUserPayload;
    }
  }
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'ACCESO_NO_AUTORIZADO',
      message: 'Token de autenticación faltante o con formato inválido (debe ser Bearer).'
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as AuthUserPayload;
    
    // Verify user still exists in DB
    const userStmt = db.prepare('SELECT id, email, role, full_name FROM users WHERE id = ?');
    const user = userStmt.get(decoded.userId) as any;

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'USUARIO_INEXISTENTE',
        message: 'El usuario asociado al token ya no existe en el sistema.'
      });
      return;
    }

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name
    };

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({
        success: false,
        error: 'TOKEN_EXPIRADO',
        message: 'El token de acceso ha expirado. Por favor utiliza el refresh token para renovarlo.'
      });
      return;
    }

    res.status(401).json({
      success: false,
      error: 'TOKEN_INVALIDO',
      message: 'Firma criptográfica del token inválida o adulterada.'
    });
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as AuthUserPayload;
    req.user = decoded;
  } catch {
    // Ignore invalid tokens for optional auth
  }
  next();
}

export function requireRole(allowedRoles: ('BUYER' | 'AGENT' | 'SUPER_ADMIN')[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'ACCESO_NO_AUTORIZADO',
        message: 'Autenticación requerida para acceder a este recurso.'
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'PRIVILEGIOS_INSUFICIENTES',
        message: `Tu rol (${req.user.role}) no tiene permisos para ejecutar esta acción. Roles requeridos: ${allowedRoles.join(', ')}`
      });
      return;
    }

    next();
  };
}
