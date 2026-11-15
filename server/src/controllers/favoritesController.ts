import { Request, Response } from 'express';
import { db } from '../database/db';

export function getFavorites(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const rows = db.prepare(`
    SELECT p.* FROM properties p
    JOIN user_favorites f ON p.id = f.property_id
    WHERE f.user_id = ?
    ORDER BY f.created_at DESC
  `).all(req.user.userId) as any[];

  const properties = rows.map(r => ({
    id: r.id,
    code: r.code,
    title: r.title,
    price: r.price,
    sector: r.sector,
    type: r.property_type,
    areaBuild: r.area_build,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    image: r.image
  }));

  const savedIds = properties.map(p => p.id);

  res.status(200).json({
    success: true,
    data: {
      properties,
      savedIds
    }
  });
}

export function addFavorite(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const propertyId = req.params.propertyId || req.body?.propertyId;
  if (!propertyId) {
    res.status(400).json({ success: false, error: 'PROPERTY_ID_REQUERIDO' });
    return;
  }

  // Ensure property exists
  const prop = db.prepare('SELECT id FROM properties WHERE id = ?').get(propertyId);
  if (!prop) {
    res.status(404).json({ success: false, error: 'PROPIEDAD_NO_ENCONTRADA' });
    return;
  }

  db.prepare(`
    INSERT OR IGNORE INTO user_favorites (user_id, property_id)
    VALUES (?, ?)
  `).run(req.user.userId, propertyId);

  res.status(200).json({
    success: true,
    message: 'Propiedad agregada a tu portafolio de favoritos.'
  });
}

export function removeFavorite(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const { propertyId } = req.params;

  db.prepare('DELETE FROM user_favorites WHERE user_id = ? AND property_id = ?').run(req.user.userId, propertyId);

  res.status(200).json({
    success: true,
    message: 'Propiedad removida de favoritos.'
  });
}
