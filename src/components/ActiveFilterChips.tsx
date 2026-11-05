import React from 'react';
import { FilterState } from '../types/property';
import { X, RotateCcw, LayoutGrid, Table, MapPin, ArrowDownUp } from 'lucide-react';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'efficiency';
export type ViewMode = 'grid' | 'table' | 'map';

interface ActiveFilterChipsProps {
  filters: FilterState;
  searchQuery: string;
  totalCount: number;
  filteredCount: number;
  sortOption: SortOption;
  viewMode: ViewMode;
  onFilterChange: (filters: FilterState) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onResetFilters: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  searchQuery,
  totalCount,
  filteredCount,
  sortOption,
  viewMode,
  onFilterChange,
  onSearchChange,
  onSortChange,
  onViewModeChange,
  onResetFilters
}) => {
  // Collect active filter tags
  const activeChips: { label: string; onRemove: () => void }[] = [];

  if (searchQuery.trim()) {
    activeChips.push({
      label: `Búsqueda: "${searchQuery}"`,
      onRemove: () => onSearchChange('')
    });
  }

  if (filters.sector !== 'ALL') {
    activeChips.push({
      label: `Sector: ${filters.sector}`,
      onRemove: () => onFilterChange({ ...filters, sector: 'ALL' })
    });
  }

  if (filters.type !== 'ALL') {
    activeChips.push({
      label: `Tipo: ${filters.type}`,
      onRemove: () => onFilterChange({ ...filters, type: 'ALL' })
    });
  }

  if (filters.maxPrice < 1000000) {
    activeChips.push({
      label: `Hasta $${(filters.maxPrice / 1000).toFixed(0)}k USD`,
      onRemove: () => onFilterChange({ ...filters, maxPrice: 1000000 })
    });
  }

  if (filters.hasGenerator) {
    activeChips.push({
      label: '⚡ Generador 100%',
      onRemove: () => onFilterChange({ ...filters, hasGenerator: false })
    });
  }

  if (filters.hasMetro) {
    activeChips.push({
      label: '🚇 Metro de Quito',
      onRemove: () => onFilterChange({ ...filters, hasMetro: false })
    });
  }

  if (filters.hasDoubleGate) {
    activeChips.push({
      label: '🛡️ Doble Garita',
      onRemove: () => onFilterChange({ ...filters, hasDoubleGate: false })
    });
  }

  if (filters.isValleyClimate) {
    activeChips.push({
      label: '☀️ Clima de Valle',
      onRemove: () => onFilterChange({ ...filters, isValleyClimate: false })
    });
  }

  if (filters.biessEligible) {
    activeChips.push({
      label: '🏦 Apto BIESS/Banco',
      onRemove: () => onFilterChange({ ...filters, biessEligible: false })
    });
  }

  if (filters.isAirbnb) {
    activeChips.push({
      label: '📈 Apto Airbnb',
      onRemove: () => onFilterChange({ ...filters, isAirbnb: false })
    });
  }

  return (
    <div className="active-controls-bar">
      <div className="active-controls-top">
        {/* Results count & status */}
        <div className="results-badge-wrap">
          <span className="results-strong">
            {filteredCount} de {totalCount}
          </span>
          <span className="results-muted">propiedades auditadas en Quito</span>
        </div>

        {/* Sorting & Layout View Selectors */}
        <div className="sorting-layout-controls">
          {/* Sort dropdown */}
          <div className="sort-dropdown-wrap">
            <ArrowDownUp size={14} className="sort-icon" />
            <select
              className="sort-select"
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              aria-label="Ordenar propiedades"
            >
              <option value="featured">Destacadas · Curaduría de Autor</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="area-desc">Superficie: Mayor a Menor (m²)</option>
              <option value="efficiency">Precio / m² más eficiente ($/m²)</option>
            </select>
          </div>

          {/* View mode toggle */}
          <div className="view-mode-toggle" role="group" aria-label="Modo de visualización">
            <button
              className={`btn-view-mode ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => onViewModeChange('grid')}
              title="Vista en Cuadrícula"
              aria-label="Vista en cuadrícula"
            >
              <LayoutGrid size={15} />
              <span>Tarjetas</span>
            </button>
            <button
              className={`btn-view-mode ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => onViewModeChange('table')}
              title="Vista Tabla Inversionista"
              aria-label="Vista tabla técnica"
            >
              <Table size={15} />
              <span>Inversionista</span>
            </button>
            <button
              className={`btn-view-mode ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => onViewModeChange('map')}
              title="Vista Mapa Vectorial"
              aria-label="Vista mapa vectorial"
            >
              <MapPin size={15} />
              <span>Mapa</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active chips row */}
      {activeChips.length > 0 && (
        <div className="chips-active-list" role="region" aria-label="Filtros aplicados">
          <span className="chips-label">Filtros activos:</span>
          {activeChips.map((chip, idx) => (
            <span key={idx} className="active-filter-pill">
              {chip.label}
              <button
                onClick={chip.onRemove}
                aria-label={`Eliminar filtro ${chip.label}`}
                title="Quitar filtro"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          <button
            className="btn-clear-all-chips"
            onClick={onResetFilters}
            title="Restablecer todos los filtros"
          >
            <RotateCcw size={12} />
            <span>Limpiar todo</span>
          </button>
        </div>
      )}
    </div>
  );
};
