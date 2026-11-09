import React from 'react';

interface PremierLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const PremierLogo: React.FC<PremierLogoProps> = ({ size = 'md', variant = 'dark' }) => {
  const isLight = variant === 'light';
  const textColor = isLight ? '#FFFFFF' : '#213145';
  const iconHeight = size === 'sm' ? 24 : size === 'lg' ? 36 : 30;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', userSelect: 'none' }}>
      <svg height={iconHeight} viewBox="0 0 44 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Building (Orange #FEA004) */}
        <path d="M4 36V14L14 8V36H4Z" fill="#FEA004" />
        {/* Center Building (Dark Navy / White) */}
        <path d="M16 36V6L28 2V36H16Z" fill={isLight ? '#FFFFFF' : '#213145'} />
        {/* Right Building (Orange #FEA004) */}
        <path d="M30 36V18L39 13V36H30Z" fill="#FEA004" />
        {/* Base Foundation Bar */}
        <rect x="2" y="36.5" width="40" height="2.5" rx="1.25" fill="#FEA004" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ 
            fontSize: size === 'sm' ? '0.95rem' : size === 'lg' ? '1.45rem' : '1.18rem', 
            fontWeight: 900, 
            letterSpacing: '0.02em', 
            color: textColor 
          }}>
            PROPIEDADES
          </span>
          <span style={{ 
            fontSize: size === 'sm' ? '0.95rem' : size === 'lg' ? '1.45rem' : '1.18rem', 
            fontWeight: 900, 
            letterSpacing: '0.02em', 
            color: '#FEA004' 
          }}>
            PREMIER
          </span>
        </div>
        <span style={{ 
          fontSize: size === 'sm' ? '0.55rem' : '0.64rem', 
          letterSpacing: '0.06em', 
          fontWeight: 600, 
          color: isLight ? 'rgba(255,255,255,0.75)' : '#6C757D',
          textTransform: 'uppercase'
        }}>
          propiedadespremier.ec
        </span>
      </div>
    </div>
  );
};
