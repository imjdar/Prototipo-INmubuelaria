/**
 * PROPIEDADES PREMIER - POSTGRESQL INITIALIZER & SEEDER
 * 
 * Aplica el esquema SQL (DDL) y puebla el catálogo con las 32 propiedades,
 * planes oficiales SRI y usuarios con hashes Bcrypt (salt = 12).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import { pgClient } from './postgresClient';
import { PROPERTIES } from '../../../src/data/properties';
import { CONFIG } from '../config/constants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializePostgresDatabase(): Promise<void> {
  console.log('[POSTGRES] Inicializando esquema DDL de PostgreSQL 16...');
  
  // 1. Ejecutar Schema DDL
  const schemaPath = path.resolve(__dirname, 'postgresSchema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  await pgClient.query(schemaSql);

  // 2. Verificar si ya hay datos
  const existingProps = await pgClient.query('SELECT COUNT(*) as count FROM properties;');
  if (parseInt(existingProps.rows[0].count, 10) > 0) {
    console.log(`[POSTGRES] Base de datos ya cuenta con ${existingProps.rows[0].count} propiedades. Se omite el re-seeding.`);
    return;
  }

  console.log('[POSTGRES] Sembrando datos maestros iniciales...');

  // 3. Sembrar Planes de Membresía
  const plans = [
    {
      id: 'plan-free',
      code: 'FREE',
      name: 'Plan Comprador Gratuito',
      monthly: 0.0,
      annual: 0.0,
      listings: 1,
      tokens: 0,
      video: false,
      priority: false,
      features: ['Búsqueda y filtros hiperlocales', 'Calculadora notarial DMQ y BIESS', 'Contacto WhatsApp directo']
    },
    {
      id: 'plan-pro',
      code: 'PRO_AGENT',
      name: 'Plan Agente Pro ($49/mes)',
      monthly: 49.0,
      annual: 490.0,
      listings: 15,
      tokens: 3,
      video: true,
      priority: true,
      features: ['Hasta 15 publicaciones activas', 'Videos verticales 9:16', 'Auditoría con Bot IA Notarial', 'Insignia de Agente Verificado']
    },
    {
      id: 'plan-vip',
      code: 'VIP_INMOBILIARIA',
      name: 'Plan Inmobiliaria & Constructora ($99/3 meses)',
      monthly: 99.0,
      annual: 299.0,
      listings: 40,
      tokens: 10,
      video: true,
      priority: true,
      features: ['Hasta 40 proyectos', 'Videos y tours 3D', 'CRM de leads WhatsApp Concierge', 'Banner destacado']
    }
  ];

  for (const pl of plans) {
    await pgClient.query(
      `INSERT INTO membership_plans (id, code, name, monthly_price_usd, annual_price_usd, max_active_listings, featured_tokens, has_video_reels, has_ai_guardian_priority, features_json)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (code) DO NOTHING;`,
      [pl.id, pl.code, pl.name, pl.monthly, pl.annual, pl.listings, pl.tokens, pl.video, pl.priority, JSON.stringify(pl.features)]
    );
  }

  // 4. Sembrar Usuarios con Hashes Bcrypt
  const agentPassHash = await bcrypt.hash('Quito2026!Premier', CONFIG.BCRYPT_SALT_ROUNDS);
  const buyerPassHash = await bcrypt.hash('Inversiones2026!', CONFIG.BCRYPT_SALT_ROUNDS);
  const adminPassHash = await bcrypt.hash('AdminSuper2026!', CONFIG.BCRYPT_SALT_ROUNDS);

  const agentId = 'usr-mateo-serrano-001';
  await pgClient.query(
    `INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, license_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (email) DO NOTHING;`,
    [
      agentId,
      'mateo.serrano@valleyurbe.ec',
      agentPassHash,
      'Ing. Mateo Serrano',
      '+593 99 876 5432',
      'AGENT',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      true,
      'Valle & Urbe Patrimonial Cumbayá',
      'Lic. Registro Notarial #0492 DMQ'
    ]
  );

  await pgClient.query(
    `INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, license_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (email) DO NOTHING;`,
    [
      'usr-sofia-carrillo-002',
      'sofia.carrillo@investor.ec',
      buyerPassHash,
      'Dra. Sofía Carrillo',
      '+593 98 123 4567',
      'BUYER',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      true,
      'Inversiones Andinas',
      null
    ]
  );

  await pgClient.query(
    `INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, license_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (email) DO NOTHING;`,
    [
      'usr-admin-central-003',
      'admin@propiedadespremier.ec',
      adminPassHash,
      'Admin Central DMQ',
      '+593 2 399 9000',
      'SUPER_ADMIN',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      true,
      'Propiedades Premier Tech Admin',
      'Registro Metropolitano Central'
    ]
  );

  // Suscripción de Mateo Serrano
  await pgClient.query(
    `INSERT INTO user_subscriptions (id, user_id, plan_id, status, current_period_start, current_period_end, auto_renew, used_listings, payment_method)
     VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 year', TRUE, 4, 'CREDIT_CARD')
     ON CONFLICT (id) DO NOTHING;`,
    ['sub-mateo-001', agentId, 'plan-pro', 'ACTIVE']
  );

  // 5. Sembrar las 32 Propiedades
  for (const p of PROPERTIES) {
    await pgClient.query(
      `INSERT INTO properties (
        id, code, title, description, price, operation, property_type, sector, microzone,
        area_build, area_lot, bedrooms, bathrooms, parking, hoa_fee, elevation, temperature,
        image, sub_photos_json, features_json, legal_status, agent_json, logistics_json,
        lat, lng, user_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26)
      ON CONFLICT (id) DO NOTHING;`,
      [
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
        p.coordinates?.lat ?? -0.201,
        p.coordinates?.lng ?? -78.435,
        agentId
      ]
    );
  }

  console.log(`[POSTGRES] Inicialización completada: 32 propiedades, 3 usuarios y 3 planes sembrados con éxito.`);
}
