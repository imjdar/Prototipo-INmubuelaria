import React from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  CreditCard,
  Building2,
  Building,
  UserCheck
} from 'lucide-react';
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
          borderRadius: '20px',
          width: '100%',
          maxWidth: '960px',
          padding: '2.5rem',
          boxShadow: '0 25px 60px -15px rgba(33, 49, 69, 0.25)',
          border: '1px solid #E2E8F0',
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

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: '#FFF7ED',
            color: '#FEA004',
            border: '1px solid #FED7AA',
            padding: '0.35rem 0.85rem',
            borderRadius: '999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.6rem'
          }}>
            <Sparkles size={14} color="#FEA004" />
            <span>MEMBRESÍAS Y PLANES · PROPIEDADES PREMIER</span>
          </div>
          <h2 style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            color: '#213145',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.02em'
          }}>
            Elige el plan ideal para publicar tus inmuebles
          </h2>
          <p style={{ color: '#64748B', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto' }}>
            Publica en Quito y sus valles con la máxima exposición: fotos HD, videos verticales 9:16, mapa interactivo y respaldo notarial.
          </p>
        </div>

        {/* Plans Grid (3 Main Plans from Sitemap) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Plan 1: Plan Esencial ($29) */}
          <div style={{
            border: currentCode === 'FREE' ? '2px solid #FEA004' : '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            background: currentCode === 'FREE' ? '#FFFBF5' : '#FFFFFF',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(33, 49, 69, 0.04)'
          }}>
            {currentCode === 'FREE' && (
              <span style={{
                position: 'absolute',
                top: '-11px',
                right: '18px',
                background: '#213145',
                color: '#FFFFFF',
                padding: '2px 10px',
                borderRadius: '999px',
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Plan Activo
              </span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <UserCheck size={20} color="#FEA004" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#213145' }}>
                Plan Esencial
              </h3>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1rem' }}>
              Dueño directo / Particular
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#213145' }}>$29</span>
              <span style={{ color: '#64748B', fontSize: '0.82rem' }}> / 3 meses</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>1 propiedad</strong> por 3 meses</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Hasta 40 fotografías en alta resolución</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Pin con precio en mapa interactivo</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Contacto directo por WhatsApp y llamada</span>
              </li>
            </ul>
            <button
              onClick={() => onSelectPlan('FREE')}
              disabled={currentCode === 'FREE'}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: 'none',
                background: currentCode === 'FREE' ? '#E2E8F0' : '#FEA004',
                color: currentCode === 'FREE' ? '#64748B' : '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: currentCode === 'FREE' ? 'default' : 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {currentCode === 'FREE' ? 'Plan Activo' : 'SELECCIONAR'}
            </button>
          </div>

          {/* Plan 2: Plan Profesional ($49) - Corredores (Highlight) */}
          <div style={{
            border: '2px solid #FEA004',
            borderRadius: '16px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            background: '#FFFFFF',
            position: 'relative',
            boxShadow: '0 12px 30px rgba(254, 160, 4, 0.18)'
          }}>
            <span style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#FEA004',
              color: '#FFFFFF',
              padding: '3px 14px',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              ⭐ Más Popular
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Building2 size={20} color="#FEA004" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#213145' }}>
                Plan Profesional
              </h3>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1rem' }}>
              Corredores inmobiliarios independientes
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#213145' }}>$49</span>
              <span style={{ color: '#64748B', fontSize: '0.82rem' }}> / 3 meses</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#1E293B' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Hasta 10 a 15 propiedades</strong> por 3 meses</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#1E293B' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Videos verticales 9:16</strong> estilo TikTok</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#1E293B' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Perfil de agente verificado en directorio</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#1E293B' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Auditoría prioritaria con Bot Guardián IA</span>
              </li>
            </ul>
            <button
              onClick={() => onSelectPlan('PRO_AGENT')}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: 'none',
                background: currentCode === 'PRO_AGENT' ? '#213145' : '#FEA004',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                boxShadow: currentCode === 'PRO_AGENT' ? 'none' : '0 4px 14px rgba(254, 160, 4, 0.4)',
                transition: 'all 0.15s ease'
              }}
            >
              {currentCode === 'PRO_AGENT' ? 'Tu Plan Activo' : 'SELECCIONAR'}
            </button>
          </div>

          {/* Plan 3: Plan Empresa ($99) */}
          <div style={{
            border: currentCode === 'VIP_INMOBILIARIA' ? '2px solid #FEA004' : '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            background: currentCode === 'VIP_INMOBILIARIA' ? '#FFFBF5' : '#FFFFFF',
            position: 'relative',
            boxShadow: '0 4px 12px rgba(33, 49, 69, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Building size={20} color="#FEA004" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#213145' }}>
                Plan Empresa
              </h3>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1rem' }}>
              Inmobiliarias y Constructoras
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: '#213145' }}>$99</span>
              <span style={{ color: '#64748B', fontSize: '0.82rem' }}> / 3 meses</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Hasta 40 a 100 propiedades</strong> / proyectos</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Perfil corporativo con logo y proyectos</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Dron, video vertical y planos PDF</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: '#334155' }}>
                <Check size={16} color="#FEA004" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Estadísticas avanzadas y leads por WhatsApp</span>
              </li>
            </ul>
            <button
              onClick={() => onSelectPlan('VIP_INMOBILIARIA')}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: 'none',
                background: currentCode === 'VIP_INMOBILIARIA' ? '#213145' : '#FEA004',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {currentCode === 'VIP_INMOBILIARIA' ? 'Tu Plan Activo' : 'SELECCIONAR'}
            </button>
          </div>
        </div>

        {/* Corporate Custom Plan Bar */}
        <div style={{
          background: '#213145',
          borderRadius: '12px',
          padding: '1.25rem 1.75rem',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#FEA004' }}>
              Plan Corporativo Personalizado
            </div>
            <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
              Grandes constructoras y fondos inmobiliarios con requerimientos a medida o API directa.
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#FEA004',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.6rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Contactar Ventas
          </button>
        </div>

        {/* Local Payment Badges matching Diagram */}
        <div style={{
          background: '#F8F9FA',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CreditCard size={20} color="#213145" />
            <div style={{ fontSize: '0.8rem', color: '#475569' }}>
              <strong>Métodos de Pago Seguros:</strong> Tarjetas de crédito/débito, Transferencia bancaria directa (Pichincha / Produbanco), <strong>Payphone</strong>, <strong>Deuna!</strong> y <strong>PayPal</strong>.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', fontWeight: 700, color: '#FE5000' }}>
              Payphone
            </span>
            <span style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', fontWeight: 700, color: '#FFE000' }}>
              Deuna!
            </span>
            <span style={{ fontSize: '0.72rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #CBD5E1', fontWeight: 700, color: '#0079C1' }}>
              PayPal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
