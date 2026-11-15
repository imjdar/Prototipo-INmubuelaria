/**
 * PROPIEDADES PREMIER - SQLITE FAVORITE REPOSITORY
 * 
 * Implementación concreta del repositorio de favoritos de usuario.
 * Garantiza aislamiento estricto por usuario y persistencia relacional.
 */

import { DatabaseSync } from 'node:sqlite';
import { IFavoriteRepository } from '../types/repository.types';
import { PropertyEntity } from '../types/domain.types';
import { SqlitePropertyRepository } from './sqlitePropertyRepository';

export class SqliteFavoriteRepository implements IFavoriteRepository {
  private propertyRepo: SqlitePropertyRepository;

  constructor(private readonly db: DatabaseSync) {
    this.propertyRepo = new SqlitePropertyRepository(db);
  }

  getUserFavoriteIds(userId: string): string[] {
    const stmt = this.db.prepare('SELECT property_id FROM user_favorites WHERE user_id = ? ORDER BY created_at DESC');
    const rows = stmt.all(userId) as { property_id: string }[];
    return rows.map(r => r.property_id);
  }

  getUserFavorites(userId: string): PropertyEntity[] {
    const ids = this.getUserFavoriteIds(userId);
    if (ids.length === 0) return [];

    const properties: PropertyEntity[] = [];
    for (const id of ids) {
      const prop = this.propertyRepo.findById(id);
      if (prop) properties.push(prop);
    }
    return properties;
  }

  addFavorite(userId: string, propertyId: string): boolean {
    try {
      const stmt = this.db.prepare(`
        INSERT OR IGNORE INTO user_favorites (user_id, property_id)
        VALUES (?, ?)
      `);
      const res = stmt.run(userId, propertyId);
      return res.changes > 0;
    } catch {
      return false;
    }
  }

  removeFavorite(userId: string, propertyId: string): boolean {
    const stmt = this.db.prepare('DELETE FROM user_favorites WHERE user_id = ? AND property_id = ?');
    const res = stmt.run(userId, propertyId);
    return res.changes > 0;
  }

  isFavorite(userId: string, propertyId: string): boolean {
    const stmt = this.db.prepare('SELECT 1 FROM user_favorites WHERE user_id = ? AND property_id = ?');
    return Boolean(stmt.get(userId, propertyId));
  }
}
