import React, { useState } from 'react';
import { MessageSquare, Heart, Scale, User as UserIcon, PlusCircle, Compass, Play, Users, Menu, X, BookOpen, Calculator, Sparkles, Bell } from 'lucide-react';
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
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="site-header" style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      padding: '0.75rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 8px rgba(33, 49, 69, 0.04)'
    }}>
      {/* Brand Logo matching Mockup */}
      <div onClick={() => onNavigate('catalog')} style={{ display: 'flex', alignItems: 'center' }}>
        <PremierLogo size="md" variant="dark" />
      </div>

      {/* Main Navigation Links matching Mockup */}
      <nav aria-label="Navegación principal">
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <button
              className={`nav-link ${activeView === 'comprar' || activeView === 'catalog' ? 'active' : ''}`}
              onClick={() => onNavigate('comprar')}
              style={{
                fontWeight: activeView === 'comprar' || activeView === 'catalog' ? 700 : 600,
                color: activeView === 'comprar' || activeView === 'catalog' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'comprar' || activeView === 'catalog' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Comprar
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'rentar' ? 'active' : ''}`}
              onClick={() => onNavigate('rentar')}
              style={{
                fontWeight: activeView === 'rentar' ? 700 : 600,
                color: activeView === 'rentar' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'rentar' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Rentar
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'proyectos' ? 'active' : ''}`}
              onClick={() => onNavigate('proyectos')}
              style={{
                fontWeight: activeView === 'proyectos' ? 700 : 600,
                color: activeView === 'proyectos' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'proyectos' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Proyectos
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'servicios' ? 'active' : ''}`}
              onClick={() => onNavigate('servicios')}
              style={{
                fontWeight: activeView === 'servicios' ? 700 : 600,
                color: activeView === 'servicios' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'servicios' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Servicios
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'nosotros' ? 'active' : ''}`}
              onClick={() => onNavigate('nosotros')}
              style={{
                fontWeight: activeView === 'nosotros' ? 700 : 600,
                color: activeView === 'nosotros' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'nosotros' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Nosotros
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'blog' ? 'active' : ''}`}
              onClick={() => onNavigate('blog')}
              style={{
                fontWeight: activeView === 'blog' ? 700 : 600,
                color: activeView === 'blog' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'blog' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Blog
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'contacto' ? 'active' : ''}`}
              onClick={() => onNavigate('contacto')}
              style={{
                fontWeight: activeView === 'contacto' ? 700 : 600,
                color: activeView === 'contacto' ? '#FEA004' : '#213145',
                borderBottom: activeView === 'contacto' ? '2px solid #FEA004' : 'none',
                paddingBottom: '4px',
                background: 'none',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none',
                fontSize: '0.92rem',
                cursor: 'pointer'
              }}
            >
              Contacto
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => onOpenAgents?.()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: '#213145', background: 'none', border: 'none', fontSize: '0.92rem', cursor: 'pointer' }}
            >
              <Users size={14} color="#64748B" />
              <span>Agentes</span>
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => onOpenTikTok?.()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#FEA004', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '999px', padding: '0.2rem 0.6rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              <Play size={12} color="#FEA004" />
              <span>Videos 9:16</span>
            </button>
          </li>
          <li>
            <button
              className={`nav-link ${activeView === 'split' ? 'active' : ''}`}
              onClick={() => onNavigate('split')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: '#213145', background: '#F1F3F5', border: '1px solid #E2E8F0', borderRadius: '999px', padding: '0.25rem 0.65rem', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              <Compass size={14} color="#213145" />
              <span>Mapa Valles</span>
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => onOpenValuator?.()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, color: '#1E293B', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '999px', padding: '0.25rem 0.65rem', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              <Sparkles size={13} color="#FEA004" />
              <span>Tasador IA</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Header Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Create Alert Quick Button (Plusvalía inspired) */}
        {onOpenPriceAlert && (
          <button
            className="btn-header-tool"
            onClick={onOpenPriceAlert}
            title="Crear alerta de precios y nuevas propiedades"
            aria-label="Crear alerta de precios"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: '999px',
              padding: '0.4rem 0.75rem',
              fontSize: '0.8rem',
              color: '#D97706',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <Bell size={14} color="#D97706" />
            <span>Crear Alerta</span>
          </button>
        )}

        {/* Compare quick button in header */}
        {comparedCount > 0 && (
          <button
            className="btn-header-tool active-compare"
            onClick={onOpenCompare}
            title="Abrir comparador de propiedades"
            aria-label={`Comparador con ${comparedCount} propiedades`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: '#F1F3F5',
              border: '1px solid #CBD5E1',
              borderRadius: '999px',
              padding: '0.4rem 0.8rem',
              fontSize: '0.8rem',
              color: '#213145',
              fontWeight: 600
            }}
          >
            <Scale size={15} color="#FEA004" />
            <span>Comparar</span>
            <span style={{ background: '#FEA004', color: '#FFFFFF', borderRadius: '50%', padding: '0.1rem 0.4rem', fontSize: '0.7rem', fontWeight: 700 }}>{comparedCount}</span>
          </button>
        )}

        {/* Favorites Wishlist button (Heart Icon) */}
        <button
          className="btn-header-tool"
          onClick={onOpenFavorites}
          title="Ver mi portafolio guardado de propiedades"
          aria-label={`Favoritos con ${savedCount} propiedades`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: savedCount > 0 ? '#FFF7ED' : '#F1F3F5',
            border: `1px solid ${savedCount > 0 ? '#FEA004' : '#E2E8F0'}`,
            position: 'relative'
          }}
        >
          <Heart size={18} fill={savedCount > 0 ? '#FEA004' : 'none'} color={savedCount > 0 ? '#FEA004' : '#213145'} />
          {savedCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#FEA004',
              color: '#FFFFFF',
              fontSize: '0.65rem',
              fontWeight: 800,
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {savedCount}
            </span>
          )}
        </button>

        {/* User Session Button (Sprint 1 Auth / Profile Icon) */}
        {user ? (
          <button
            onClick={onOpenProfile}
            className="user-profile-header-btn"
            title={`Perfil de ${user.fullName} (${user.role})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: '#FFFFFF',
              border: '1.5px solid #E2E8F0',
              borderRadius: '999px',
              padding: '0.3rem 0.75rem 0.3rem 0.35rem',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1.5px solid #FEA004'
              }}
            />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#213145', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user.fullName.split(' ')[0]}
            </span>
            <span style={{
              fontSize: '0.65rem',
              background: user.role === 'AGENT' ? '#FEF3C7' : '#EFF6FF',
              color: user.role === 'AGENT' ? '#D97706' : '#2563EB',
              border: '1px solid rgba(254, 160, 4, 0.4)',
              padding: '1px 5px',
              borderRadius: '4px',
              fontWeight: 800
            }}>
              {user.role === 'AGENT' ? 'PRO' : user.role === 'SUPER_ADMIN' ? 'ADMIN' : 'VIP'}
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="btn-auth-login"
            title="Iniciar Sesión"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#F1F3F5',
              border: '1px solid #E2E8F0',
              color: '#213145',
              cursor: 'pointer'
            }}
          >
            <UserIcon size={18} color="#213145" />
          </button>
        )}

        {/* Publicar Propiedad (Primary Orange CTA button matching Mockup) */}
        <button
          className="btn-publish-header"
          onClick={onOpenPublish}
          title="Publicar propiedad en Propiedades Premier"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: '#FEA004',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '999px',
            padding: '0.55rem 1.15rem',
            fontSize: '0.85rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(254, 160, 4, 0.35)',
            transition: 'all 0.15s ease'
          }}
        >
          <PlusCircle size={15} color="#FFFFFF" />
          <span>Publicar propiedad</span>
        </button>

        {/* WhatsApp VIP Concierge Button */}
        <button
          className="btn-whatsapp-vip"
          onClick={onOpenWhatsApp}
          aria-label="Contactar al WhatsApp VIP Concierge"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#F0FDF4',
            color: '#166534',
            border: '1px solid #BBF7D0',
            borderRadius: '999px',
            padding: '0.45rem 0.85rem',
            fontSize: '0.78rem',
            fontWeight: 700
          }}
        >
          <span className="pulse-dot"></span>
          <MessageSquare size={13} style={{ color: '#22C55E' }} />
          <span>WhatsApp</span>
        </button>

        {/* Mobile Hamburger Toggle Button (visible on screens <= 1024px) */}
        <button
          className="btn-mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isMobileMenuOpen}
          style={{
            background: 'none',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            padding: '0.45rem',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#213145'
          }}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Slide-out Mobile Navigation Drawer for Real Mobile Devices */}
      {isMobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(33, 49, 69, 0.65)',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <div
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '320px',
              maxWidth: '85vw',
              height: '100%',
              background: '#FFFFFF',
              boxShadow: '-8px 0 25px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid #E2E8F0' }}>
              <PremierLogo size="sm" variant="dark" />
              <button
                onClick={closeMobileMenu}
                style={{ background: '#F1F3F5', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                aria-label="Cerrar menú"
              >
                <X size={18} color="#213145" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
              <button
                onClick={() => { onNavigate('comprar'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'comprar' || activeView === 'catalog' ? '#FFF7ED' : 'none', color: activeView === 'comprar' || activeView === 'catalog' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}
              >
                Comprar Inmuebles
              </button>
              <button
                onClick={() => { onNavigate('rentar'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'rentar' ? '#FFF7ED' : 'none', color: activeView === 'rentar' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}
              >
                Rentar Inmuebles
              </button>
              <button
                onClick={() => { onNavigate('proyectos'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'proyectos' ? '#FFF7ED' : 'none', color: activeView === 'proyectos' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}
              >
                Proyectos Nuevos
              </button>
              <button
                onClick={() => { onNavigate('servicios'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'servicios' ? '#FFF7ED' : 'none', color: activeView === 'servicios' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}
              >
                Servicios Notariales & BIESS
              </button>
              <button
                onClick={() => { onNavigate('nosotros'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'nosotros' ? '#FFF7ED' : 'none', color: activeView === 'nosotros' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => { onNavigate('blog'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'blog' ? '#FFF7ED' : 'none', color: activeView === 'blog' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <BookOpen size={16} color="#64748B" />
                <span>Blog & Guías Inmobiliarias</span>
              </button>
              <button
                onClick={() => { onNavigate('contacto'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'contacto' ? '#FFF7ED' : 'none', color: activeView === 'contacto' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer' }}
              >
                Contacto & FAQ
              </button>
              <button
                onClick={() => { onNavigate('split'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: activeView === 'split' ? '#FFF7ED' : 'none', color: activeView === 'split' ? '#FEA004' : '#213145', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Compass size={16} color="#FEA004" />
                <span>Mapa Valles Interactivo</span>
              </button>
              <button
                onClick={() => { onOpenTikTok?.(); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #FED7AA', background: '#FFF7ED', color: '#FEA004', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Play size={16} color="#FEA004" />
                <span>Videos 9:16 Tipo TikTok</span>
              </button>
              <button
                onClick={() => { onOpenAgents?.(); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: 'none', color: '#213145', fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Users size={16} color="#64748B" />
                <span>Directorio de Agentes</span>
              </button>
              <button
                onClick={() => { onOpenResources?.('calculators'); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: 'none', background: 'none', color: '#213145', fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Calculator size={16} color="#64748B" />
                <span>Calculadora Hipotecaria BIESS</span>
              </button>
              <button
                onClick={() => { onOpenValuator?.(); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F1F5F9', color: '#1E293B', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Sparkles size={16} color="#FEA004" />
                <span>Tasador Inmobiliario IA</span>
              </button>
              <button
                onClick={() => { onOpenPriceAlert?.(); closeMobileMenu(); }}
                style={{ textAlign: 'left', padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid #FED7AA', background: '#FFF7ED', color: '#D97706', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Bell size={16} color="#D97706" />
                <span>Crear Alerta de Precios</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', marginTop: '1rem' }}>
              <button
                onClick={() => { onOpenPublish(); closeMobileMenu(); }}
                style={{ background: '#FEA004', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '0.7rem', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <PlusCircle size={16} />
                <span>Publicar propiedad</span>
              </button>
              <button
                onClick={() => { onOpenWhatsApp(); closeMobileMenu(); }}
                style={{ background: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '0.65rem', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <MessageSquare size={15} color="#22C55E" />
                <span>WhatsApp VIP Concierge</span>
              </button>
              {user ? (
                <button
                  onClick={() => { onOpenProfile(); closeMobileMenu(); }}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem', fontSize: '0.8rem', fontWeight: 600, color: '#213145', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                >
                  <img src={user.avatarUrl} alt={user.fullName} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                  <span>Mi Perfil ({user.role})</span>
                </button>
              ) : (
                <button
                  onClick={() => { onOpenAuth(); closeMobileMenu(); }}
                  style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0.6rem', fontSize: '0.8rem', fontWeight: 700, color: '#213145', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', cursor: 'pointer' }}
                >
                  <UserIcon size={16} />
                  <span>Iniciar Sesión / Registro</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
