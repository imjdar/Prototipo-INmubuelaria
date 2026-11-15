/**
 * PROPIEDADES PREMIER - BILLING SERVICE
 * 
 * Lógica de negocio para facturación electrónica ecuatoriana (SRI).
 * Calcula el 15% de IVA vigente y valida identificaciones tributarias (RUC / Cédula).
 */

import { SqliteBillingRepository, CreateInvoiceDTO, InvoiceEntity } from '../repositories/sqliteBillingRepository';

export interface TaxCalculationResult {
  subtotal: number;
  vatRate: number;
  vatAmount: number;
  total: number;
  currency: string;
}

export class BillingService {
  constructor(private readonly billingRepo: SqliteBillingRepository) {}

  public calculateTax(subtotal: number): TaxCalculationResult {
    const validSubtotal = Math.max(0, Number(subtotal) || 0);
    const vatRate = 0.15; // 15% IVA vigente en Ecuador
    const vatAmount = Number((validSubtotal * vatRate).toFixed(2));
    const total = Number((validSubtotal + vatAmount).toFixed(2));

    return {
      subtotal: validSubtotal,
      vatRate,
      vatAmount,
      total,
      currency: 'USD'
    };
  }

  public validateTaxId(type: 'RUC' | 'CEDULA' | 'PASAPORTE', number: string): { isValid: boolean; message?: string } {
    const cleaned = number.trim();

    if (type === 'CEDULA') {
      if (!/^\d{10}$/.test(cleaned)) {
        return { isValid: false, message: 'La cédula ecuatoriana debe tener exactamente 10 dígitos numéricos.' };
      }
      return { isValid: true };
    }

    if (type === 'RUC') {
      if (!/^\d{13}$/.test(cleaned)) {
        return { isValid: false, message: 'El RUC ecuatoriano debe tener exactamente 13 dígitos numéricos terminados en 001.' };
      }
      if (!cleaned.endsWith('001')) {
        return { isValid: false, message: 'El RUC de persona natural o jurídica debe terminar en 001.' };
      }
      return { isValid: true };
    }

    if (type === 'PASAPORTE') {
      if (cleaned.length < 5 || cleaned.length > 20) {
        return { isValid: false, message: 'El número de pasaporte debe tener entre 5 y 20 caracteres.' };
      }
      return { isValid: true };
    }

    return { isValid: true };
  }

  public processAndCreateInvoice(dto: CreateInvoiceDTO): InvoiceEntity {
    const taxCheck = this.validateTaxId(dto.taxIdType, dto.taxIdNumber);
    if (!taxCheck.isValid) {
      throw new Error(`IDENTIFICACION_TRIBUTARIA_INVALIDA: ${taxCheck.message}`);
    }

    return this.billingRepo.createInvoice(dto);
  }

  public getUserInvoices(userId: string): InvoiceEntity[] {
    return this.billingRepo.getInvoicesByUserId(userId);
  }

  public getInvoiceById(id: string): InvoiceEntity | null {
    return this.billingRepo.getInvoiceById(id);
  }
}
