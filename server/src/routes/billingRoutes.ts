/**
 * PROPIEDADES PREMIER - BILLING & SRI INVOICE ROUTES
 * 
 * Endpoints para facturación electrónica ecuatoriana, validación tributaria y cálculo de IVA 15%.
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { billingService, subscriptionRepository } from '../container';
import { authenticateJWT } from '../middleware/auth';
import { validate } from '../middleware/security';

const router = Router();

const calculateTaxSchema = {
  body: z.object({
    subtotal: z.number().nonnegative('El subtotal debe ser mayor o igual a cero.')
  })
};

const createInvoiceSchema = {
  body: z.object({
    planCode: z.string(),
    subtotalUsd: z.number().positive(),
    paymentMethod: z.string(),
    taxIdType: z.enum(['RUC', 'CEDULA', 'PASAPORTE']),
    taxIdNumber: z.string().min(5),
    taxLegalName: z.string().min(3),
    taxAddress: z.string().optional(),
    taxEmail: z.string().email()
  })
};

// POST /api/v1/billing/calculate-tax - Cálculo en tiempo real de desglose de IVA 15%
router.post('/calculate-tax', validate(calculateTaxSchema), (req: Request, res: Response) => {
  const { subtotal } = req.body;
  const breakdown = billingService.calculateTax(subtotal);
  res.status(200).json({
    success: true,
    data: breakdown
  });
});

// POST /api/v1/billing/create-invoice - Emisión de factura electrónica con clave de acceso SRI
router.post('/create-invoice', authenticateJWT, validate(createInvoiceSchema), (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  try {
    const {
      planCode,
      subtotalUsd,
      paymentMethod,
      taxIdType,
      taxIdNumber,
      taxLegalName,
      taxAddress,
      taxEmail
    } = req.body;

    // Buscar suscripción activa para enlazar si existe
    const activeSub = subscriptionRepository.findActiveByUserId(req.user.userId);

    const invoice = billingService.processAndCreateInvoice({
      userId: req.user.userId,
      subscriptionId: activeSub?.subscription.id,
      planCode,
      subtotalUsd,
      paymentMethod,
      taxIdType,
      taxIdNumber,
      taxLegalName,
      taxAddress,
      taxEmail
    });

    res.status(201).json({
      success: true,
      message: 'Comprobante electrónico emitido y validado exitosamente ante el SRI.',
      data: invoice
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: 'ERROR_FACTURACION',
      message: error.message
    });
  }
});

// GET /api/v1/billing/invoices - Historial de facturación del usuario autenticado
router.get('/invoices', authenticateJWT, (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'NO_AUTORIZADO' });
    return;
  }

  const invoices = billingService.getUserInvoices(req.user.userId);
  res.status(200).json({
    success: true,
    data: invoices
  });
});

export default router;
