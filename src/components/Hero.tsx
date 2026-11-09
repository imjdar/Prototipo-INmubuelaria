import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Leaf, MapPin, Briefcase, Tag, Search } from 'lucide-react';
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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Environmental & Performance States
  const [isInView, setIsInView] = useState<boolean>(true);
  const [hasEnteredViewport, setHasEnteredViewport] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [, setIsContentSkipped] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isDataSaver, setIsDataSaver] = useState<boolean>(false);

  // Video Playback & Loading States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  // Operation Tab: 'comprar' | 'rentar' | 'proyectos'
  const [activeTab, setActiveTab] = useState<'comprar' | 'rentar' | 'proyectos'>('comprar');

  // 1. Detect screen size (Mobile vs Desktop) and system preferences
  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMobile = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    const updateMotion = (e: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(e.matches);
    };

    updateMobile(mobileQuery);
    updateMotion(motionQuery);

    const onMobileChange = (e: MediaQueryListEvent) => updateMobile(e);
    const onMotionChange = (e: MediaQueryListEvent) => updateMotion(e);

    mobileQuery.addEventListener('change', onMobileChange);
    motionQuery.addEventListener('change', onMotionChange);

    if ('connection' in navigator && (navigator as any).connection?.saveData) {
      setIsDataSaver(true);
    }

    return () => {
      mobileQuery.removeEventListener('change', onMobileChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // 2. IntersectionObserver for battery/GPU savings
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = entry.isIntersecting;
        setIsInView(visible);
        if (visible) {
          setHasEnteredViewport(true);
        }
      },
      {
        threshold: [0, 0.05, 0.25],
        rootMargin: '100px 0px 100px 0px'
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 3. Page visibility listener
  useEffect(() => {
    const onVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  // 4. Content visibility change listener
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleContentVisibility = (event: any) => {
      if (typeof event.skipped === 'boolean') {
        setIsContentSkipped(event.skipped);
      }
    };

    section.addEventListener('contentvisibilityautostatechange', handleContentVisibility);
    return () => {
      section.removeEventListener('contentvisibilityautostatechange', handleContentVisibility);
    };
  }, []);

  // 5. Autoplay control engine
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const shouldPlay =
      isInView &&
      isTabVisible &&
      !isUserPaused &&
      !prefersReducedMotion &&
      !isDataSaver;

    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView, isTabVisible, isUserPaused, prefersReducedMotion, isDataSaver]);

  // Handle manual video toggle
  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsUserPaused(true);
      setIsPlaying(false);
    } else {
      setIsUserPaused(false);
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  const posterWebP = isMobile
    ? '/videos/hero-mobile-poster.webp'
    : '/videos/hero-desktop-poster.webp';

  const posterJpg = isMobile
    ? '/videos/hero-mobile-poster.jpg'
    : '/videos/hero-desktop-poster.jpg';

  const videoWebM = isMobile
    ? '/videos/hero-mobile.webm'
    : '/videos/hero-desktop.webm';

  const videoMp4 = isMobile
    ? '/videos/hero-mobile.mp4'
    : '/videos/hero-desktop.mp4';

  return (
    <section ref={sectionRef} className="hero-section" aria-label="Introducción Propiedades Premier">
      {/* Background Media Container */}
      <div className="hero-media-wrapper" aria-hidden="true">
        <picture>
          <source srcSet={posterWebP} type="image/webp" />
          <img
            src={posterJpg}
            alt=""
            className={`hero-poster ${isVideoLoaded ? 'is-faded' : ''}`}
            loading="eager"
            decoding="async"
          />
        </picture>

        {hasEnteredViewport && !isDataSaver && !prefersReducedMotion && (
          <video
            ref={videoRef}
            key={isMobile ? 'hero-vid-mobile' : 'hero-vid-desktop'}
            className={`hero-video ${isVideoLoaded ? 'is-loaded' : ''}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterJpg}
            onLoadedData={() => setIsVideoLoaded(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={videoWebM} type="video/webm" />
            <source src={videoMp4} type="video/mp4" />
          </video>
        )}

        <div className="hero-overlay" />
      </div>

      {/* Floating Video Control Bar */}
      <div className="hero-video-eco-controls">
        <div className="hero-eco-badge">
          <span className={`hero-eco-dot ${isPlaying ? 'active' : 'idle'}`} />
          <Leaf size={11} className="hero-eco-icon" />
          <span className="hero-eco-text">
            {isPlaying
              ? (isMobile ? 'Móvil 60fps' : 'WebM 4K Activo')
              : 'Pausa Eco'}
          </span>
        </div>

        <div className="hero-btn-group">
          <button
            type="button"
            className="hero-ctrl-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            type="button"
            className="hero-ctrl-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar audio' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      {/* Hero Content matching Mockup 1:1 */}
      <div className="hero-content" style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.75rem' }}>
          Encuentra la propiedad ideal en <span style={{ color: '#FEA004' }}>Quito y sus valles</span>
        </h1>
        <p className="hero-subtitle" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: 'rgba(255,255,255,0.92)', maxWidth: '750px', margin: '0 auto 2.2rem', fontWeight: 500 }}>
          Casas, departamentos, oficinas, locales, terrenos y más. Compra, renta o invierte con expertos.
        </p>

        {/* Floating Search Card matching Mockup */}
        <div className="hero-search-card" style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          boxShadow: '0 20px 40px rgba(18, 25, 38, 0.22)',
          padding: '1.25rem 1.5rem',
          maxWidth: '960px',
          margin: '0 auto',
          textAlign: 'left'
        }}>
          {/* Operation Tabs: Comprar | Rentar */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <button
              onClick={() => setActiveTab('comprar')}
              style={{
                background: activeTab === 'comprar' ? '#FEA004' : '#F1F3F5',
                color: activeTab === 'comprar' ? '#FFFFFF' : '#213145',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Comprar
            </button>
            <button
              onClick={() => setActiveTab('rentar')}
              style={{
                background: activeTab === 'rentar' ? '#FEA004' : '#F1F3F5',
                color: activeTab === 'rentar' ? '#FFFFFF' : '#213145',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Rentar
            </button>
            <button
              onClick={() => setActiveTab('proyectos')}
              style={{
                background: activeTab === 'proyectos' ? '#FEA004' : '#F1F3F5',
                color: activeTab === 'proyectos' ? '#FFFFFF' : '#213145',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Proyectos
            </button>
          </div>

          {/* Form Selectors Row matching Mockup */}
          <div className="hero-search-selectors-grid">
            {/* Ubicación Dropdown */}
            <div style={{
              background: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <MapPin size={18} color="#FEA004" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>
                  Ubicación
                </div>
                <select
                  value={filters?.sector || 'ALL'}
                  onChange={(e) => onFilterChange && filters && onFilterChange({ ...filters, sector: e.target.value as Sector | 'ALL' })}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#213145',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <option value="ALL">Quito, Cumbayá, Valle...</option>
                  <option value="Cumbayá">Cumbayá</option>
                  <option value="Puembo">Puembo</option>
                  <option value="González Suárez">González Suárez</option>
                  <option value="La Carolina">La Carolina</option>
                  <option value="Tumbaco">Tumbaco</option>
                  <option value="Nayón">Nayón</option>
                </select>
              </div>
            </div>

            {/* Tipo de propiedad Dropdown */}
            <div style={{
              background: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <Briefcase size={18} color="#FEA004" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>
                  Tipo de propiedad
                </div>
                <select
                  value={filters?.type || 'ALL'}
                  onChange={(e) => onFilterChange && filters && onFilterChange({ ...filters, type: e.target.value as PropertyType | 'ALL' })}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#213145',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <option value="ALL">Todos los tipos</option>
                  <option value="Casa">Casas & Villas</option>
                  <option value="Suite">Departamentos & Suites</option>
                  <option value="Penthouse">Penthouses & Oficinas</option>
                  <option value="Terreno">Terrenos & Lotes</option>
                </select>
              </div>
            </div>

            {/* Precio Dropdown */}
            <div style={{
              background: '#F8F9FA',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}>
              <Tag size={18} color="#FEA004" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase' }}>
                  Precio
                </div>
                <select
                  value={filters?.maxPrice || 1000000}
                  onChange={(e) => onFilterChange && filters && onFilterChange({ ...filters, maxPrice: parseInt(e.target.value, 10) })}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#213145',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <option value="1000000">Desde - Hasta</option>
                  <option value="200000">Hasta $200.000 USD</option>
                  <option value="400000">Hasta $400.000 USD</option>
                  <option value="600000">Hasta $600.000 USD</option>
                  <option value="800000">Hasta $800.000 USD</option>
                  <option value="1000000">Hasta $1.000.000 USD</option>
                </select>
              </div>
            </div>

            {/* Primary Orange Search Button matching Mockup */}
            <button
              onClick={() => onSearchSubmit && onSearchSubmit()}
              style={{
                background: '#FEA004',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '0.85rem 1.75rem',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(254, 160, 4, 0.4)',
                transition: 'all 0.15s ease'
              }}
            >
              <Search size={18} />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
