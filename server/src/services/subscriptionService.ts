/**
 * PROPIEDADES PREMIER - SUBSCRIPTION SERVICE
 * 
 * Capa de Lógica de Negocio (BLL) para gestión de planes ($29, $49, $99), pasarela y elegibilidad de cuotas.
 * Cumple con SOLID (SRP y DIP).
 */

import { ISubscriptionService } from '../types/service.types';
import { ISubscriptionRepository } from '../types/repository.types';
import { MembershipPlanEntity, UserSubscriptionEntity } from '../types/domain.types';

export class SubscriptionService implements ISubscriptionService {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  getAllPlans(): MembershipPlanEntity[] {
    return this.subscriptionRepo.findAllPlans();
  }

  getUserSubscription(userId: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } | null {
    if (!userId) return null;
    return this.subscriptionRepo.findActiveByUserId(userId);
  }

  upgradePlan(userId: string, targetPlanCode: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } {
    const validPlans = ['FREE', 'INDIVIDUAL', 'PRO_AGENT', 'VIP_INMOBILIARIA'];
    if (!validPlans.includes(targetPlanCode)) {
      throw new Error(`PLAN_INVALIDO: El código de plan '${targetPlanCode}' no es válido.`);
    }

    const upgraded = this.subscriptionRepo.upgradeSubscription(userId, targetPlanCode);
    if (!upgraded) {
      throw new Error(`FALLO_ACTUALIZACION: No se pudo actualizar al plan '${targetPlanCode}'.`);
    }

    return upgraded;
  }

  checkListingEligibility(userId: string, userRole: string): {
    eligible: boolean;
    reason?: string;
    maxListings: number;
    usedListings: number;
  } {
    if (userRole === 'SUPER_ADMIN') {
      return { eligible: true, maxListings: 9999, usedListings: 0 };
    }

    const subData = this.subscriptionRepo.findActiveByUserId(userId);
    if (!subData) {
      return {
        eligible: false,
        reason: 'No posees un plan activo. Adquiere una membresía para publicar.',
        maxListings: 0,
        usedListings: 0
      };
    }

    const { subscription, plan } = subData;
    if (subscription.usedListings >= plan.maxActiveListings) {
      return {
        eligible: false,
        reason: `Has utilizado ${subscription.usedListings} de ${plan.maxActiveListings} cupos disponibles.`,
        maxListings: plan.maxActiveListings,
        usedListings: subscription.usedListings
      };
    }

    return {
      eligible: true,
      maxListings: plan.maxActiveListings,
      usedListings: subscription.usedListings
    };
  }
}
