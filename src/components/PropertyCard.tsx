import React from 'react';
import { Property } from '../types/property';
import { Heart, MessageSquare, Scale, Eye, Share2, Check } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  isCompared: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (property: Property) => void;
  onQuickView: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onShare: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  isCompared,
  onToggleFavorite,
  onToggleCompare,
  onQuickView,
  onSelectProperty,
  onContactWhatsApp,
  onShare
}) => {
  const pricePerSqm = Math.round(property.price / property.areaBuild);
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price);

  const formattedPricePerSqm = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(pricePerSqm);

  return (
    <article className={`property-card ${isCompared ? 'card-is-compared' : ''}`}>
      <div className="card-media">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          onClick={() => onSelectProperty(property)}
          style={{ cursor: 'pointer' }}
        />

        {/* Badges Overlay */}
        <div className="media-badges">
          <span className="badge-tag badge-verified">✓ Registro DMQ Auditado</span>
          {property.features.hasGenerator && (
            <span className="badge-tag badge-generator">⚡ Generador 100%</span>
          )}
          {property.features.hasMetro && (
            <span className="badge-tag badge-metro">🚇 Metro &lt; 2 min</span>
          )}
        </div>

        {/* Action Pills Overlay */}
        <div className="media-actions-overlay">
          {/* Quick View Button */}
          <button
            className="media-action-pill"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(property);
            }}
            title="Vista Rápida"
            aria-label={`Vista rápida de ${property.title}`}
          >
            <Eye size={15} />
          </button>

          {/* Share Button */}
          <button
            className="media-action-pill"
            onClick={(e) => {
              e.stopPropagation();
              onShare(property);
            }}
            title="Copiar enlace de propiedad"
            aria-label={`Compartir enlace de ${property.title}`}
          >
            <Share2 size={14} />
          </button>

          {/* Favorite Heart Button */}
          <button
            className={`media-action-pill media-favorite ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            title={isFavorite ? 'Quitar de guardados' : 'Guardar en colección privada'}
            aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            aria-pressed={isFavorite}
          >
            <Heart size={15} fill={isFavorite ? '#FFFFFF' : 'none'} color="#FFFFFF" />
          </button>
        </div>

        <div className="media-climate">{property.temperature}</div>
      </div>

      <div className="card-body">
        {/* Compare quick toggle affordance */}
        <div className="card-top-row">
          <div className="card-sector">
            {property.sector} · {property.microzone}
          </div>

          <button
            className={`btn-card-compare-toggle ${isCompared ? 'active' : ''}`}
            onClick={() => onToggleCompare(property)}
            title="Agregar al comparador de propiedades"
            aria-label={isCompared ? 'Remover de comparación' : 'Comparar propiedad'}
            aria-pressed={isCompared}
          >
            {isCompared ? (
              <>
                <Check size={12} />
                <span>En Comparador</span>
              </>
            ) : (
              <>
                <Scale size={12} />
                <span>Comparar</span>
              </>
            )}
          </button>
        </div>

        <h3 className="card-title" onClick={() => onSelectProperty(property)}>
          {property.title}
        </h3>

        <div className="card-pricing">
          <div className="price-main">{formattedPrice}</div>
          <div className="price-sqm">{formattedPricePerSqm} / m² constr.</div>
        </div>

        <div className="card-specs">
          <div className="spec-item">
            <div className="spec-val">{property.bedrooms}</div>
            <div className="spec-lbl">Suites</div>
          </div>
          <div className="spec-item">
            <div className="spec-val">{property.bathrooms}</div>
            <div className="spec-lbl">Baños</div>
          </div>
          <div className="spec-item">
            <div className="spec-val">{property.areaBuild}</div>
            <div className="spec-lbl">m² Constr.</div>
          </div>
          <div className="spec-item">
            <div className="spec-val">{property.areaLot}</div>
            <div className="spec-lbl">m² Lote</div>
          </div>
        </div>

        <div className="card-trust-meta">
          <div className="meta-row">
            <span style={{ color: 'var(--accent-gold-hover)' }}>🛡️</span>
            <span>Alícuota: <strong>${property.hoaFee}/mes</strong> (guardianía y áreas)</span>
          </div>
          <div className="meta-row">
            <span style={{ color: 'var(--accent-gold-hover)' }}>📜</span>
            <span>{property.legalStatus}</span>
          </div>
        </div>

        <div className="card-actions">
          <button
            className="btn-card-detail"
            onClick={() => onSelectProperty(property)}
          >
            Ver Ficha & Gastos Notariales
          </button>
          <button
            className="btn-card-whatsapp"
            onClick={() => onContactWhatsApp(property)}
            title="Contactar con asesor por WhatsApp"
            aria-label="Contactar por WhatsApp"
          >
            <MessageSquare size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};
