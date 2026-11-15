/**
 * PROPIEDADES PREMIER - SQLITE USER REPOSITORY
 * 
 * Implementación concreta del repositorio de usuarios para SQLite.
 * Cumple con SRP (aislamiento de persistencia de usuarios) y OCP (implementa IUserRepository).
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'crypto';
import { IUserRepository } from '../types/repository.types';
import { UserEntity, RegisterUserDTO, UserRole } from '../types/domain.types';

export class SqliteUserRepository implements IUserRepository {
  constructor(private readonly db: DatabaseSync) {}

  private mapRowToEntity(row: any): UserEntity {
    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      fullName: row.full_name,
      phone: row.phone || null,
      role: row.role as UserRole,
      avatarUrl: row.avatar_url || null,
      isVerified: Boolean(row.is_verified),
      companyName: row.company_name || null,
      licenseNumber: row.license_number || null,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  findById(id: string): UserEntity | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE id = ?');
    const row = stmt.get(id);
    return row ? this.mapRowToEntity(row) : null;
  }

  findByEmail(email: string): UserEntity | null {
    const stmt = this.db.prepare('SELECT * FROM users WHERE email = ?');
    const row = stmt.get(email.toLowerCase().trim());
    return row ? this.mapRowToEntity(row) : null;
  }

  create(data: RegisterUserDTO, passwordHash: string, isVerified: boolean): UserEntity {
    const id = `usr-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const stmt = this.db.prepare(`
      INSERT INTO users (
        id, email, password_hash, full_name, phone, role, company_name, license_number, is_verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      data.email.toLowerCase().trim(),
      passwordHash,
      data.fullName.trim(),
      data.phone?.trim() || null,
      data.role || 'BUYER',
      data.companyName?.trim() || null,
      data.licenseNumber?.trim() || null,
      isVerified ? 1 : 0
    );

    const created = this.findById(id);
    if (!created) {
      throw new Error('Error al registrar usuario en la base de datos.');
    }
    return created;
  }

  update(id: string, data: Partial<UserEntity>): UserEntity | null {
    const existing = this.findById(id);
    if (!existing) return null;

    const stmt = this.db.prepare(`
      UPDATE users
      SET full_name = COALESCE(?, full_name),
          phone = COALESCE(?, phone),
          company_name = COALESCE(?, company_name),
          license_number = COALESCE(?, license_number),
          avatar_url = COALESCE(?, avatar_url),
          updated_at = datetime('now')
      WHERE id = ?
    `);

    stmt.run(
      data.fullName || null,
      data.phone || null,
      data.companyName || null,
      data.licenseNumber || null,
      data.avatarUrl || null,
      id
    );

    return this.findById(id);
  }

  delete(id: string): boolean {
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    const res = stmt.run(id);
    return res.changes > 0;
  }
}
