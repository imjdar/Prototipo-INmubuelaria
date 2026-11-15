import { Request, Response } from 'express';
import crypto from 'crypto';
import { z } from 'zod';
import { db } from '../database/db';

export const propertyFilterSchema = {
  query: z.object({
    sector: z.string().optional(),
    type: z.string().optional(),
    operation: z.enum(['VENTA', 'RENTA', 'ALL']).optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    hasGenerator: z.string().optional(),
    hasMetro: z.string().optional(),
    biessEligible: z.string().optional(),
    q: z.string().optional(),
    sort: z.enum(['featured', 'price-asc', 'price-desc', 'area-desc', 'efficiency']).optional(),
    page: z.string().optional(),
    limit: z.string().optional()
  })
};

export const createPropertySchema = {
  body: z.object({
    title: z.string().min(5, 'El título debe tener al menos 5 caracteres.'),
    description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres.'),
    price: z.number().positive('El precio debe ser un número positivo.'),
    operation: z.enum(['VENTA', 'RENTA']),
    propertyType: z.enum(['Casa', 'Suite', 'Penthouse', 'Terreno']),
    sector: z.enum(['Cumbayá', 'Puembo', 'González Suárez', 'La Carolina', 'Tumbaco', 'Nayón']),
    microzone: z.string().optional(),
    address: z.string().optional(),
    areaBuild: z.number().positive('El área de construcción debe ser positiva.'),
    areaLot: z.number().optional(),
    bedrooms: z.number().int().min(0),
    bathrooms: z.number().min(1),
    parking: z.number().int().min(0).default(1),
    hoaFee: z.number().min(0).default(0),
    image: z.string().min(1, 'La imagen principal es requerida.'),
    subPhotos: z.array(z.string()).default([]),
    features: z.object({
      hasGenerator: z.boolean().default(false),
      hasMetro: z.boolean().default(false),
      hasDoubleGate: z.boolean().default(false),
      isValleyClimate: z.boolean().default(false),
      biessEligible: z.boolean().default(false),
      isAirbnb: z.boolean().default(false),
      hasMatterport: z.boolean().default(false)
    }).default({}),
    legalStatus: z.string().optional()
  })
};

export function listProperties(req: Request, res: Response): void {
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
    page = '1',
    limit = '50'
  } = req.query as Record<string, string>;

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const offset = (pageNum - 1) * limitNum;

  // Build parameterized SQL query
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

  if (minPrice) {
    conditions.push('price >= ?');
    params.push(parseFloat(minPrice));
  }

  if (maxPrice) {
    conditions.push('price <= ?');
    params.push(parseFloat(maxPrice));
  }

  if (q && q.trim()) {
    conditions.push('(title LIKE ? OR description LIKE ? OR sector LIKE ? OR microzone LIKE ?)');
    const searchTerm = `%${q.trim()}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  // Feature filters from features_json
  if (hasGenerator === 'true') {
    conditions.push("json_extract(features_json, '$.hasGenerator') = 1");
  }

  if (hasMetro === 'true') {
    conditions.push("json_extract(features_json, '$.hasMetro') = 1");
  }

  if (biessEligible === 'true') {
    conditions.push("json_extract(features_json, '$.biessEligible') = 1");
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Order By Clause
  let orderBy = 'created_at DESC';
  if (sort === 'price-asc') orderBy = 'price ASC';
  else if (sort === 'price-desc') orderBy = 'price DESC';
  else if (sort === 'area-desc') orderBy = 'area_build DESC';
  else if (sort === 'efficiency') orderBy = '(price / area_build) ASC';

  // Count total matching properties
  const countSql = `SELECT COUNT(*) as total FROM properties ${whereClause}`;
  const totalCount = (db.prepare(countSql).get(...params) as { total: number }).total;

  // Fetch properties
  const dataSql = `
    SELECT * FROM properties
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  const rows = db.prepare(dataSql).all(...params, limitNum, offset) as any[];

  // Map rows to frontend-compatible Property contract
  const properties = rows.map(r => ({
    id: r.id,
    code: r.code,
    title: r.title,
    description: r.description,
    price: r.price,
    operation: r.operation,
    type: r.property_type,
    sector: r.sector,
    microzone: r.microzone || '',
    address: r.address || '',
    areaBuild: r.area_build,
    areaLot: r.area_lot || r.area_build,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    parking: r.parking,
    hoaFee: r.hoa_fee || 0,
    elevation: r.elevation || 2200,
    temperature: r.temperature || '20°C',
    image: r.image,
    subPhotos: JSON.parse(r.sub_photos_json || '[]'),
    features: JSON.parse(r.features_json || '{}'),
    legalStatus: r.legal_status || 'Certificado al día',
    agent: JSON.parse(r.agent_json || '{}'),
    logistics: JSON.parse(r.logistics_json || '{}'),
    coordinates: { x: r.lat ? (r.lng + 78.5) * 100 : 50, y: r.lat ? (r.lat + 0.3) * 100 : 50 }
  }));

  res.status(200).json({
    success: true,
    data: {
      properties,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalCount / limitNum)
      }
    }
  });
}

