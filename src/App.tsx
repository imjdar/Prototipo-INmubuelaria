import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Property, FilterState, Sector } from './types/property';
import { ToastMessage } from './types/toast';
import { PROPERTIES } from './data/properties';
import { TopMicroBar } from './components/TopMicroBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterConsole } from './components/FilterConsole';
import { ActiveFilterChips, SortOption, ViewMode } from './components/ActiveFilterChips';
import { PropertyCard } from './components/PropertyCard';
import { PropertyTableView } from './components/PropertyTableView';
import { SplitViewMap } from './components/SplitViewMap';
import { PropertyDetailView } from './components/PropertyDetailView';
import { PropertyCompareTray } from './components/PropertyCompareTray';
import { PropertyCompareModal } from './components/PropertyCompareModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { PropertyQuickViewModal } from './components/PropertyQuickViewModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { ScheduleModal } from './components/ScheduleModal';
import { MobileDeviceSimulator } from './components/MobileDeviceSimulator';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const FAVORITES_STORAGE_KEY = 'valle_urbe_saved_favorites_v1';

export const App: React.FC = () => {
  // Navigation & View States
  const [activeView, setActiveView] = useState<'catalog' | 'split' | 'detail'>('catalog');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProperty, setSelectedProperty] = useState<Property>(PROPERTIES[0]);

  // Wishlist & Comparison States
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['VU-CUM-048', 'VU-GON-012'];
    } catch {
      return ['VU-CUM-048', 'VU-GON-012'];
    }
  });

  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>([]);

  // Dialogs & Drawer States
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [quickViewProperty, setQuickViewProperty] = useState<Property | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [modalProperty, setModalProperty] = useState<Property | null>(null);
  const [isMobileSimulated, setIsMobileSimulated] = useState<boolean>(false);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [filters, setFilters] = useState<FilterState>({
    sector: 'ALL',
    type: 'ALL',
    maxPrice: 1000000,
    hasGenerator: false,
    hasMetro: false,
    hasDoubleGate: false,
    isValleyClimate: false,
    biessEligible: false,
    isAirbnb: false
  });

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      title,
      description,
      type
    };
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [savedPropertyIds]);

  // Global Keyboard Shortcuts (IHC Heuristics: Flexibility & Efficiency)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Esc closes modals and drawers
      if (e.key === 'Escape') {
        if (isCompareModalOpen) {
          setIsCompareModalOpen(false);
          return;
        }
        if (isFavoritesDrawerOpen) {
          setIsFavoritesDrawerOpen(false);
          return;
        }
        if (quickViewProperty) {
          setQuickViewProperty(null);
          return;
        }
        if (isWhatsAppOpen) {
          setIsWhatsAppOpen(false);
          return;
        }
        if (isScheduleOpen) {
          setIsScheduleOpen(false);
          return;
        }
      }

      // '/' focuses the search bar if not already in an input
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('main-property-search');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCompareModalOpen, isFavoritesDrawerOpen, quickViewProperty, isWhatsAppOpen, isScheduleOpen]);

  // Filtered & Sorted Properties Engine
  const filteredAndSortedProperties = useMemo(() => {
    let result = PROPERTIES.filter((p) => {
      // Search query text matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSector = p.sector.toLowerCase().includes(query);
        const matchesMicrozone = p.microzone.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesType = p.type.toLowerCase().includes(query);
        const matchesId = p.id.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSector && !matchesMicrozone && !matchesDesc && !matchesType && !matchesId) {
          return false;
        }
      }

      // Dropdown filters
      if (filters.sector !== 'ALL' && p.sector !== filters.sector) return false;
      if (filters.type !== 'ALL' && p.type !== filters.type) return false;
      if (p.price > filters.maxPrice) return false;

      // Specialized Quito criteria
      if (filters.hasGenerator && !p.features.hasGenerator) return false;
      if (filters.hasMetro && !p.features.hasMetro) return false;
      if (filters.hasDoubleGate && !p.features.hasDoubleGate) return false;
      if (filters.isValleyClimate && !p.features.isValleyClimate) return false;
      if (filters.biessEligible && !p.features.biessEligible) return false;
      if (filters.isAirbnb && !p.features.isAirbnb) return false;

      return true;
    });

    // Sorting
    switch (sortOption) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'area-desc':
        result = [...result].sort((a, b) => b.areaBuild - a.areaBuild);
        break;
      case 'efficiency':
        result = [...result].sort((a, b) => (a.price / a.areaBuild) - (b.price / b.areaBuild));
        break;
      case 'featured':
      default:
        // maintain original curated order
        break;
    }

    return result;
  }, [filters, searchQuery, sortOption]);

  // Compared Properties Objects
  const comparedProperties = useMemo(() => {
    return PROPERTIES.filter((p) => comparedPropertyIds.includes(p.id));
  }, [comparedPropertyIds]);

  // Saved Properties Objects
  const savedProperties = useMemo(() => {
    return PROPERTIES.filter((p) => savedPropertyIds.includes(p.id));
  }, [savedPropertyIds]);

  // Handlers
  const toggleFavorite = (id: string) => {
    const prop = PROPERTIES.find((p) => p.id === id);
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        addToast('Removido de favoritos', prop ? prop.title : undefined, 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast('Guardado en tu portafolio privado', prop ? prop.title : undefined, 'bookmark');
        return [...prev, id];
      }
    });
  };

  const toggleCompare = (property: Property) => {
    setComparedPropertyIds((prev) => {
      if (prev.includes(property.id)) {
        addToast('Removida del comparador', property.title, 'info');
        return prev.filter((id) => id !== property.id);
      } else {
        if (prev.length >= 3) {
          addToast(
            'Límite de comparación alcanzado',
            'Puedes comparar hasta 3 propiedades simultáneamente.',
            'warning'
          );
          return prev;
        }
        addToast(
          'Agregada al comparador',
          `${property.title} (${prev.length + 1} de 3)`,
          'compare'
        );
        return [...prev, property.id];
      }
    });
  };

  const handleRemoveFromCompare = (id: string) => {
    const prop = PROPERTIES.find((p) => p.id === id);
    setComparedPropertyIds((prev) => prev.filter((item) => item !== id));
    if (prop) {
      addToast('Removida del comparador', prop.title, 'info');
    }
  };

  const handleClearCompare = () => {
    setComparedPropertyIds([]);
    addToast('Comparador vaciado', 'Has removido las propiedades en comparación.', 'info');
  };

  const handleShareProperty = (property: Property) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/#ref=${property.id} · ${property.title} - $${property.price.toLocaleString('en-US')}`
      );
    }
    addToast(
      'Enlace copiado al portapapeles',
      `Ficha técnica de ${property.title} lista para compartir.`,
      'success'
    );
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPropertyById = (id: string) => {
    const prop = PROPERTIES.find((p) => p.id === id);
    if (prop) {
      handleSelectProperty(prop);
    }
  };

  const handleOpenWhatsApp = (property?: Property) => {
    setModalProperty(property || selectedProperty || null);
    setIsWhatsAppOpen(true);
  };

  const handleOpenSchedule = (property?: Property) => {
    setModalProperty(property || selectedProperty || null);
    setIsScheduleOpen(true);
  };

  const handleFilterSector = (sector: Sector) => {
    setFilters((prev) => ({ ...prev, sector }));
    setActiveView('catalog');
  };

  const handleResetFilters = () => {
    setFilters({
      sector: 'ALL',
      type: 'ALL',
      maxPrice: 1000000,
      hasGenerator: false,
      hasMetro: false,
      hasDoubleGate: false,
      isValleyClimate: false,
      biessEligible: false,
      isAirbnb: false
    });
    setSearchQuery('');
    setSortOption('featured');
    addToast('Filtros restablecidos', 'Mostrando la colección completa de propiedades.', 'info');
  };

  const handleCompareFavorites = () => {
    const idsToCompare = savedPropertyIds.slice(0, 3);
    setComparedPropertyIds(idsToCompare);
    setIsFavoritesDrawerOpen(false);
    setIsCompareModalOpen(true);
    addToast('Comparando favoritos', `Cargadas ${idsToCompare.length} propiedades en la matriz.`, 'compare');
  };

  const handleContactWhatsAppPortfolio = () => {
    setIsFavoritesDrawerOpen(false);
    setIsWhatsAppOpen(true);
  };

  // If mobile device simulator is open
  if (isMobileSimulated) {
    return (
      <MobileDeviceSimulator
        properties={filteredAndSortedProperties}
        onSelectProperty={handleSelectProperty}
        onContactWhatsApp={handleOpenWhatsApp}
        onCloseSimulator={() => setIsMobileSimulated(false)}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Top micro bar with system status */}
      <TopMicroBar
        isMobileSimulated={isMobileSimulated}
        onToggleMobile={() => setIsMobileSimulated(!isMobileSimulated)}
      />

      {/* Header with Wishlist & Compare badges */}
      <Header
        activeView={activeView}
        savedCount={savedPropertyIds.length}
        comparedCount={comparedPropertyIds.length}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'split') setViewMode('map');
          if (view === 'catalog') setViewMode('grid');
        }}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onSelectPropertyById={handleSelectPropertyById}
      />

      {/* Hero Header */}
      {activeView === 'catalog' && <Hero />}

      {/* Main Filter Console */}
      {activeView !== 'detail' && (
        <FilterConsole
          filters={filters}
          searchQuery={searchQuery}
          onFilterChange={setFilters}
          onSearchChange={setSearchQuery}
          onOpenMap={() => {
            setActiveView('split');
            setViewMode('map');
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="main-wrapper">
        {activeView === 'catalog' && (
          <div>
            {/* Active Chips & Sorting Bar */}
            <ActiveFilterChips
              filters={filters}
              searchQuery={searchQuery}
              totalCount={PROPERTIES.length}
              filteredCount={filteredAndSortedProperties.length}
              sortOption={sortOption}
              viewMode={viewMode}
              onFilterChange={setFilters}
              onSearchChange={setSearchQuery}
              onSortChange={setSortOption}
              onViewModeChange={(mode) => {
                setViewMode(mode);
                if (mode === 'map') setActiveView('split');
              }}
              onResetFilters={handleResetFilters}
            />

            {/* Empty State */}
            {filteredAndSortedProperties.length === 0 ? (
              <div className="empty-results-box" role="alert">
                <h3 className="empty-results-title">
                  No se encontraron propiedades con estos criterios
                </h3>
                <p className="empty-results-desc">
                  Prueba desactivando algunos filtros de alta especificidad (como Metro o Doble Garita) o buscando otro término.
                </p>
                <button
                  className="btn-search-primary"
                  onClick={handleResetFilters}
                >
                  Restablecer Todos los Filtros
                </button>
              </div>
            ) : (
              <>
                {/* View 1: Card Grid */}
                {viewMode === 'grid' && (
                  <div className="properties-grid">
                    {filteredAndSortedProperties.map((p) => (
                      <PropertyCard
                        key={p.id}
                        property={p}
                        isFavorite={savedPropertyIds.includes(p.id)}
                        isCompared={comparedPropertyIds.includes(p.id)}
                        onToggleFavorite={toggleFavorite}
                        onToggleCompare={toggleCompare}
                        onQuickView={(prop) => setQuickViewProperty(prop)}
                        onSelectProperty={handleSelectProperty}
                        onContactWhatsApp={handleOpenWhatsApp}
                        onShare={handleShareProperty}
                      />
                    ))}
                  </div>
                )}

                {/* View 2: Investor Table View */}
                {viewMode === 'table' && (
                  <PropertyTableView
                    properties={filteredAndSortedProperties}
                    savedPropertyIds={savedPropertyIds}
                    comparedPropertyIds={comparedPropertyIds}
                    onToggleFavorite={toggleFavorite}
                    onToggleCompare={toggleCompare}
                    onQuickView={(prop) => setQuickViewProperty(prop)}
                    onSelectProperty={handleSelectProperty}
                    onContactWhatsApp={handleOpenWhatsApp}
                  />
                )}
              </>
            )}
          </div>
        )}

        {/* View: Split Vector Cartography */}
        {activeView === 'split' && (
          <SplitViewMap
            properties={filteredAndSortedProperties}
            savedPropertyIds={savedPropertyIds}
            comparedPropertyIds={comparedPropertyIds}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onQuickView={(prop) => setQuickViewProperty(prop)}
            onShare={handleShareProperty}
            onSelectProperty={handleSelectProperty}
            onContactWhatsApp={handleOpenWhatsApp}
            onSwitchToCatalog={() => {
              setActiveView('catalog');
              setViewMode('grid');
            }}
          />
        )}

        {/* View: Full Property Due Diligence Detail */}
        {activeView === 'detail' && (
          <PropertyDetailView
            property={selectedProperty}
            onBack={() => setActiveView('catalog')}
            onOpenSchedule={handleOpenSchedule}
            onContactWhatsApp={handleOpenWhatsApp}
          />
        )}
      </main>

      {/* E-Commerce Sticky Compare Tray */}
      <PropertyCompareTray
        comparedProperties={comparedProperties}
        onRemoveProperty={handleRemoveFromCompare}
        onClearAll={handleClearCompare}
        onOpenModal={() => setIsCompareModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <PropertyCompareModal
        isOpen={isCompareModalOpen}
        properties={comparedProperties}
        onClose={() => setIsCompareModalOpen(false)}
        onSelectProperty={handleSelectProperty}
        onContactWhatsApp={handleOpenWhatsApp}
        onRemoveProperty={handleRemoveFromCompare}
      />

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        savedProperties={savedProperties}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        onRemoveFavorite={toggleFavorite}
        onClearAllFavorites={() => {
          setSavedPropertyIds([]);
          addToast('Portafolio vaciado', 'Has eliminado todas las propiedades de favoritos.', 'info');
        }}
        onSelectProperty={handleSelectProperty}
        onCompareFavorites={handleCompareFavorites}
        onContactWhatsAppPortfolio={handleContactWhatsAppPortfolio}
      />

      <PropertyQuickViewModal
        property={quickViewProperty}
        isOpen={!!quickViewProperty}
        onClose={() => setQuickViewProperty(null)}
        onViewFullDetails={handleSelectProperty}
        onOpenSchedule={handleOpenSchedule}
        onContactWhatsApp={handleOpenWhatsApp}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        property={modalProperty}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        property={modalProperty}
        onClose={() => setIsScheduleOpen(false)}
      />

      {/* Footer */}
      <Footer
        onFilterSector={handleFilterSector}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'split') setViewMode('map');
          if (view === 'catalog') setViewMode('grid');
        }}
      />
    </div>
  );
};
