import React from 'react';
import { valuationService } from '../services/valuationService';
import { Sector } from '../types/property';

interface PriceOpportunityBadgeProps {
  price: number;
  areaBuild: number;
  sector: Sector;
  showExplanation?: boolean;
  compact?: boolean;
}

export const PriceOpportunityBadge: React.FC<PriceOpportunityBadgeProps> = ({
  price,
  areaBuild,
  sector,
  showExplanation = false,
  compact = false
}) => {
  const analysis = valuationService.analyzeOpportunity(price, areaBuild, sector);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.2rem' }}>
      <span
        title={analysis.explanation}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: compact ? '0.7rem' : '0.78rem',
          fontWeight: 700,
          color: analysis.badgeColor,
          backgroundColor: analysis.badgeBg,
          padding: compact ? '0.15rem 0.5rem' : '0.25rem 0.65rem',
          borderRadius: '999px',
          border: `1px solid ${analysis.badgeColor}33`,
          whiteSpace: 'nowrap',
          width: 'fit-content'
        }}
      >
        {analysis.badgeLabel}
      </span>
      {showExplanation && (
        <span style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.4, marginTop: '0.15rem' }}>
          {analysis.explanation}
        </span>
      )}
    </div>
  );
};
