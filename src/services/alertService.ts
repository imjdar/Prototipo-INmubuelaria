import { Sector, PropertyType } from '../types/property';

export interface PriceAlert {
  id: string;
  userId?: string;
  propertyId?: string;
  propertyTitle?: string;
  currentPrice?: number;
  email: string;
  phone?: string;
  sector?: Sector | 'ALL';
  propertyType?: PropertyType | 'ALL';
  maxBudget?: number;
  frequency: 'INSTANT' | 'DAILY' | 'WEEKLY';
  createdAt: string;
  active: boolean;
}

const STORAGE_KEY = 'premier_price_alerts';

export class AlertService {
  private inMemoryFallback: PriceAlert[] = [];

  private getStoredAlerts(): PriceAlert[] {
    try {
      if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
      }
      return this.inMemoryFallback;
    } catch {
      return this.inMemoryFallback;
    }
  }

  private saveStoredAlerts(alerts: PriceAlert[]): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(alerts));
      }
      this.inMemoryFallback = alerts;
    } catch {
      this.inMemoryFallback = alerts;
    }
  }

  /**
   * Crea una alerta para una propiedad específica (bajada de precio)
   */
  public subscribeToPropertyPriceDrop(
    propertyId: string,
    propertyTitle: string,
    currentPrice: number,
    email: string,
    phone?: string,
    userId?: string
  ): PriceAlert {
    const alerts = this.getStoredAlerts();
    const newAlert: PriceAlert = {
      id: `alert-prop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      propertyId,
      propertyTitle,
      currentPrice,
      email,
      phone,
      frequency: 'INSTANT',
      createdAt: new Date().toISOString(),
      active: true
    };
    alerts.push(newAlert);
    this.saveStoredAlerts(alerts);
    return newAlert;
  }

  /**
   * Crea una alerta general de búsqueda (sector, tipo, presupuesto)
   */
  public subscribeToSearchAlert(
    email: string,
    sector: Sector | 'ALL',
    propertyType: PropertyType | 'ALL',
    maxBudget: number,
    phone?: string,
    userId?: string
  ): PriceAlert {
    const alerts = this.getStoredAlerts();
    const newAlert: PriceAlert = {
      id: `alert-search-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      email,
      phone,
      sector,
      propertyType,
      maxBudget,
      frequency: 'DAILY',
      createdAt: new Date().toISOString(),
      active: true
    };
    alerts.push(newAlert);
    this.saveStoredAlerts(alerts);
    return newAlert;
  }

  /**
   * Obtiene todas las alertas activas de un usuario
   */
  public getAlertsForUser(userIdOrEmail: string): PriceAlert[] {
    const alerts = this.getStoredAlerts();
    return alerts.filter(a => a.userId === userIdOrEmail || a.email.toLowerCase() === userIdOrEmail.toLowerCase());
  }

  /**
   * Cancela una alerta por ID
   */
  public cancelAlert(alertId: string): boolean {
    const alerts = this.getStoredAlerts();
    const index = alerts.findIndex(a => a.id === alertId);
    if (index !== -1) {
      alerts[index].active = false;
      this.saveStoredAlerts(alerts);
      return true;
    }
    return false;
  }
}

export const alertService = new AlertService();
