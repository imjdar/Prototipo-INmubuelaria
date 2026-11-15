import path from 'path';

export const CONFIG = {
  PORT: parseInt(process.env.PORT || '4000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'premier_jwt_production_secret_key_quito_valles_2026_xyz',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'premier_refresh_production_secret_key_quito_valles_2026_abc',
  ACCESS_TOKEN_EXPIRES_IN: '15m',
  REFRESH_TOKEN_EXPIRES_DAYS: 7,
  BCRYPT_SALT_ROUNDS: 12,
  DATABASE_PATH: process.env.DATABASE_PATH || path.resolve(process.cwd(), 'database', 'premier.db'),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
};
