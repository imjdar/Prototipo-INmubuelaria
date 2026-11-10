import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface TopMicroBarProps {
  isMobileSimulated: boolean;
  onToggleMobile: () => void;
}

export const TopMicroBar: React.FC<TopMicroBarProps> = ({ isMobileSimulated, onToggleMobile }) => {
  return (
    <div 
      className="top-micro-bar-refined"
      style={{
        background: '#213145',
        color: '#F8F9FA',
        fontSize: '0.74rem',
        padding: '0.35rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="trust-pills desktop-only" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#CBD5E1' }}>
          <span>📜</span> 100% Auditoría Registro de la Propiedad DMQ
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#CBD5E1' }}>
          <span>⚡</span> Filtro Exclusivo: Generador Eléctrico 100%
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#CBD5E1' }}>
          <span>🚫</span> Cero Avisos Duplicados ni Fantasmas
        </span>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button
          className={`btn-mode ${isMobileSimulated ? 'active' : ''}`}
          onClick={onToggleMobile}
          title="Alternar simulador de dispositivo móvil"
          style={{
            background: isMobileSimulated ? '#FEA004' : 'rgba(255, 255, 255, 0.12)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '999px',
            padding: '0.2rem 0.75rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          {isMobileSimulated ? (
            <>
              <Monitor size={12} />
              <span>Volver a Vista Escritorio</span>
            </>
          ) : (
            <>
              <Smartphone size={12} />
              <span>Marco iPhone Mockup</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

