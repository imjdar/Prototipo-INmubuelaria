import React, { useState } from 'react';
import { Property } from '../types/property';
import { X, Check, Minus, MessageSquare, ExternalLink, SlidersHorizontal } from 'lucide-react';

interface PropertyCompareModalProps {
  isOpen: boolean;
  properties: Property[];
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onRemoveProperty: (id: string) => void;
}

export const PropertyCompareModal: React.FC<PropertyCompareModalProps> = ({
  isOpen,
  properties,
  onClose,
  onSelectProperty,
  onContactWhatsApp,
  onRemoveProperty
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(true);

  if (!isOpen || properties.length === 0) return null;

  // Comparison helper to check if values differ across items
  const areDifferent = (getter: (p: Property) => any) => {
    if (properties.length < 2) return false;
    const first = getter(properties[0]);
    return properties.some((p) => getter(p) !== first);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
    >
      <div
        className="compare-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="compare-modal-header">
          <div>
            <div className="section-pretitle">Análisis Comparativo E-Commerce</div>
            <h2 id="compare-modal-title" className="compare-modal-heading">
              Matriz Técnica de Propiedades en Quito & Valles
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <label className="compare-toggle-diff">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
              />
              <SlidersHorizontal size={14} />
              <span>Resaltar diferencias clave</span>
            </label>

            <button
              className="btn-modal-close"
              onClick={onClose}
              aria-label="Cerrar comparador"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="compare-table-wrapper">
          <table className="compare-matrix-table">
            <thead>
              <tr>
                <th className="compare-metric-col">Criterio / Especificación</th>
                {properties.map((p) => (
                  <th key={p.id} className="compare-property-col">
                    <div className="compare-header-card">
                      <button
                        className="compare-remove-top"
                        onClick={() => onRemoveProperty(p.id)}
                        title="Remover de comparación"
                        aria-label={`Remover ${p.title}`}
                      >
                        <X size={14} />
                      </button>
                      <img src={p.image} alt={p.title} className="compare-header-img" />
                      <div className="compare-header-sector">{p.sector} · {p.microzone}</div>
                      <h4 className="compare-header-title">{p.title}</h4>
                      <div className="compare-header-price">
                        ${p.price.toLocaleString('en-US')} USD
                      </div>
                      <div className="compare-header-actions">
                        <button
                          className="btn-compare-action-detail"
                          onClick={() => {
                            onClose();
                            onSelectProperty(p);
                          }}
                        >
                          <ExternalLink size={13} />
                          <span>Ver Ficha</span>
                        </button>
                        <button
                          className="btn-compare-action-wa"
                          onClick={() => onContactWhatsApp(p)}
                        >
                          <MessageSquare size={13} />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Row: Sector & Microclima */}
              <tr className={highlightDifferences && areDifferent((p) => p.sector) ? 'row-diff' : ''}>
                <td className="metric-label">Sector & Entorno</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    <strong>{p.sector}</strong> <br />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.microzone}</span>
                  </td>
                ))}
              </tr>

              {/* Row: Clima & Altura */}
              <tr className={highlightDifferences && areDifferent((p) => p.elevation) ? 'row-diff' : ''}>
                <td className="metric-label">Altitud & Microclima</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    <span className="badge-tag" style={{ background: 'var(--bg-surface-elevated)' }}>
                      {p.elevation} msnm · {p.temperature}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Row: Precio / m² Construcción */}
              <tr className={highlightDifferences && areDifferent((p) => Math.round(p.price / p.areaBuild)) ? 'row-diff' : ''}>
                <td className="metric-label">Eficiencia ($ / m² constr.)</td>
                {properties.map((p) => {
                  const perSqm = Math.round(p.price / p.areaBuild);
                  return (
                    <td key={p.id} className="metric-val">
                      <strong style={{ color: 'var(--accent-gold-hover)', fontSize: '1.05rem' }}>
                        ${perSqm.toLocaleString('en-US')}
                      </strong> / m²
                    </td>
                  );
                })}
              </tr>

              {/* Row: Metraje */}
              <tr className={highlightDifferences && areDifferent((p) => p.areaBuild) ? 'row-diff' : ''}>
                <td className="metric-label">Área Construida / Terreno</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    <strong>{p.areaBuild} m²</strong> cubiertos <br />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.areaLot} m² de lote</span>
                  </td>
                ))}
              </tr>

              {/* Row: Distribución */}
              <tr className={highlightDifferences && areDifferent((p) => p.bedrooms) ? 'row-diff' : ''}>
                <td className="metric-label">Habitaciones & Baños</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    {p.bedrooms} Dormitorios · {p.bathrooms} Baños · {p.parking} Parqueos
                  </td>
                ))}
              </tr>

              {/* Row: Generador Eléctrico 100% */}
              <tr className={highlightDifferences && areDifferent((p) => p.features.hasGenerator) ? 'row-diff' : ''}>
                <td className="metric-label">⚡ Generador Eléctrico 100%</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    {p.features.hasGenerator ? (
                      <span className="badge-tag badge-generator" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={13} /> Respaldo Total Inmediato
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Minus size={13} /> Solo áreas comunales
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Doble Garita / Seguridad */}
              <tr className={highlightDifferences && areDifferent((p) => p.features.hasDoubleGate) ? 'row-diff' : ''}>
                <td className="metric-label">🛡️ Seguridad / Doble Garita</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    {p.features.hasDoubleGate ? (
                      <span className="badge-tag badge-verified">
                        <Check size={13} /> Urbanización Cerrada 24/7
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Control Estándar Edificio</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Conexión Metro de Quito */}
              <tr className={highlightDifferences && areDifferent((p) => p.features.hasMetro) ? 'row-diff' : ''}>
                <td className="metric-label">🚇 Metro de Quito (&lt; 5 min)</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    {p.features.hasMetro ? (
                      <span className="badge-tag badge-metro">
                        <Check size={13} /> Estación a pie (&lt; 200m)
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>Zona Residencial Valles</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Row: Alícuota / HOA */}
              <tr className={highlightDifferences && areDifferent((p) => p.hoaFee) ? 'row-diff' : ''}>
                <td className="metric-label">Alícuota Mensual (HOA)</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val">
                    <strong>${p.hoaFee} USD / mes</strong>
                  </td>
                ))}
              </tr>

              {/* Row: Alcabala Municipal (1% DMQ) */}
              <tr className={highlightDifferences && areDifferent((p) => p.price * 0.01) ? 'row-diff' : ''}>
                <td className="metric-label">Impuesto Alcabala DMQ (1%)</td>
                {properties.map((p) => {
                  const alcabala = p.price * 0.01;
                  return (
                    <td key={p.id} className="metric-val">
                      ${alcabala.toLocaleString('en-US')} USD
                    </td>
                  );
                })}
              </tr>

              {/* Row: Tasa Provincial (0.11%) */}
              <tr>
                <td className="metric-label">Tasa Consejo Pichincha (0.11%)</td>
                {properties.map((p) => {
                  const tasa = Math.round(p.price * 0.0011);
                  return (
                    <td key={p.id} className="metric-val">
                      ${tasa.toLocaleString('en-US')} USD
                    </td>
                  );
                })}
              </tr>

              {/* Row: Estado Legal */}
              <tr>
                <td className="metric-label">Certeza Jurídica</td>
                {properties.map((p) => (
                  <td key={p.id} className="metric-val" style={{ fontSize: '0.85rem' }}>
                    ✓ {p.legalStatus}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="compare-modal-footer">
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            💡 <strong>Consejo del Asesor:</strong> El comparador calcula los impuestos notariales del DMQ vigentes al 2026.
          </div>
          <button className="btn-search-primary" onClick={onClose}>
            Entendido, volver a la búsqueda
          </button>
        </div>
      </div>
    </div>
  );
};
