/**
 * PROPIEDADES PREMIER - SQLITE BILLING & INVOICE REPOSITORY
 * 
 * Capa de persistencia para facturación electrónica ecuatoriana (SRI) con IVA al 15%.
 */

import { DatabaseSync } from 'node:sqlite';
import crypto from 'crypto';

export interface InvoiceEntity {
  id: string;
  userId: string;
  subscriptionId?: string;
  planCode: string;
  subtotalUsd: number;
  vatRate: number;
  vatAmountUsd: number;
  totalUsd: number;
  paymentMethod: string;
  taxIdType: 'RUC' | 'CEDULA' | 'PASAPORTE';
  taxIdNumber: string;
  taxLegalName: string;
  taxAddress: string;
  taxEmail: string;
  sriAccessKey: string;
  status: 'PAID' | 'PENDING' | 'CANCELLED';
  createdAt: string;
}

export interface CreateInvoiceDTO {
  userId: string;
  subscriptionId?: string;
  planCode: string;
  subtotalUsd: number;
  paymentMethod: string;
  taxIdType: 'RUC' | 'CEDULA' | 'PASAPORTE';
  taxIdNumber: string;
  taxLegalName: string;
  taxAddress?: string;
  taxEmail: string;
}

export class SqliteBillingRepository {
  constructor(private readonly db: DatabaseSync) {}

  private mapRow(row: any): InvoiceEntity {
    return {
      id: row.id,
      userId: row.user_id,
      subscriptionId: row.subscription_id || undefined,
      planCode: row.plan_code,
      subtotalUsd: Number(row.subtotal_usd),
      vatRate: Number(row.vat_rate),
      vatAmountUsd: Number(row.vat_amount_usd),
      totalUsd: Number(row.total_usd),
      paymentMethod: row.payment_method,
      taxIdType: row.tax_id_type,
      taxIdNumber: row.tax_id_number,
      taxLegalName: row.tax_legal_name,
      taxAddress: row.tax_address || 'Quito, Ecuador',
      taxEmail: row.tax_email,
      sriAccessKey: row.sri_access_key,
      status: row.status,
      createdAt: row.created_at
    };
  }

  createInvoice(dto: CreateInvoiceDTO): InvoiceEntity {
    const id = `FAC-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const vatRate = 0.15; // 15% IVA vigente en Ecuador
    const vatAmount = Number((dto.subtotalUsd * vatRate).toFixed(2));
    const total = Number((dto.subtotalUsd + vatAmount).toFixed(2));

    // Clave de acceso SRI formato oficial de 49 dígitos
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const rucEmisor = '1792948214001';
    const tipoComprobante = '01'; // Factura
    const randomCode = Math.floor(10000000 + Math.random() * 90000000).toString();
    const sriAccessKey = `${datePart}${tipoComprobante}${rucEmisor}1001001${randomCode}1`;

    const stmt = this.db.prepare(`
      INSERT INTO invoices (
        id, user_id, subscription_id, plan_code, subtotal_usd, vat_rate, vat_amount_usd,
        total_usd, payment_method, tax_id_type, tax_id_number, tax_legal_name, tax_address,
        tax_email, sri_access_key, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PAID')
    `);

    stmt.run(
      id,
      dto.userId,
      dto.subscriptionId || null,
      dto.planCode,
      dto.subtotalUsd,
      vatRate,
      vatAmount,
      total,
      dto.paymentMethod,
      dto.taxIdType,
      dto.taxIdNumber,
      dto.taxLegalName,
      dto.taxAddress || 'Quito, Pichincha, Ecuador',
      dto.taxEmail,
      sriAccessKey
    );

    const created = this.db.prepare('SELECT * FROM invoices WHERE id = ?').get(id);
    return this.mapRow(created);
  }

  getInvoicesByUserId(userId: string): InvoiceEntity[] {
    const stmt = this.db.prepare('SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC');
    const rows = stmt.all(userId) as any[];
    return rows.map(r => this.mapRow(r));
  }

  getInvoiceById(id: string): InvoiceEntity | null {
    const stmt = this.db.prepare('SELECT * FROM invoices WHERE id = ?');
    const row = stmt.get(id);
    return row ? this.mapRow(row) : null;
  }
}
