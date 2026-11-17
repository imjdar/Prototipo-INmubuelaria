import React, { useState, useMemo } from 'react';
import { Property } from '../types/property';
import { 
  Heart, 
  ChevronRight, 
  ChevronLeft,
  Bed, 
  Bath, 
  Maximize2, 
  MessageSquare, 
  Scale, 
  Eye,
  Zap
} from 'lucide-react';
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
  
  // High-Resolution Image Carousel: Gather main photo and subPhotos
  const photos = useMemo(() => {
    const list = [property.image, ...(property.subPhotos || [])].filter(Boolean);
    return list.length > 0 ? list : ['/images/cumbaya_villa.jpg'];
  }, [property.image, property.subPhotos]);

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);
  const [isHeartBouncing, setIsHeartBouncing] = useState<boolean>(false);

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartBouncing(true);
    setTimeout(() => setIsHeartBouncing(false), 450);
    onToggleFavorite(property.id);
  };

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
      {/* Media Image Container with Badges & Interactive Carousel */}
      <div className="card-media-wrapper">
        <img
          src={photos[currentPhotoIdx] || property.image}
          alt={`${property.title} - Foto ${currentPhotoIdx + 1}`}
          loading="lazy"
          className="card-media-img"
        />

        {/* Top-Left Badge: "En Venta" / "En Renta" matching Mockup */}
        <div className="card-tag-pill">
          {isRental ? 'En Renta' : 'En Venta'}
        </div>

        {/* Quito Differentiator Badge (Generador 100% or Metro) */}
        {property.features?.hasGenerator ? (
          <div className="card-feature-pill-generator" title="Equipado con generador eléctrico 100%">
            <Zap size={11} fill="#FEA004" color="#FEA004" />
            <span>Generador 100%</span>
          </div>
        ) : property.features?.hasMetro ? (
          <div className="card-feature-pill-generator" title="A menos de 5 min a pie del Metro DMQ">
            <span>🚇 Metro &lt;5m</span>
          </div>
        ) : null}

        {/* Top-Right Favorite Heart Button matching Mockup */}
        <button
          type="button"
          className={`card-heart-btn ${isFavorite ? 'is-fav' : ''} ${isHeartBouncing ? 'heart-bounce' : ''}`}
          onClick={handleFavoriteClick}
          title={isFavorite ? 'Quitar de guardados' : 'Guardar propiedad'}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart 
            size={18} 
            fill={isFavorite ? '#FEA004' : 'none'} 
            color={isFavorite ? '#FEA004' : '#FFFFFF'} 
          />
        </button>

        {/* Quick Photo Carousel Nav Controls (Zillow / Airbnb UX Pattern) */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              className="card-carousel-arrow prev"
              onClick={handlePrevPhoto}
              aria-label="Foto anterior"
              title="Foto anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="card-carousel-arrow next"
              onClick={handleNextPhoto}
              aria-label="Siguiente foto"
              title="Siguiente foto"
            >
              <ChevronRight size={16} />
            </button>

            {/* Carousel Dot Indicators */}
            <div className="card-carousel-dots" onClick={(e) => e.stopPropagation()}>
              {photos.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`card-carousel-dot ${idx === currentPhotoIdx ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPhotoIdx(idx);
                  }}
                  aria-label={`Ver foto ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

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
