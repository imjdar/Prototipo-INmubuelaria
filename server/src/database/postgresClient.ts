/**
 * PROPIEDADES PREMIER - POSTGRESQL CONNECTION POOL
 * 
 * Gestiona el pool de conexiones hacia PostgreSQL 16 con manejo de timeouts,
 * reconexión automática y soporte para SSL/TLS.
 */

import pg from 'pg';

const { Pool } = pg;

export class PostgresClient {
  private static instance: PostgresClient;
  private pool: pg.Pool | null = null;

  private constructor() {}

  public static getInstance(): PostgresClient {
    if (!PostgresClient.instance) {
      PostgresClient.instance = new PostgresClient();
    }
    return PostgresClient.instance;
  }

  public getPool(): pg.Pool {
    if (!this.pool) {
      const connectionString = process.env.DATABASE_URL || 'postgresql://premier:premier_secure_password_2026@localhost:5432/premier_db';
      
      this.pool = new Pool({
        connectionString,
        max: parseInt(process.env.PG_MAX_POOL || '25', 10), // 25 conexiones concurrentes por proceso
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
        ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false
      });

      this.pool.on('error', (err) => {
        console.error('⚠️ [POSTGRES ERROR] Error inesperado en el pool inactivo:', err.message);
      });
    }

    return this.pool;
  }

  public async query<T extends pg.QueryResultRow = any>(text: string, params?: any[]): Promise<pg.QueryResult<T>> {
    const pool = this.getPool();
    const start = Date.now();
    try {
      const res = await pool.query<T>(text, params);
      const duration = Date.now() - start;
      if (process.env.DEBUG_SQL === 'true') {
        console.log(`[SQL] ${text.substring(0, 60)}... (${duration}ms)`);
      }
      return res;
    } catch (err: any) {
      console.error(`[SQL ERROR] en consulta "${text.substring(0, 80)}":`, err.message);
      throw err;
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      const res = await this.query('SELECT 1 as alive;');
      return res.rows[0]?.alive === 1;
    } catch {
      return false;
    }
  }

  public async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}

export const pgClient = PostgresClient.getInstance();
