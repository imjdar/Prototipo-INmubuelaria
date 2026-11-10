import React from 'react';

interface PremierLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const PremierLogo: React.FC<PremierLogoProps> = ({ size = 'md', variant = 'dark' }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? '#FFFFFF' : '#213145';
  const iconHeight = size === 'sm' ? 26 : size === 'lg' ? 38 : 32;

  return (
    <div 
      className="premier-brand-logo"
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: size === 'sm' ? '0.5rem' : '0.65rem', 
        cursor: 'pointer', 
        userSelect: 'none' 
      }}
    >
      <svg height={iconHeight} viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
        {/* Left Stepped Building (Orange #FEA004) */}
        <path d="M4 36V14L14 8V36H4Z" fill="#FEA004" />
        {/* Center High-Rise Tower (Dark Navy #213145 / White) */}
        <path d="M16 36V6L28 2V36H16Z" fill={isLight ? '#FFFFFF' : '#213145'} />
        {/* Right Stepped Building (Orange #FEA004) */}
        <path d="M30 36V18L39 13V36H30Z" fill="#FEA004" />
        {/* Solid Foundation Bar */}
        <rect x="2" y="36.5" width="40" height="2.5" rx="1.25" fill="#FEA004" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <span style={{ 
          fontSize: size === 'sm' ? '0.85rem' : size === 'lg' ? '1.25rem' : '1.05rem', 
          fontWeight: 900, 
          letterSpacing: '0.04em', 
          color: textColor,
          fontFamily: 'Plus Jakarta Sans, sans-serif'
        }}>
          PROPIEDADES
        </span>
        <span style={{ 
          fontSize: size === 'sm' ? '0.85rem' : size === 'lg' ? '1.25rem' : '1.05rem', 
          fontWeight: 900, 
          letterSpacing: '0.06em', 
          color: '#FEA004',
          fontFamily: 'Plus Jakarta Sans, sans-serif'
        }}>
          PREMIER
        </span>
      </div>
    </div>
  );
};

