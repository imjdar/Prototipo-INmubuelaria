/**
 * PROPIEDADES PREMIER - PRISMA ORM CLIENT (EF Core Equivalent in TypeScript)
 * 
 * Equivalente exacto a DbContext en Entity Framework Core.
 * Proporciona consultas fuertemente tipadas, migraciones de esquema
 * y transacciones ACID en PostgreSQL (Supabase / VPS).
 */

import { PrismaClient } from '@prisma/client';

declare global {
  // Evita múltiples instancias de Prisma Client en desarrollo con recarga rápida (HMR)
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.__prisma ||
  new PrismaClient({
    log: process.env.DEBUG_SQL === 'true' ? ['query', 'info', 'warn', 'error'] : ['error']
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

export default prisma;
