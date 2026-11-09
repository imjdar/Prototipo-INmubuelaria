import { PlanCode } from '../types/auth';

export type PaymentMethod = 'PAYPHONE' | 'DEUNA' | 'CREDIT_CARD' | 'BANK_TRANSFER' | 'PAYPAL';

export interface PaymentIntent {
  id: string;
  userId: string;
  userEmail: string;
  planCode: PlanCode;
  planName: string;
  amountUsd: number;
  paymentMethod: PaymentMethod;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  completedAt?: string;
  transactionRef: string;
  receiptNumber?: string;
}

export interface IPaymentStrategy {
  processPayment(userId: string, userEmail: string, planCode: PlanCode, amount: number): Promise<PaymentIntent>;
}

class PayphoneStrategy implements IPaymentStrategy {
  async processPayment(userId: string, userEmail: string, planCode: PlanCode, amount: number): Promise<PaymentIntent> {
    // Simula tokenización y handshake con API Payphone Ecuador
    const ref = `PAYPHONE-EC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id: `pi-${Date.now()}`,
      userId,
      userEmail,
      planCode,
      planName: planCode === 'PRO_AGENT' ? 'Plan Profesional' : planCode === 'VIP_INMOBILIARIA' ? 'Plan Empresa' : 'Plan Esencial',
      amountUsd: amount,
      paymentMethod: 'PAYPHONE',
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      transactionRef: ref,
      receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
}

class DeunaStrategy implements IPaymentStrategy {
  async processPayment(userId: string, userEmail: string, planCode: PlanCode, amount: number): Promise<PaymentIntent> {
    // Simula generación de QR dinámico interoperable Banco Pichincha
    const ref = `DEUNA-PICHINCHA-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id: `pi-${Date.now()}`,
      userId,
      userEmail,
      planCode,
      planName: planCode === 'PRO_AGENT' ? 'Plan Profesional' : planCode === 'VIP_INMOBILIARIA' ? 'Plan Empresa' : 'Plan Esencial',
      amountUsd: amount,
      paymentMethod: 'DEUNA',
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      transactionRef: ref,
      receiptNumber: `DEUNA-REC-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
}

class CreditCardStrategy implements IPaymentStrategy {
  async processPayment(userId: string, userEmail: string, planCode: PlanCode, amount: number): Promise<PaymentIntent> {
    const ref = `CC-VISA-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id: `pi-${Date.now()}`,
      userId,
      userEmail,
      planCode,
      planName: planCode === 'PRO_AGENT' ? 'Plan Profesional' : planCode === 'VIP_INMOBILIARIA' ? 'Plan Empresa' : 'Plan Esencial',
      amountUsd: amount,
      paymentMethod: 'CREDIT_CARD',
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      transactionRef: ref,
      receiptNumber: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
}

class BankTransferStrategy implements IPaymentStrategy {
  async processPayment(userId: string, userEmail: string, planCode: PlanCode, amount: number): Promise<PaymentIntent> {
    const ref = `TRANSF-PRODUBANCO-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    return {
      id: `pi-${Date.now()}`,
      userId,
      userEmail,
      planCode,
      planName: planCode === 'PRO_AGENT' ? 'Plan Profesional' : planCode === 'VIP_INMOBILIARIA' ? 'Plan Empresa' : 'Plan Esencial',
      amountUsd: amount,
      paymentMethod: 'BANK_TRANSFER',
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      transactionRef: ref,
      receiptNumber: `TR-CONF-${Math.floor(100000 + Math.random() * 900000)}`
    };
  }
}

export class PaymentService {
  private strategies: Record<PaymentMethod, IPaymentStrategy> = {
    PAYPHONE: new PayphoneStrategy(),
    DEUNA: new DeunaStrategy(),
    CREDIT_CARD: new CreditCardStrategy(),
    BANK_TRANSFER: new BankTransferStrategy(),
    PAYPAL: new CreditCardStrategy()
  };

  public async executePayment(
    userId: string,
    userEmail: string,
    planCode: PlanCode,
    amount: number,
    method: PaymentMethod
  ): Promise<PaymentIntent> {
    const strategy = this.strategies[method];
    if (!strategy) {
      throw new Error(`Método de pago no soportado: ${method}`);
    }
    return await strategy.processPayment(userId, userEmail, planCode, amount);
  }
}

export const paymentService = new PaymentService();
