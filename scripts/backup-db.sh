#!/usr/bin/env bash
# ==============================================================================
# PROPIEDADES PREMIER - SCRIPT AUTOMATIZADO DE BACKUP DE BASE DE DATOS (DEVOPS)
# Soporta: SQLite WAL Mode & PostgreSQL 16 + PostGIS
# Retención: 7 días de respaldos con compresión gzip y rotación automática
# ==============================================================================

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-./backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
RETENTION_DAYS=7

mkdir -p "$BACKUP_DIR"

echo "===================================================================="
echo "💾 INICIANDO BACKUP DE SEGURIDAD - PROPIEDADES PREMIER ($TIMESTAMP)"
echo "===================================================================="

CONTAINER_CLI="docker"
if ! command -v docker &> /dev/null || ! docker ps &> /dev/null; then
    if command -v podman &> /dev/null; then
        CONTAINER_CLI="podman"
    fi
fi

# 1. Respaldo de SQLite (si existe contenedor o archivo)
if $CONTAINER_CLI ps --format '{{.Names}}' | grep -q "premier-backend"; then
    echo "📦 Respaldando base de datos SQLite desde contenedor premier-backend..."
    SQLITE_BACKUP_FILE="${BACKUP_DIR}/premier_sqlite_${TIMESTAMP}.db"
    
    # Copia segura atómica desde el volumen Docker
    if $CONTAINER_CLI cp premier-backend:/app/database/premier.db "${SQLITE_BACKUP_FILE}" 2>/dev/null; then
        gzip -f "${SQLITE_BACKUP_FILE}"
        echo "✅ Respaldo SQLite guardado y comprimido: ${SQLITE_BACKUP_FILE}.gz"
    else
        echo "ℹ️ No se encontró base de datos SQLite activa en el contenedor."
    fi
fi

# 2. Respaldo de PostgreSQL 16 (si el contenedor postgres está en ejecución)
if $CONTAINER_CLI ps --format '{{.Names}}' | grep -q "premier-postgres"; then
    echo "🐘 Respaldando base de datos PostgreSQL desde contenedor premier-postgres..."
    PG_BACKUP_FILE="${BACKUP_DIR}/premier_postgres_${TIMESTAMP}.sql.gz"
    
    $CONTAINER_CLI exec premier-postgres pg_dump -U "${POSTGRES_USER:-premier_admin}" -d "${POSTGRES_DB:-premier_production}" | gzip > "${PG_BACKUP_FILE}"
    echo "✅ Respaldo PostgreSQL guardado y comprimido: ${PG_BACKUP_FILE}"
fi

# 3. Política de Rotación: Eliminar copias de seguridad de más de 7 días
echo "🧹 Aplicando política de retención (${RETENTION_DAYS} días)..."
find "$BACKUP_DIR" -type f -name "premier_*.gz" -mtime +"$RETENTION_DAYS" -exec rm -f {} \; -print || true

echo "🎉 Respaldo completado exitosamente."
ls -lh "$BACKUP_DIR"
