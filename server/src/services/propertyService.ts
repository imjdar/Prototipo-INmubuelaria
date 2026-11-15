/**
 * PROPIEDADES PREMIER - PROPERTY SERVICE
 * 
 * Capa de Lógica de Negocio (BLL) para el catálogo inmobiliario de Quito y Valles.
 * Cumple con los Principios SOLID:
 * - SRP: Reglas de validación de inmuebles, cuotas de inventario y políticas comerciales.
 * - DIP: Inyección de IPropertyRepository y ISubscriptionRepository.
 */

import { IPropertyService } from '../types/service.types';
import { IPropertyRepository, ISubscriptionRepository } from '../types/repository.types';
import { PropertyEntity, PropertyFilterQuery, CreatePropertyDTO } from '../types/domain.types';

export class PropertyService implements IPropertyService {
  constructor(
    private readonly propertyRepo: IPropertyRepository,
    private readonly subscriptionRepo: ISubscriptionRepository
  ) {}

  getProperties(filters: PropertyFilterQuery): {
    properties: PropertyEntity[];
    total: number;
    page: number;
    limit: number;
  } {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(filters.limit) || 50));

    const result = this.propertyRepo.findMany({
      ...filters,
      page,
      limit
    });

    return {
      properties: result.properties,
      total: result.total,
      page,
      limit
    };
  }

  getPropertyById(id: string): PropertyEntity | null {
    if (!id || id.trim().length === 0) return null;
    return this.propertyRepo.findById(id.trim());
  }

  createProperty(
    data: CreatePropertyDTO,
    userId: string,
    userRole: string
  ): { property: PropertyEntity; remainingListings: number } {
    // 1. Regla de Negocio: Verificar cuota de publicaciones del usuario (Adversarial Defense)
    if (userRole !== 'SUPER_ADMIN') {
      const activeSub = this.subscriptionRepo.findActiveByUserId(userId);
      if (!activeSub) {
        throw new Error('NO_ACTIVE_SUBSCRIPTION: No tienes una suscripción activa para publicar propiedades.');
      }

      const { subscription, plan } = activeSub;
      if (subscription.usedListings >= plan.maxActiveListings) {
        throw new Error(`QUOTA_EXCEEDED: Has alcanzado el límite de ${plan.maxActiveListings} propiedades de tu plan ${plan.name}.`);
      }

      // 2. Persistir propiedad
      const created = this.propertyRepo.create(data, userId);

      // 3. Incrementar contador de inventario en la suscripción
      this.subscriptionRepo.incrementListingCount(subscription.id);

      const remaining = plan.maxActiveListings - (subscription.usedListings + 1);
      return { property: created, remainingListings: Math.max(0, remaining) };
    }

    // Si es SUPER_ADMIN, no tiene límite de publicaciones
    const created = this.propertyRepo.create(data, userId);
    return { property: created, remainingListings: 9999 };
  }

  deleteProperty(id: string, requesterUserId: string, requesterRole: string): boolean {
    const prop = this.propertyRepo.findById(id);
    if (!prop) {
      throw new Error('PROPERTY_NOT_FOUND: La propiedad especificada no existe.');
    }

    // Regla de Negocio: Solo el propietario o SUPER_ADMIN pueden eliminar
    if (requesterRole !== 'SUPER_ADMIN' && prop.userId !== requesterUserId) {
      throw new Error('UNAUTHORIZED_ACTION: No tienes permisos para eliminar este inmueble.');
    }

    return this.propertyRepo.delete(id);
  }
}
