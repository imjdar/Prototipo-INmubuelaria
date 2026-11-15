/**
 * PROPIEDADES PREMIER - FAVORITES CONTROLLER
 * 
 * Controlador HTTP para gestión de favoritos de usuario.
 * Principios SOLID:
 * - SRP: Maneja el transporte HTTP y serialización para favoritos.
 * - DIP: Lógica de persistencia delegada a favoriteService.
 */

import { Request, Response } from 'express';
import { favoriteService, propertyRepository } from '../container';

export function getFavorites(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const properties = favoriteService.getUserFavorites(req.user.userId);
  const savedIds = favoriteService.getUserFavoriteIds(req.user.userId);

  const formattedProperties = properties.map(p => ({
    id: p.id,
    code: p.code,
    title: p.title,
    price: p.price,
    sector: p.sector,
    type: p.propertyType,
    areaBuild: p.areaBuild,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    image: p.image
  }));

  res.status(200).json({
    success: true,
    data: {
      properties: formattedProperties,
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

  const prop = propertyRepository.findById(propertyId);
  if (!prop) {
    res.status(404).json({ success: false, error: 'PROPIEDAD_NO_ENCONTRADA' });
    return;
  }

  favoriteService.addFavorite(req.user.userId, propertyId);

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

  const propertyId = String(req.params.propertyId);
  favoriteService.removeFavorite(req.user.userId, propertyId);

  res.status(200).json({
    success: true,
    message: 'Propiedad removida de favoritos.'
  });
}
