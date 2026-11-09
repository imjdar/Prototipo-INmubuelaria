import React, { useState } from 'react';
import { Property } from '../types/property';
import { MortgageCalculator } from './MortgageCalculator';
import { PriceOpportunityBadge } from './PriceOpportunityBadge';
import { SECTOR_BENCHMARKS } from '../services/valuationService';
import { 
  ArrowLeft, 
  MessageSquare, 
  Calendar, 
  Shield, 
  Zap, 
  FileText, 
  Sun, 
  Clock, 
  Bell, 
  TrendingUp, 
  Layers, 
  Camera, 
  Play, 
  Box, 
  Share2 
} from 'lucide-react';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onOpenSchedule: (property: Property) => void;
  onContactWhatsApp: (property: Property, customMessage?: string) => void;
  onOpenAlert?: (property: Property) => void;
  onShare?: (property: Property) => void;
}

export const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({
  property,
  onBack,
  onOpenSchedule,
  onContactWhatsApp,
  onOpenAlert,
  onShare
}) => {
  const [activeMediaTab, setActiveMediaTab] = useState<'photos' | 'video' | 'matterport' | 'plans'>('photos');
  const [inquiryText, setInquiryText] = useState<string>('¡Hola! Me interesa recibir más información sobre esta propiedad y coordinar una visita.');
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);

  const pricePerSqm = Math.round(property.price / (property.areaBuild || 1));
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

  const benchmark = SECTOR_BENCHMARKS[property.sector] || SECTOR_BENCHMARKS['Cumbayá'];
  const diffPct = Math.round(((pricePerSqm - benchmark.avgPriceM2) / benchmark.avgPriceM2) * 100);

  // Pre-configured fast inquiry chips observed on Plusvalía and Properati
  const fastQuestions = [
    '¿Sigue disponible esta propiedad?',
    '¿El precio publicado es negociable?',
    '¿Acepta financiamiento con crédito BIESS?',
    '¿Cuenta con generador eléctrico 100% de respaldo?',
    '¿Cuándo está disponible para una visita presencial?'
  ];

  const handleSelectQuestion = (q: string) => {
    setInquiryText(q);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    onContactWhatsApp(property, inquiryText);
    setIsMessageSent(true);
    setTimeout(() => setIsMessageSent(false), 3000);
  };

  return (
    <div className="detail-view" style={{ paddingBottom: '5rem' }}>
      {/* Breadcrumb Navigation */}
      <div className="detail-breadcrumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer', background: 'none', border: 'none', fontWeight: 600, color: '#213145' }}>
            <ArrowLeft size={16} /> Volver al Catálogo
          </button>
          <span>/</span>
          <span>{property.sector}</span>
          <span>/</span>
          <span>{property.microzone}</span>
          <span>/</span>
          <span style={{ color: '#94A3B8' }}>Ref: {property.id}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onShare && (
            <button
              onClick={() => onShare(property)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#213145',
                cursor: 'pointer'
              }}
            >
              <Share2 size={13} />
              <span>Compartir</span>
            </button>
          )}

          {onOpenAlert && (
            <button
              onClick={() => onOpenAlert(property)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '6px',
                border: '1px solid #FED7AA',
                background: '#FFF7ED',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#D97706',
                cursor: 'pointer'
              }}
            >
              <Bell size={13} />
              <span>Avisarme si baja de precio</span>
            </button>
          )}
        </div>
      </div>

      {/* Multimedia Switcher Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        borderBottom: '1px solid #E2E8F0',
        paddingBottom: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveMediaTab('photos')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeMediaTab === 'photos' ? '#213145' : '#F1F3F5',
            color: activeMediaTab === 'photos' ? '#FFFFFF' : '#475569'
          }}
        >
          <Camera size={15} />
          <span>Galería Fotográfica ({property.subPhotos.length + 1})</span>
        </button>

        <button
          onClick={() => setActiveMediaTab('video')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeMediaTab === 'video' ? '#213145' : '#F1F3F5',
            color: activeMediaTab === 'video' ? '#FFFFFF' : '#475569'
          }}
        >
          <Play size={15} />
          <span>Video 9:16 Inmersivo</span>
        </button>

        <button
          onClick={() => setActiveMediaTab('matterport')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeMediaTab === 'matterport' ? '#213145' : '#F1F3F5',
            color: activeMediaTab === 'matterport' ? '#FFFFFF' : '#475569'
          }}
        >
          <Box size={15} />
          <span>Tour 3D Matterport Pro</span>
        </button>

        <button
          onClick={() => setActiveMediaTab('plans')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            background: activeMediaTab === 'plans' ? '#213145' : '#F1F3F5',
            color: activeMediaTab === 'plans' ? '#FFFFFF' : '#475569'
          }}
        >
          <Layers size={15} />
          <span>Planos Arquitectónicos Acotados</span>
        </button>
      </div>

      {/* Main Multimedia Viewport */}
      {activeMediaTab === 'photos' && (
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
              {property.features.hasDoubleGate && (
                <span className="badge-tag" style={{ background: '#213145', color: '#FFFFFF' }}>🛡️ Doble Garita</span>
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
      )}

      {activeMediaTab === 'video' && (
        <div style={{
          background: '#0F172A',
          borderRadius: '12px',
          padding: '2.5rem',
          textAlign: 'center',
          color: '#FFFFFF',
          marginBottom: '2rem'
        }}>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#FEA004',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <Play size={32} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Recorrido Vertical 9:16 en 4K
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Grabación con dron cinemático y recorrido interior con estabilización óptica por el perito inmobiliario.
            </p>
            <button
              onClick={() => onContactWhatsApp(property, `¡Hola! Me gustaría ver el video tour completo de ${property.title}`)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                background: '#FEA004',
                color: '#FFFFFF',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Reproducir Video Tour Completo
            </button>
          </div>
        </div>
      )}

      {activeMediaTab === 'matterport' && (
        <div style={{
          background: '#1E293B',
          borderRadius: '12px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: '#FFFFFF',
          marginBottom: '2rem',
          border: '1px solid #334155'
        }}>
          <Box size={48} color="#FEA004" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Gemelo Digital 3D Matterport Pro 3
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
            Navega habitación por habitación con precisión milimétrica, medición de espacios en tiempo real y vista de casa de muñecas (Dollhouse View).
          </p>
          <button
            onClick={() => onContactWhatsApp(property, `¡Hola! Quisiera acceder al gemelo digital 3D Matterport de ${property.title}`)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              background: '#2563EB',
              color: '#FFFFFF',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Iniciar Recorrido Virtual 3D
          </button>
        </div>
      )}

      {activeMediaTab === 'plans' && (
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          padding: '2.5rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <Layers size={48} color="#FEA004" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#213145', marginBottom: '0.5rem' }}>
            Planos de Distribución Aprobados DMQ
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
            Plano arquitectónico con cotas de dormitorios, áreas húmedas, terrazas y cuadro de áreas de Propiedad Horizontal registrado.
          </p>
          <button
            onClick={() => onContactWhatsApp(property, `¡Hola! Solicito el dossier con planos arquitectónicos aprobados de ${property.title}`)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              background: '#213145',
              color: '#FFFFFF',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Descargar Dossier de Planos en PDF
          </button>
        </div>
      )}

      {/* Header & Pricing */}
      <div className="section-pretitle">{property.sector} • {property.microzone}</div>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '2.3rem',
        marginBottom: '0.75rem',
        lineHeight: 1.2
      }}>
        {property.title}
      </h1>

      {/* Price row with Opportunity Thermometer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.75rem',
        padding: '1rem',
        background: '#F8FAFC',
        borderRadius: '12px',
        border: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '2.3rem', fontWeight: 800, color: '#213145' }}>{formattedPrice}</span>
          <span style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>{formattedPricePerSqm} / m² constr.</span>
          <span style={{ fontSize: '0.88rem', color: '#16A34A', fontWeight: 700, background: '#DCFCE7', padding: '0.2rem 0.6rem', borderRadius: '999px' }}>
            Alícuota: ${property.hoaFee}/mes (auditada)
          </span>
        </div>

        {/* Competitor Value-Add: Termómetro de Oportunidad */}
        <PriceOpportunityBadge
          price={property.price}
          areaBuild={property.areaBuild}
          sector={property.sector}
          showExplanation
        />
      </div>

      <div className="detail-content-columns">
        {/* Left Column: Specs, Due Diligence, Market Benchmark, Calculator */}
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

          {/* Plusvalía / Properati Benchmark Card */}
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0369A1', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '0 0 0.5rem 0' }}>
              <TrendingUp size={18} />
              <span>Termómetro Inmobiliario del Sector ({property.sector})</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#0C4A6E', margin: '0 0 1rem 0' }}>
              Comparativa del valor por m² construido contra los registros notariales y avalúos promedio de la zona:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase' }}>Este Inmueble</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#213145' }}>${pricePerSqm.toLocaleString()}/m²</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase' }}>Promedio {property.sector}</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0284C7' }}>${benchmark.avgPriceM2.toLocaleString()}/m²</div>
              </div>
              <div style={{ background: '#FFFFFF', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E0F2FE' }}>
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase' }}>Diferencial</div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: diffPct <= 0 ? '#16A34A' : '#7C3AED' }}>
                  {diffPct > 0 ? `+${diffPct}%` : `${diffPct}%`}
                </div>
              </div>
            </div>
          </div>

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
                borderRadius: '8px',
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
                borderRadius: '8px',
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

        {/* Right Column: Agent VIP Card & Interactive Inquiry Box */}
        <div>
          <div className="agent-vip-card" style={{ position: 'sticky', top: '90px' }}>
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
              marginBottom: '1.25rem'
            }}>
              Agente exclusivo con mandato directo verificado. Asesoría integral en promesa de compraventa notariada y gestión bancaria directa.
            </div>

            {/* Fast Question Chips (Competitor Inspired) */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                Preguntas Rápidas al Asesor:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {fastQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuestion(q)}
                    style={{
                      textAlign: 'left',
                      padding: '0.4rem 0.65rem',
                      borderRadius: '6px',
                      background: inquiryText === q ? '#FFF7ED' : '#F8FAFC',
                      border: `1px solid ${inquiryText === q ? '#FED7AA' : '#E2E8F0'}`,
                      color: inquiryText === q ? '#D97706' : '#475569',
                      fontSize: '0.75rem',
                      fontWeight: inquiryText === q ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    💬 {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiry Textbox Form */}
            <form onSubmit={handleSendInquiry} style={{ marginBottom: '1.25rem' }}>
              <textarea
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.82rem',
                  marginBottom: '0.5rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />

              <button
                type="submit"
                className="btn-whatsapp-agent"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.75rem'
                }}
              >
                <MessageSquare size={16} />
                <span>{isMessageSent ? '✓ Abriendo WhatsApp...' : 'Enviar Consulta por WhatsApp'}</span>
              </button>
            </form>

            <button
              className="btn-book-visit"
              onClick={() => onOpenSchedule(property)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', width: '100%', marginBottom: '0.75rem' }}
            >
              <Calendar size={15} />
              <span>Agendar Visita Notarial Privada</span>
            </button>

            {onOpenAlert && (
              <button
                type="button"
                onClick={() => onOpenAlert(property)}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Bell size={14} color="#D97706" />
                <span>Avisarme si baja de precio</span>
              </button>
            )}

            <div style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
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

      {/* Competitor Value-Add: Sticky Bottom Contact Bar on Mobile */}
      <div
        className="mobile-sticky-contact-bar"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '0.75rem 1rem',
          zIndex: 1000,
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}
      >
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#213145', lineHeight: 1.1 }}>
            {formattedPrice}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
            Alícuota: ${property.hoaFee}/mes
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => onContactWhatsApp(property, inquiryText)}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => onOpenSchedule(property)}
            style={{
              padding: '0.65rem 0.9rem',
              borderRadius: '8px',
              backgroundColor: '#FEA004',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <Calendar size={15} />
            <span>Visita</span>
          </button>
        </div>
      </div>
    </div>
  );
};
