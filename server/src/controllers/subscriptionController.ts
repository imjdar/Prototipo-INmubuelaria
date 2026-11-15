/**
 * PROPIEDADES PREMIER - SUBSCRIPTION CONTROLLER
 * 
 * Controlador HTTP para planes de membresía ($29, $49, $99), pasarela y upgrades.
 * Principios SOLID:
 * - SRP: Maneja el transporte HTTP y serialización para membresías.
 * - DIP: Lógica de planes y cuotas delegada a subscriptionService.
 */

import { Request, Response } from 'express';
import { subscriptionService, userRepository } from '../container';

export function listPlans(_req: Request, res: Response): void {
  const plans = subscriptionService.getAllPlans();

  const formattedPlans = plans.map(p => ({
    id: p.id,
    code: p.code,
    name: p.name,
    priceMonthly: p.monthlyPriceUsd,
    priceAnnual: p.annualPriceUsd,
    maxListings: p.maxActiveListings,
    featuredTokens: p.featuredTokens,
    hasVideoReels: p.hasVideoReels,
    hasAIGuardian: p.hasAiGuardianPriority,
    features: p.features
  }));

  res.status(200).json({
    success: true,
    data: formattedPlans
  });
}

export function upgradePlan(req: Request, res: Response): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const { planCode } = req.body;

  try {
    const result = subscriptionService.upgradePlan(req.user.userId, planCode);

    // Si el plan es comercial, actualiza rol a AGENT
    if (['PRO_AGENT', 'VIP_INMOBILIARIA', 'INDIVIDUAL'].includes(planCode)) {
      userRepository.update(req.user.userId, { role: 'AGENT' as any });
    }

    res.status(200).json({
      success: true,
      message: `Plan actualizado con éxito a ${result.plan.name}.`,
      data: {
        planCode: result.plan.code,
        maxListings: result.plan.maxActiveListings
      }
    });
  } catch (error: any) {
    if (error.message?.includes('PLAN_INVALIDO')) {
      res.status(404).json({
        success: false,
        error: 'PLAN_NO_ENCONTRADO',
        message: 'El plan de membresía seleccionado no existe.'
      });
      return;
    }
    res.status(500).json({
      success: false,
      error: 'ERROR_UPGRADE',
      message: error.message
    });
  }
}
