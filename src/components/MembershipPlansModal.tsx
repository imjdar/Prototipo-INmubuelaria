import React from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  CreditCard
} from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../services/authService';
import { PlanCode, UserSubscription } from '../types/auth';

interface MembershipPlansModalProps {
  isOpen: boolean;
  currentSubscription: UserSubscription | null;
  onClose: () => void;
  onSelectPlan: (planCode: PlanCode) => void;
}

export const MembershipPlansModal: React.FC<MembershipPlansModalProps> = ({
  isOpen,
  currentSubscription,
  onClose,
  onSelectPlan
}) => {
  if (!isOpen) return null;

  const currentCode = currentSubscription?.plan?.code || 'FREE';

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="plans-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '920px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px -15px rgba(23, 26, 28, 0.25)',
          border: '1px solid #E5E7EB',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar planes"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: '#F3F4F6',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4B5563'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(212, 175, 55, 0.12)',
            color: '#B89230',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.6rem'
          }}>
            <Sparkles size={14} />
            <span>Membresías PropTech Quito & Valles</span>
          </div>
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2rem',
            color: '#171A1C',
            margin: '0 0 0.5rem 0'
          }}>
            Escala tu Presencia Inmobiliaria en Quito
          </h2>
          <p style={{ color: '#6B7280', fontSize: '0.925rem', maxWidth: '600px', margin: '0 auto' }}>
            Planes diseñados con beneficios hiperlocales: verificación notarial DMQ, videos 9:16 y el Bot Guardián de IA.
          </p>
        </div>

        {/* Plans Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Plan 1: Free */}
          <div style={{
            border: currentCode === 'FREE' ? '2px solid #D4AF37' : '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            background: currentCode === 'FREE' ? '#FDFBF7' : '#FFFFFF',
            position: 'relative'
          }}>
            {currentCode === 'FREE' && (
              <span style={{
                position: 'absolute',
                top: '-10px',
                right: '16px',
                background: '#D4AF37',
                color: '#171A1C',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Plan Activo
              </span>
            )}
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#171A1C' }}>
              {MEMBERSHIP_PLANS.FREE.name}
            </h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#171A1C' }}>$0</span>
              <span style={{ color: '#6B7280', fontSize: '0.85rem' }}> /siempre</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {MEMBERSHIP_PLANS.FREE.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#4B5563' }}>
                  <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelectPlan('FREE')}
              disabled={currentCode === 'FREE'}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                background: currentCode === 'FREE' ? '#E5E7EB' : '#FFFFFF',
                color: currentCode === 'FREE' ? '#9CA3AF' : '#374151',
                fontWeight: 600,
                fontSize: '0.825rem',
                cursor: currentCode === 'FREE' ? 'default' : 'pointer'
              }}
            >
              {currentCode === 'FREE' ? 'Tu Plan Actual' : 'Seleccionar Gratuito'}
            </button>
          </div>

          {/* Plan 2: Agente Pro (Highlight) */}
          <div style={{
            border: '2px solid #D4AF37',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFFFF',
            position: 'relative',
            boxShadow: '0 10px 30px -5px rgba(212, 175, 55, 0.2)'
          }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#D4AF37',
              color: '#171A1C',
              padding: '3px 12px',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              ⭐ Más Popular en Quito
            </span>
            <h3 style={{ margin: '0.25rem 0 0.5rem 0', fontSize: '1.15rem', color: '#171A1C' }}>
              {MEMBERSHIP_PLANS.PRO_AGENT.name}
            </h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#171A1C' }}>$39</span>
              <span style={{ color: '#6B7280', fontSize: '0.85rem' }}> /mes (facturación anual $390)</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {MEMBERSHIP_PLANS.PRO_AGENT.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#1F2937' }}>
                  <Check size={15} color="#D4AF37" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontWeight: i === 1 ? 600 : 400 }}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelectPlan('PRO_AGENT')}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: 'none',
                background: currentCode === 'PRO_AGENT' ? '#171A1C' : '#D4AF37',
                color: currentCode === 'PRO_AGENT' ? '#FFFFFF' : '#171A1C',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'transform 0.15s'
              }}
            >
              {currentCode === 'PRO_AGENT' ? 'Tu Plan Activo' : 'Activar Agente Pro'}
            </button>
          </div>

          {/* Plan 3: VIP Inmobiliaria */}
          <div style={{
            border: currentCode === 'VIP_INMOBILIARIA' ? '2px solid #D4AF37' : '1px solid #E5E7EB',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            background: currentCode === 'VIP_INMOBILIARIA' ? '#FDFBF7' : '#FFFFFF',
            position: 'relative'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#171A1C' }}>
              {MEMBERSHIP_PLANS.VIP_INMOBILIARIA.name}
            </h3>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 700, color: '#171A1C' }}>$119</span>
              <span style={{ color: '#6B7280', fontSize: '0.85rem' }}> /mes</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {MEMBERSHIP_PLANS.VIP_INMOBILIARIA.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#4B5563' }}>
                  <Check size={15} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => onSelectPlan('VIP_INMOBILIARIA')}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '8px',
                border: '1px solid #171A1C',
                background: currentCode === 'VIP_INMOBILIARIA' ? '#171A1C' : '#FFFFFF',
                color: currentCode === 'VIP_INMOBILIARIA' ? '#FFFFFF' : '#171A1C',
                fontWeight: 600,
                fontSize: '0.825rem',
                cursor: 'pointer'
              }}
            >
              {currentCode === 'VIP_INMOBILIARIA' ? 'Tu Plan Activo' : 'Elegir VIP Inmobiliaria'}
            </button>
          </div>
        </div>

        {/* Local Payment Badges (Payphone + Deuna) */}
        <div style={{
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CreditCard size={20} color="#374151" />
            <div style={{ fontSize: '0.8rem', color: '#4B5563' }}>
              <strong>Pasarelas Ecuatorianas Integradas:</strong> Tarjetas Visa/Mastercard con <strong>Payphone</strong> y pagos instantáneos con QR <strong>Deuna (Banco Pichincha)</strong>.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #D1D5DB', fontWeight: 700, color: '#FE5000' }}>
              Payphone
            </span>
            <span style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #D1D5DB', fontWeight: 700, color: '#FFE000' }}>
              Deuna!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