export function getPropertyById(req: Request, res: Response): void {
  const { id } = req.params;

  const r = db.prepare('SELECT * FROM properties WHERE id = ? OR code = ?').get(id, id) as any;

  if (!r) {
    res.status(404).json({
      success: false,
      error: 'PROPIEDAD_NO_ENCONTRADA',
      message: `No se encontró ninguna propiedad con el identificador ${id}.`
    });
    return;
  }

  const property = {
    id: r.id,
    code: r.code,
    title: r.title,
    description: r.description,
    price: r.price,
    operation: r.operation,
    type: r.property_type,
    sector: r.sector,
    microzone: r.microzone || '',
    address: r.address || '',
    areaBuild: r.area_build,
    areaLot: r.area_lot || r.area_build,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    parking: r.parking,
    hoaFee: r.hoa_fee || 0,
    elevation: r.elevation || 2200,
    temperature: r.temperature || '20°C',
    image: r.image,
    subPhotos: JSON.parse(r.sub_photos_json || '[]'),
    features: JSON.parse(r.features_json || '{}'),
    legalStatus: r.legal_status || 'Certificado de Gravámenes al día',
    agent: JSON.parse(r.agent_json || '{}'),
    logistics: JSON.parse(r.logistics_json || '{}'),
    userId: r.user_id,
    createdAt: r.created_at
  };

  res.status(200).json({
    success: true,
    data: property
  });
}

export function createProperty(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  // 1. Verify User Subscription & Listing Quota (Anti-Spam / Commercial Enforcement)
  const sub = db.prepare(`
    SELECT s.id, s.used_listings, p.max_active_listings, s.status
    FROM user_subscriptions s
    JOIN membership_plans p ON s.plan_id = p.id
    WHERE s.user_id = ? AND s.status = 'ACTIVE'
    ORDER BY s.created_at DESC LIMIT 1
  `).get(req.user.userId) as any;

  if (!sub) {
    res.status(403).json({
      success: false,
      error: 'SIN_MEMBRESIA_ACTIVA',
      message: 'Necesitas una membresía activa para publicar propiedades.'
    });
    return;
  }

  if (sub.used_listings >= sub.max_active_listings && req.user.role !== 'SUPER_ADMIN') {
    res.status(403).json({
      success: false,
      error: 'LIMITE_PUBLICACIONES_ALCANZADO',
      message: `Has alcanzado el límite de ${sub.max_active_listings} propiedades activas de tu plan. Realiza un upgrade para publicar más.`
    });
    return;
  }

  const {
    title,
    description,
    price,
    operation,
    propertyType,
    sector,
    microzone,
    address,
    areaBuild,
    areaLot,
    bedrooms,
    bathrooms,
    parking,
    hoaFee,
    image,
    subPhotos = [],
    features = {},
    legalStatus
  } = req.body;

  const propId = `VU-${sector.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
  const code = propId;

  const userAgentInfo = {
    name: req.user.fullName,
    role: req.user.role === 'AGENT' ? 'Corredor Inmobiliario Certificado' : 'Propietario Directo',
    license: 'DMQ Verificado',
    phone: '+593 99 876 5432'
  };

  const insertProp = db.prepare(`
    INSERT INTO properties (
      id, code, title, description, price, operation, property_type, sector, microzone, address,
      area_build, area_lot, bedrooms, bathrooms, parking, hoa_fee, image, sub_photos_json,
      features_json, legal_status, agent_json, user_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProp.run(
    propId,
    code,
    title,
    description,
    price,
    operation,
    propertyType,
    sector,
    microzone || '',
    address || '',
    areaBuild,
    areaLot || areaBuild,
    bedrooms,
    bathrooms,
    parking || 1,
    hoaFee || 0,
    image,
    JSON.stringify(subPhotos),
    JSON.stringify(features),
    legalStatus || 'Certificado al día',
    JSON.stringify(userAgentInfo),
    req.user.userId
  );

  // Increment listing count in user subscription
  db.prepare('UPDATE user_subscriptions SET used_listings = used_listings + 1 WHERE id = ?').run(sub.id);

  res.status(201).json({
    success: true,
    message: 'Propiedad publicada exitosamente en Propiedades Premier.',
    data: { id: propId, code }
  });
}

export function deleteProperty(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const { id } = req.params;
  const prop = db.prepare('SELECT id, user_id FROM properties WHERE id = ?').get(id) as any;

  if (!prop) {
    res.status(404).json({ success: false, error: 'NO_ENCONTRADA' });
    return;
  }

  // Ensure user is owner or SUPER_ADMIN
  if (prop.user_id !== req.user.userId && req.user.role !== 'SUPER_ADMIN') {
    res.status(403).json({
      success: false,
      error: 'NO_AUTORIZADO',
      message: 'No tienes permisos para eliminar esta propiedad.'
    });
    return;
  }

  db.prepare('DELETE FROM properties WHERE id = ?').run(id);

  // Decrement used_listings
  db.prepare('UPDATE user_subscriptions SET used_listings = MAX(0, used_listings - 1) WHERE user_id = ?').run(req.user.userId);

  res.status(200).json({
    success: true,
    message: 'Propiedad eliminada correctamente.'
  });
}
