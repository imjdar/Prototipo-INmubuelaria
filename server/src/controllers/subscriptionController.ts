import { Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../database/db';

export function listPlans(_req: Request, res: Response): void {
  const plans = db.prepare(`
    SELECT id, code, name, monthly_price_usd, annual_price_usd, max_active_listings,
           featured_tokens, has_video_reels, has_ai_guardian_priority, features_json
    FROM membership_plans
    WHERE is_active = 1
    ORDER BY monthly_price_usd ASC
  `).all() as any[];

  const formattedPlans = plans.map(p => ({
    id: p.id,
    code: p.code,
    name: p.name,
    priceMonthly: p.monthly_price_usd,
    priceAnnual: p.annual_price_usd,
    maxListings: p.max_active_listings,
    featuredTokens: p.featured_tokens,
    hasVideoReels: Boolean(p.has_video_reels),
    hasAIGuardian: Boolean(p.has_ai_guardian_priority),
    features: JSON.parse(p.features_json || '[]')
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

  const { planCode, paymentMethod = 'CREDIT_CARD' } = req.body;

  const plan = db.prepare('SELECT id, code, name, max_active_listings FROM membership_plans WHERE code = ?').get(planCode) as any;
  if (!plan) {
    res.status(404).json({ success: false, error: 'PLAN_NO_ENCONTRADO', message: 'El plan de membresía seleccionado no existe.' });
    return;
  }

  // Check existing active subscription
  const existingSub = db.prepare('SELECT id, used_listings FROM user_subscriptions WHERE user_id = ? AND status = "ACTIVE"').get(req.user.userId) as any;

  if (existingSub) {
    // Update existing subscription
    db.prepare(`
      UPDATE user_subscriptions 
      SET plan_id = ?, payment_method = ?, current_period_end = datetime('now', '+3 months'), updated_at = datetime('now')
      WHERE id = ?
    `).run(plan.id, paymentMethod, existingSub.id);
  } else {
    // Insert new subscription
    const subId = `sub-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    db.prepare(`
      INSERT INTO user_subscriptions (id, user_id, plan_id, status, current_period_start, current_period_end, auto_renew, used_listings, payment_method)
      VALUES (?, ?, ?, 'ACTIVE', datetime('now'), datetime('now', '+3 months'), 1, 0, ?)
    `).run(subId, req.user.userId, plan.id, paymentMethod);
  }

  // Update user role to AGENT if upgrading to PRO_AGENT or VIP_INMOBILIARIA
  if (planCode === 'PRO_AGENT' || planCode === 'VIP_INMOBILIARIA') {
    db.prepare('UPDATE users SET role = "AGENT" WHERE id = ? AND role = "BUYER"').run(req.user.userId);
  }

  res.status(200).json({
    success: true,
    message: `Plan actualizado con éxito a ${plan.name}.`,
    data: {
      planCode: plan.code,
      maxListings: plan.max_active_listings
    }
  });
}
