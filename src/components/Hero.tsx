import React, { useState } from 'react';
import { MapPin, Building2, DollarSign, ChevronDown, Search } from 'lucide-react';
import { FilterState, Sector, PropertyType } from '../types/property';

interface HeroProps {
  filters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  filters,
  onFilterChange,
  searchQuery: _searchQuery = '',
  onSearchChange: _onSearchChange,
  onSearchSubmit
}) => {
  // Operation Tab: 'comprar' | 'rentar'
  const [activeTab, setActiveTab] = useState<'comprar' | 'rentar'>('comprar');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('ALL');

  const handleSectorChange = (sector: Sector | 'ALL') => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        sector
      });
    }
  };

  const handleTypeChange = (type: PropertyType | 'ALL') => {
    if (onFilterChange && filters) {
      onFilterChange({
        ...filters,
        type
      });
    }
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
    if (!onFilterChange || !filters) return;

    if (range === 'ALL') {
      onFilterChange({ ...filters, maxPrice: 1000000 });
    } else if (range === '0-200k') {
      onFilterChange({ ...filters, maxPrice: 200000 });
    } else if (range === '200k-400k') {
      onFilterChange({ ...filters, maxPrice: 400000 });
    } else if (range === '400k-700k') {
      onFilterChange({ ...filters, maxPrice: 700000 });
    } else if (range === '700k+') {
      onFilterChange({ ...filters, maxPrice: 2500000 });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  return (
    <section className="hero-signature-section">
      {/* High-Resolution Luxury Living Room Background with City Panorama */}
      <div className="hero-background-media">
        <img 
          src="/images/luxury_interior.jpg" 
          alt="Vista panorámica de sala de lujo en Quito y valles"
          className="hero-bg-img"
          loading="eager"
        />
        <div className="hero-gradient-overlay" />
      </div>

      <div className="hero-inner-container">
        {/* Main Headline matching Mockup 1:1 */}
        <div className="hero-typography-box">
          <h1 className="hero-main-title">
            Encuentra<br className="desktop-line-break" /> la propiedad ideal<br />
            en <span className="highlight-orange">Quito y sus valles</span>
          </h1>
          <p className="hero-sub-description">
            Casas, departamentos, oficinas, locales, terrenos y más. Compra, renta o invierte con expertos.
          </p>
        </div>

        {/* Floating Search Console matching Mockup Pixel-Perfect */}
        <div className="hero-floating-search-console">
          {/* Top Operation Tabs: Comprar | Rentar */}
          <div className="search-tabs-header">
            <button
              type="button"
              className={`search-tab-pill ${activeTab === 'comprar' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('comprar')}
            >
              Comprar
            </button>
            <button
              type="button"
              className={`search-tab-pill ${activeTab === 'rentar' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('rentar')}
            >
              Rentar
            </button>
          </div>

          {/* Elevated White Search Card */}
          <form className="search-card-body" onSubmit={handleSubmit}>
            <div className="search-inputs-grid">
              {/* Field 1: Ubicación */}
              <div className="search-input-col">
                <div className="input-icon-slot">
                  <MapPin size={20} color="#FEA004" />
                </div>
                <div className="input-text-slot">
                  <label htmlFor="hero-ubicacion-select" className="search-field-label">
                    UBICACIÓN
                  </label>
                  <select
                    id="hero-ubicacion-select"
                    className="search-field-select"
                    value={filters?.sector || 'ALL'}
                    onChange={(e) => handleSectorChange(e.target.value as Sector | 'ALL')}
                  >
                    <option value="ALL">Quito, Cumbayá, Valle...</option>
                    <option value="Cumbayá">Cumbayá (Clima Cálido & Colegios)</option>
                    <option value="Puembo">Puembo (Club Ecuestre & Paz)</option>
                    <option value="González Suárez">González Suárez (Skyline & Vistas)</option>
                    <option value="La Carolina">La Carolina (Metro & Corporativo)</option>
                    <option value="Tumbaco">Tumbaco (Chaquiñán & Naturaleza)</option>
                    <option value="Nayón">Nayón (Valles Cercanos)</option>
                  </select>
                </div>
                <ChevronDown size={16} className="select-chevron-icon" />
              </div>

              <div className="input-divider-line desktop-only" />

              {/* Field 2: Tipo de propiedad */}
              <div className="search-input-col">
                <div className="input-icon-slot">
                  <Building2 size={20} color="#FEA004" />
                </div>
                <div className="input-text-slot">
                  <label htmlFor="hero-tipo-select" className="search-field-label">
                    TIPO DE PROPIEDAD
                  </label>
                  <select
                    id="hero-tipo-select"
                    className="search-field-select"
                    value={filters?.type || 'ALL'}
                    onChange={(e) => handleTypeChange(e.target.value as PropertyType | 'ALL')}
                  >
                    <option value="ALL">Todos</option>
                    <option value="Casa">Casas & Residencias</option>
                    <option value="Suite">Departamentos & Suites</option>
                    <option value="Penthouse">Penthouse & Oficinas</option>
                    <option value="Terreno">Terrenos & Quintas</option>
                  </select>
                </div>
                <ChevronDown size={16} className="select-chevron-icon" />
              </div>

              <div className="input-divider-line desktop-only" />

              {/* Field 3: Precio */}
              <div className="search-input-col">
                <div className="input-icon-slot">
                  <DollarSign size={20} color="#FEA004" />
                </div>
                <div className="input-text-slot">
                  <label htmlFor="hero-precio-select" className="search-field-label">
                    PRECIO
                  </label>
                  <select
                    id="hero-precio-select"
                    className="search-field-select"
                    value={selectedPriceRange}
                    onChange={(e) => handlePriceRangeChange(e.target.value)}
                  >
                    <option value="ALL">Desde - Hasta</option>
                    <option value="0-200k">Hasta $200.000</option>
                    <option value="200k-400k">$200.000 - $400.000</option>
                    <option value="400k-700k">$400.000 - $700.000</option>
                    <option value="700k+">Más de $700.000</option>
                  </select>
                </div>
                <ChevronDown size={16} className="select-chevron-icon" />
              </div>

              {/* Action Button: Buscar */}
              <div className="search-submit-slot">
                <button
                  type="submit"
                  className="btn-hero-search-orange"
                  aria-label="Buscar propiedades"
                >
                  <Search size={18} color="#FFFFFF" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
