import React from 'react';
import { Property } from '../types/property';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

interface PropertyCompareTrayProps {
  comparedProperties: Property[];
  onRemoveProperty: (id: string) => void;
  onClearAll: () => void;
  onOpenModal: () => void;
}

export const PropertyCompareTray: React.FC<PropertyCompareTrayProps> = ({
  comparedProperties,
  onRemoveProperty,
  onClearAll,
  onOpenModal
}) => {
  if (comparedProperties.length === 0) return null;

  return (
    <aside
      className="compare-tray"
      aria-label="Bandeja de comparación de propiedades"
    >
      <div className="compare-tray-content">
        <div className="compare-tray-lead">
          <div className="compare-icon-badge">
            <Scale size={18} />
          </div>
          <div>
            <div className="compare-title">
              Comparador E-Commerce ({comparedProperties.length}/3)
            </div>
            <div className="compare-subtitle">
              {comparedProperties.length === 1
                ? 'Selecciona al menos una propiedad más para comparar'
                : 'Métricas técnicas y legales lado a lado'}
            </div>
          </div>
        </div>

        <div className="compare-thumbnails-list">
          {comparedProperties.map((prop) => (
            <div key={prop.id} className="compare-chip-item">
              <img src={prop.image} alt={prop.title} className="compare-thumb" />
              <div className="compare-chip-info">
                <span className="compare-chip-title">{prop.title}</span>
                <span className="compare-chip-price">
                  ${prop.price.toLocaleString('en-US')}
                </span>
              </div>
              <button
                className="compare-chip-remove"
                onClick={() => onRemoveProperty(prop.id)}
                aria-label={`Quitar ${prop.title} de la comparación`}
                title="Quitar"
              >
                <X size={13} />
              </button>
            </div>
          ))}

          {comparedProperties.length < 3 && (
            <div className="compare-slot-empty">
              <span>+ Agrega otra propiedad ({3 - comparedProperties.length} disponible)</span>
            </div>
          )}
        </div>

        <div className="compare-tray-actions">
          <button
            className="btn-compare-clear"
            onClick={onClearAll}
            title="Vaciar comparador"
          >
            <Trash2 size={14} />
            <span>Limpiar</span>
          </button>

          <button
            className="btn-compare-launch"
            disabled={comparedProperties.length < 2}
            onClick={onOpenModal}
          >
            <span>Comparar Ahora</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
