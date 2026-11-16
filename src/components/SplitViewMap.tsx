/**
 * PROPIEDADES PREMIER - CARTOGRAFÍA DIVIDIDA (SPLIT VIEW MAP)
 * Vista interactiva dividida: catálogo filtrado a la izquierda y mapa real de Google Maps a la derecha.
 */

import React, { useState } from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { RealGoogleMap } from './RealGoogleMap';
import { Grid, Map as MapIcon, SlidersHorizontal } from 'lucide-react';

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
  const [selectedMapProperty, setSelectedMapProperty] = useState<Property | null>(null);

  const handleSelectOnMap = (property: Property) => {
    setSelectedMapProperty(property);
    onSelectProperty(property);
  };

  return (
    <div className="split-view-container" style={{ maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <style>{`
        .split-view-container {
          padding: 0.5rem 0;
          width: 100%;
          box-sizing: border-box;
        }
        .split-view-layout-grid {
          display: grid;
          grid-template-columns: minmax(320px, 460px) 1fr;
          gap: 1.5rem;
          min-height: calc(100vh - 220px);
          align-items: stretch;
        }
        .split-view-cards-column {
          overflow-y: auto;
          max-height: calc(100vh - 220px);
          padding-right: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .split-view-map-column {
          position: sticky;
          top: 90px;
          height: calc(100vh - 220px);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(33, 49, 69, 0.12);
          border: 1px solid #E2E8F0;
          background: #E2E8F0;
        }
        @media (max-width: 900px) {
          .split-view-container {
            padding: 0.75rem 0.5rem !important;
          }
          .split-view-layout-grid {
            display: flex !important;
            flex-direction: column-reverse !important;
            gap: 1rem !important;
            min-height: auto !important;
          }
          .split-view-map-column {
            position: relative !important;
            top: 0 !important;
            height: 380px !important;
            width: 100% !important;
            border-radius: 14px !important;
          }
          .split-view-cards-column {
            overflow-y: visible !important;
            max-height: none !important;
            padding-right: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid #E2E8F0',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: '#FEA004',
            fontSize: '0.75rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <MapIcon size={14} />
            <span>Cartografía Real Satelital & Urbana</span>
          </div>
          <h1 style={{
            margin: '0.2rem 0 0 0',
            fontSize: '1.45rem',
            fontWeight: 800,
            color: '#213145',
            letterSpacing: '-0.02em'
          }}>
            Mapa Interactivo de Propiedades en Quito y sus Valles
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#64748B' }}>
            Explora {properties.length} propiedades geo-referenciadas con Google Maps, vistas satelitales y relieve andino.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onSwitchToCatalog}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.1rem',
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#213145',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
          >
            <Grid size={16} />
            <span>Ver en Cuadrícula Completa</span>
          </button>
        </div>
      </div>

      {/* Split View Responsive Layout */}
      <div className="split-view-layout-grid">
        {/* Column 1: Property Cards */}
        <div className="split-view-cards-column">
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#64748B',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.25rem 0',
            flexWrap: 'wrap',
            gap: '0.35rem'
          }}>
            <span>MOSTRANDO {properties.length} INMUEBLES</span>
            <span style={{ fontSize: '0.75rem', color: '#059669', background: '#ECFDF5', padding: '2px 8px', borderRadius: '999px', fontWeight: 700 }}>
              ● Sincronizado en Vivo con Mapa
            </span>
          </div>

          {properties.map((p) => (
            <div
              key={p.id}
              onMouseEnter={() => setSelectedMapProperty(p)}
              style={{
                transition: 'transform 0.15s ease',
                borderRadius: '16px',
                outline: selectedMapProperty?.id === p.id ? '2px solid #FEA004' : 'none'
              }}
            >
              <PropertyCard
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
            </div>
          ))}

          {properties.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              background: '#F8FAFC',
              borderRadius: '16px',
              border: '1px dashed #CBD5E1',
              color: '#64748B'
            }}>
              <SlidersHorizontal size={32} color="#94A3B8" style={{ margin: '0 auto 0.5rem auto' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#213145', fontSize: '1.1rem' }}>No hay propiedades en este filtro</h3>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>Intenta seleccionar "Todos los Sectores" o ampliar el rango de precio.</p>
            </div>
          )}
        </div>

        {/* Column 2: Real Google Maps Interactive Canvas */}
        <div className="split-view-map-column">
          <RealGoogleMap
            properties={properties}
            selectedProperty={selectedMapProperty}
            onSelectProperty={handleSelectOnMap}
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};
