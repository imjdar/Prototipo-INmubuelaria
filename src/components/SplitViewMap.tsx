import React from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { MapPin, Navigation } from 'lucide-react';

interface SplitViewMapProps {
  properties: Property[];
  savedPropertyIds: string[];
  comparedPropertyIds: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (property: Property) => void;
  onQuickView: (property: Property) => void;
  onShare: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onSwitchToCatalog: () => void;
}

export const SplitViewMap: React.FC<SplitViewMapProps> = ({
  properties,
  savedPropertyIds,
  comparedPropertyIds,
  onToggleFavorite,
  onToggleCompare,
  onQuickView,
  onShare,
  onSelectProperty,
  onContactWhatsApp,
  onSwitchToCatalog
}) => {
  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-pretitle">Explorador Cartográfico</div>
          <h2 className="section-title">Mapa Interactivo de Valles & Urbe</h2>
        </div>
        <button className="btn-card-detail" onClick={onSwitchToCatalog}>
          Ver en Cuadrícula Completa
        </button>
      </div>

      <div className="split-view-container">
        {/* Left Side: Filtered Cards */}
        <div>
          <div className="properties-grid" style={{ gridTemplateColumns: '1fr' }}>
            {properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isFavorite={savedPropertyIds.includes(p.id)}
                isCompared={comparedPropertyIds.includes(p.id)}
                onToggleFavorite={onToggleFavorite}
                onToggleCompare={onToggleCompare}
                onQuickView={onQuickView}
                onShare={onShare}
                onSelectProperty={onSelectProperty}
                onContactWhatsApp={onContactWhatsApp}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Vector Andean Cartography */}
        <div className="map-column">
          <div className="map-header">
            <div className="map-header-title">
              <Navigation size={15} style={{ color: 'var(--accent-gold)' }} />
              <span>Distrito Metropolitano & Valles</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <span className="btn-mode active" style={{ fontSize: '0.65rem' }}>Ruta Viva</span>
              <span className="btn-mode active" style={{ fontSize: '0.65rem' }}>Metro</span>
              <span className="btn-mode" style={{ fontSize: '0.65rem' }}>Colegios</span>
            </div>
          </div>

          <div className="map-canvas-area">
            {/* Custom SVG Topography */}
            <svg
              style={{ width: '100%', height: '100%' }}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Western High Andean Ridge (Quito Urban Plateau) */}
              <path d="M 0,0 L 45,0 L 48,30 L 40,65 L 35,100 L 0,100 Z" fill="#14181E" opacity="0.95" />
              
              {/* Eastern Warm Valley Basin (Cumbayá, Tumbaco, Puembo) */}
              <path d="M 45,0 L 100,0 L 100,100 L 35,100 L 40,65 L 48,30 Z" fill="#1B222C" />

              {/* Guápulo Canyon descent line */}
              <path
                d="M 45,0 Q 48,35 40,65 T 35,100"
                fill="none"
                stroke="#C2A268"
                strokeWidth="0.3"
                strokeDasharray="1,1"
                opacity="0.5"
              />

              {/* Ruta Viva Express Highway */}
              <path
                d="M 43,45 Q 60,48 75,55 T 90,48"
                fill="none"
                stroke="#C2A268"
                strokeWidth="0.9"
                opacity="0.8"
              />

              {/* Metro de Quito rail corridor */}
              <path
                d="M 28,15 L 30,35 L 33,55 L 26,85"
                fill="none"
                stroke="#C026D3"
                strokeWidth="0.6"
                strokeDasharray="1.5,1"
                opacity="0.75"
              />

              {/* Topographic Labels */}
              <text x="12" y="22" fill="#757B85" fontSize="2.5" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">
                HIPERCENTRO QUITO (2,810m)
              </text>
              <text x="56" y="32" fill="#C2A268" fontSize="2.5" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="700">
                VALLE DE CUMBAYÁ (2,200m · 22°C)
              </text>
              <text x="68" y="78" fill="#757B85" fontSize="2.3" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
                TUMBACO & CHAQUIÑÁN
              </text>
              <text x="74" y="42" fill="#A88749" fontSize="2.2" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600">
                PUEMBO & AEROPUERTO UIO
              </text>
            </svg>

            {/* Interactive HTML Price Pin Markers */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }}>
              {properties.map((p) => (
                <div
                  key={p.id}
                  className="map-pin"
                  style={{
                    position: 'absolute',
                    left: `${p.coordinates.x}%`,
                    top: `${p.coordinates.y}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                  onClick={() => onSelectProperty(p)}
                  title={`${p.title} - $${Math.round(p.price / 1000)}k`}
                >
                  <div className="map-pin-badge">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                      <MapPin size={10} style={{ color: 'var(--accent-gold)' }} />
                      {p.features.hasGenerator ? '⚡ ' : ''}${Math.round(p.price / 1000)}k
                    </span>
                  </div>
                  <div style={{ width: '2px', height: '8px', background: 'var(--accent-gold)', margin: '0 auto' }}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="map-legend">
            <span>Altitud: 2,150m (Puembo) ➔ 2,820m (Quito)</span>
            <span>Microclima: 17°C a 23°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};
