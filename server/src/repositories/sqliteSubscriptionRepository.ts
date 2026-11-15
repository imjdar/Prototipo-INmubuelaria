/**
 * PROPIEDADES PREMIER - SQLITE SUBSCRIPTION REPOSITORY
 * 
 * Implementación concreta del repositorio de suscripciones y planes comerciales ($29, $49, $99).
 * Cumple con SRP (gestión de membresías e inventario permitido) y transaccionalidad ACID.
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'crypto';
import { ISubscriptionRepository } from '../types/repository.types';
import { MembershipPlanEntity, UserSubscriptionEntity } from '../types/domain.types';

export class SqliteSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly db: DatabaseSync) {}

  private mapPlanRow(row: any): MembershipPlanEntity {
    return {
      id: row.id,
      code: row.code,
      name: row.name,
      monthlyPriceUsd: Number(row.monthly_price_usd),
      annualPriceUsd: Number(row.annual_price_usd),
      maxActiveListings: Number(row.max_active_listings),
      featuredTokens: Number(row.featured_tokens),
      hasVideoReels: Boolean(row.has_video_reels),
      hasAiGuardianPriority: Boolean(row.has_ai_guardian_priority),
      features: JSON.parse(row.features_json || '[]'),
      isActive: Boolean(row.is_active),
      createdAt: row.created_at
    };
  }

  private mapSubscriptionRow(row: any): UserSubscriptionEntity {
    return {
      id: row.id,
      userId: row.user_id,
      planId: row.plan_id,
      status: row.status,
      currentPeriodStart: row.current_period_start,
      currentPeriodEnd: row.current_period_end,
      autoRenew: Boolean(row.auto_renew),
      usedListings: Number(row.used_listings),
      paymentMethod: row.payment_method || 'NONE',
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  findPlanByCode(code: string): MembershipPlanEntity | null {
    const stmt = this.db.prepare('SELECT * FROM membership_plans WHERE code = ?');
    const row = stmt.get(code);
    return row ? this.mapPlanRow(row) : null;
  }

  findPlanById(id: string): MembershipPlanEntity | null {
    const stmt = this.db.prepare('SELECT * FROM membership_plans WHERE id = ?');
    const row = stmt.get(id);
    return row ? this.mapPlanRow(row) : null;
  }

  findAllPlans(): MembershipPlanEntity[] {
    const stmt = this.db.prepare('SELECT * FROM membership_plans WHERE is_active = 1 ORDER BY monthly_price_usd ASC');
    const rows = stmt.all() as any[];
    return rows.map(r => this.mapPlanRow(r));
  }

  findActiveByUserId(userId: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } | null {
    const stmt = this.db.prepare(`
      SELECT 
        s.*,
        p.id as p_id, p.code as p_code, p.name as p_name, p.monthly_price_usd as p_monthly_price_usd,
        p.annual_price_usd as p_annual_price_usd, p.max_active_listings as p_max_active_listings,
        p.featured_tokens as p_featured_tokens, p.has_video_reels as p_has_video_reels,
        p.has_ai_guardian_priority as p_has_ai_guardian_priority, p.features_json as p_features_json,
        p.is_active as p_is_active, p.created_at as p_created_at
      FROM user_subscriptions s
      JOIN membership_plans p ON s.plan_id = p.id
      WHERE s.user_id = ? AND s.status = 'ACTIVE'
      ORDER BY s.created_at DESC
      LIMIT 1
    `);

    const row = stmt.get(userId) as any;
    if (!row) return null;

    const subscription = this.mapSubscriptionRow(row);
    const plan: MembershipPlanEntity = {
      id: row.p_id,
      code: row.p_code,
      name: row.p_name,
      monthlyPriceUsd: Number(row.p_monthly_price_usd),
      annualPriceUsd: Number(row.p_annual_price_usd),
      maxActiveListings: Number(row.p_max_active_listings),
      featuredTokens: Number(row.p_featured_tokens),
      hasVideoReels: Boolean(row.p_has_video_reels),
      hasAiGuardianPriority: Boolean(row.p_has_ai_guardian_priority),
      features: JSON.parse(row.p_features_json || '[]'),
      isActive: Boolean(row.p_is_active),
      createdAt: row.p_created_at
    };

    return { subscription, plan };
  }

  createSubscription(userId: string, planId: string, durationMonths: number = 3): UserSubscriptionEntity {
    const id = `sub-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const stmt = this.db.prepare(`
      INSERT INTO user_subscriptions (
        id, user_id, plan_id, status, current_period_start, current_period_end, auto_renew, used_listings, payment_method
      ) VALUES (
        ?, ?, ?, 'ACTIVE', datetime('now'), datetime('now', '+' || ? || ' months'), 1, 0, 'CREDIT_CARD'
      )
    `);

    stmt.run(id, userId, planId, durationMonths);
    const createdStmt = this.db.prepare('SELECT * FROM user_subscriptions WHERE id = ?');
    return this.mapSubscriptionRow(createdStmt.get(id));
  }

  incrementListingCount(subscriptionId: string): boolean {
    const stmt = this.db.prepare(`
      UPDATE user_subscriptions
      SET used_listings = used_listings + 1,
          updated_at = datetime('now')
      WHERE id = ?
    `);
    const res = stmt.run(subscriptionId);
    return res.changes > 0;
  }

  upgradeSubscription(userId: string, targetPlanCode: string): { subscription: UserSubscriptionEntity; plan: MembershipPlanEntity } | null {
    const targetPlan = this.findPlanByCode(targetPlanCode);
    if (!targetPlan) return null;

    // Desactivar suscripciones activas previas
    const cancelStmt = this.db.prepare(`
      UPDATE user_subscriptions
      SET status = 'CANCELLED', updated_at = datetime('now')
      WHERE user_id = ? AND status = 'ACTIVE'
    `);
    cancelStmt.run(userId);

    // Crear la nueva suscripción con el plan objetivo
    const newSub = this.createSubscription(userId, targetPlan.id, 3);
    return { subscription: newSub, plan: targetPlan };
  }
}
