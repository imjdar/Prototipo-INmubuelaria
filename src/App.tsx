import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Property, FilterState, Sector } from './types/property';
import { ToastMessage } from './types/toast';
import { User, UserSubscription, PlanCode, AuthState } from './types/auth';
import { PROPERTIES } from './data/properties';
import { authService, MEMBERSHIP_PLANS, DEMO_USERS } from './services/authService';
import { propertyService } from './services/propertyService';

// Custom Hooks for SOLID & Multi-User State Isolation
import { useUserFavorites } from './hooks/useUserFavorites';
import { usePropertyComparison } from './hooks/usePropertyComparison';

import { MapPin } from 'lucide-react';
import { TopMicroBar } from './components/TopMicroBar';
import { Header, SiteView } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { TrustBar } from './components/TrustBar';
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

// Sprint 1 Auth & Subscription Components
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { MembershipPlansModal } from './components/MembershipPlansModal';
import { PublishPropertyModal } from './components/PublishPropertyModal';

// Dedicated Views for 7 Navbar Pillars
import { RentalsView } from './views/RentalsView';
import { ProjectsView } from './views/ProjectsView';
import { ServicesView } from './views/ServicesView';
import { AboutView } from './views/AboutView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';

// Dedicated Modals for 10 Sitemap Pillars & Competitor Value-Add Tools
import { AboutUsModal } from './components/AboutUsModal';
import { ResourcesCalculatorsModal } from './components/ResourcesCalculatorsModal';
import { AgentsDirectoryModal } from './components/AgentsDirectoryModal';
import { TikTokVideoReelModal } from './components/TikTokVideoReelModal';
import { ContactModal } from './components/ContactModal';
import { PaymentCheckoutModal } from './components/PaymentCheckoutModal';
import { PropertyValuatorModal } from './components/PropertyValuatorModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { Bell } from 'lucide-react';
import { AgentProfile } from './services/agentService';
import { LegalTemplate } from './services/resourcesService';
import { PaymentIntent } from './services/paymentService';

