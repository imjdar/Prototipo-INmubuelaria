import React from 'react';
import { MessageSquare, Heart, Scale } from 'lucide-react';

interface HeaderProps {
  activeView: 'catalog' | 'split' | 'detail';
  savedCount: number;
  comparedCount: number;
  onNavigate: (view: 'catalog' | 'split' | 'detail') => void;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenWhatsApp: () => void;
  onSelectPropertyById: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  savedCount,
  comparedCount,
  onNavigate,
  onOpenFavorites,
  onOpenCompare,
  onOpenWhatsApp,
  onSelectPropertyById
}) => {
  return (
    <header className="site-header">
      <div className="brand-wrapper" onClick={() => onNavigate('catalog')}>
        <div className="brand-title">VALLE & URBE</div>
        <div className="brand-subtitle">Quito Real Estate</div>
      </div>

      <nav aria-label="Navegación principal">
        <ul className="nav-links">
          <li>
            <button
              className={`nav-link ${activeView === 'catalog' ? 'active' : ''}`}
              onClick={() => onNavigate('catalog')}
            >
              Colección Exclusiva
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'split' ? 'active' : ''}`}
              onClick={() => onNavigate('split')}
            >
              Explorador & Mapa Valles
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'detail' ? 'active' : ''}`}
              onClick={() => onSelectPropertyById('VU-CUM-048')}
            >
              Ficha & Due Diligence
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => onSelectPropertyById('VU-CAR-005')}
            >
              Inversión & Metro
            </button>
          </li>
        </ul>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Compare quick button in header */}
        {comparedCount > 0 && (
          <button
            className="btn-header-tool active-compare"
            onClick={onOpenCompare}
            title="Abrir comparador técnico de propiedades"
            aria-label={`Comparador con ${comparedCount} propiedades`}
          >
            <Scale size={15} />
            <span>Comparar</span>
            <span className="header-badge-count count-gold">{comparedCount}</span>
          </button>
        )}

        {/* Favorites Wishlist button */}
        <button
          className={`btn-header-tool ${savedCount > 0 ? 'has-favorites' : ''}`}
          onClick={onOpenFavorites}
          title="Ver mi portafolio guardado de propiedades"
          aria-label={`Favoritos con ${savedCount} propiedades`}
        >
          <Heart size={15} fill={savedCount > 0 ? '#E11D48' : 'none'} color={savedCount > 0 ? '#E11D48' : 'currentColor'} />
          <span>Favoritos</span>
          {savedCount > 0 && (
            <span className="header-badge-count count-pink">{savedCount}</span>
          )}
        </button>

        <div className="currency-pill">
          USD ($) · Ecuador
        </div>

        <button
          className="btn-whatsapp-vip"
          onClick={onOpenWhatsApp}
          aria-label="Contactar al WhatsApp VIP Concierge"
        >
          <span className="pulse-dot"></span>
          <MessageSquare size={14} style={{ color: '#22C55E' }} />
          <span>WhatsApp VIP</span>
        </button>
      </div>
    </header>
  );
};
