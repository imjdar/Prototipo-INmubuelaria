import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Leaf, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Environmental & Performance States
  const [isInView, setIsInView] = useState<boolean>(true);
  const [hasEnteredViewport, setHasEnteredViewport] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [isContentSkipped, setIsContentSkipped] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isDataSaver, setIsDataSaver] = useState<boolean>(false);

  // Video Playback & Loading States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

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

    // Check Data Saver mode if supported
    if ('connection' in navigator && (navigator as any).connection?.saveData) {
      setIsDataSaver(true);
    }

    return () => {
      mobileQuery.removeEventListener('change', onMobileChange);
      motionQuery.removeEventListener('change', onMotionChange);
    };
  }, []);

  // 2. IntersectionObserver: observe visibility in viewport to halt playback & decoding when offscreen
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
        rootMargin: '100px 0px 100px 0px' // Preload just before entering, pause immediately on exit
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 3. contentvisibilityautostatechange listener (Modern Web Best Practice for background efficiency)
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

  // 4. Page Visibility API: pause when user switches browser tab or minimizes window
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Determine if video should actively run
  const shouldPlay =
    isInView &&
    isTabVisible &&
    !isContentSkipped &&
    !isUserPaused &&
    !prefersReducedMotion &&
    !isDataSaver &&
    hasEnteredViewport;

  // 5. Sync playback with calculated power/visibility state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay policy or low battery mode
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [shouldPlay]);

  // Handle manual play/pause toggle
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

  // Handle manual audio mute/unmute
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  }, []);

  // Poster and Video Assets depending on viewport
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
    <section ref={sectionRef} className="hero-section" aria-label="Introducción Valle & Urbe">
      {/* Background Media Container */}
      <div className="hero-media-wrapper" aria-hidden="true">
        {/* Instant lightweight poster image (prevents layout shift & FOUC) */}
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

        {/* Video Element with Lazy Rendering and Resource Saving */}
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

        {/* Luxury Vignette and Contrast Overlay */}
        <div className="hero-overlay" />
      </div>

      {/* Floating Resource-Saving & Video Control Bar */}
      <div className="hero-video-eco-controls">
        <div className="hero-eco-badge">
          <span className={`hero-eco-dot ${isPlaying ? 'active' : 'idle'}`} />
          <Leaf size={11} className="hero-eco-icon" />
          <span className="hero-eco-text">
            {isPlaying
              ? (isMobile ? 'Móvil Optimizado · 60fps' : 'WebM 4K · Ahorro Activo')
              : 'Pausa Eco · 0% GPU'}
          </span>
        </div>

        <div className="hero-btn-group">
          <button
            type="button"
            className="hero-ctrl-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pausar video de fondo' : 'Reproducir video de fondo'}
            title={isPlaying ? 'Pausar video (Ahorro de batería)' : 'Reproducir video'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
          </button>
          <button
            type="button"
            className="hero-ctrl-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar audio' : 'Silenciar audio'}
            title={isMuted ? 'Activar sonido' : 'Silenciar'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>
      </div>

      {/* Hero Content (Above video and overlays) */}
      <div className="hero-content">
        <div className="hero-tagline">
          <Sparkles size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', color: 'var(--accent-gold)' }} />
          Boutique PropTech & Curaduría Notariada · Quito 2026
        </div>
        <h1 className="hero-title">
          Propiedades de autor en Quito y sus valles, con certeza legal total.
        </h1>
        <p className="hero-subtitle">
          Casas, quintas y penthouses en Cumbayá, Puembo, González Suárez y La Carolina. Cero listados repetidos, títulos saneados y asesoría notarial directa.
        </p>

        <div className="hero-metrics">
          <div style={{ textAlign: 'center' }}>
            <div className="metric-val">$48M+</div>
            <div className="metric-lbl">Portafolio Auditado</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-val">100%</div>
            <div className="metric-lbl">Mandatos Exclusivos</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-val">&lt; 15 min</div>
            <div className="metric-lbl">Respuesta WhatsApp</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="metric-val">0 Días</div>
            <div className="metric-lbl">En Limbo Legal</div>
          </div>
        </div>
      </div>
    </section>
  );
};
