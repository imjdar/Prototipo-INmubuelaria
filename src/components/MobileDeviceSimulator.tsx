import React from 'react';
import { Property } from '../types/property';
import { Home, Compass, Heart, MessageSquare } from 'lucide-react';

interface MobileDeviceSimulatorProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onCloseSimulator: () => void;
}

export const MobileDeviceSimulator: React.FC<MobileDeviceSimulatorProps> = ({
  properties,
  onSelectProperty,
  onContactWhatsApp,
  onCloseSimulator
}) => {
  const featured = properties[0];

  return (
    <div style={{ padding: '2rem 1rem', background: '#E6E1D8', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <button
          className="btn-search-primary"
          onClick={onCloseSimulator}
          style={{ marginBottom: '0.5rem' }}
        >
          Volver a Pantalla Completa Escritorio
        </button>
        <div style={{ fontSize: '0.75rem', color: '#525866' }}>
          Simulación de interfaz móvil nativa para smartphone (390px)
        </div>
      </div>

      <div className="mobile-phone-frame">
        <div className="phone-island"></div>

        <div className="phone-screen-scrollable">
          <div style={{
            fontSize: '0.65rem',
            color: '#8A7E72',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '0.25rem'
          }}>
            VALLE & URBE · APP MÓVIL
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
            Quito & Valles PropTech
          </div>

          {/* Stories / Sector microclimates */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{ textAlign: 'center', minWidth: '64px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '2px solid var(--accent-gold)',
                background: '#121417',
                margin: '0 auto 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                22°C
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600 }}>Cumbayá</div>
            </div>

            <div style={{ textAlign: 'center', minWidth: '64px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '2px solid #525866',
                background: '#222',
                margin: '0 auto 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                23°C
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600 }}>Puembo</div>
            </div>

            <div style={{ textAlign: 'center', minWidth: '64px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '2px solid #525866',
                background: '#222',
                margin: '0 auto 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                18°C
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600 }}>González S.</div>
            </div>

            <div style={{ textAlign: 'center', minWidth: '64px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: '2px solid #525866',
                background: '#222',
                margin: '0 auto 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700
              }}>
                Metro
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600 }}>La Carolina</div>
            </div>
          </div>

          {/* Mobile Video Showcase Reel */}
          <div style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '1.25rem',
            background: '#121417',
            aspectRatio: '16/9',
            boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
          }}>
            <video
              src="/videos/hero-mobile.webm"
              poster="/videos/hero-mobile-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(18,20,23,0.75) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '0.75rem',
              color: '#fff'
            }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                Video Destacado 2026 · Móvil
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 600 }}>
                Curaduría y Acabados de Autor
              </span>
            </div>
          </div>

          {/* Featured Mobile Listing */}
          {featured && (
            <div style={{
              background: '#fff',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              overflow: 'hidden',
              marginBottom: '1.5rem'
            }}>
              <img
                src={featured.image}
                style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }}
                alt={featured.title}
              />
              <div style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold-hover)', fontWeight: 700, textTransform: 'uppercase' }}>
                  {featured.sector} · {featured.microzone}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 600, margin: '0.25rem 0' }}>
                  {featured.title}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  ${featured.price.toLocaleString()} USD
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {featured.bedrooms} Suites · {featured.bathrooms} Baños · {featured.areaBuild} m² · Generador 100%
                </div>
                <button
                  className="btn-card-detail"
                  style={{ width: '100%', marginBottom: '0.5rem' }}
                  onClick={() => {
                    onSelectProperty(featured);
                    onCloseSimulator();
                  }}
                >
                  Ver Ficha Completa & Gastos Notariales
                </button>
                <button
                  className="btn-whatsapp-agent"
                  style={{ width: '100%' }}
                  onClick={() => onContactWhatsApp(featured)}
                >
                  <MessageSquare size={16} />
                  <span>Contactar por WhatsApp</span>
                </button>
              </div>
            </div>
          )}

          {/* Express Financial & Notarial Widget */}
          <div style={{ background: '#F4EFE6', padding: '1rem', borderRadius: '6px', fontSize: '0.75rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
              Simulador Hipotecario BIESS Express (Quito)
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>Entrada 20%:</span>
              <strong>$116,000 USD</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span>Cuota Mensual BIESS:</span>
              <strong>~$3,320 / mes</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Gastos de Cierre Notarial:</span>
              <strong>~$7,508 USD</strong>
            </div>
          </div>
        </div>

        {/* Mobile Frosted Glass Bottom Navigation */}
        <div className="mobile-bottom-bar">
          <button className="mobile-tab-btn active">
            <Home size={18} />
            <span>Explorar</span>
          </button>
          <button className="mobile-tab-btn" onClick={onCloseSimulator}>
            <Compass size={18} />
            <span>Mapa</span>
          </button>
          <button className="mobile-tab-btn">
            <Heart size={18} />
            <span>Guardados</span>
          </button>
          <button className="mobile-tab-btn" onClick={() => onContactWhatsApp(featured)}>
            <MessageSquare size={18} />
            <span>Asesor</span>
          </button>
        </div>
      </div>
    </div>
  );
};