export const App: React.FC = () => {
  // Navigation & View States
  const [activeView, setActiveView] = useState<SiteView>('comprar');
  const [previousView, setPreviousView] = useState<SiteView>('comprar');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [propertyList, setPropertyList] = useState<Property[]>(PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property>(PROPERTIES[0]);

  // Competitor Intelligence Value-Add: Valuator IA & Price Alert States
  const [isValuatorOpen, setIsValuatorOpen] = useState<boolean>(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertTargetProperty, setAlertTargetProperty] = useState<Property | null>(null);
  const [publishPrefill, setPublishPrefill] = useState<any>(null);

  // Sprint 1: Auth & User Session State
  const [authState, setAuthState] = useState<AuthState>(() => {
    const initial = authService.getInitialState();
    if (initial.isAuthenticated && initial.user) return initial;
    // Default to Mateo Serrano (Agent Pro) for high-impact reviewer experience
    const demo = DEMO_USERS.agent;
    const initialSub: UserSubscription = {
      id: 'sub-default-001',
      userId: demo.user.id,
      plan: MEMBERSHIP_PLANS.PRO_AGENT,
      status: 'ACTIVE',
      currentPeriodStart: '2026-01-01T00:00:00Z',
      currentPeriodEnd: '2027-01-01T00:00:00Z',
      autoRenew: true,
      usedListings: 4
    };
    return {
      isAuthenticated: true,
      user: demo.user,
      subscription: initialSub,
      tokens: null,
      isLoading: false
    };
  });

  // Sprint 1 Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState<boolean>(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);

  // Dedicated Modals for Sitemap Pillars
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState<boolean>(false);
  const [resourcesInitialTab, setResourcesInitialTab] = useState<'calculators' | 'blog' | 'documents'>('calculators');
  const [isAgentsOpen, setIsAgentsOpen] = useState<boolean>(false);
  const [isTikTokOpen, setIsTikTokOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [pendingPlan, setPendingPlan] = useState<{ code: PlanCode; name: string; amount: number } | null>(null);

  // Multi-User Isolated Wishlist Storage (Scoped by User ID)
  const { savedPropertyIds, toggleFavorite: toggleFavScoped, clearFavorites } = useUserFavorites(authState.user?.id);

  // Comparison State & Heuristic 3-Limit
  const { 
    comparedPropertyIds, 
    toggleCompare: toggleCompScoped, 
    removeProperty: removeComparedProperty, 
    clearCompare, 
    loadPropertiesForCompare 
  } = usePropertyComparison();

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

  // Global Keyboard Shortcuts (Esc closes any open modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAuthModalOpen) { setIsAuthModalOpen(false); return; }
        if (isProfileModalOpen) { setIsProfileModalOpen(false); return; }
        if (isPlansModalOpen) { setIsPlansModalOpen(false); return; }
        if (isPublishModalOpen) { setIsPublishModalOpen(false); return; }
        if (isAboutOpen) { setIsAboutOpen(false); return; }
        if (isResourcesOpen) { setIsResourcesOpen(false); return; }
        if (isAgentsOpen) { setIsAgentsOpen(false); return; }
        if (isTikTokOpen) { setIsTikTokOpen(false); return; }
        if (isContactOpen) { setIsContactOpen(false); return; }
        if (isCheckoutOpen) { setIsCheckoutOpen(false); return; }
        if (isCompareModalOpen) { setIsCompareModalOpen(false); return; }
        if (isFavoritesDrawerOpen) { setIsFavoritesDrawerOpen(false); return; }
        if (quickViewProperty) { setQuickViewProperty(null); return; }
        if (isWhatsAppOpen) { setIsWhatsAppOpen(false); return; }
        if (isScheduleOpen) { setIsScheduleOpen(false); return; }
      }

      // '/' focuses search bar
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('main-property-search');
        if (searchInput) searchInput.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isAuthModalOpen,
    isProfileModalOpen,
    isPlansModalOpen,
    isPublishModalOpen,
    isCompareModalOpen,
    isFavoritesDrawerOpen,
    quickViewProperty,
    isWhatsAppOpen,
    isScheduleOpen
  ]);

  // High Performance Memoized Filter & Sort Engine via PropertyService (SRP / OCP)
  const filteredAndSortedProperties = useMemo(() => {
    const filtered = propertyService.filterProperties(propertyList, filters, searchQuery);
    return propertyService.sortProperties(filtered, sortOption);
  }, [propertyList, filters, searchQuery, sortOption]);

  // Compared Properties Objects
  const comparedProperties = useMemo(() => {
    return propertyList.filter((p) => comparedPropertyIds.includes(p.id));
  }, [propertyList, comparedPropertyIds]);

  // Saved Properties Objects
  const savedProperties = useMemo(() => {
    return propertyList.filter((p) => savedPropertyIds.includes(p.id));
  }, [propertyList, savedPropertyIds]);

  // Sprint 1 Auth Handlers
  const handleLoginSuccess = (user: User) => {
    const sub = authService.getInitialState().subscription || {
      id: `sub-${Date.now()}`,
      userId: user.id,
      plan: MEMBERSHIP_PLANS[user.role === 'AGENT' ? 'PRO_AGENT' : 'FREE'],
      status: 'ACTIVE',
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      usedListings: user.role === 'AGENT' ? 4 : 0
    };

    setAuthState({
      isAuthenticated: true,
      user,
      subscription: sub,
      tokens: null,
      isLoading: false
    });

    addToast(
      `¡Bienvenido, ${user.fullName.split(' ')[0]}!`,
      `Sesión iniciada con perfil: ${user.role}`,
      'success'
    );
  };

  const handleLogout = () => {
    authService.clearSession();
    setAuthState({
      isAuthenticated: false,
      user: null,
      subscription: null,
      tokens: null,
      isLoading: false
    });
    setIsProfileModalOpen(false);
    addToast('Sesión Cerrada', 'Has cerrado tu sesión segura en Valle & Urbe.', 'info');
  };

  const handleSwitchDemo = async (key: 'agent' | 'buyer' | 'admin') => {
    const result = await authService.loginWithDemo(key);
    setAuthState({
      isAuthenticated: true,
      user: result.user,
      subscription: result.subscription,
      tokens: result.tokens,
      isLoading: false
    });
    setIsProfileModalOpen(false);
    addToast(
      'Rol Alternado (Demo RBAC)',
      `Ahora navegando como: ${result.user.fullName} (${result.user.role})`,
      'info'
    );
  };

  const handleSelectPlan = async (planCode: PlanCode) => {
    if (!authState.user) {
      setIsPlansModalOpen(false);
      setIsAuthModalOpen(true);
      return;
    }
    if (planCode === 'FREE') {
      const updatedSub = await authService.upgradeSubscription(authState.user, 'FREE');
      setAuthState((prev) => ({ ...prev, subscription: updatedSub }));
      setIsPlansModalOpen(false);
      addToast('Plan Esencial Activado', 'Dispones de 1 propiedad por 3 meses.', 'success');
      return;
    }
    const amount = planCode === 'PRO_AGENT' ? 49 : 99;
    const name = planCode === 'PRO_AGENT' ? 'Plan Profesional' : 'Plan Empresa';
    setPendingPlan({ code: planCode, name, amount });
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = async (intent: PaymentIntent) => {
    if (!authState.user) return;
    const updatedSub = await authService.upgradeSubscription(authState.user, intent.planCode);
    setAuthState((prev) => ({
      ...prev,
      subscription: updatedSub
    }));
    setIsCheckoutOpen(false);
    setIsPlansModalOpen(false);
    addToast(
      '¡Pago Confirmado y Membresía Activa!',
      `${intent.planName} activado. Comprobante: ${intent.receiptNumber}`,
      'success'
    );
  };

  const handlePropertyPublished = (newProperty: Property) => {
    setPropertyList((prev) => [newProperty, ...prev]);
    setSelectedProperty(newProperty);
    if (authState.subscription) {
      setAuthState((prev) => ({
        ...prev,
        subscription: prev.subscription ? {
          ...prev.subscription,
          usedListings: prev.subscription.usedListings + 1
        } : null
      }));
    }
    addToast(
      '¡Propiedad Publicada con Éxito!',
      `${newProperty.title} ha superado la auditoría IA y está en vivo.`,
      'success'
    );
  };

  // Property Actions
  const toggleFavorite = (id: string) => {
    const prop = propertyList.find((p) => p.id === id);
    const { isAdded } = toggleFavScoped(id);
    if (isAdded) {
      addToast('Guardado en tu portafolio privado', prop ? prop.title : undefined, 'bookmark');
    } else {
      addToast('Removido de favoritos', prop ? prop.title : undefined, 'info');
    }
  };

  const toggleCompare = (property: Property) => {
    const result = toggleCompScoped(property);
    if (!result.success) {
      addToast(
        'Límite de comparación alcanzado',
        'Puedes comparar hasta 3 propiedades simultáneamente.',
        'warning'
      );
    } else if (result.isAdded) {
      addToast(
        'Agregada al comparador',
        `${property.title} (${result.count} de 3)`,
        'compare'
      );
    } else {
      addToast('Removida del comparador', property.title, 'info');
    }
  };

  const handleRemoveFromCompare = (id: string) => {
    const prop = propertyList.find((p) => p.id === id);
    removeComparedProperty(id);
    if (prop) {
      addToast('Removida del comparador', prop.title, 'info');
    }
  };

  const handleClearCompare = () => {
    clearCompare();
    addToast('Comparador vaciado', 'Has removido las propiedades en comparación.', 'info');
  };

  const handleShareProperty = (property: Property) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
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
    setPreviousView(activeView !== 'detail' ? activeView : 'comprar');
    setActiveView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPropertyById = (id: string) => {
    const prop = propertyList.find((p) => p.id === id);
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
    loadPropertiesForCompare(idsToCompare);
    setIsFavoritesDrawerOpen(false);
    setIsCompareModalOpen(true);
    addToast('Comparando favoritos', `Cargadas ${idsToCompare.length} propiedades en la matriz.`, 'compare');
  };

  const handleContactWhatsAppPortfolio = () => {
    setIsFavoritesDrawerOpen(false);
    setIsWhatsAppOpen(true);
  };

  const handleOpenValuator = () => setIsValuatorOpen(true);

  const handleOpenAlert = (target?: Property) => {
    setAlertTargetProperty(target || null);
    setIsAlertModalOpen(true);
  };

  const handleValuatorPublish = (prefillData: any) => {
    setPublishPrefill(prefillData);
    setIsPublishModalOpen(true);
    addToast('Datos cargados al formulario', 'Tu estimación de avalúo ha sido transferida a la publicación.', 'success');
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

      {/* Header with Wishlist, Compare badges, and Sprint 1 Auth / Publish */}
      <Header
        activeView={activeView}
        savedCount={savedPropertyIds.length}
        comparedCount={comparedPropertyIds.length}
        user={authState.user}
        onNavigate={(view) => {
          setActiveView(view);
          if (view === 'split') setViewMode('map');
          if (view === 'comprar' || view === 'catalog') setViewMode('grid');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
        onSelectPropertyById={handleSelectPropertyById}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenPlans={() => setIsPlansModalOpen(true)}
        onOpenPublish={() => setIsPublishModalOpen(true)}
        onOpenAbout={() => setActiveView('nosotros')}
        onOpenResources={(tab) => {
          if (tab === 'blog') {
            setActiveView('blog');
          } else {
            if (tab) setResourcesInitialTab(tab);
            setIsResourcesOpen(true);
          }
        }}
        onOpenAgents={() => setIsAgentsOpen(true)}
        onOpenTikTok={() => setIsTikTokOpen(true)}
        onOpenContact={() => setActiveView('contacto')}
        onOpenValuator={handleOpenValuator}
        onOpenPriceAlert={() => handleOpenAlert()}
      />

      {/* Hero Header matching Mockup (Exclusive to Comprar / Catalog view) */}
      {(activeView === 'catalog' || activeView === 'comprar') && (
        <>
          <Hero
            filters={filters}
            onFilterChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={() => {
              const el = document.getElementById('catalog-results-heading');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <CategoryBar
            selectedType={filters.type}
            onSelectCategory={(type) => setFilters((prev) => ({ ...prev, type }))}
          />
        </>
      )}

      {/* Main Filter Console (Exclusive to Comprar / Catalog view) */}
      {(activeView === 'catalog' || activeView === 'comprar') && (
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
        {/* View 1: Comprar (Flagship Sales Catalog) */}
        {(activeView === 'catalog' || activeView === 'comprar') && (
          <div>
            {/* Active Chips & Sorting Bar */}
            <ActiveFilterChips
              filters={filters}
              searchQuery={searchQuery}
              totalCount={propertyList.length}
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
                {/* Propiedades destacadas Section Header matching Mockup & Plusvalía Alerta */}
                <div id="catalog-results-heading" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '1.75rem 0 1rem',
                  padding: '0 0.25rem',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#213145',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    Propiedades destacadas
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      onClick={() => handleOpenAlert()}
                      style={{
                        background: '#FFF7ED',
                        border: '1px solid #FED7AA',
                        borderRadius: '999px',
                        padding: '0.4rem 0.85rem',
                        color: '#D97706',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        transition: 'all 0.15s ease'
                      }}
                      title="Crear alerta de nuevas publicaciones o bajadas de precio"
                    >
                      <Bell size={14} color="#D97706" />
                      <span>Crear Alerta</span>
                    </button>

                    <button
                      onClick={handleResetFilters}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#FEA004',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <span>Ver todas las propiedades</span>
                      <span style={{ fontSize: '1.1rem' }}>→</span>
                    </button>
                  </div>
                </div>

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
                        onOpenAlert={(prop) => handleOpenAlert(prop)}
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

                {/* Floating VER MAPA button matching Wireframe 04 */}
                <button
                  onClick={() => {
                    setActiveView('split');
                    setViewMode('map');
                  }}
                  aria-label="Ver mapa interactivo"
                  style={{
                    position: 'fixed',
                    bottom: '28px',
                    right: '28px',
                    zIndex: 80,
                    background: '#FEA004',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '0.85rem 1.6rem',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    letterSpacing: '0.04em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(254, 160, 4, 0.45)',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <MapPin size={18} />
                  <span>VER MAPA</span>
                </button>
              </>
            )}
          </div>
        )}

        {/* View 2: Rentar (Dedicated Rental Portal) */}
        {activeView === 'rentar' && (
          <RentalsView
            properties={propertyList}
            savedPropertyIds={savedPropertyIds}
            comparedPropertyIds={comparedPropertyIds}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
            onQuickView={(prop) => setQuickViewProperty(prop)}
            onSelectProperty={handleSelectProperty}
            onContactWhatsApp={handleOpenWhatsApp}
            onShare={handleShareProperty}
            onOpenSchedule={handleOpenSchedule}
          />
        )}

        {/* View 3: Proyectos (Dedicated Off-Plan New Developments) */}
        {activeView === 'proyectos' && (
          <ProjectsView
            properties={propertyList}
            onSelectProperty={handleSelectProperty}
            onContactWhatsApp={handleOpenWhatsApp}
            onOpenSchedule={handleOpenSchedule}
            onShare={handleShareProperty}
          />
        )}

        {/* View 4: Servicios (Dedicated Legal, Notarial & Valuation Hub) */}
        {activeView === 'servicios' && (
          <ServicesView
            onOpenWhatsApp={() => handleOpenWhatsApp()}
            onOpenResources={(tab) => {
              if (tab) setResourcesInitialTab(tab);
              setIsResourcesOpen(true);
            }}
          />
        )}

        {/* View 5: Nosotros (Dedicated Quiénes Somos View) */}
        {activeView === 'nosotros' && (
          <AboutView
            onOpenContact={() => setActiveView('contacto')}
            onOpenWhatsApp={() => handleOpenWhatsApp()}
            onNavigateToCatalog={() => setActiveView('comprar')}
          />
        )}

        {/* View 6: Blog (Dedicated Knowledge, Articles & Legal Templates) */}
        {activeView === 'blog' && (
          <BlogView
            onDownloadTemplate={(tpl) => {
              addToast(`Plantilla Descargada: ${tpl.downloadFileName}`, 'Documento listo para personalización notarial.', 'success');
            }}
            onOpenWhatsApp={() => handleOpenWhatsApp()}
          />
        )}

        {/* View 7: Contacto (Dedicated Contact, Offices & FAQ) */}
        {activeView === 'contacto' && (
          <ContactView
            onOpenWhatsApp={() => handleOpenWhatsApp()}
          />
        )}

        {/* View 8: Split Vector Cartography */}
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
              setActiveView('comprar');
              setViewMode('grid');
            }}
          />
        )}

        {/* View 9: Full Property Due Diligence Detail */}
        {activeView === 'detail' && (
          <PropertyDetailView
            property={selectedProperty}
            onBack={() => setActiveView(previousView || 'comprar')}
            onOpenSchedule={handleOpenSchedule}
            onContactWhatsApp={handleOpenWhatsApp}
            onOpenAlert={(prop) => handleOpenAlert(prop)}
            onShare={handleShareProperty}
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

      {/* Sprint 1 Modals: Auth, User Profile, Plans, Publish */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        user={authState.user}
        subscription={authState.subscription}
        onClose={() => setIsProfileModalOpen(false)}
        onLogout={handleLogout}
        onOpenPlans={() => setIsPlansModalOpen(true)}
        onSwitchDemo={handleSwitchDemo}
      />

      <MembershipPlansModal
        isOpen={isPlansModalOpen}
        currentSubscription={authState.subscription}
        onClose={() => setIsPlansModalOpen(false)}
        onSelectPlan={handleSelectPlan}
      />

      <PublishPropertyModal
        isOpen={isPublishModalOpen}
        user={authState.user}
        subscription={authState.subscription}
        initialData={publishPrefill}
        onClose={() => {
          setIsPublishModalOpen(false);
          setPublishPrefill(null);
        }}
        onRequireAuth={() => setIsAuthModalOpen(true)}
        onPropertyPublished={handlePropertyPublished}
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
          clearFavorites();
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

      {/* 10 Sitemap Pillars Interactive Modals */}
      <AboutUsModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <ResourcesCalculatorsModal
        isOpen={isResourcesOpen}
        initialTab={resourcesInitialTab}
        onClose={() => setIsResourcesOpen(false)}
        onDownloadTemplate={(tmpl: LegalTemplate) => {
          addToast(
            'Plantilla Notarial Descargada',
            `${tmpl.title} (${tmpl.downloadFileName}) lista en descargas.`,
            'success'
          );
        }}
      />

      <AgentsDirectoryModal
        isOpen={isAgentsOpen}
        onClose={() => setIsAgentsOpen(false)}
        onContactWhatsAppAgent={(agent: AgentProfile) => {
          addToast(
            'Conectando con Agente Verificado',
            `Abriendo WhatsApp con ${agent.name} (${agent.company})`,
            'info'
          );
          if (typeof window !== 'undefined') {
            window.open(`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${agent.name}, vi tu perfil en Propiedades Premier y quisiera información de tu cartera en ${agent.specialtySector}.`)}`, '_blank');
          }
        }}
      />

      <TikTokVideoReelModal
        isOpen={isTikTokOpen}
        properties={filteredAndSortedProperties}
        onClose={() => setIsTikTokOpen(false)}
        onSelectProperty={handleSelectProperty}
        onContactWhatsApp={handleOpenWhatsApp}
        onShare={handleShareProperty}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

      <PaymentCheckoutModal
        isOpen={isCheckoutOpen}
        user={authState.user}
        planCode={pendingPlan?.code || 'PRO_AGENT'}
        planName={pendingPlan?.name || 'Plan Profesional'}
        amountUsd={pendingPlan?.amount || 49}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Competitor Value-Add 1: Tasador Inteligente IA (Properati & Zillow Inspired) */}
      <PropertyValuatorModal
        isOpen={isValuatorOpen}
        onClose={() => setIsValuatorOpen(false)}
        onPublishWithValue={handleValuatorPublish}
        onBookAppraisal={() => {
          setIsValuatorOpen(false);
          setActiveView('servicios');
          addToast('Servicios Notariales', 'Selecciona Avalúo Certificado DMQ en nuestra lista de trámites.', 'info');
        }}
      />

      {/* Competitor Value-Add 2: Alertas de Bajada de Precio (Plusvalía Inspired) */}
      <PriceAlertModal
        isOpen={isAlertModalOpen}
        targetProperty={alertTargetProperty}
        defaultSector={filters.sector}
        defaultType={filters.type}
        onClose={() => {
          setIsAlertModalOpen(false);
          setAlertTargetProperty(null);
        }}
        onAlertCreated={(msg) => {
          addToast('Alerta Activada', msg, 'success');
        }}
      />

      {/* Trust & Confidence Bar matching Mockup */}
      <TrustBar />

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
