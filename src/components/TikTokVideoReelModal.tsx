import React, { useState } from 'react';
import { X, Heart, MessageSquare, Share2, Volume2, VolumeX, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { Property } from '../types/property';

interface TikTokVideoReelModalProps {
  isOpen: boolean;
  properties: Property[];
  onClose: () => void;
  onSelectProperty: (property: Property) => void;
  onContactWhatsApp: (property: Property) => void;
  onShare: (property: Property) => void;
}

export const TikTokVideoReelModal: React.FC<TikTokVideoReelModalProps> = ({
  isOpen,
  properties,
  onClose,
  onSelectProperty,
  onContactWhatsApp,
  onShare
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isFollowing, setIsFollowing] = useState(false);

  if (!isOpen || properties.length === 0) return null;

  const currentProperty = properties[currentIndex] || properties[0];
  const isLiked = !!likedMap[currentProperty.id];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  const toggleLike = () => {
    setLikedMap((prev) => ({
      ...prev,
      [currentProperty.id]: !prev[currentProperty.id]
    }));
  };

  return (
    <div
      className="modal-backdrop"
      style={{ background: 'rgba(0, 0, 0, 0.95)', zIndex: 1100 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '390px',
          height: '760px',
          maxHeight: '92vh',
          background: '#0F172A',
          borderRadius: '28px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar video reels"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 30,
            background: 'rgba(0,0,0,0.6)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Video / Visual Layer */}
        <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
          <video
            src="/videos/hero-mobile.webm"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Sound Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 30,
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Up & Down Arrows for Desktop */}
          <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 25 }}>
            <button
              onClick={handlePrev}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#FFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronUp size={20} />
            </button>
            <button
              onClick={handleNext}
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: 'none',
                color: '#FFF',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronDown size={20} />
            </button>
          </div>

          {/* TikTok Right Action Column (Like, WhatsApp, Share) */}
          <div style={{
            position: 'absolute',
            bottom: '120px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            zIndex: 25
          }}>
            {/* Like */}
            <button
              onClick={toggleLike}
              style={{
                background: 'none',
                border: 'none',
                color: isLiked ? '#EF4444' : '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart size={22} fill={isLiked ? '#EF4444' : 'none'} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFF' }}>
                {isLiked ? 143 : 142}
              </span>
            </button>

            {/* Contact WhatsApp */}
            <button
              onClick={() => onContactWhatsApp(currentProperty)}
              style={{
                background: 'none',
                border: 'none',
                color: '#22C55E',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={20} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFF' }}>Chat</span>
            </button>

            {/* Share */}
            <button
              onClick={() => onShare(currentProperty)}
              style={{
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Share2 size={20} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FFF' }}>Compartir</span>
            </button>
          </div>

          {/* Bottom Overlay Info & CTAs */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.25rem 1rem 1rem',
            background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.95) 40%, #0F172A 100%)',
            color: '#FFFFFF',
            zIndex: 20
          }}>
            {/* Advertiser Avatar & Follow Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <img
                src={currentProperty.agent.avatar}
                alt={currentProperty.agent.name}
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #FEA004' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                  {currentProperty.agent.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#CBD5E1' }}>
                  {currentProperty.agent.role}
                </div>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                style={{
                  background: isFollowing ? 'rgba(255,255,255,0.2)' : '#FEA004',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.3rem 0.75rem',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {isFollowing ? 'Siguiendo' : '+ Seguir'}
              </button>
            </div>

            {/* Property Title & Sector */}
            <div style={{ marginBottom: '0.5rem' }}>
              <h3 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF' }}>
                {currentProperty.title}
              </h3>
              <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                📍 {currentProperty.sector} · {currentProperty.microzone}
              </div>
            </div>

            {/* Price & Specs Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FEA004' }}>
                ${currentProperty.price.toLocaleString('es-EC')} USD
              </span>
              <span style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
                📐 {currentProperty.areaBuild} m² · 🛏️ {currentProperty.bedrooms} · 🚿 {currentProperty.bathrooms}
              </span>
            </div>

            {/* Big Action Button */}
            <button
              onClick={() => {
                onSelectProperty(currentProperty);
                onClose();
              }}
              style={{
                width: '100%',
                background: '#FEA004',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '0.7rem',
                fontSize: '0.88rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(254, 160, 4, 0.45)'
              }}
            >
              <span>IR A FICHA COMPLETA</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
