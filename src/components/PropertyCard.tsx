import React from 'react';
import { Property } from '../types/property';
import { Heart, ChevronRight, Bed, Bath, Maximize2, MessageSquare, Scale, Eye } from 'lucide-react';
import { PriceOpportunityBadge } from './PriceOpportunityBadge';

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
  onOpenAlert?: (property: Property) => void;
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
  onShare: _onShare,
  onOpenAlert: _onOpenAlert
}) => {
  const isRental = property.price < 5000;
  
  // Format price e.g. "$ 299.000" or "$ 1.200 / mes" matching Mockup
  const formattedPrice = new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(property.price).replace('USD', '$');

  return (
    <article 
      className={`premier-property-card ${isCompared ? 'is-in-compare' : ''}`}
      onClick={() => onSelectProperty(property)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectProperty(property);
        }
      }}
      aria-label={`${property.title}, precio ${formattedPrice}`}
    >
      {/* Media Image Container with Badges */}
      <div className="card-media-wrapper">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="card-media-img"
        />

        {/* Top-Left Badge: "En Venta" / "En Renta" matching Mockup */}
        <div className="card-tag-pill">
          {isRental ? 'En Renta' : 'En Venta'}
        </div>

        {/* Top-Right Favorite Heart Button matching Mockup */}
        <button
          type="button"
          className={`card-heart-btn ${isFavorite ? 'is-fav' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          title={isFavorite ? 'Quitar de guardados' : 'Guardar propiedad'}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart 
            size={18} 
            fill={isFavorite ? '#FEA004' : 'none'} 
            color={isFavorite ? '#FEA004' : '#FFFFFF'} 
          />
        </button>

        {/* Quick View Button on Image Hover */}
        <button
          type="button"
          className="card-quickview-floating-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(property);
          }}
          title="Vista Rápida"
          aria-label="Vista rápida de la propiedad"
        >
          <Eye size={14} />
          <span>Vista Rápida</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="card-details-body">
        {/* Title: "Tipo | Sector" matching Mockup */}
        <h3 className="card-primary-title">
          {property.type} | {property.sector}
        </h3>

        {/* Subtitle: "Sector, Microzona" */}
        <p className="card-location-subtitle">
          {property.sector}, {property.microzone || 'Quito'}
        </p>

        {/* Specs Row with Clean Line Icons: m², beds, baths matching Mockup */}
        <div className="card-specs-strip">
          <div className="spec-item" title={`${property.areaBuild} m² de construcción`}>
            <Maximize2 size={15} className="spec-icon" />
            <span>{property.areaBuild} m²</span>
          </div>

          {property.bedrooms > 0 && (
            <div className="spec-item" title={`${property.bedrooms} habitaciones / suites`}>
              <Bed size={16} className="spec-icon" />
              <span>{property.bedrooms}</span>
            </div>
          )}

          <div className="spec-item" title={`${property.bathrooms} baños`}>
            <Bath size={15} className="spec-icon" />
            <span>{property.bathrooms}</span>
          </div>
        </div>

        {/* Price & Chevron Row matching Mockup */}
        <div className="card-price-footer">
          <div className="price-display-wrapper">
            <span className="price-amount-text">
              {formattedPrice} {isRental && <span className="price-rental-unit">/ mes</span>}
            </span>
            {property.price > 5000 && (
              <PriceOpportunityBadge 
                price={property.price} 
                areaBuild={property.areaBuild} 
                sector={property.sector} 
                compact 
              />
            )}
          </div>

          <div className="card-chevron-box" aria-hidden="true">
            <ChevronRight size={18} color="#FEA004" />
          </div>
        </div>

        {/* Understated Fast-Action Bottom Bar for Power Features */}
        <div className="card-quick-actions-bar" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={`btn-action-compact compare ${isCompared ? 'is-active' : ''}`}
            onClick={() => onToggleCompare(property)}
            title="Comparar propiedad"
          >
            <Scale size={13} />
            <span>{isCompared ? 'Comparando' : 'Comparar'}</span>
          </button>

          <button
            type="button"
            className="btn-action-compact whatsapp"
            onClick={() => onContactWhatsApp(property)}
            title="Preguntar por WhatsApp"
          >
            <MessageSquare size={13} />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
};
