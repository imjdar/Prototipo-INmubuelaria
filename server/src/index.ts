import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CONFIG } from './config/constants';
import { initializeDatabase } from './database/db';
import apiRouter from './routes';
import { generalRateLimiter, errorHandler } from './middleware/security';

export function createApp(): express.Application {
  // Initialize Database Schema and Seeds
  initializeDatabase();

  const app = express();

  // 1. Cybersecurity: Helmet Security Headers (CSP, HSTS, X-Frame-Options, No-Sniff)
  app.use(helmet({
    contentSecurityPolicy: false, // Managed per frontend requirements
    crossOriginEmbedderPolicy: false
  }));

  // 2. Cybersecurity: CORS Protection
  app.use(cors({
    origin: CONFIG.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

  // 3. Request Parsing with payload size limit (Defense against payload bombing)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Rate Limiting Protection
  app.use('/api', generalRateLimiter);

  // 5. Mount API v1 Routes
  app.use('/api/v1', apiRouter);

  // 6. 404 Route Handler
  app.use((_req, res) => {
    res.status(404).json({
      success: false,
      error: 'ENDPOINT_NO_ENCONTRADO',
      message: 'La ruta solicitada no existe en la API de Propiedades Premier.'
    });
  });

  // 7. Global Error Handler
  app.use(errorHandler);

  return app;
}

// Start Server if executed directly
if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  app.listen(CONFIG.PORT, () => {
    console.log(`=======================================================`);
    console.log(`🚀 PROPIEDADES PREMIER - BACKEND CORE API v1.0.0`);
    console.log(`🔒 Ciberseguridad: Helmet, Bcrypt (12), JWT, Rate Limiting`);
    console.log(`💾 Base de Datos: SQLite WAL Mode / SQL Prepared Queries`);
    console.log(`📡 URL Local: http://localhost:${CONFIG.PORT}/api/v1/health`);
    console.log(`=======================================================`);
  });
}
