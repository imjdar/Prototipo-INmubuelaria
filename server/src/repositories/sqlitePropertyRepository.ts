/**
 * PROPIEDADES PREMIER - SQLITE PROPERTY REPOSITORY
 * 
 * Implementación concreta del repositorio de propiedades para SQLite con modo WAL.
 * Cumple con:
 * - Single Responsibility Principle (SRP): Acceso a datos de propiedades exclusivo.
 * - Open/Closed Principle (OCP): Abierto a extensión mediante IPropertyRepository.
 * - Ciberseguridad: 100% de consultas parametrizadas contra inyección SQL.
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'crypto';
import { IPropertyRepository } from '../types/repository.types';
import {
  PropertyEntity,
  PropertyFilterQuery,
  CreatePropertyDTO,
  Sector,
  PropertyType,
  OperationType
} from '../types/domain.types';

export class SqlitePropertyRepository implements IPropertyRepository {
  constructor(private readonly db: DatabaseSync) {}

  /**
   * Mapea un registro plano de SQLite a la entidad de dominio fuertemente tipada.
   */
  private mapRowToEntity(row: any): PropertyEntity {
    return {
      id: row.id,
      code: row.code,
      title: row.title,
      description: row.description,
      price: Number(row.price),
      operation: row.operation as OperationType,
      propertyType: row.property_type as PropertyType,
      sector: row.sector as Sector,
      microzone: row.microzone || '',
      address: row.address || undefined,
      areaBuild: Number(row.area_build),
      areaLot: row.area_lot ? Number(row.area_lot) : undefined,
      bedrooms: Number(row.bedrooms),
      bathrooms: Number(row.bathrooms),
      parking: Number(row.parking),
      hoaFee: Number(row.hoa_fee || 0),
      elevation: Number(row.elevation || 2200),
      temperature: row.temperature || '20°C',
      image: row.image,
      subPhotos: JSON.parse(row.sub_photos_json || '[]'),
      features: JSON.parse(row.features_json || '{}'),
      legalStatus: row.legal_status || undefined,
      agent: row.agent_json ? JSON.parse(row.agent_json) : undefined,
      logistics: row.logistics_json ? JSON.parse(row.logistics_json) : undefined,
      lat: row.lat ? Number(row.lat) : undefined,
      lng: row.lng ? Number(row.lng) : undefined,
      userId: row.user_id || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  findById(id: string): PropertyEntity | null {
    const stmt = this.db.prepare('SELECT * FROM properties WHERE id = ?');
    const row = stmt.get(id);
    return row ? this.mapRowToEntity(row) : null;
  }

  findByCode(code: string): PropertyEntity | null {
    const stmt = this.db.prepare('SELECT * FROM properties WHERE code = ?');
    const row = stmt.get(code);
    return row ? this.mapRowToEntity(row) : null;
  }

  findMany(filters: PropertyFilterQuery): { properties: PropertyEntity[]; total: number } {
    const {
      sector,
      type,
      operation,
      minPrice,
      maxPrice,
      hasGenerator,
      hasMetro,
      biessEligible,
      q,
      sort = 'featured',
      page = 1,
      limit = 50
    } = filters;

    const pageNum = Math.max(1, page);
    const limitNum = Math.min(100, Math.max(1, limit));
    const offset = (pageNum - 1) * limitNum;

    const conditions: string[] = [];
    const params: any[] = [];

    if (sector && sector !== 'ALL') {
      conditions.push('sector = ?');
      params.push(sector);
    }

    if (type && type !== 'ALL') {
      conditions.push('property_type = ?');
      params.push(type);
    }

    if (operation && operation !== 'ALL') {
      conditions.push('operation = ?');
      params.push(operation);
    }

    if (minPrice !== undefined && !isNaN(minPrice)) {
      conditions.push('price >= ?');
      params.push(minPrice);
    }

    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      conditions.push('price <= ?');
      params.push(maxPrice);
    }

    // Buscador por texto completo (título, descripción, microzona)
    if (q && q.trim().length > 0) {
      conditions.push('(title LIKE ? OR description LIKE ? OR microzone LIKE ? OR sector LIKE ?)');
      const term = `%${q.trim()}%`;
      params.push(term, term, term, term);
    }

    // Filtros de atributos JSON (Generador 100%, Metro Quito, Apto BIESS)
    if (hasGenerator) {
      conditions.push("json_extract(features_json, '$.hasGenerator') = 1");
    }

    if (hasMetro) {
      conditions.push("json_extract(features_json, '$.hasMetro') = 1");
    }

    if (biessEligible) {
      conditions.push("json_extract(features_json, '$.biessEligible') = 1");
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Ordenamiento
    let orderByClause = 'ORDER BY created_at DESC';
    switch (sort) {
      case 'price-asc':
        orderByClause = 'ORDER BY price ASC';
        break;
      case 'price-desc':
        orderByClause = 'ORDER BY price DESC';
        break;
      case 'area-desc':
        orderByClause = 'ORDER BY area_build DESC';
        break;
      case 'efficiency':
        orderByClause = 'ORDER BY (price / area_build) ASC';
        break;
      case 'featured':
      default:
        orderByClause = 'ORDER BY created_at DESC';
        break;
    }

    // Consulta de conteo total
    const countQuery = `SELECT COUNT(*) as count FROM properties ${whereClause}`;
    const countStmt = this.db.prepare(countQuery);
    const countResult = (params.length > 0 ? countStmt.get(...params) : countStmt.get()) as { count: number };
    const total = countResult ? countResult.count : 0;

    // Consulta paginada
    const selectQuery = `SELECT * FROM properties ${whereClause} ${orderByClause} LIMIT ? OFFSET ?`;
    const selectStmt = this.db.prepare(selectQuery);
    const rows = (params.length > 0 ? selectStmt.all(...params, limitNum, offset) : selectStmt.all(limitNum, offset)) as any[];

    return {
      properties: rows.map(r => this.mapRowToEntity(r)),
      total
    };
  }

  create(data: CreatePropertyDTO, userId?: string): PropertyEntity {
    const id = `VU-${data.sector.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const code = id;

    // Generar coordenadas aproximadas según el sector de Quito
    let lat = -0.201;
    let lng = -78.435;
    if (data.sector === 'Puembo') { lat = -0.185; lng = -78.365; }
    else if (data.sector === 'La Carolina') { lat = -0.181; lng = -78.484; }
    else if (data.sector === 'González Suárez') { lat = -0.202; lng = -78.479; }
    else if (data.sector === 'Tumbaco') { lat = -0.215; lng = -78.405; }
    else if (data.sector === 'Nayón') { lat = -0.189; lng = -78.442; }

    const stmt = this.db.prepare(`
      INSERT INTO properties (
        id, code, title, description, price, operation, property_type, sector, microzone,
        address, area_build, area_lot, bedrooms, bathrooms, parking, hoa_fee, elevation,
        temperature, image, sub_photos_json, features_json, legal_status, lat, lng, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      code,
      data.title,
      data.description,
      data.price,
      data.operation,
      data.propertyType,
      data.sector,
      data.microzone || 'Sector Exclusivo',
      data.address || null,
      data.areaBuild,
      data.areaLot || null,
      data.bedrooms,
      data.bathrooms,
      data.parking ?? 1,
      data.hoaFee ?? 0,
      2200,
      '21°C',
      data.image,
      JSON.stringify(data.subPhotos || []),
      JSON.stringify(data.features || {}),
      data.legalStatus || 'Libre de gravamen y lista para escriturar ante Notario DMQ',
      lat,
      lng,
      userId || null
    );

    const created = this.findById(id);
    if (!created) {
      throw new Error('Fallo crítico al recuperar propiedad recién insertada.');
    }
    return created;
  }

  update(id: string, data: Partial<PropertyEntity>): PropertyEntity | null {
    const existing = this.findById(id);
    if (!existing) return null;

    const stmt = this.db.prepare(`
      UPDATE properties
      SET title = COALESCE(?, title),
          price = COALESCE(?, price),
          description = COALESCE(?, description),
          updated_at = datetime('now')
      WHERE id = ?
    `);

    stmt.run(data.title || null, data.price || null, data.description || null, id);
    return this.findById(id);
  }

  delete(id: string): boolean {
    const stmt = this.db.prepare('DELETE FROM properties WHERE id = ?');
    const res = stmt.run(id);
    return res.changes > 0;
  }

  countByUserId(userId: string): number {
    const stmt = this.db.prepare('SELECT COUNT(*) as count FROM properties WHERE user_id = ?');
    const result = stmt.get(userId) as { count: number };
    return result ? result.count : 0;
  }
}
