/**
 * PROPIEDADES PREMIER - SQLITE REFRESH TOKEN REPOSITORY
 * 
 * Implementación de persistencia y rotación de tokens de actualización (OWASP Session Management).
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'crypto';
import { IRefreshTokenRepository } from '../types/repository.types';

export class SqliteRefreshTokenRepository implements IRefreshTokenRepository {
  constructor(private readonly db: DatabaseSync) {}

  save(userId: string, tokenHash: string, expiresAt: Date, ipAddress?: string, userAgent?: string): void {
    const id = `rt-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const stmt = this.db.prepare(`
      INSERT INTO refresh_tokens (id, user_id, token_hash, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, userId, tokenHash, expiresAt.toISOString(), ipAddress || null, userAgent || null);
  }

  findByHash(tokenHash: string): { id: string; userId: string; expiresAt: string; revokedAt: string | null } | null {
    const stmt = this.db.prepare('SELECT id, user_id as userId, expires_at as expiresAt, revoked_at as revokedAt FROM refresh_tokens WHERE token_hash = ?');
    const row = stmt.get(tokenHash) as any;
    return row || null;
  }

  revokeByHash(tokenHash: string): boolean {
    const stmt = this.db.prepare("UPDATE refresh_tokens SET revoked_at = datetime('now') WHERE token_hash = ? AND revoked_at IS NULL");
    const res = stmt.run(tokenHash);
    return res.changes > 0;
  }

  revokeAllForUser(userId: string): boolean {
    const stmt = this.db.prepare("UPDATE refresh_tokens SET revoked_at = datetime('now') WHERE user_id = ? AND revoked_at IS NULL");
    const res = stmt.run(userId);
    return res.changes > 0;
  }
}
