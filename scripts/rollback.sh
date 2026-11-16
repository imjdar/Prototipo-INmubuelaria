#!/usr/bin/env bash
# ==============================================================================
# PROPIEDADES PREMIER - SCRIPT DE ROLLBACK DE EMERGENCIA EN PRODUCCIÓN (DEVOPS)
# ==============================================================================

set -euo pipefail

echo "===================================================================="
echo "⚠️ INICIANDO PROCEDIMIENTO DE ROLLBACK DE EMERGENCIA"
echo "===================================================================="

# 1. Obtener commit anterior estable
PREVIOUS_COMMIT="${1:-HEAD~1}"

echo "🔄 Revirtiendo repositorio al commit: $PREVIOUS_COMMIT..."
git checkout "$PREVIOUS_COMMIT"

# 2. Reconstruir contenedores de inmediato
echo "🔨 Reconstruyendo imágenes con la versión estable anterior..."
docker compose build

echo "🚀 Reiniciando servicios con cero tiempo de caída..."
docker compose up -d

# 3. Validar salud de la versión anterior
sleep 5
echo "🩺 Validando disponibilidad post-rollback..."
if curl -sf http://localhost:${FRONTEND_PORT:-8080}/health > /dev/null; then
    echo "✅ ROLLBACK EXITOSO: El sistema volvió a la versión estable anterior sin caídas."
else
    echo "❌ ERROR: El rollback no superó el healthcheck. Revisa 'docker compose logs'."
fi
