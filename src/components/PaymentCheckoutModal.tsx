import React, { useState } from 'react';
import { X, CreditCard, QrCode, Building, CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
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
  const [cardHolder, setCardHolder] = useState(user?.fullName || 'Mateo Serrano');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('890');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedIntent, setCompletedIntent] = useState<PaymentIntent | null>(null);

  if (!isOpen) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const intent = await paymentService.executePayment(
        user?.id || 'demo-user-1',
        user?.email || 'usuario@propiedadespremier.ec',
        planCode,
        amountUsd,
        method
      );
      setTimeout(() => {
        setIsProcessing(false);
        setCompletedIntent(intent);
        setTimeout(() => {
          onPaymentSuccess(intent);
        }, 1800);
      }, 1400);
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
          borderRadius: '20px',
          width: '100%',
          maxWidth: '580px',
          padding: '2rem 2.25rem',
          boxShadow: '0 25px 60px -15px rgba(33, 49, 69, 0.25)',
          border: '1px solid #E2E8F0',
          position: 'relative',
          maxHeight: '90vh',
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
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={54} color="#16A34A" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', margin: '0 0 0.5rem 0' }}>
              ¡Pago Confirmado con Éxito!
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '0 0 1.25rem 0' }}>
              Tu suscripción al <strong>{planName}</strong> ha sido activada en tu cuenta.
            </p>
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', textAlign: 'left', fontSize: '0.8rem', color: '#475569' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span>Monto Facturado:</span>
                <strong style={{ color: '#213145' }}>${amountUsd} USD</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span>Comprobante:</span>
                <strong>{completedIntent.receiptNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Referencia:</span>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{completedIntent.transactionRef}</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
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
                <span>PASARELA SEGURA ECUADOR · PROPIEDADES PREMIER</span>
              </div>
              <h2 id="checkout-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#213145', margin: '0 0 0.25rem 0' }}>
                Confirmar Activación de Membresía
              </h2>
              <div style={{ fontSize: '0.88rem', color: '#64748B' }}>
                Plan seleccionado: <strong style={{ color: '#213145' }}>{planName}</strong> · Valor: <strong style={{ color: '#FEA004', fontSize: '1.1rem' }}>${amountUsd} USD</strong>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <button
                type="button"
                onClick={() => setMethod('PAYPHONE')}
                style={{
                  padding: '0.75rem 0.25rem',
                  borderRadius: '10px',
                  border: method === 'PAYPHONE' ? '2px solid #FEA004' : '1px solid #E2E8F0',
                  background: method === 'PAYPHONE' ? '#FFF7ED' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <CreditCard size={18} color={method === 'PAYPHONE' ? '#FEA004' : '#64748B'} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: method === 'PAYPHONE' ? '#FEA004' : '#64748B' }}>
                  Payphone
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('DEUNA')}
                style={{
                  padding: '0.75rem 0.25rem',
                  borderRadius: '10px',
                  border: method === 'DEUNA' ? '2px solid #FEA004' : '1px solid #E2E8F0',
                  background: method === 'DEUNA' ? '#FFF7ED' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <QrCode size={18} color={method === 'DEUNA' ? '#FEA004' : '#64748B'} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: method === 'DEUNA' ? '#FEA004' : '#64748B' }}>
                  Deuna!
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('CREDIT_CARD')}
                style={{
                  padding: '0.75rem 0.25rem',
                  borderRadius: '10px',
                  border: method === 'CREDIT_CARD' ? '2px solid #FEA004' : '1px solid #E2E8F0',
                  background: method === 'CREDIT_CARD' ? '#FFF7ED' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <CreditCard size={18} color={method === 'CREDIT_CARD' ? '#FEA004' : '#64748B'} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: method === 'CREDIT_CARD' ? '#FEA004' : '#64748B' }}>
                  Tarjeta
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('BANK_TRANSFER')}
                style={{
                  padding: '0.75rem 0.25rem',
                  borderRadius: '10px',
                  border: method === 'BANK_TRANSFER' ? '2px solid #FEA004' : '1px solid #E2E8F0',
                  background: method === 'BANK_TRANSFER' ? '#FFF7ED' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Building size={18} color={method === 'BANK_TRANSFER' ? '#FEA004' : '#64748B'} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: method === 'BANK_TRANSFER' ? '#FEA004' : '#64748B' }}>
                  Transfer
                </span>
              </button>
            </div>

            {/* Form depending on method */}
            {method === 'DEUNA' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem', background: '#FFFDF5', border: '1px solid #FEF08A', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <QrCode size={120} color="#213145" style={{ margin: '0 auto 0.75rem auto' }} />
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#213145' }}>
                  Escanea este código QR con tu App Deuna! (Banco Pichincha)
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.25rem' }}>
                  Acreditación instantánea y activación sin costo de comisión bancaria.
                </div>
              </div>
            ) : method === 'BANK_TRANSFER' ? (
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#334155' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#213145' }}>Datos de Transferencia Directa:</strong>
                <div>• Banco: <strong>Banco Pichincha</strong> (Cta. Corriente #2100492819)</div>
                <div>• Beneficiario: <strong>Propiedades Premier Ec S.A.S.</strong></div>
                <div>• RUC: <strong>1792408912001</strong></div>
                <div>• Correo comprobantes: <strong>pagos@propiedadespremier.ec</strong></div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                    Nombre del Titular
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                      Vencimiento (MM/AA)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                      CVV
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              style={{
                width: '100%',
                background: '#FEA004',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '0.85rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: isProcessing ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(254, 160, 4, 0.4)'
              }}
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="spin-icon" />
                  <span>Procesando pago seguro...</span>
                </>
              ) : (
                <>
                  <span>Pagar ${amountUsd} USD y Activar Plan</span>
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
