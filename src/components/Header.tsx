import React from 'react';
import { MessageSquare, Heart, Scale, User as UserIcon, PlusCircle } from 'lucide-react';
import { User } from '../types/auth';

interface HeaderProps {
  activeView: 'catalog' | 'split' | 'detail';
  savedCount: number;
  comparedCount: number;
  user: User | null;
  onNavigate: (view: 'catalog' | 'split' | 'detail') => void;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenWhatsApp: () => void;
  onSelectPropertyById: (id: string) => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenPlans: () => void;
  onOpenPublish: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  savedCount,
  comparedCount,
  user,
  onNavigate,
  onOpenFavorites,
  onOpenCompare,
  onOpenWhatsApp,
  onSelectPropertyById,
  onOpenAuth,
  onOpenProfile,
  onOpenPlans,
  onOpenPublish
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
              onClick={onOpenPlans}
            >
              Membresías & Agentes
            </button>
          </li>
        </ul>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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

        {/* Publicar Propiedad (Sprint 1 CTA) */}
        <button
          className="btn-publish-header"
          onClick={onOpenPublish}
          title="Publicar propiedad con Sello Notarial DMQ"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(212, 175, 55, 0.12)',
            color: '#B89230',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '999px',
            padding: '0.4rem 0.85rem',
            fontSize: '0.785rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
        >
          <PlusCircle size={14} color="#D4AF37" />
          <span>Publicar Inmueble</span>
        </button>

        {/* User Session Button (Sprint 1 Auth) */}
        {user ? (
          <button
            onClick={onOpenProfile}
            className="user-profile-header-btn"
            title={`Perfil de ${user.fullName} (${user.role})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '999px',
              padding: '0.25rem 0.75rem 0.25rem 0.35rem',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #D4AF37'
              }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#171A1C', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.fullName.split(' ')[0]}
            </span>
            <span style={{
              fontSize: '0.65rem',
              background: user.role === 'AGENT' ? '#FEFBF0' : '#F3F4F6',
              color: user.role === 'AGENT' ? '#B89230' : '#4B5563',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              padding: '1px 5px',
              borderRadius: '4px',
              fontWeight: 700
            }}>
              {user.role === 'AGENT' ? 'PRO' : user.role === 'SUPER_ADMIN' ? 'ADMIN' : 'VIP'}
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn-auth-login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#171A1C',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '999px',
              padding: '0.45rem 0.9rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <UserIcon size={14} color="#D4AF37" />
            <span>Ingresar</span>
          </button>
        )}

        {/* WhatsApp VIP Concierge Button */}
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
