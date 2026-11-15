# ==============================================================================
# PROPIEDADES PREMIER - FRONTEND DOCKERFILE (MULTI-STAGE)
# Stage 1: Build React 19 + TypeScript + Vite SPA
# Stage 2: Serve with Ultra-Light Nginx Alpine & Gzip Reverse Proxy
# ==============================================================================

# ------------------------------------------------------------------------------
# STAGE 1: Build Stage
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependencias con caché de capas Docker
COPY package*.json ./
RUN npm ci

# Copiar código fuente y configuración de compilación
COPY tsconfig*.json vite.config.ts index.html ./
COPY public/ ./public/
COPY src/ ./src/

# Compilar SPA estática optimizada para producción
RUN npm run build:client

# ------------------------------------------------------------------------------
# STAGE 2: Production Nginx Server
# ------------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runner

# Copiar configuración optimizada de Nginx con soporte SPA y proxy /api/
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copiar bundle compilado de React
COPY --from=builder /app/dist /usr/share/nginx/html

# Asegurar permisos correctos
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Exponer puerto HTTP estándar
EXPOSE 80

# Healthcheck de disponibilidad de Nginx
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
