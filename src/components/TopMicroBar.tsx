import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface TopMicroBarProps {
  isMobileSimulated: boolean;
  onToggleMobile: () => void;
}

export const TopMicroBar: React.FC<TopMicroBarProps> = ({ isMobileSimulated, onToggleMobile }) => {
  return (
    <div className="top-micro-bar">
      <div className="trust-pills">
        <span className="trust-pill">
          <span>📜</span> 100% Auditoría Registro de la Propiedad DMQ
        </span>
        <span className="trust-pill">
          <span>⚡</span> Filtro Exclusivo: Generador Eléctrico 100%
        </span>
        <span className="trust-pill">
          <span>🚫</span> Cero Avisos Duplicados ni Fantasmas
        </span>
      </div>
      <div>
        <button
          className={`btn-mode ${isMobileSimulated ? 'active' : ''}`}
          onClick={onToggleMobile}
          title="Alternar simulador de dispositivo móvil"
        >
          {isMobileSimulated ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Monitor size={12} /> Volver a Vista Escritorio
            </span>
          ) : (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <Smartphone size={12} /> Probar Vista Móvil (390px)
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
