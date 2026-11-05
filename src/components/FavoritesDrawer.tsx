import React from 'react';
import { Property } from '../types/property';
import { X, Trash2, Scale, MessageSquare, Heart } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  savedProperties: Property[];
  onClose: () => void;
  onRemoveFavorite: (id: string) => void;
  onClearAllFavorites: () => void;
  onSelectProperty: (property: Property) => void;
  onCompareFavorites: () => void;
  onContactWhatsAppPortfolio: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  savedProperties,
  onClose,
  onRemoveFavorite,
  onClearAllFavorites,
  onSelectProperty,
  onCompareFavorites,
  onContactWhatsAppPortfolio
}) => {
  if (!isOpen) return null;

  const totalPortfolioValue = savedProperties.reduce((sum, p) => sum + p.price, 0);

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="favorites-drawer-title"
    >
      <div
        className="favorites-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="fav-icon-pill">
              <Heart size={16} fill="#E11D48" color="#E11D48" />
            </div>
            <div>
              <h3 id="favorites-drawer-title" className="drawer-title">
                Mi Portafolio Guardado
              </h3>
              <div className="drawer-subtitle">
                {savedProperties.length} {savedProperties.length === 1 ? 'propiedad guardada' : 'propiedades guardadas'}
              </div>
            </div>
          </div>

          <button
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Cerrar favoritos"
          >
            <X size={20} />
          </button>
        </div>

        {/* Portfolio Valuation Card */}
        {savedProperties.length > 0 && (
          <div className="portfolio-summary-card">
            <div className="portfolio-metric-row">
              <span className="portfolio-label">Valor Estimado del Portafolio:</span>
              <span className="portfolio-value">
                ${totalPortfolioValue.toLocaleString('en-US')} USD
              </span>
            </div>
            <div className="portfolio-subtext">
              Promedio: ${(Math.round(totalPortfolioValue / savedProperties.length)).toLocaleString('en-US')} USD por propiedad
            </div>
          </div>
        )}

        {/* Drawer Content */}
        <div className="drawer-body">
          {savedProperties.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="drawer-empty-icon">
                <Heart size={36} color="var(--text-muted)" />
              </div>
              <h4>No tienes propiedades guardadas aún</h4>
              <p>
                Haz clic en el ícono de corazón en cualquier tarjeta para armar tu selección patrimonial personalizada.
              </p>
            </div>
          ) : (
            <div className="drawer-items-list">
              {savedProperties.map((prop) => (
                <div key={prop.id} className="drawer-property-item">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="drawer-item-img"
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                  />
                  <div className="drawer-item-info">
                    <div className="drawer-item-sector">
                      {prop.sector} · {prop.microzone}
                    </div>
                    <h4
                      className="drawer-item-title"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                    >
                      {prop.title}
                    </h4>
                    <div className="drawer-item-price">
                      ${prop.price.toLocaleString('en-US')} USD
                    </div>
                    <div className="drawer-item-specs">
                      {prop.bedrooms} hab · {prop.bathrooms} baños · {prop.areaBuild} m²
                    </div>
                  </div>
                  <button
                    className="drawer-item-remove"
                    onClick={() => onRemoveFavorite(prop.id)}
                    title="Quitar de favoritos"
                    aria-label={`Quitar ${prop.title} de favoritos`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {savedProperties.length > 0 && (
          <div className="drawer-footer">
            <button
              className="btn-drawer-whatsapp"
              onClick={onContactWhatsAppPortfolio}
            >
              <MessageSquare size={16} />
              <span>Consultar Portafolio por WhatsApp</span>
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <button
                className="btn-drawer-compare"
                onClick={onCompareFavorites}
              >
                <Scale size={14} />
                <span>Comparar Todo</span>
              </button>

              <button
                className="btn-drawer-clear"
                onClick={onClearAllFavorites}
              >
                <Trash2 size={14} />
                <span>Vaciar Lista</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
