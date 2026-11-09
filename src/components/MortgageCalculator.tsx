import React, { useState, useMemo } from 'react';
import { LoanType } from '../types/property';
import { mortgageService } from '../services/mortgageService';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice }) => {
  const [loanType, setLoanType] = useState<LoanType>('BIESS');
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(20);

  // Pure computation via Domain Service (SOLID - SRP)
  const calculation = useMemo(() => {
    return mortgageService.computeFullCalculation(
      propertyPrice,
      downPaymentPct,
      termYears,
      loanType
    );
  }, [propertyPrice, downPaymentPct, termYears, loanType]);

  const formatUSD = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);

  return (
    <div className="calculator-card">
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
        Simulador Hipotecario & Gastos de Cierre Notarial (DMQ)
      </h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        Transparencia radical: conoce tu cuota mensual estimada y todos los aranceles notariales de Quito.
      </p>

      {/* Tabs */}
      <div className="calc-tabs">
        <button
          className={`calc-tab ${loanType === 'BIESS' ? 'active' : ''}`}
          onClick={() => setLoanType('BIESS')}
        >
          Crédito BIESS (5.99%)
        </button>
        <button
          className={`calc-tab ${loanType === 'PRIVATE' ? 'active' : ''}`}
          onClick={() => setLoanType('PRIVATE')}
        >
          Banca Privada Pichincha/Produbanco (8.45%)
        </button>
        <button
          className={`calc-tab ${loanType === 'CASH' ? 'active' : ''}`}
          onClick={() => setLoanType('CASH')}
        >
          Fondos Propios (Contado)
        </button>
      </div>

      {loanType !== 'CASH' && (
        <>
          <div className="slider-group">
            <div className="slider-header">
              <span>Entrada / Cuota Inicial ({calculation.downPaymentPct}%)</span>
              <span>{formatUSD(calculation.downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              className="calc-slider"
              min="10"
              max="50"
              step="5"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="slider-group">
            <div className="slider-header">
              <span>Plazo de Financiamiento</span>
              <span>{termYears} años ({termYears * 12} cuotas)</span>
            </div>
            <input
              type="range"
              className="calc-slider"
              min="5"
              max="25"
              step="5"
              value={termYears}
              onChange={(e) => setTermYears(parseInt(e.target.value, 10))}
            />
          </div>

          <div className="calc-result-box">
            <div className="calc-result-label">
              Cuota Mensual Estimada ({loanType === 'BIESS' ? 'Tasa Pública 5.99%' : 'Tasa Privada 8.45%'})
            </div>
            <div className="calc-result-val">
              {formatUSD(calculation.monthlyPayment)}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}> /mes</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Monto del Préstamo: {formatUSD(calculation.loanAmount)}
            </div>
          </div>
        </>
      )}

      {/* Transparent Closing Costs Grid */}
      <div className="closing-costs-grid">
        <div className="closing-cost-item">
          <div className="closing-cost-lbl">Arancel Notarial DMQ</div>
          <div className="closing-cost-val">{formatUSD(calculation.closingCosts.notaryFee)}</div>
        </div>

        <div className="closing-cost-item">
          <div className="closing-cost-lbl">Registro de la Propiedad</div>
          <div className="closing-cost-val">{formatUSD(calculation.closingCosts.registryFee)}</div>
        </div>

        <div className="closing-cost-item">
          <div className="closing-cost-lbl">Alcabala Municipal DMQ (1%)</div>
          <div className="closing-cost-val">{formatUSD(calculation.closingCosts.alcabalaFee)}</div>
        </div>

        <div className="closing-cost-item">
          <div className="closing-cost-lbl">Consejo Provincial (0.11%)</div>
          <div className="closing-cost-val">{formatUSD(calculation.closingCosts.provincialFee)}</div>
        </div>
      </div>

      <div className="total-closing-bar">
        <span>Total Gastos de Cierre Notarial (Estimado al día):</span>
        <strong>{formatUSD(calculation.closingCosts.totalClosingCosts)}</strong>
      </div>
    </div>
  );
};
