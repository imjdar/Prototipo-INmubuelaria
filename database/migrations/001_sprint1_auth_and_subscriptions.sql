-- ========================================================================
-- PROPIEDADES PREMIER / VALLE & URBE — MIGRACIÓN DDL SPRINT 1
-- PRO-006: Modelos de Usuarios, Autenticación RBAC y Planes de Membresía
-- Base de Datos Objetivo: PostgreSQL 16 con PostGIS
-- ========================================================================

-- 1. Extensiones requeridas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Tipos Enumerados (Enums)
DO $$ BEGIN
    CREATE TYPE user_role_enum AS ENUM ('SUPER_ADMIN', 'AGENT', 'BUYER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_status_enum AS ENUM ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'EXPIRED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE oauth_provider_enum AS ENUM ('LOCAL', 'GOOGLE', 'APPLE', 'FACEBOOK');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Tabla de Usuarios (users)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255), -- NULL si el usuario se registró exclusivamente por OAuth
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    role user_role_enum NOT NULL DEFAULT 'BUYER',
    avatar_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    company_name VARCHAR(150),
    license_number VARCHAR(100), -- Licencia notarial o registro inmobiliario DMQ
    auth_provider oauth_provider_enum NOT NULL DEFAULT 'LOCAL',
    provider_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 4. Tabla de Planes de Membresía (membership_plans)
CREATE TABLE IF NOT EXISTS membership_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE, -- 'FREE', 'PRO_AGENT', 'VIP_INMOBILIARIA'
    name VARCHAR(100) NOT NULL,
    monthly_price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    annual_price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    max_active_listings INT NOT NULL DEFAULT 1,
    featured_tokens INT NOT NULL DEFAULT 0,
    has_video_reels BOOLEAN NOT NULL DEFAULT FALSE,
    has_ai_guardian_priority BOOLEAN NOT NULL DEFAULT FALSE,
    features_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Suscripciones de Usuarios (user_subscriptions)
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES membership_plans(id) ON DELETE RESTRICT,
    status subscription_status_enum NOT NULL DEFAULT 'ACTIVE',
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    auto_renew BOOLEAN NOT NULL DEFAULT TRUE,
    used_listings INT NOT NULL DEFAULT 0,
    payment_method VARCHAR(50) DEFAULT 'NONE',
    external_subscription_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON user_subscriptions(status);

-- 6. Tabla de Refresh Tokens con Rotación (PRO-009)
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    replaced_by_token_id UUID,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash ON refresh_tokens(token_hash);

-- 7. Datos Semilla Iniciales (Seed Data)
INSERT INTO membership_plans (code, name, monthly_price_usd, annual_price_usd, max_active_listings, featured_tokens, has_video_reels, has_ai_guardian_priority, features_json)
VALUES 
    ('FREE', 'Particular / Comprador', 0.00, 0.00, 1, 0, false, false, 
     '["1 publicación básica sin costo", "Búsqueda con filtros Quito & Metro", "Calculadora hipotecaria BIESS", "Guardado de favoritos"]'::jsonb),
    ('PRO_AGENT', 'Agente Inmobiliario Pro', 39.00, 390.00, 15, 3, true, true, 
     '["Hasta 15 propiedades simultáneas", "Feed vertical de videos 9:16 (TikTok style)", "Sello de verificación notarial express", "Auditoría prioritaria con Bot Guardián IA", "3 destaques en mapa de Quito y valles"]'::jsonb),
    ('VIP_INMOBILIARIA', 'Inmobiliaria & Constructora VIP', 119.00, 1190.00, 100, 15, true, true, 
     '["Hasta 100 publicaciones de proyectos", "Videos y tours virtuales 3D ilimitados", "CRM de leads con integración WhatsApp Concierge", "Banner patrocinado en Cumbayá y La Carolina", "Métricas avanzadas de visualización e intención de compra"]'::jsonb)
ON CONFLICT (code) DO NOTHING;

-- Usuario Demo 1: Agente Inmobiliario Pro
INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, license_number, auth_provider)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'mateo.serrano@valleyurbe.ec',
    crypt('Quito2026!Premier', gen_salt('bf')),
    'Ing. Mateo Serrano',
    '+593 99 876 5432',
    'AGENT',
    'https://lh3.googleusercontent.com/aida/AEtjO1UghQGMZGWEGb950y5APxXYS_EBQYI9_iTaKsqy3WK4abgZR03Jeodd8Uaskpr-ePf_Y86wzAGLTXCf3zi77uRx_FmHA2A58J_eOg6P08HiyhzpS9Xd2VfiMsvGEjVD1W5r5j3IbpD9CmTdjAM-9VzLPVPf4vMhWbhIPedKBVnzY0JZxqgGDTBbyRBYsQpzndRK3rGULIVibZ_vi06zxhKuOQfnOrUriA8thdhow_KWSygFWkGtZu8lCRs',
    TRUE,
    'Valle & Urbe Patrimonial Cumbayá',
    'Lic. Registro Notarial #0492 DMQ',
    'LOCAL'
) ON CONFLICT (email) DO NOTHING;

-- Usuario Demo 2: Inversionista / Compradora
INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, auth_provider)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'sofia.carrillo@investor.ec',
    crypt('Inversiones2026!', gen_salt('bf')),
    'Dra. Sofía Carrillo',
    '+593 98 123 4567',
    'BUYER',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    TRUE,
    'LOCAL'
) ON CONFLICT (email) DO NOTHING;

-- Usuario Demo 3: Super Administrador de la Plataforma
INSERT INTO users (id, email, password_hash, full_name, phone, role, avatar_url, is_verified, company_name, auth_provider)
VALUES (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'admin@propiedadespremier.ec',
    crypt('AdminSuper2026!', gen_salt('bf')),
    'Admin Central DMQ',
    '+593 2 399 9000',
    'SUPER_ADMIN',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    TRUE,
    'Propiedades Premier Tech Admin',
    'LOCAL'
) ON CONFLICT (email) DO NOTHING;

-- Asignar suscripción Pro al Agente Mateo Serrano
INSERT INTO user_subscriptions (user_id, plan_id, status, current_period_start, current_period_end, auto_renew, used_listings)
SELECT 
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    id,
    'ACTIVE',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP + INTERVAL '1 year',
    TRUE,
    4
FROM membership_plans WHERE code = 'PRO_AGENT'
ON CONFLICT DO NOTHING;
