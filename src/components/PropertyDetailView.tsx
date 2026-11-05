import React from 'react';
import { Property } from '../types/property';
import { MortgageCalculator } from './MortgageCalculator';
import { ArrowLeft, MessageSquare, Calendar, Shield, Zap, FileText, Sun, Clock } from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onOpenSchedule: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  onOpenSchedule,
  onContactWhatsApp
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
    <div className="detail-view">
      <div className="detail-breadcrumb">
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <ArrowLeft size={14} /> Volver al Catálogo
        </button>
        <span>/</span>
        <span>{property.sector}</span>
        <span>/</span>
        <span>{property.microzone}</span>
        <span>/</span>
        <span>Ref: {property.id}</span>
      </div>

      {/* Hero Gallery Grid */}
      <div className="detail-hero-grid">
        <div className="hero-main-photo">
          <img src={property.image} alt={property.title} />
          <div className="media-badges">
            <span className="badge-tag badge-verified">✓ Certificado Registro Propiedad DMQ</span>
            {property.features.hasGenerator && (
              <span className="badge-tag badge-generator">⚡ Generador Eléctrico 100%</span>
            )}
            {property.features.hasMetro && (
              <span className="badge-tag badge-metro">🚇 Conexión Metro Quito</span>
            )}
          </div>
        </div>

        <div className="hero-sub-photos">
          <div className="hero-sub-photo">
            <img src={property.subPhotos[0] || property.image} alt="Interior arquitectónico" />
          </div>
          <div className="hero-sub-photo">
            <img src={property.subPhotos[1] || property.image} alt="Detalle master suite" />
          </div>
        </div>
      </div>

      {/* Header & Pricing */}
      <div className="section-pretitle">{property.sector} • {property.microzone}</div>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2.4rem',
        marginBottom: '0.5rem',
        lineHeight: 1.2
      }}>
        {property.title}
      </h1>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '2.2rem', fontWeight: 700 }}>{formattedPrice}</span>
        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{formattedPricePerSqm} / m² constr.</span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 600 }}>
          Alícuota: ${property.hoaFee}/mes (verificada)
        </span>
      </div>

      <div className="detail-content-columns">
        {/* Left Column: Specs, Due Diligence, Calculator */}
        <div>
          <div className="card-specs" style={{ padding: '1.25rem 1rem', marginBottom: '2rem' }}>
            <div className="spec-item">
              <div className="spec-val" style={{ fontSize: '1.2rem' }}>{property.bedrooms}</div>
              <div className="spec-lbl">Suites</div>
            </div>
            <div className="spec-item">
              <div className="spec-val" style={{ fontSize: '1.2rem' }}>{property.bathrooms}</div>
              <div className="spec-lbl">Baños</div>
            </div>
            <div className="spec-item">
              <div className="spec-val" style={{ fontSize: '1.2rem' }}>{property.areaBuild} m²</div>
              <div className="spec-lbl">Construcción</div>
            </div>
            <div className="spec-item">
              <div className="spec-val" style={{ fontSize: '1.2rem' }}>{property.areaLot} m²</div>
              <div className="spec-lbl">Terreno</div>
            </div>
            <div className="spec-item">
              <div className="spec-val" style={{ fontSize: '1.2rem' }}>{property.parking}</div>
              <div className="spec-lbl">Parqueaderos</div>
            </div>
          </div>

          <p style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            marginBottom: '2rem'
          }}>
            {property.description}
          </p>

          {/* Due Diligence PropTech Box */}
          <div className="due-diligence-box">
            <h3 className="due-diligence-title">
              <Shield size={20} style={{ color: 'var(--accent-gold-hover)' }} />
              Due Diligence Notarial & Equipamiento Quito
            </h3>
            <div className="due-diligence-grid">
              <div className="due-item">
                <Zap size={20} style={{ color: 'var(--color-electric)', flexShrink: 0 }} />
                <div>
                  <div className="due-item-title">Respaldo Eléctrico 100%</div>
                  <div className="due-item-desc">
                    Planta eléctrica de transferencia automática para bombas, climatización y tomas interiores durante apagones.
                  </div>
                </div>
              </div>

              <div className="due-item">
                <FileText size={20} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
                <div>
                  <div className="due-item-title">Certificado de Gravámenes DMQ</div>
                  <div className="due-item-desc">
                    Auditoría notarial al día. Sin hipotecas, embargos ni litigios hereditarios. Listo para escrituración.
                  </div>
                </div>
              </div>

              <div className="due-item">
                <Sun size={20} style={{ color: 'var(--accent-gold-hover)', flexShrink: 0 }} />
                <div>
                  <div className="due-item-title">Microclima & Altitud</div>
                  <div className="due-item-desc">
                    {property.temperature} a {property.elevation} msnm. Ventilación pasiva y aire puro de valle andino.
                  </div>
                </div>
              </div>

              <div className="due-item">
                <Shield size={20} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
                <div>
                  <div className="due-item-title">Seguridad Multicapa</div>
                  <div className="due-item-desc">
                    Acceso con doble filtro, guardianía privada 24/7 y cámaras térmicas perimetrales.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mortgage Calculator Component */}
          <MortgageCalculator propertyPrice={property.price} />

          {/* Logistics & Mobility Intelligence */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '1rem' }}>
              Conectividad & Tiempos de Traslado
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{
                background: 'var(--bg-surface-subtle)',
                padding: '1rem',
                borderRadius: '3px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Centros Comerciales & Salud
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.25rem 0' }}>
                  {property.logistics.scalaShopping} al Scala Mall
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Y Hospital de los Valles
                </div>
              </div>

              <div style={{
                background: 'var(--bg-surface-subtle)',
                padding: '1rem',
                borderRadius: '3px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Aeropuerto Mariscal Sucre
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0.25rem 0' }}>
                  {property.logistics.aeropuerto}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Por Ruta Viva sin semáforos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Agent VIP Card */}
        <div>
          <div className="agent-vip-card">
            <div className="agent-profile">
              <img
                className="agent-avatar"
                src={property.agent.avatar}
                alt={property.agent.name}
              />
              <div>
                <div className="agent-name">{property.agent.name}</div>
                <div className="agent-role">{property.agent.role}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{property.agent.license}</div>
              </div>
            </div>

            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '1.5rem'
            }}>
              Agente exclusivo con mandato directo verificado. Asesoría integral en promesa de compraventa notariada y gestión bancaria directa.
            </div>

            <button
              className="btn-book-visit"
              onClick={() => onOpenSchedule(property)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
            >
              <Calendar size={15} />
              <span>Agendar Visita Notarial Privada</span>
            </button>

            <button
              className="btn-whatsapp-agent"
              onClick={() => onContactWhatsApp(property)}
            >
              <MessageSquare size={16} />
              <span>WhatsApp Directo con Asesor</span>
            </button>

            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}>
              <Clock size={12} />
              <span>Tiempo de respuesta promedio: <strong>&lt; 15 minutos</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
