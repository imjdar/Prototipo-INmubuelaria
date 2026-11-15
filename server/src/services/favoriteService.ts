/**
 * PROPIEDADES PREMIER - FAVORITE SERVICE
 * 
 * Capa de Lógica de Negocio (BLL) para favoritos persistentes de usuario.
 * Cumple con SOLID (SRP y DIP).
 */

import { IFavoriteService } from '../types/service.types';
import { IFavoriteRepository } from '../types/repository.types';
import { PropertyEntity } from '../types/domain.types';

export class FavoriteService implements IFavoriteService {
  constructor(private readonly favoriteRepo: IFavoriteRepository) {}

  getUserFavorites(userId: string): PropertyEntity[] {
    if (!userId) return [];
    return this.favoriteRepo.getUserFavorites(userId);
  }

  getUserFavoriteIds(userId: string): string[] {
    if (!userId) return [];
    return this.favoriteRepo.getUserFavoriteIds(userId);
  }

  addFavorite(userId: string, propertyId: string): boolean {
    if (!userId || !propertyId) return false;
    return this.favoriteRepo.addFavorite(userId, propertyId);
  }

  removeFavorite(userId: string, propertyId: string): boolean {
    if (!userId || !propertyId) return false;
    return this.favoriteRepo.removeFavorite(userId, propertyId);
  }

  toggleFavorite(userId: string, propertyId: string): { isFavorite: boolean; count: number } {
    if (!userId || !propertyId) {
      throw new Error('PARAMETROS_INVALIDOS: Se requiere userId y propertyId.');
    }

    const currentlyFavorite = this.favoriteRepo.isFavorite(userId, propertyId);
    if (currentlyFavorite) {
      this.favoriteRepo.removeFavorite(userId, propertyId);
    } else {
      this.favoriteRepo.addFavorite(userId, propertyId);
    }

    const updatedIds = this.favoriteRepo.getUserFavoriteIds(userId);
    return {
      isFavorite: !currentlyFavorite,
      count: updatedIds.length
    };
  }
}
