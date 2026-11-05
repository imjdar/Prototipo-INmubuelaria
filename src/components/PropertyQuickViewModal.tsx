import React, { useState } from 'react';
import { Property } from '../types/property';
import { X, ChevronLeft, ChevronRight, MessageSquare, Calendar, ExternalLink, ShieldCheck, Zap, Train } from 'lucide-react';

interface PropertyQuickViewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onViewFullDetails: (property: Property) => void;
  onOpenSchedule: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
}

export const PropertyQuickViewModal: React.FC<PropertyQuickViewModalProps> = ({
  property,
  isOpen,
  onClose,
  onViewFullDetails,
  onOpenSchedule,
  onContactWhatsApp
}) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);

  if (!isOpen || !property) return null;

  const allPhotos = [property.image, ...(property.subPhotos || [])];
  const pricePerSqm = Math.round(property.price / property.areaBuild);

  const nextPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIdx((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div
        className="quickview-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn-modal-close quickview-close"
          onClick={onClose}
          aria-label="Cerrar vista rápida"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">
          {/* Photo Carousel */}
          <div className="quickview-media-col">
            <div className="quickview-photo-container">
              <img
                src={allPhotos[currentPhotoIdx]}
                alt={`${property.title} foto ${currentPhotoIdx + 1}`}
                className="quickview-img"
              />

              {allPhotos.length > 1 && (
                <>
                  <button
                    className="carousel-nav-btn prev"
                    onClick={prevPhoto}
                    aria-label="Foto anterior"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className="carousel-nav-btn next"
                    onClick={nextPhoto}
                    aria-label="Siguiente foto"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="carousel-counter">
                {currentPhotoIdx + 1} / {allPhotos.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allPhotos.length > 1 && (
              <div className="quickview-thumb-strip">
                {allPhotos.map((photo, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${idx === currentPhotoIdx ? 'active' : ''}`}
                    onClick={() => setCurrentPhotoIdx(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                  >
                    <img src={photo} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Specifications */}
          <div className="quickview-info-col">
            <div className="card-sector">
              {property.sector} · {property.microzone}
            </div>

            <h2 id="quickview-title" className="quickview-title">
              {property.title}
            </h2>

            <div className="quickview-pricing">
              <div className="price-main">
                ${property.price.toLocaleString('en-US')} USD
              </div>
              <div className="price-sqm">
                ${pricePerSqm.toLocaleString('en-US')} / m² constr.
              </div>
            </div>

            {/* Trust Badges */}
            <div className="quickview-badges">
              {property.features.hasGenerator && (
                <span className="badge-tag badge-generator">
                  <Zap size={12} /> Generador 100% Total
                </span>
              )}
              {property.features.hasMetro && (
                <span className="badge-tag badge-metro">
                  <Train size={12} /> Metro Quito (&lt; 2 min)
                </span>
              )}
              <span className="badge-tag badge-verified">
                <ShieldCheck size={12} /> Libre de Gravamen DMQ
              </span>
            </div>

            {/* Key specs */}
            <div className="quickview-specs-box">
              <div className="quick-spec">
                <span className="qs-val">{property.bedrooms}</span>
                <span className="qs-lbl">Habitaciones</span>
              </div>
              <div className="quick-spec">
                <span className="qs-val">{property.bathrooms}</span>
                <span className="qs-lbl">Baños</span>
              </div>
              <div className="quick-spec">
                <span className="qs-val">{property.areaBuild} m²</span>
                <span className="qs-lbl">Construcción</span>
              </div>
              <div className="quick-spec">
                <span className="qs-val">{property.areaLot} m²</span>
                <span className="qs-lbl">Terreno</span>
              </div>
            </div>

            <p className="quickview-desc">
              {property.description}
            </p>

            <div className="quickview-notarial-teaser">
              <div className="notarial-teaser-row">
                <span>Alcabala Municipal estimada (1%):</span>
                <strong>${(property.price * 0.01).toLocaleString('en-US')} USD</strong>
              </div>
              <div className="notarial-teaser-row">
                <span>Alícuota comunal (HOA):</span>
                <strong>${property.hoaFee} USD / mes</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="quickview-actions">
              <button
                className="btn-card-detail"
                onClick={() => {
                  onClose();
                  onViewFullDetails(property);
                }}
              >
                <ExternalLink size={15} />
                <span>Ver Ficha Completa & Calculadora</span>
              </button>

              <button
                className="btn-card-whatsapp"
                onClick={() => onContactWhatsApp(property)}
                title="WhatsApp Directo"
              >
                <MessageSquare size={17} />
              </button>

              <button
                className="btn-schedule-action"
                onClick={() => onOpenSchedule(property)}
                style={{ width: 'auto', padding: '0.75rem 1rem' }}
                title="Agendar Visita"
              >
                <Calendar size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
