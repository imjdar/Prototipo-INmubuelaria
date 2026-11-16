#!/usr/bin/env bash
# ==============================================================================
# PROPIEDADES PREMIER - SCRIPT DE MONITOREO DE SALUD Y TELEMETRÍA (SRE / DEVOPS)
# ==============================================================================

set -euo pipefail

FRONTEND_URL="http://localhost:${FRONTEND_PORT:-8080}/health"
BACKEND_URL="http://localhost:${BACKEND_PORT:-4001}/api/v1/health"

echo "===================================================================="
echo "🩺 PROPIEDADES PREMIER - CHEQUEO DE SALUD Y DISPONIBILIDAD"
echo "   Fecha/Hora: $(date)"
echo "===================================================================="

# 1. Healthcheck Frontend / Nginx
echo -n "🌐 Verificando Frontend (Nginx Gateway): "
if curl -sf --max-time 5 "$FRONTEND_URL" > /dev/null; then
    echo "✅ OPERATIVO (HTTP 200)"
else
    echo "❌ ALERTA: Frontend no responde en $FRONTEND_URL"
fi

# 2. Healthcheck Backend API Cluster
echo -n "📡 Verificando Backend API Core: "
if curl -sf --max-time 5 "$BACKEND_URL" > /dev/null; then
    echo "✅ OPERATIVO (HTTP 200)"
else
    echo "❌ ALERTA: Backend no responde en $BACKEND_URL"
fi

# 3. Telemetría de Contenedores (CPU, Memoria y Límites)
echo ""
echo "📊 Consumo de Recursos en Contenedores:"
if command -v docker &> /dev/null && docker stats --no-stream &> /dev/null; then
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}"
elif command -v podman &> /dev/null; then
    podman stats --no-stream
else
    echo "ℹ️ Gestor de contenedores no disponible para métricas en tiempo real."
fi
