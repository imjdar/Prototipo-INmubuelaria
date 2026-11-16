/**
 * PROPIEDADES PREMIER - REAL INTERACTIVE MAP COMPONENT
 * Implementación de mapas reales con integración directa de capas de Google Maps (Calles, Satelital Híbrido y Terreno).
 * Incluye marcadores con insignias de precios, popups interactivos, saltos geográficos a sectores y enlace satelital 3D.
 */

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Property, Sector } from '../types/property';
import { MapPin, ExternalLink } from 'lucide-react';

export type MapTileProvider = 'GOOGLE_STREETS' | 'GOOGLE_SATELLITE' | 'GOOGLE_TERRAIN' | 'CARTO_LUXURY';

interface RealGoogleMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty?: (property: Property) => void;
  height?: string;
  className?: string;
  initialSector?: Sector | 'ALL';
}

const TILE_CONFIG: Record<MapTileProvider, { name: string; url: string; subdomains: string[]; maxZoom: number; attribution: string }> = {
  GOOGLE_STREETS: {
    name: 'Google Calles',
    url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: '&copy; Google Maps'
  },
  GOOGLE_SATELLITE: {
    name: 'Google Satélite',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: '&copy; Google Maps Satelital'
  },
  GOOGLE_TERRAIN: {
    name: 'Google Relieve',
    url: 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
    subdomains: ['0', '1', '2', '3'],
    maxZoom: 20,
    attribution: '&copy; Google Maps Terreno'
  },
  CARTO_LUXURY: {
    name: 'Carto Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  }
};

const SECTOR_COORDINATES: Record<string, { lat: number; lng: number; zoom: number }> = {
  ALL: { lat: -0.198, lng: -78.435, zoom: 12 },
  'Cumbayá': { lat: -0.2052, lng: -78.4365, zoom: 14 },
  'Puembo': { lat: -0.2190, lng: -78.3485, zoom: 14 },
  'La Carolina': { lat: -0.1812, lng: -78.4839, zoom: 15 },
  'González Suárez': { lat: -0.2018, lng: -78.4795, zoom: 15 },
  'Tumbaco': { lat: -0.2160, lng: -78.4020, zoom: 14 },
  'Nayón': { lat: -0.1885, lng: -78.4520, zoom: 14 }
};

export const RealGoogleMap: React.FC<RealGoogleMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  height = '100%',
  className = '',
  initialSector = 'ALL'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [currentProvider, setCurrentProvider] = useState<MapTileProvider>('GOOGLE_STREETS');
  const [activeSector, setActiveSector] = useState<string>(initialSector);

  // Inicialización del Mapa
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const defaultCenter = SECTOR_COORDINATES[initialSector] || SECTOR_COORDINATES.ALL;

    const map = L.map(mapContainerRef.current, {
      center: [defaultCenter.lat, defaultCenter.lng],
      zoom: defaultCenter.zoom,
      zoomControl: false,
      attributionControl: true
    });

    // Control de zoom en la esquina superior derecha
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Capa de mosaicos
    const config = TILE_CONFIG[currentProvider];
    const tileLayer = L.tileLayer(config.url, {
      subdomains: config.subdomains,
      maxZoom: config.maxZoom,
      attribution: config.attribution
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Grupo para marcadores
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;

    mapInstanceRef.current = map;

    // Ajustar dimensiones tras el render
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Cambio dinámico de proveedor de mosaicos (Google Calles, Satélite, Relieve)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = TILE_CONFIG[currentProvider];
    const newLayer = L.tileLayer(config.url, {
      subdomains: config.subdomains,
      maxZoom: config.maxZoom,
      attribution: config.attribution
    }).addTo(map);

    tileLayerRef.current = newLayer;
  }, [currentProvider]);

  // Actualización de marcadores de propiedades con estilo de lujo e insignia de precio
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    const bounds = L.latLngBounds([]);

    properties.forEach((property) => {
      const lat = property.coordinates.lat || -0.198;
      const lng = property.coordinates.lng || -78.435;
      const latLng = L.latLng(lat, lng);
      bounds.extend(latLng);

      const priceK = Math.round(property.price / 1000);
      const isSelected = selectedProperty?.id === property.id;
      const hasGenerator = property.features.hasGenerator;

      // HTML del Marcador personalizado estilo Google Maps Luxury
      const markerHtml = `
        <div class="custom-luxury-marker map-pin-badge ${isSelected ? 'is-selected' : ''}" style="
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: ${isSelected ? '#213145' : '#FFFFFF'};
          color: ${isSelected ? '#FFFFFF' : '#213145'};
          border: 2px solid ${isSelected ? '#FEA004' : '#E2E8F0'};
          padding: 4px 8px;
          border-radius: 999px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 12px;
          font-weight: 800;
          box-shadow: 0 4px 14px rgba(0, 0, 0, ${isSelected ? '0.35' : '0.15'});
          white-space: nowrap;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
        ">
          ${hasGenerator ? '<span style="color: #FEA004; font-size: 13px;">⚡</span>' : '<span style="color: #FEA004; font-size: 11px;">📍</span>'}
          <span>$${priceK}k</span>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker-wrapper',
        iconSize: [60, 28],
        iconAnchor: [30, 14]
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Popup informativo estilo tarjeta de Google Maps
      const popupContent = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; width: 220px; padding: 2px;">
          <img src="${property.image}" alt="${property.title}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-size: 10px; font-weight: 700; color: #FEA004; text-transform: uppercase;">
            ${property.type} · ${property.sector}
          </div>
          <h4 style="font-size: 13px; font-weight: 800; color: #213145; margin: 2px 0 4px 0; line-height: 1.25;">
            ${property.title}
          </h4>
          <div style="display: flex; gap: 8px; font-size: 11px; color: #64748B; margin-bottom: 6px;">
            <span>${property.areaBuild} m²</span>
            <span>•</span>
            <span>${property.bedrooms} hab</span>
            <span>•</span>
            <span>${property.bathrooms} baños</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px solid #E2E8F0;">
            <div style="font-size: 15px; font-weight: 800; color: #213145;">
              $${property.price.toLocaleString('es-EC')}
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank" rel="noopener noreferrer" style="font-size: 10px; color: #0284C7; text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 2px;">
              Google Maps ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 240, className: 'premier-luxury-popup' });

      marker.on('click', () => {
        onSelectProperty?.(property);
      });

      markersGroup.addLayer(marker);
    });

    // Si hay propiedades y no hay sector específico, ajustar bounds
    if (properties.length > 0 && activeSector === 'ALL' && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [properties, selectedProperty, onSelectProperty, activeSector]);

  // Manejador de cambio de sector
  const handleSectorClick = (sector: string) => {
    setActiveSector(sector);
    const target = SECTOR_COORDINATES[sector] || SECTOR_COORDINATES.ALL;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([target.lat, target.lng], target.zoom, {
        duration: 1.2
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height, minHeight: '400px' }} className={className}>
      {/* Contenedor del Mapa Leaflet */}
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%', borderRadius: '16px' }} />

      {/* Selector de Capas de Google Maps en la esquina superior izquierda */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        padding: '6px',
        borderRadius: '12px',
        boxShadow: '0 4px 18px rgba(33, 49, 69, 0.15)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        gap: '4px'
      }}>
        {(['GOOGLE_STREETS', 'GOOGLE_SATELLITE', 'GOOGLE_TERRAIN'] as MapTileProvider[]).map((prov) => {
          const isActive = currentProvider === prov;
          const label = prov === 'GOOGLE_STREETS' ? 'Calles' : prov === 'GOOGLE_SATELLITE' ? '🛰️ Satélite' : '🏔️ Terreno';
          return (
            <button
              key={prov}
              type="button"
              onClick={() => setCurrentProvider(prov)}
              style={{
                border: 'none',
                background: isActive ? '#213145' : 'transparent',
                color: isActive ? '#FFFFFF' : '#475569',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Salto rápido a Sectores de Quito y Valles */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '54px',
        zIndex: 1000,
        display: 'flex',
        gap: '4px',
        flexWrap: 'wrap',
        maxWidth: '480px',
        justifyContent: 'flex-end'
      }}>
        {['ALL', 'Cumbayá', 'Puembo', 'La Carolina', 'González Suárez', 'Tumbaco'].map((sec) => {
          const isActive = activeSector === sec;
          const label = sec === 'ALL' ? 'Todos los Valles' : sec;
          return (
            <button
              key={sec}
              type="button"
              onClick={() => handleSectorClick(sec)}
              style={{
                border: isActive ? '1px solid #FEA004' : '1px solid rgba(226, 232, 240, 0.8)',
                background: isActive ? '#FEA004' : 'rgba(255, 255, 255, 0.92)',
                color: isActive ? '#FFFFFF' : '#213145',
                padding: '4px 9px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(4px)',
                transition: 'all 0.15s ease'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Badge de Google Maps y Enlace Satelital 3D en la esquina inferior izquierda */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(6px)',
        padding: '6px 12px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.75rem',
        color: '#475569'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#213145' }}>
          <MapPin size={14} color="#EA4335" />
          <span>Cartografía Real Google Maps</span>
        </div>
        <span style={{ color: '#CBD5E1' }}>•</span>
        <a
          href="https://www.google.com/maps/@-0.198,-78.435,13z"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#0284C7',
            textDecoration: 'none',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          <span>Abrir en Google Maps 3D</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};
