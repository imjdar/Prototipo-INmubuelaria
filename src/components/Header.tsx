import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Play, 
  Compass, 
  Users, 
  Bell, 
  Scale, 
  MessageSquare,
  PlusCircle,
  Calculator
} from 'lucide-react';
import { User } from '../types/auth';
import { PremierLogo } from './PremierLogo';

export type SiteView = 
  | 'comprar' 
  | 'rentar' 
  | 'proyectos' 
  | 'servicios' 
  | 'nosotros' 
  | 'blog' 
  | 'contacto' 
  | 'catalog' 
  | 'split' 
  | 'detail';

interface HeaderProps {
  activeView: SiteView;
  savedCount: number;
  comparedCount: number;
  user: User | null;
  onNavigate: (view: SiteView) => void;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onOpenWhatsApp: () => void;
  onSelectPropertyById: (id: string) => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenPlans: () => void;
  onOpenPublish: () => void;
  onOpenAbout?: () => void;
  onOpenResources?: (tab?: 'calculators' | 'blog' | 'documents') => void;
  onOpenAgents?: () => void;
  onOpenTikTok?: () => void;
  onOpenContact?: () => void;
  onOpenValuator?: () => void;
  onOpenPriceAlert?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  savedCount,
  comparedCount,
  user,
  onNavigate,
  onOpenFavorites,
  onOpenCompare,
  onOpenWhatsApp,
  onSelectPropertyById: _onSelectPropertyById,
  onOpenAuth,
  onOpenProfile,
  onOpenPlans: _onOpenPlans,
  onOpenPublish,
  onOpenAbout: _onOpenAbout,
  onOpenResources,
  onOpenAgents,
  onOpenTikTok,
  onOpenContact: _onOpenContact,
  onOpenValuator,
  onOpenPriceAlert
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isToolsOpen, setIsToolsOpen] = useState<boolean>(false);
  const toolsDropdownRef = useRef<HTMLLIElement>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Close tools dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { label: string; view: SiteView }[] = [
    { label: 'Comprar', view: 'comprar' },
    { label: 'Rentar', view: 'rentar' },
    { label: 'Proyectos', view: 'proyectos' },
    { label: 'Servicios', view: 'servicios' },
    { label: 'Nosotros', view: 'nosotros' },
    { label: 'Blog', view: 'blog' },
    { label: 'Contacto', view: 'contacto' }
  ];

  const isCurrentView = (view: SiteView) => {
    if (view === 'comprar') {
      return activeView === 'comprar' || activeView === 'catalog';
    }
    return activeView === view;
  };

  return (
    <header className="site-header-premier">
      <div className="header-inner-container">
        {/* Brand Logo matching Mockup */}
        <div 
          onClick={() => onNavigate('comprar')} 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          aria-label="Ir al inicio de Propiedades Premier"
        >
          <PremierLogo size="md" variant="dark" />
        </div>

        {/* Desktop Main Navigation Links (Centered, 7 clean links from mockup + subtle tools menu) */}
        <nav className="desktop-main-nav" aria-label="Navegación principal">
          <ul className="nav-links-list">
            {navItems.map((item) => {
              const active = isCurrentView(item.view);
              return (
                <li key={item.view}>
                  <button
                    className={`nav-link-btn ${active ? 'is-active' : ''}`}
                    onClick={() => onNavigate(item.view)}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.label}</span>
                    {active && <span className="active-pill-bar" />}
                  </button>
                </li>
              );
            })}

            {/* Subtle Tools Dropdown: Keeps 100% of sitemap features accessible without cluttering */}
            <li ref={toolsDropdownRef} style={{ position: 'relative' }}>
              <button
                className={`nav-link-btn tools-trigger ${isToolsOpen ? 'is-open' : ''}`}
                onClick={() => setIsToolsOpen(!isToolsOpen)}
                aria-expanded={isToolsOpen}
                aria-haspopup="true"
                title="Herramientas y funciones avanzadas"
              >
                <Sparkles size={14} color="#FEA004" />
                <span>Herramientas</span>
                <ChevronDown size={13} style={{ transform: isToolsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {isToolsOpen && (
                <div className="tools-floating-dropdown">
                  <div className="dropdown-title">SERVICIOS & INNOVACIÓN</div>
                  
                  <button 
                    className="dropdown-item" 
                    onClick={() => { onOpenValuator?.(); setIsToolsOpen(false); }}
                  >
                    <div className="dropdown-icon-box orange"><Sparkles size={16} /></div>
                    <div>
                      <div className="item-title">Tasador Inteligente IA</div>
                      <div className="item-sub">Avalúo instantáneo y cap rate en Quito</div>
                    </div>
                  </button>

                  <button 
                    className="dropdown-item" 
                    onClick={() => { onOpenTikTok?.(); setIsToolsOpen(false); }}
                  >
                    <div className="dropdown-icon-box orange"><Play size={16} /></div>
                    <div>
                      <div className="item-title">Videos 9:16 Inmersivos</div>
                      <div className="item-sub">Tours verticales tipo reel/TikTok</div>
                    </div>
                  </button>

                  <button 
                    className="dropdown-item" 
                    onClick={() => { onNavigate('split'); setIsToolsOpen(false); }}
                  >
                    <div className="dropdown-icon-box blue"><Compass size={16} /></div>
                    <div>
                      <div className="item-title">Mapa de Valles & Urbe</div>
                      <div className="item-sub">Cartografía satelital interactiva</div>
                    </div>
                  </button>

                  <button 
                    className="dropdown-item" 
                    onClick={() => { onOpenResources?.('calculators'); setIsToolsOpen(false); }}
                  >
                    <div className="dropdown-icon-box green"><Calculator size={16} /></div>
                    <div>
                      <div className="item-title">Calculadoras & Notaría DMQ</div>
                      <div className="item-sub">BIESS, alcabala y gastos notariales</div>
                    </div>
                  </button>

                  <button 
                    className="dropdown-item" 
                    onClick={() => { onOpenAgents?.(); setIsToolsOpen(false); }}
                  >
                    <div className="dropdown-icon-box green"><Users size={16} /></div>
                    <div>
                      <div className="item-title">Directorio de Agentes</div>
                      <div className="item-sub">Corredores y constructoras certificadas</div>
                    </div>
                  </button>

                  {onOpenPriceAlert && (
                    <button 
                      className="dropdown-item" 
                      onClick={() => { onOpenPriceAlert(); setIsToolsOpen(false); }}
                    >
                      <div className="dropdown-icon-box amber"><Bell size={16} /></div>
                      <div>
                        <div className="item-title">Crear Alerta de Precios</div>
                        <div className="item-sub">Notificación por correo de bajas y ofertas</div>
                      </div>
                    </button>
                  )}

                  {comparedCount > 0 && (
                    <button 
                      className="dropdown-item" 
                      onClick={() => { onOpenCompare(); setIsToolsOpen(false); }}
                    >
                      <div className="dropdown-icon-box purple"><Scale size={16} /></div>
                      <div>
                        <div className="item-title">Comparador de Inmuebles ({comparedCount})</div>
                        <div className="item-sub">Matriz de comparación técnica</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Right Actions matching Mockup */}
        <div className="header-actions-group">
          {/* Wishlist Heart Icon matching Mockup */}
          <button
            className="action-icon-circle-btn"
            onClick={onOpenFavorites}
            title="Mis propiedades guardadas"
            aria-label={`Favoritos guardados (${savedCount})`}
          >
            <Heart 
              size={20} 
              fill={savedCount > 0 ? '#FEA004' : 'none'} 
              color={savedCount > 0 ? '#FEA004' : '#213145'} 
            />
            {savedCount > 0 && (
              <span className="heart-badge-count">{savedCount}</span>
            )}
          </button>

          {/* User Profile / Login Icon matching Mockup */}
          {user ? (
            <button
              onClick={onOpenProfile}
              className="user-profile-compact-btn"
              title={`Mi Cuenta: ${user.fullName} (${user.role})`}
              aria-label={`Perfil de ${user.fullName}`}
            >
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="user-avatar-img"
              />
              <span className="user-firstname-text">
                {user.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="action-icon-circle-btn"
              title="Iniciar Sesión / Registrarse"
              aria-label="Iniciar Sesión"
            >
              <UserIcon size={20} color="#213145" />
            </button>
          )}

          {/* Orange Primary Pill Button: "Publicar propiedad" matching Mockup */}
          <button
            className="btn-publish-orange-pill"
            onClick={onOpenPublish}
            title="Publicar una propiedad en venta o renta"
          >
            <PlusCircle size={16} color="#FFFFFF" className="desktop-only-icon" />
            <span>Publicar propiedad</span>
          </button>

          {/* Mobile Hamburger Toggle (Visible strictly on screens <= 1024px) */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Modern Slide-out Mobile Navigation Drawer for Phones & Tablets */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={closeMobileMenu}>
          <div 
            className="mobile-drawer-container" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil de navegación"
          >
            {/* Drawer Header */}
            <div className="drawer-header-row">
              <PremierLogo size="sm" variant="dark" />
              <button 
                className="drawer-close-btn"
                onClick={closeMobileMenu}
                aria-label="Cerrar menú"
              >
                <X size={20} color="#213145" />
              </button>
            </div>

            {/* Drawer User Status Card */}
            {user ? (
              <div 
                className="drawer-user-card"
                onClick={() => { onOpenProfile(); closeMobileMenu(); }}
              >
                <img src={user.avatarUrl} alt={user.fullName} className="drawer-user-avatar" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="drawer-user-name">{user.fullName}</div>
                  <div className="drawer-user-role">
                    {user.role === 'AGENT' ? '⭐ Agente Verificado Pro' : '👤 Cliente Comprador VIP'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="drawer-auth-prompt">
                <button 
                  className="btn-drawer-login"
                  onClick={() => { onOpenAuth(); closeMobileMenu(); }}
                >
                  <UserIcon size={16} />
                  <span>Iniciar Sesión / Registro</span>
                </button>
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="drawer-nav-section">
              <div className="drawer-section-label">SECCIONES PRINCIPALES</div>
              {navItems.map((item) => {
                const active = isCurrentView(item.view);
                return (
                  <button
                    key={item.view}
                    className={`drawer-link-btn ${active ? 'is-active' : ''}`}
                    onClick={() => {
                      onNavigate(item.view);
                      closeMobileMenu();
                    }}
                  >
                    <span>{item.label}</span>
                    {active && <span className="drawer-active-dot" />}
                  </button>
                );
              })}
            </div>

            {/* Mobile Tools & PropTech Section */}
            <div className="drawer-nav-section">
              <div className="drawer-section-label">HERRAMIENTAS & SERVICIOS</div>

              <button 
                className="drawer-tool-btn"
                onClick={() => { onOpenValuator?.(); closeMobileMenu(); }}
              >
                <Sparkles size={17} color="#FEA004" />
                <span>Tasador Inteligente IA</span>
              </button>

              <button 
                className="drawer-tool-btn"
                onClick={() => { onOpenTikTok?.(); closeMobileMenu(); }}
              >
                <Play size={17} color="#FEA004" />
                <span>Videos 9:16 Inmersivos</span>
              </button>

              <button 
                className="drawer-tool-btn"
                onClick={() => { onNavigate('split'); closeMobileMenu(); }}
              >
                <Compass size={17} color="#213145" />
                <span>Mapa Cartográfico de Valles</span>
              </button>

              <button 
                className="drawer-tool-btn"
                onClick={() => { onOpenAgents?.(); closeMobileMenu(); }}
              >
                <Users size={17} color="#213145" />
                <span>Directorio de Agentes</span>
              </button>

              {onOpenPriceAlert && (
                <button 
                  className="drawer-tool-btn"
                  onClick={() => { onOpenPriceAlert(); closeMobileMenu(); }}
                >
                  <Bell size={17} color="#D97706" />
                  <span>Crear Alerta de Precios</span>
                </button>
              )}

              {comparedCount > 0 && (
                <button 
                  className="drawer-tool-btn"
                  onClick={() => { onOpenCompare(); closeMobileMenu(); }}
                >
                  <Scale size={17} color="#FEA004" />
                  <span>Comparar Inmuebles ({comparedCount})</span>
                </button>
              )}
            </div>

            {/* Drawer Bottom Actions */}
            <div className="drawer-bottom-actions">
              <button 
                className="btn-drawer-publish"
                onClick={() => { onOpenPublish(); closeMobileMenu(); }}
              >
                <PlusCircle size={18} />
                <span>Publicar propiedad</span>
              </button>

              <button 
                className="btn-drawer-whatsapp"
                onClick={() => { onOpenWhatsApp(); closeMobileMenu(); }}
              >
                <MessageSquare size={18} color="#22C55E" />
                <span>Asesoría Directa WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
