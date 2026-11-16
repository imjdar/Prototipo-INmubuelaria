-- ==============================================================================
-- PROPIEDADES PREMIER - POSTGRESQL 16 ENTERPRISE SCHEMA (WITH POSTGIS)
-- Arquitectura Relacional de Alta Concurrencia (MVCC), Integridad Notarial y GIS
-- ==============================================================================

-- 1. Extensiones Requeridas
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- PostGIS habilita cálculos geodésicos en microsegundos (distancias exactas a paradas del Metro)
-- CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Tabla: Usuarios & Roles (RBAC)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(32),
    role VARCHAR(32) NOT NULL DEFAULT 'BUYER', -- 'BUYER', 'AGENT', 'SUPER_ADMIN'
    avatar_url TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    company_name VARCHAR(255),
    license_number VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- 3. Tabla: Planes Oficiales de Membresía ($29, $49, $99 SRI)
CREATE TABLE IF NOT EXISTS membership_plans (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(32) NOT NULL UNIQUE, -- 'FREE', 'PRO_AGENT', 'VIP_INMOBILIARIA'
    name VARCHAR(255) NOT NULL,
    monthly_price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    annual_price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    max_active_listings INT NOT NULL DEFAULT 1,
    featured_tokens INT NOT NULL DEFAULT 0,
    has_video_reels BOOLEAN NOT NULL DEFAULT FALSE,
    has_ai_guardian_priority BOOLEAN NOT NULL DEFAULT FALSE,
    features_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla: Suscripciones de Usuarios
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id VARCHAR(64) NOT NULL REFERENCES membership_plans(id) ON DELETE RESTRICT,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'CANCELLED', 'PAST_DUE'
    current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    auto_renew BOOLEAN NOT NULL DEFAULT TRUE,
    used_listings INT NOT NULL DEFAULT 0,
    payment_method VARCHAR(64) DEFAULT 'NONE',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_subs_user ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subs_status ON user_subscriptions(status);

-- 5. Tabla: Propiedades Inmobiliarias Curadas
CREATE TABLE IF NOT EXISTS properties (
    id VARCHAR(64) PRIMARY KEY,
    code VARCHAR(64) NOT NULL UNIQUE, -- Código notarial (ej. VU-CUM-048)
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    operation VARCHAR(16) NOT NULL DEFAULT 'VENTA', -- 'VENTA', 'RENTA', 'PROYECTO'
    property_type VARCHAR(32) NOT NULL,
    sector VARCHAR(64) NOT NULL,
    microzone VARCHAR(128) NOT NULL,
    area_build NUMERIC(10, 2) NOT NULL,
    area_lot NUMERIC(10, 2),
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms NUMERIC(4, 1) NOT NULL DEFAULT 1.0,
    parking INT NOT NULL DEFAULT 1,
    hoa_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    elevation INT NOT NULL DEFAULT 2800,
    temperature VARCHAR(64) NOT NULL DEFAULT '18°C',
    image TEXT NOT NULL,
    sub_photos_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    features_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    legal_status TEXT NOT NULL,
    agent_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    logistics_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    lat NUMERIC(10, 7) NOT NULL,
    lng NUMERIC(10, 7) NOT NULL,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_properties_sector ON properties(sector);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_operation ON properties(operation);
CREATE INDEX IF NOT EXISTS idx_properties_features ON properties USING GIN (features_json);
CREATE INDEX IF NOT EXISTS idx_properties_coords ON properties(lat, lng);

-- 6. Tabla: Favoritos de Compradores
CREATE TABLE IF NOT EXISTS user_favorites (
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id VARCHAR(64) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, property_id)
);

-- 7. Tabla: Tokens de Refresco Revocables (Seguridad de Sesión)
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refresh_token_hash ON refresh_tokens(token_hash);

-- 8. Tabla: Facturación Electrónica SRI
CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(64) PRIMARY KEY,
    invoice_number VARCHAR(32) NOT NULL UNIQUE,
    user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    subscription_id VARCHAR(64) REFERENCES user_subscriptions(id) ON DELETE SET NULL,
    plan_name VARCHAR(128) NOT NULL,
    subtotal_usd NUMERIC(10, 2) NOT NULL,
    vat_rate NUMERIC(4, 2) NOT NULL DEFAULT 0.15,
    vat_amount_usd NUMERIC(10, 2) NOT NULL,
    total_amount_usd NUMERIC(10, 2) NOT NULL,
    ruc_cedula VARCHAR(32) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    authorization_number VARCHAR(64) NOT NULL,
    access_key VARCHAR(64) NOT NULL UNIQUE,
    sri_status VARCHAR(32) NOT NULL DEFAULT 'AUTORIZADO',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Tabla: Reseñas Verificadas de Agentes
CREATE TABLE IF NOT EXISTS agent_reviews (
    id VARCHAR(64) PRIMARY KEY,
    agent_id VARCHAR(64) NOT NULL,
    author_name VARCHAR(128) NOT NULL,
    author_role VARCHAR(64) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    comment TEXT NOT NULL,
    sector VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
