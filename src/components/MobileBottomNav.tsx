import React from 'react';
import { Search, Map, Heart, Sparkles, PlusCircle } from 'lucide-react';
import { SiteView } from './Header';

interface MobileBottomNavProps {
  activeView: SiteView;
  savedCount: number;
  onNavigate: (view: SiteView) => void;
  onOpenFavorites: () => void;
  onOpenValuator: () => void;
  onOpenPublish: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  savedCount,
  onNavigate,
  onOpenFavorites,
  onOpenValuator,
  onOpenPublish
}) => {
  // If user is inside the property detail view, yield full screen space to the contact & scheduling bar
  if (activeView === 'detail') {
    return null;
  }

  const isExploreActive = activeView === 'comprar' || activeView === 'catalog';
  const isMapActive = activeView === 'split';

  return (
    <nav className="mobile-bottom-app-bar" aria-label="Navegación rápida móvil">
      {/* 1. Explorar / Catálogo */}
      <button
        type="button"
        className={`mobile-bottom-item ${isExploreActive ? 'is-active' : ''}`}
        onClick={() => onNavigate('comprar')}
        aria-label="Explorar propiedades"
      >
        <Search size={20} className="bottom-icon" />
        <span className="bottom-label">Explorar</span>
      </button>

      {/* 2. Mapa Cartográfico de Valles */}
      <button
        type="button"
        className={`mobile-bottom-item ${isMapActive ? 'is-active' : ''}`}
        onClick={() => onNavigate('split')}
        aria-label="Mapa cartográfico"
      >
        <Map size={20} className="bottom-icon" />
        <span className="bottom-label">Mapa</span>
      </button>

      {/* 3. Favoritos Guardados con Contador */}
      <button
        type="button"
        className="mobile-bottom-item"
        onClick={onOpenFavorites}
        aria-label={`Favoritos guardados (${savedCount})`}
      >
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Heart 
            size={20} 
            fill={savedCount > 0 ? '#FEA004' : 'none'} 
            color={savedCount > 0 ? '#FEA004' : 'currentColor'} 
            className="bottom-icon"
          />
          {savedCount > 0 && (
            <span className="bottom-badge-counter">{savedCount}</span>
          )}
        </div>
        <span className="bottom-label">Favoritos</span>
      </button>

      {/* 4. Tasador Inteligente IA */}
      <button
        type="button"
        className="mobile-bottom-item"
        onClick={onOpenValuator}
        aria-label="Tasador inteligente con inteligencia artificial"
      >
        <Sparkles size={20} color="#FEA004" className="bottom-icon" />
        <span className="bottom-label">Tasador IA</span>
      </button>

      {/* 5. Publicar Propiedad (Acción destacada) */}
      <button
        type="button"
        className="mobile-bottom-item publish-highlight"
        onClick={onOpenPublish}
        aria-label="Publicar nueva propiedad"
      >
        <div className="publish-circle-btn">
          <PlusCircle size={22} color="#FFFFFF" />
        </div>
        <span className="bottom-label">Publicar</span>
      </button>
    </nav>
  );
};
