import React from 'react';
import { FilterState, Sector, PropertyType } from '../types/property';
import { ArrowRight, Zap, Train, ShieldCheck, Sun, CheckCircle, TrendingUp, Search, X } from 'lucide-react';

interface FilterConsoleProps {
  filters: FilterState;
  searchQuery: string;
  onFilterChange: (filters: FilterState) => void;
  onSearchChange: (query: string) => void;
  onOpenMap: () => void;
}

export const FilterConsole: React.FC<FilterConsoleProps> = ({
  filters,
  searchQuery,
  onFilterChange,
  onSearchChange,
  onOpenMap
}) => {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const toggleBooleanFilter = (key: keyof Omit<FilterState, 'sector' | 'type' | 'maxPrice'>) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  return (
    <div className="filter-console-container">
      <div className="filter-console">
        {/* Search Bar Row with Keyboard Shortcut Hint */}
        <div className="search-bar-wrap">
          <div className="search-input-box">
            <Search size={18} className="search-icon-decor" />
            <input
              id="main-property-search"
              type="text"
              placeholder="Buscar por zona, amenidad (ej: piscina, ascensor, vista, metro, diésel) o código..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input-field"
              aria-label="Buscar propiedades"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => onSearchChange('')}
                aria-label="Limpiar búsqueda"
              >
                <X size={15} />
              </button>
            )}
            <kbd className="keyboard-shortcut-hint" title="Presiona la tecla / para enfocar">
              /
            </kbd>
          </div>
        </div>

        {/* Primary Filter Row */}
        <div className="filter-row-primary">
          <div className="filter-group">
            <label className="filter-label" htmlFor="sector-select">
              Sector / Valle de Quito
            </label>
            <select
              id="sector-select"
              className="filter-select"
              value={filters.sector}
              onChange={(e) => updateFilter('sector', e.target.value as Sector | 'ALL')}
            >
              <option value="ALL">Todos los sectores (Valles y Urbe)</option>
              <option value="Cumbayá">Cumbayá (Clima Cálido & Quintas)</option>
              <option value="Puembo">Puembo (Club Ecuestre & Golf)</option>
              <option value="González Suárez">González Suárez (Skyline & Vistas)</option>
              <option value="La Carolina">La Carolina (Metro & Inversión)</option>
              <option value="Tumbaco">Tumbaco (Chaquiñán & Naturaleza)</option>
              <option value="Nayón">Nayón (Mirador Bisagra)</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="type-select">
              Tipo de Inmueble
            </label>
            <select
              id="type-select"
              className="filter-select"
              value={filters.type}
              onChange={(e) => updateFilter('type', e.target.value as PropertyType | 'ALL')}
            >
              <option value="ALL">Cualquier tipo</option>
              <option value="Casa">Casas & Quintas Modernas</option>
              <option value="Penthouse">Penthouses de Autor</option>
              <option value="Suite">Suites de Renta / Inversión</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="price-select">
              Presupuesto Máximo
            </label>
            <select
              id="price-select"
              className="filter-select"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', parseInt(e.target.value, 10))}
            >
              <option value="1000000">Hasta $1,000,000 USD</option>
              <option value="800000">Hasta $800,000 USD</option>
              <option value="600000">Hasta $600,000 USD</option>
              <option value="400000">Hasta $400,000 USD</option>
              <option value="200000">Hasta $200,000 USD</option>
            </select>
          </div>

          <button className="btn-search-primary" onClick={onOpenMap}>
            <span>Explorar en Mapa</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Specialized Quito PropTech Filter Suite */}
        <div className="quito-chips-row">
          <span className="quito-chips-heading">
            Diferenciadores Quito 2026:
          </span>

          <button
            className={`filter-chip ${filters.hasGenerator ? 'active' : ''}`}
            onClick={() => toggleBooleanFilter('hasGenerator')}
            style={filters.hasGenerator ? { background: '#8A4E00', color: '#FFF7ED', borderColor: '#B45309' } : {}}
            aria-pressed={filters.hasGenerator}
          >
            <Zap size={13} style={{ color: filters.hasGenerator ? '#FEF3C7' : '#D97706' }} />
            <span>Generador Eléctrico 100%</span>
          </button>

          <button
            className={`filter-chip ${filters.hasMetro ? 'active' : ''}`}
            onClick={() => toggleBooleanFilter('hasMetro')}
            style={filters.hasMetro ? { background: '#701A75', color: '#FDF4FF', borderColor: '#A21CAF' } : {}}
            aria-pressed={filters.hasMetro}
          >
            <Train size={13} style={{ color: filters.hasMetro ? '#FDF4FF' : '#C026D3' }} />
            <span>Metro Quito (&lt; 5 min)</span>
          </button>

          <button
            className={`filter-chip ${filters.hasDoubleGate ? 'active' : ''}`}
            onClick={() => toggleBooleanFilter('hasDoubleGate')}
            aria-pressed={filters.hasDoubleGate}
          >
            <ShieldCheck size={13} />
            <span>Doble Garita & Urb. Privada</span>
          </button>

          <button
            className={`filter-chip ${filters.isValleyClimate ? 'active' : ''}`}
            onClick={() => toggleBooleanFilter('isValleyClimate')}
            aria-pressed={filters.isValleyClimate}
          >
            <Sun size={13} />
            <span>Clima Cálido de Valle (2,200m)</span>
          </button>

          <button
            className={`filter-chip ${filters.biessEligible ? 'active' : ''}`}
            onClick={() => toggleBooleanFilter('biessEligible')}
            style={filters.biessEligible ? { background: '#064E3B', color: '#ECFDF5', borderColor: '#047857' } : {}}
            aria-pressed={filters.biessEligible}
          >
            <CheckCircle size={13} style={{ color: filters.biessEligible ? '#ECFDF5' : '#1E7E52' }} />
            <span>Apto Crédito BIESS / Pichincha</span>
          </button>

          <button
            className={`filter-chip ${filters.isAirbnb ? 'active' : ''}`}
            onClick={() => toggleBooleanFilter('isAirbnb')}
            aria-pressed={filters.isAirbnb}
          >
            <TrendingUp size={13} />
            <span>Apto Renta Corta Airbnb</span>
          </button>
        </div>
      </div>
    </div>
  );
};
