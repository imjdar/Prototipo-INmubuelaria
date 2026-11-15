import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { CONFIG } from '../config/constants';
import { PROPERTIES } from '../../../src/data/properties';

// Ensure directory exists
const dbDir = path.dirname(CONFIG.DATABASE_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new DatabaseSync(CONFIG.DATABASE_PATH);

// Enable WAL mode & foreign keys for high performance and integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

export function initializeDatabase() {
  // 1. Table: Users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL DEFAULT 'BUYER', -- 'BUYER', 'AGENT', 'SUPER_ADMIN'
      avatar_url TEXT,
      is_verified INTEGER NOT NULL DEFAULT 0,
      company_name TEXT,
      license_number TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
  `);

  // 2. Table: Membership Plans ($29, $49, $99 matching Word document)
  db.exec(`
    CREATE TABLE IF NOT EXISTS membership_plans (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL UNIQUE, -- 'FREE', 'PRO_AGENT', 'VIP_INMOBILIARIA'
      name TEXT NOT NULL,
      monthly_price_usd REAL NOT NULL DEFAULT 0.0,
      annual_price_usd REAL NOT NULL DEFAULT 0.0,
      max_active_listings INTEGER NOT NULL DEFAULT 1,
      featured_tokens INTEGER NOT NULL DEFAULT 0,
      has_video_reels INTEGER NOT NULL DEFAULT 0,
      has_ai_guardian_priority INTEGER NOT NULL DEFAULT 0,
      features_json TEXT NOT NULL DEFAULT '[]',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // 3. Table: User Subscriptions
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plan_id TEXT NOT NULL REFERENCES membership_plans(id) ON DELETE RESTRICT,
      status TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'CANCELLED', 'PAST_DUE'
      current_period_start TEXT NOT NULL DEFAULT (datetime('now')),
      current_period_end TEXT NOT NULL,
      auto_renew INTEGER NOT NULL DEFAULT 1,
      used_listings INTEGER NOT NULL DEFAULT 0,
      payment_method TEXT DEFAULT 'NONE',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON user_subscriptions(user_id);
  `);

  // 4. Table: Refresh Tokens (Rotated JWT Sessions)
  db.exec(`
    CREATE TABLE IF NOT EXISTS refresh_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at TEXT NOT NULL,
      revoked_at TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
    CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash ON refresh_tokens(token_hash);
  `);

  // 5. Table: Properties (Full Real Estate Listings Schema)
  db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      operation TEXT NOT NULL DEFAULT 'VENTA', -- 'VENTA', 'RENTA'
      property_type TEXT NOT NULL, -- 'Casa', 'Suite', 'Penthouse', 'Terreno'
      sector TEXT NOT NULL,
      microzone TEXT,
      address TEXT,
      area_build REAL NOT NULL,
      area_lot REAL,
      bedrooms INTEGER NOT NULL DEFAULT 1,
      bathrooms REAL NOT NULL DEFAULT 1,
      parking INTEGER NOT NULL DEFAULT 1,
      hoa_fee REAL DEFAULT 0,
      elevation REAL DEFAULT 2200,
      temperature TEXT,
      image TEXT NOT NULL,
      sub_photos_json TEXT NOT NULL DEFAULT '[]',
      features_json TEXT NOT NULL DEFAULT '{}',
      legal_status TEXT,
      agent_json TEXT NOT NULL DEFAULT '{}',
      logistics_json TEXT NOT NULL DEFAULT '{}',
      lat REAL,
      lng REAL,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_properties_sector ON properties(sector);
    CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
    CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
    CREATE INDEX IF NOT EXISTS idx_properties_operation ON properties(operation);
  `);

  // 6. Table: User Favorites (Saved Properties)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_favorites (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      PRIMARY KEY (user_id, property_id)
    );
  `);

  // 7. Table: Price Alerts
  db.exec(`
    CREATE TABLE IF NOT EXISTS price_alerts (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      email TEXT NOT NULL,
      property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
      search_criteria_json TEXT,
      target_price REAL,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed Data if membership_plans is empty
  const planCountStmt = db.prepare('SELECT COUNT(*) as count FROM membership_plans');
  const planCount = (planCountStmt.get() as { count: number }).count;

  if (planCount === 0) {
    seedInitialData();
  }
}

function seedInitialData() {
  console.log('[DB] Seeding initial data (plans, demo users, properties)...');

  // 1. Seed Membership Plans matching Word document ($29, $49, $99)
  const insertPlan = db.prepare(`
    INSERT INTO membership_plans (id, code, name, monthly_price_usd, annual_price_usd, max_active_listings, featured_tokens, has_video_reels, has_ai_guardian_priority, features_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertPlan.run(
    'plan-free',
    'FREE',
    'Particular / Comprador',
    0.0,
    0.0,
    1,
    0,
    0,
    0,
    JSON.stringify([
      '1 publicación básica',
      'Búsqueda con filtros Quito & Metro',
      'Calculadora hipotecaria BIESS',
      'Guardado de favoritos'
    ])
  );

  insertPlan.run(
    'plan-pro',
    'PRO_AGENT',
    'Agente Inmobiliario Pro ($49/3 meses)',
    49.0,
    149.0,
    15,
    3,
    1,
    1,
    JSON.stringify([
      'Hasta 15 propiedades simultáneas',
      'Feed vertical de videos 9:16 (Estilo TikTok)',
      'Sello de verificación notarial express DMQ',
      'Auditoría prioritaria con Bot Guardián IA',
      '3 destaques en mapa de Quito y valles'
    ])
  );

  insertPlan.run(
    'plan-vip',
    'VIP_INMOBILIARIA',
    'Inmobiliaria & Constructora ($99/3 meses)',
    99.0,
    299.0,
    40,
    10,
    1,
    1,
    JSON.stringify([
      'Hasta 40 publicaciones de proyectos',
      'Videos y tours virtuales 3D ilimitados',
      'CRM de leads con integración WhatsApp Concierge',
      'Banner patrocinado en Cumbayá y La Carolina',
      'Métricas avanzadas de visualización e intención de compra'
    ])
  );

  // 2. Seed Demo Users with Bcrypt Hashes (Salt = 12)
  const insertUser = db.prepare(`
    INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, license_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const agentPassHash = bcrypt.hashSync('Quito2026!Premier', CONFIG.BCRYPT_SALT_ROUNDS);
  const buyerPassHash = bcrypt.hashSync('Inversiones2026!', CONFIG.BCRYPT_SALT_ROUNDS);
  const adminPassHash = bcrypt.hashSync('AdminSuper2026!', CONFIG.BCRYPT_SALT_ROUNDS);

  // Mateo Serrano (Agent Pro)
  const agentId = 'usr-mateo-serrano-001';
  insertUser.run(
    agentId,
    'mateo.serrano@valleyurbe.ec',
    agentPassHash,
    'Ing. Mateo Serrano',
    '+593 99 876 5432',
    'AGENT',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    1,
    'Valle & Urbe Patrimonial Cumbayá',
    'Lic. Registro Notarial #0492 DMQ'
  );

  // Sofia Carrillo (Buyer)
  const buyerId = 'usr-sofia-carrillo-002';
  insertUser.run(
    buyerId,
    'sofia.carrillo@investor.ec',
    buyerPassHash,
    'Dra. Sofía Carrillo',
    '+593 98 123 4567',
    'BUYER',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    1,
    'Inversiones Andinas',
    null
  );

  // Super Admin
  const adminId = 'usr-admin-central-003';
  insertUser.run(
    adminId,
    'admin@propiedadespremier.ec',
    adminPassHash,
    'Admin Central DMQ',
    '+593 2 399 9000',
    'SUPER_ADMIN',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    1,
    'Propiedades Premier Tech Admin',
    'Registro Metropolitano Central'
  );

  // 3. Assign Pro Subscription to Mateo Serrano
  const insertSub = db.prepare(`
    INSERT INTO user_subscriptions (id, user_id, plan_id, status, current_period_start, current_period_end, auto_renew, used_listings, payment_method)
    VALUES (?, ?, ?, ?, datetime('now'), datetime('now', '+1 year'), 1, ?, 'CREDIT_CARD')
  `);
  insertSub.run('sub-mateo-001', agentId, 'plan-pro', 'ACTIVE', 4);

  // 4. Seed Properties from PROPERTIES dataset
  const insertProp = db.prepare(`
    INSERT INTO properties (
      id, code, title, description, price, operation, property_type, sector, microzone,
      area_build, area_lot, bedrooms, bathrooms, parking, hoa_fee, elevation, temperature,
      image, sub_photos_json, features_json, legal_status, agent_json, logistics_json,
      lat, lng, user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of PROPERTIES) {
    insertProp.run(
      p.id,
      p.id,
      p.title,
      p.description,
      p.price,
      p.price < 5000 ? 'RENTA' : 'VENTA',
      p.type,
      p.sector,
      p.microzone,
      p.areaBuild,
      p.areaLot || null,
      p.bedrooms,
      p.bathrooms,
      p.parking,
      p.hoaFee,
      p.elevation,
      p.temperature,
      p.image,
      JSON.stringify(p.subPhotos || []),
      JSON.stringify(p.features),
      p.legalStatus,
      JSON.stringify(p.agent),
      JSON.stringify(p.logistics),
      // Approximate geographic coordinates for Quito sectors
      p.sector === 'Cumbayá' ? -0.201 : p.sector === 'Puembo' ? -0.185 : p.sector === 'La Carolina' ? -0.181 : -0.215,
      p.sector === 'Cumbayá' ? -78.435 : p.sector === 'Puembo' ? -78.365 : p.sector === 'La Carolina' ? -78.484 : -78.480,
      agentId
    );
  }

  console.log(`[DB] Successfully seeded ${PROPERTIES.length} properties, 3 users, and 3 plans.`);
}
