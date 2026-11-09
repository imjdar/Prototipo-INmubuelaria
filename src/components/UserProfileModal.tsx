import React from 'react';
import { 
  X, 
  ShieldCheck, 
  LogOut, 
  Mail, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { User as UserType, UserSubscription } from '../types/auth';

interface UserProfileModalProps {
  isOpen: boolean;
  user: UserType | null;
  subscription: UserSubscription | null;
  onClose: () => void;
  onLogout: () => void;
  onOpenPlans: () => void;
  onSwitchDemo: (key: 'agent' | 'buyer' | 'admin') => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  user,
  subscription,
  onClose,
  onLogout,
  onOpenPlans,
  onSwitchDemo
}) => {
  if (!isOpen || !user) return null;

  const roleLabels: Record<string, { label: string; badgeColor: string; textColor: string }> = {
    SUPER_ADMIN: { label: 'Super Administrador DMQ', badgeColor: 'rgba(239, 68, 68, 0.12)', textColor: '#DC2626' },
    AGENT: { label: 'Agente Inmobiliario Verificado', badgeColor: 'rgba(212, 175, 55, 0.15)', textColor: '#B89230' },
    BUYER: { label: 'Inversionista / Comprador VIP', badgeColor: 'rgba(59, 130, 246, 0.12)', textColor: '#2563EB' }
  };

  const roleMeta = roleLabels[user.role] || roleLabels.BUYER;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="user-profile-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '540px',
          padding: '2rem',
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
          aria-label="Cerrar modal de perfil"
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

        {/* User Identity Header */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #D4AF37',
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)'
            }}
          />
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: roleMeta.badgeColor,
              color: roleMeta.textColor,
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              fontSize: '0.72rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '0.35rem'
            }}>
              <ShieldCheck size={13} />
              <span>{roleMeta.label}</span>
            </div>
            <h2 style={{ 
              margin: '0 0 0.2rem 0', 
              fontSize: '1.4rem', 
              fontFamily: 'Playfair Display, serif',
              color: '#171A1C' 
            }}>
              {user.fullName}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6B7280', fontSize: '0.825rem' }}>
              <Mail size={13} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Profile Details List */}
        <div style={{
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.25rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          fontSize: '0.825rem'
        }}>
          <div>
            <div style={{ color: '#9CA3AF', fontSize: '0.72rem', textTransform: 'uppercase' }}>Teléfono / WhatsApp</div>
            <div style={{ fontWeight: 600, color: '#1F2937', marginTop: '2px' }}>{user.phone}</div>
          </div>
          <div>
            <div style={{ color: '#9CA3AF', fontSize: '0.72rem', textTransform: 'uppercase' }}>Estado de Verificación</div>
            <div style={{ fontWeight: 600, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <CheckCircle2 size={13} />
              <span>Certificado DMQ Activo</span>
            </div>
          </div>
          {user.companyName && (
            <div>
              <div style={{ color: '#9CA3AF', fontSize: '0.72rem', textTransform: 'uppercase' }}>Inmobiliaria / Firma</div>
              <div style={{ fontWeight: 600, color: '#1F2937', marginTop: '2px' }}>{user.companyName}</div>
            </div>
          )}
          {user.licenseNumber && (
            <div>
              <div style={{ color: '#9CA3AF', fontSize: '0.72rem', textTransform: 'uppercase' }}>Licencia Notarial</div>
              <div style={{ fontWeight: 600, color: '#1F2937', marginTop: '2px' }}>{user.licenseNumber}</div>
            </div>
          )}
        </div>

        {/* Subscription Plan Card */}
        {subscription && (
          <div style={{
            background: 'linear-gradient(135deg, #171A1C 0%, #2A2F33 100%)',
            color: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.25rem',
            boxShadow: '0 8px 24px rgba(23, 26, 28, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span style={{ 
                  color: '#D4AF37', 
                  fontSize: '0.72rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.08em', 
                  textTransform: 'uppercase' 
                }}>
                  Plan de Membresía Actual
                </span>
                <h3 style={{ margin: '0.2rem 0 0 0', fontSize: '1.2rem', fontFamily: 'Playfair Display, serif' }}>
                  {subscription.plan.name}
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#D4AF37' }}>
                  ${subscription.plan.monthlyPriceUsd}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}> /mes</span>
              </div>
            </div>

            {/* Quota Progress */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem', color: '#D1D5DB' }}>
                <span>Cupo de publicaciones activas:</span>
                <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
                  {subscription.usedListings} de {subscription.plan.maxListings} usadas
                </span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ 
                  width: `${Math.min(100, (subscription.usedListings / subscription.plan.maxListings) * 100)}%`, 
                  height: '100%', 
                  background: '#D4AF37', 
                  borderRadius: '999px' 
                }}></div>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => {
                onClose();
                onOpenPlans();
              }}
              style={{
                width: '100%',
                padding: '0.6rem',
                background: '#D4AF37',
                color: '#171A1C',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s'
              }}
            >
              <span>Gestionar o Mejorar Plan de Membresía</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Demo Persona Switcher (For Pair-Programming / QA testing) */}
        <div style={{
          background: '#F3F4F6',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4B5563', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Alternar Cuenta de Prueba (Demo RBAC):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => onSwitchDemo('agent')}
              style={{
                padding: '0.45rem',
                borderRadius: '6px',
                border: user.role === 'AGENT' ? '2px solid #D4AF37' : '1px solid #D1D5DB',
                background: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              💼 Agente Pro
            </button>
            <button
              type="button"
              onClick={() => onSwitchDemo('buyer')}
              style={{
                padding: '0.45rem',
                borderRadius: '6px',
                border: user.role === 'BUYER' ? '2px solid #D4AF37' : '1px solid #D1D5DB',
                background: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              💎 Compradora
            </button>
            <button
              type="button"
              onClick={() => onSwitchDemo('admin')}
              style={{
                padding: '0.45rem',
                borderRadius: '6px',
                border: user.role === 'SUPER_ADMIN' ? '2px solid #D4AF37' : '1px solid #D1D5DB',
                background: '#FFFFFF',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ⚡ SuperAdmin
            </button>
          </div>
        </div>

        {/* Logout Action */}
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            color: '#DC2626',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'background 0.15s'
          }}
        >
          <LogOut size={16} />
          <span>Cerrar Sesión Segura</span>
        </button>
      </div>
    </div>
  );
};
