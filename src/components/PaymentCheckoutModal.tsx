/**
 * PROPIEDADES PREMIER - PAYMENT & INVOICING CHECKOUT MODAL (PÁGINA 06 - SPRINT 2)
 * 
 * Pasarela de pago segura con desglose de IVA al 15% (Ecuador), formulario tributario
 * para facturación electrónica del SRI y emisión de comprobante digital RIDE.
 */

import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Printer,
  Receipt
} from 'lucide-react';
import { PlanCode, User } from '../types/auth';
import { paymentService, PaymentMethod, PaymentIntent } from '../services/paymentService';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  user: User | null;
  planCode: PlanCode;
  planName: string;
  amountUsd: number;
  onClose: () => void;
  onPaymentSuccess: (intent: PaymentIntent) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  user,
  planCode,
  planName,
  amountUsd,
  onClose,
  onPaymentSuccess
}) => {
  const [method, setMethod] = useState<PaymentMethod>('PAYPHONE');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardHolder, setCardHolder] = useState(user?.fullName || 'Ing. Mateo Serrano');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('890');

  // Datos tributarios para Facturación Electrónica SRI (Ecuador)
  const [taxIdType, setTaxIdType] = useState<'CEDULA' | 'RUC' | 'PASAPORTE'>('RUC');
  const [taxIdNumber, setTaxIdNumber] = useState('1792948214001');
  const [taxLegalName, setTaxLegalName] = useState(user?.companyName || user?.fullName || 'Valle & Urbe PropTech S.A.S.');
  const [taxAddress, setTaxAddress] = useState('Av. Interoceánica km 11.5, Edificio Scala Pro, Cumbayá');
  const [taxEmail, setTaxEmail] = useState(user?.email || 'facturacion@valleyurbe.ec');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedIntent, setCompletedIntent] = useState<PaymentIntent | null>(null);

  if (!isOpen) return null;

  // Cálculo formal del 15% de IVA (Ley Tributaria Ecuador 2024–2026)
  const subtotal = amountUsd;
  const vatRate = 0.15;
  const vatAmount = Number((subtotal * vatRate).toFixed(2));
  const totalAmount = Number((subtotal + vatAmount).toFixed(2));

  // Clave de acceso simulada de 49 dígitos estándar del SRI
  const sriAccessKey = `1511202601179294821400110010010000492811234567818`;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const intent = await paymentService.executePayment(
        user?.id || 'demo-user-1',
        taxEmail,
        planCode,
        totalAmount,
        method
      );

      // Enlazar con endpoint backend en segundo plano si está disponible
      try {
        await fetch('http://localhost:4000/api/v1/billing/create-invoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('premier_access_token') || ''}`
          },
          body: JSON.stringify({
            planCode,
            subtotalUsd: subtotal,
            paymentMethod: method,
            taxIdType,
            taxIdNumber,
            taxLegalName,
            taxAddress,
            taxEmail
          })
        });
      } catch {
        // Silencioso en modo offline
      }

      setTimeout(() => {
        setIsProcessing(false);
        setCompletedIntent(intent);
        setTimeout(() => {
          onPaymentSuccess(intent);
        }, 2200);
      }, 1200);
    } catch {
      setIsProcessing(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div
        className="checkout-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '620px',
          padding: '2rem 2.25rem',
          boxShadow: '0 25px 65px -15px rgba(33, 49, 69, 0.28)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto'
        }}
      >
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar pasarela de pago"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F1F3F5',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#213145'
          }}
        >
          <X size={18} />
        </button>

        {completedIntent ? (
          /* ==============================================================
             PANTALLA DE COMPROBANTE ELECTRÓNICO (SRI ECUADOR)
             ============================================================== */
          <div style={{ padding: '1rem 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <CheckCircle2 size={56} color="#16A34A" style={{ margin: '0 auto 0.75rem auto' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', margin: '0 0 0.25rem 0' }}>
                ¡Comprobante Electrónico Autorizado!
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.86rem', margin: 0 }}>
                Tu suscripción al <strong>{planName}</strong> ha sido activada y registrada ante el SRI.
              </p>
            </div>

            {/* Recibo RIDE Digital Estilizado */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              fontSize: '0.8rem',
              color: '#334155',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#213145', fontSize: '0.9rem' }}>PROPIEDADES PREMIER TECH S.A.S.</div>
                  <div style={{ color: '#64748B', fontSize: '0.74rem' }}>RUC: 1792948214001 · Matriz: Cumbayá, Quito</div>
                  <div style={{ color: '#16A34A', fontWeight: 700, fontSize: '0.72rem', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <ShieldCheck size={12} color="#16A34A" />
                    AUTORIZADO POR SERVICIO DE RENTAS INTERNAS (SRI)
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#FEA004' }}>FACTURA ELECTRÓNICA</div>
                  <div style={{ fontWeight: 700, color: '#213145' }}>{completedIntent.receiptNumber}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>15/Nov/2026 13:20</div>
                </div>
              </div>

              {/* Datos del Cliente */}
              <div style={{ marginBottom: '0.75rem', fontSize: '0.76rem' }}>
                <div><strong>Razón Social:</strong> {taxLegalName}</div>
                <div><strong>{taxIdType}:</strong> {taxIdNumber} · <strong>Email:</strong> {taxEmail}</div>
                <div><strong>Dirección:</strong> {taxAddress}</div>
              </div>

              {/* Desglose Tributario */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span>Suscripción 3 meses ({planName}):</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: '#64748B' }}>
                  <span>Subtotal 15% IVA:</span>
                  <span>${subtotal.toFixed(2)} USD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: '#64748B' }}>
                  <span>IVA 15% (Ecuador):</span>
                  <span>+${vatAmount.toFixed(2)} USD</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', fontWeight: 800, fontSize: '0.95rem', color: '#213145' }}>
                  <span>Total Facturado:</span>
                  <span style={{ color: '#FEA004' }}>${totalAmount.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Clave de Acceso SRI */}
              <div style={{ fontSize: '0.68rem', color: '#64748B', wordBreak: 'break-all' }}>
                <strong>Clave de Acceso SRI (49 dígitos):</strong><br />
                <code>{sriAccessKey}</code>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  flex: 1,
                  background: '#F1F5F9',
                  border: '1px solid #CBD5E1',
                  color: '#213145',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Printer size={16} />
                <span>Imprimir RIDE</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  background: '#FEA004',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Continuar al Portal
              </button>
            </div>
          </div>
        ) : (
          /* ==============================================================
             PANTALLA DE CHECKOUT & FORMULARIO TRIBUTARIO SRI
             ============================================================== */
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#FFF7ED',
                color: '#FEA004',
                border: '1px solid #FED7AA',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.5rem'
              }}>
                <ShieldCheck size={14} color="#FEA004" />
                <span>PASARELA SEGURA & FACTURACIÓN SRI ECUADOR</span>
              </div>
              <h2 id="checkout-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', margin: '0 0 0.25rem 0' }}>
                Adquirir Membresía Inmobiliaria
              </h2>
              <div style={{ fontSize: '0.88rem', color: '#64748B' }}>
                Plan: <strong style={{ color: '#213145' }}>{planName}</strong> · Vigencia: <strong>3 Meses</strong>
              </div>
            </div>

            {/* Selector de Método de Pago */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {[
                { id: 'PAYPHONE', label: 'Payphone', icon: <CreditCard size={18} /> },
                { id: 'DEUNA', label: 'Deuna! QR', icon: <QrCode size={18} /> },
                { id: 'CREDIT_CARD', label: 'Tarjeta', icon: <CreditCard size={18} /> },
                { id: 'BANK_TRANSFER', label: 'Transfer', icon: <Building size={18} /> }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMethod(opt.id as PaymentMethod)}
                  style={{
                    padding: '0.65rem 0.25rem',
                    borderRadius: '10px',
                    border: method === opt.id ? '2px solid #FEA004' : '1px solid #E2E8F0',
                    background: method === opt.id ? '#FFF7ED' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: method === opt.id ? '#FEA004' : '#64748B',
                    fontWeight: 700,
                    fontSize: '0.72rem'
                  }}
                >
                  {opt.icon}
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Formulario de Pago */}
            {method === 'DEUNA' ? (
              <div style={{ textAlign: 'center', padding: '1.25rem', background: '#FFFDF5', border: '1px solid #FEF08A', borderRadius: '12px', marginBottom: '1.25rem' }}>
                <QrCode size={110} color="#213145" style={{ margin: '0 auto 0.5rem auto' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#213145' }}>
                  Escanea con Deuna! (Banco Pichincha)
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Activación automática instantánea sin comisión bancaria.
                </div>
              </div>
            ) : method === 'BANK_TRANSFER' ? (
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: '#334155' }}>
                <div style={{ fontWeight: 800, color: '#213145', marginBottom: '0.35rem' }}>
                  Datos de Transferencia Bancaria (Pichincha / Produbanco):
                </div>
                <div><strong>Banco:</strong> Banco Pichincha (Cuenta Corriente #2100849201)</div>
                <div><strong>Beneficiario:</strong> Propiedades Premier Tech S.A.S.</div>
                <div><strong>RUC:</strong> 1792948214001 · <strong>Correo:</strong> pagos@propiedadespremier.ec</div>
              </div>
            ) : (
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.25rem' }}>
                    Número de Tarjeta (Débito o Crédito)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '0.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>Titular</label>
                    <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>Vence</label>
                    <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#475569', marginBottom: '0.2rem' }}>CVV</label>
                    <input type="text" value={cardCvv} onChange={(e) => setCardCvv(e.target.value)} style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.8rem', boxSizing: 'border-box' }} />
                  </div>
                </div>
              </div>
            )}

            {/* SECCIÓN OBLIGATORIA: DATOS DE FACTURACIÓN ELECTRÓNICA SRI ECUADOR */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '0.82rem', color: '#213145', marginBottom: '0.75rem' }}>
                <Receipt size={16} color="#FEA004" />
                <span>Datos para Factura Electrónica SRI (Ecuador)</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.2rem' }}>Documento</label>
                  <select
                    value={taxIdType}
                    onChange={(e) => setTaxIdType(e.target.value as any)}
                    style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', background: '#FFFFFF' }}
                  >
                    <option value="RUC">RUC (13 dígitos)</option>
                    <option value="CEDULA">Cédula (10 dígitos)</option>
                    <option value="PASAPORTE">Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.2rem' }}>Número de Identificación</label>
                  <input
                    type="text"
                    value={taxIdNumber}
                    onChange={(e) => setTaxIdNumber(e.target.value)}
                    placeholder="1792948214001"
                    style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.2rem' }}>Razón Social / Nombre Completo</label>
                  <input
                    type="text"
                    value={taxLegalName}
                    onChange={(e) => setTaxLegalName(e.target.value)}
                    style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.2rem' }}>Correo para Factura Electrónica</label>
                  <input
                    type="email"
                    value={taxEmail}
                    onChange={(e) => setTaxEmail(e.target.value)}
                    style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: '#64748B', marginBottom: '0.2rem' }}>Dirección Fiscal (Quito / Valles)</label>
                <input
                  type="text"
                  value={taxAddress}
                  onChange={(e) => setTaxAddress(e.target.value)}
                  style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.78rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            {/* Desglose Tributario (IVA 15%) */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: '#64748B' }}>
                <span>Subtotal Membresía:</span>
                <span>${subtotal.toFixed(2)} USD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', color: '#64748B' }}>
                <span>IVA 15% (SRI Ecuador):</span>
                <span>+${vatAmount.toFixed(2)} USD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '0.35rem', fontWeight: 800, fontSize: '0.95rem', color: '#213145' }}>
                <span>Total a Pagar:</span>
                <span style={{ color: '#FEA004' }}>${totalAmount.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Botón Pagar */}
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing || !taxIdNumber || !taxLegalName}
              style={{
                width: '100%',
                background: isProcessing ? '#94A3B8' : '#FEA004',
                color: '#FFFFFF',
                border: 'none',
                padding: '0.85rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(254, 160, 4, 0.35)'
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Emitiendo Comprobante Electrónico...</span>
                </>
              ) : (
                <>
                  <span>Autorizar Pago de ${totalAmount.toFixed(2)} USD</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
