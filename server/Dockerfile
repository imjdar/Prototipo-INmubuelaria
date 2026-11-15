# ==============================================================================
# PROPIEDADES PREMIER - BACKEND DOCKERFILE (MULTI-STAGE)
# Runtime: Node.js 22 LTS Alpine (con soporte nativo para node:sqlite WAL)
# Ciberseguridad: Ejecución sin privilegios (non-root node user)
# ==============================================================================

# ------------------------------------------------------------------------------
# STAGE 1: Builder / Dependency Caching & Type Verification
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar manifiestos de paquetes
COPY package*.json ./

# Instalar dependencias exactas
RUN npm ci

# Copiar configuración y código fuente necesario para el backend
COPY tsconfig*.json ./
COPY server/ ./server/
COPY src/data/ ./src/data/
COPY src/types/ ./src/types/

# Verificar tipado estricto de TypeScript
RUN npx tsc -p tsconfig.server.json

# ------------------------------------------------------------------------------
# STAGE 2: Production Lean Runner
# ------------------------------------------------------------------------------
FROM node:22-alpine AS runner

WORKDIR /app

# Variables de entorno por defecto para producción
ENV NODE_ENV=production \
    PORT=4000 \
    DATABASE_PATH=/app/database/premier.db

# Crear directorio para volumen persistente de base de datos SQLite con permisos de escritura
RUN mkdir -p /app/database && chown -R node:node /app && chmod 777 /app/database

# Copiar dependencias y fuentes desde el builder
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/server ./server
COPY --from=builder --chown=node:node /app/src/data ./src/data
COPY --from=builder --chown=node:node /app/src/types ./src/types
COPY --from=builder --chown=node:node /app/tsconfig*.json ./

# Cambiar a usuario no-root por ciberseguridad (Principio de Menor Privilegio)
USER node

# Volumen para persistencia de la base de datos en el host
VOLUME ["/app/database"]

# Exponer puerto del API
EXPOSE 4000

# Healthcheck nativo para orquestación y Docker Compose
HEALTHCHECK --interval=20s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/api/v1/health || exit 1

# Iniciar servidor backend con npx tsx
CMD ["npx", "tsx", "server/src/index.ts"]
