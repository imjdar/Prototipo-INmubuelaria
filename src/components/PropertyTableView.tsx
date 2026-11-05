import React from 'react';
import { Property } from '../types/property';
import { Heart, Eye, MessageSquare, Zap, Train } from 'lucide-react';

interface PropertyTableViewProps {
  properties: Property[];
  savedPropertyIds: string[];
  comparedPropertyIds: string[];
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (property: Property) => void;
  onQuickView: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
}

export const PropertyTableView: React.FC<PropertyTableViewProps> = ({
  properties,
  savedPropertyIds,
  comparedPropertyIds,
  onToggleFavorite,
  onToggleCompare,
  onQuickView,
  onSelectProperty,
  onContactWhatsApp
}) => {
  return (
    <div className="table-view-container">
      <div className="table-scroll-wrap">
        <table className="investor-table">
          <thead>
            <tr>
              <th style={{ width: '40px', textAlign: 'center' }}>⚖</th>
              <th style={{ width: '80px' }}>Foto</th>
              <th>Propiedad / Sector</th>
              <th>Tipo</th>
              <th>Precio USD</th>
              <th>$/m² Constr.</th>
              <th>Área (m²)</th>
              <th>Distribución</th>
              <th>Respaldo ⚡</th>
              <th>Metro 🚇</th>
              <th>Alícuota</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => {
              const pricePerSqm = Math.round(p.price / p.areaBuild);
              const isFavorite = savedPropertyIds.includes(p.id);
              const isCompared = comparedPropertyIds.includes(p.id);

              return (
                <tr key={p.id} className={isCompared ? 'row-compared' : ''}>
                  {/* Compare checkbox */}
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => onToggleCompare(p)}
                      title="Seleccionar para comparar"
                      aria-label={`Comparar ${p.title}`}
                      className="table-compare-check"
                    />
                  </td>

                  {/* Thumbnail */}
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="table-row-thumb"
                      onClick={() => onQuickView(p)}
                    />
                  </td>

                  {/* Title & Sector */}
                  <td>
                    <div
                      className="table-prop-title"
                      onClick={() => onSelectProperty(p)}
                    >
                      {p.title}
                    </div>
                    <div className="table-prop-meta">
                      {p.sector} · {p.microzone}
                    </div>
                  </td>

                  {/* Type */}
                  <td>
                    <span className="badge-tag" style={{ background: 'var(--bg-surface-elevated)' }}>
                      {p.type}
                    </span>
                  </td>

                  {/* Price */}
                  <td>
                    <strong className="table-price">
                      ${p.price.toLocaleString('en-US')}
                    </strong>
                  </td>

                  {/* $/m² */}
                  <td>
                    <span className="table-sqm">
                      ${pricePerSqm.toLocaleString('en-US')}
                    </span>
                  </td>

                  {/* Build / Lot Area */}
                  <td>
                    <div><strong>{p.areaBuild} m²</strong> c.</div>
                    <div className="table-prop-meta">{p.areaLot} m² l.</div>
                  </td>

                  {/* Beds / Baths */}
                  <td>
                    <span>{p.bedrooms}h · {p.bathrooms}b · {p.parking}p</span>
                  </td>

                  {/* Generator badge */}
                  <td>
                    {p.features.hasGenerator ? (
                      <span className="table-badge badge-generator-table" title="Generador 100% de respaldo total">
                        <Zap size={12} /> 100%
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Comunal</span>
                    )}
                  </td>

                  {/* Metro badge */}
                  <td>
                    {p.features.hasMetro ? (
                      <span className="table-badge badge-metro-table" title="Metro a menos de 5 min">
                        <Train size={12} /> &lt;2 min
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Valle</span>
                    )}
                  </td>

                  {/* HOA */}
                  <td>
                    <span>${p.hoaFee}/m</span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions-cell">
                      <button
                        className={`table-action-btn ${isFavorite ? 'active-fav' : ''}`}
                        onClick={() => onToggleFavorite(p.id)}
                        title={isFavorite ? 'Quitar de guardados' : 'Guardar'}
                        aria-label="Guardar"
                      >
                        <Heart size={14} fill={isFavorite ? '#E11D48' : 'none'} color={isFavorite ? '#E11D48' : 'currentColor'} />
                      </button>

                      <button
                        className="table-action-btn"
                        onClick={() => onQuickView(p)}
                        title="Vista Rápida"
                        aria-label="Vista rápida"
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        className="table-action-btn btn-wa-table"
                        onClick={() => onContactWhatsApp(p)}
                        title="Contactar Asesor"
                        aria-label="WhatsApp"
                      >
                        <MessageSquare size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
