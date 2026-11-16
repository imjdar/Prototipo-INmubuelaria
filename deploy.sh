#!/usr/bin/env bash
# ==============================================================================
# PROPIEDADES PREMIER - SCRIPT DE DESPLIEGUE AUTOMATIZADO EN PRODUCCIÓN (VPS)
# ==============================================================================

set -euo pipefail

echo "===================================================================="
echo "🚀 PROPIEDADES PREMIER - DESPLIEGUE EN PRODUCCIÓN (DOCKER / VPS)"
echo "===================================================================="

# 1. Verificar presencia de Docker y Docker Compose
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker no está instalado en este sistema."
    echo "👉 Instala Docker ejecutando: curl -fsSL https://get.docker.com | sh"
    exit 1
fi

DOCKER_COMPOSE_CMD=""
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    echo "❌ Error: Docker Compose plugin no encontrado."
    exit 1
fi

echo "✅ Docker y Docker Compose verificados correctamente."

# 2. Verificar existencia de variables de entorno (.env)
if [ ! -f .env ]; then
    echo "⚠️ Archivo .env no encontrado. Generando a partir de .env.example..."
    cp .env.example .env
    # Generar JWT_SECRET criptográfico seguro
    SECRET=$(openssl rand -base64 48 | tr -dc 'a-zA-Z0-9' | head -c 64)
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=${SECRET}/" .env || true
    echo "🔒 JWT_SECRET aleatorio generado con alta entropía."
fi

# 3. Determinar modo de despliegue (Standard con SQLite o Enterprise con Postgres)
COMPOSE_FILE="docker-compose.yml"
if [ "${1:-}" == "--enterprise" ] || [ "${DATABASE_TYPE:-}" == "postgres" ]; then
    COMPOSE_FILE="docker-compose.prod.yml"
    echo "🐘 Modo Enterprise seleccionado (PostgreSQL 16 + PostGIS + Redis)."
else
    echo "📦 Modo Standard seleccionado (Nginx + Node Cluster + Persistencia SQLite)."
fi

# 4. Construcción y levantamiento de contenedores
echo "🔨 Compilando imágenes Docker de producción..."
$DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" build

echo "🚀 Iniciando servicios en segundo plano (daemon)..."
$DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" up -d

# 5. Esperar a que los healthchecks respondan
echo "⏳ Verificando disponibilidad y salud de los contenedores..."
sleep 5

$DOCKER_COMPOSE_CMD -f "$COMPOSE_FILE" ps

echo "===================================================================="
echo "🎉 ¡DESPLIEGUE EXITOSO! Todos los servicios están en ejecución."
echo "🌐 Frontend / Nginx:  http://localhost:${FRONTEND_PORT:-8080}"
echo "📡 Backend Core API: http://localhost:${BACKEND_PORT:-4001}/api/v1/health"
echo "===================================================================="
