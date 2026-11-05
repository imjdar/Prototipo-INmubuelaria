import React, { useState } from 'react';
import { LoanType } from '../types/property';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice }) => {
  const [loanType, setLoanType] = useState<LoanType>('BIESS');
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(20);

  const rates: Record<LoanType, number> = {
    BIESS: 0.0599,
    PRIVATE: 0.0845,
    CASH: 0.0
  };

  const downPaymentAmount = propertyPrice * (downPaymentPct / 100);
  const loanAmount = propertyPrice - downPaymentAmount;
  const currentRate = rates[loanType];
  const months = termYears * 12;

  let monthlyPayment = 0;
  if (loanType !== 'CASH' && currentRate > 0 && months > 0) {
    const monthlyRate = currentRate / 12;
    monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  // Official Closing Costs for Quito (DMQ)
  const notaryFee = 650;
  const registryFee = 420;
  const alcabalaFee = propertyPrice * 0.01;
  const provincialFee = propertyPrice * 0.0011;
  const totalClosingCosts = notaryFee + registryFee + alcabalaFee + provincialFee;

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
              <span>Entrada / Cuota Inicial ({downPaymentPct}%)</span>
              <span>{formatUSD(downPaymentAmount)}</span>
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
              <span>{termYears} años ({months} cuotas)</span>
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
        </>
      )}

      {/* Monthly payment display */}
      <div className="calc-result-box">
        <div className="calc-result-lbl">
          {loanType === 'CASH' ? 'Modalidad Contado' : 'Cuota Mensual Estimada'}
        </div>
        <div className="calc-result-val">
          {loanType === 'CASH' ? '0 cuotas (Pago Directo)' : `${formatUSD(Math.round(monthlyPayment))} / mes`}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#D2C0A5' }}>
          {loanType === 'CASH'
            ? 'Transacción respaldada mediante transferencia y minuta notariada'
            : `Monto a Financiar: ${formatUSD(loanAmount)} a ${termYears} años`}
        </div>
      </div>

      {/* Official DMQ Closing Costs Table */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem'
        }}>
          Desglose Oficial de Gastos Notariales y Registro DMQ:
        </div>
        <table className="closing-costs-table">
          <tbody>
            <tr>
              <td>Tasa Notarial de Escrituración (Arancel Notarial)</td>
              <td>{formatUSD(notaryFee)}</td>
            </tr>
            <tr>
              <td>Arancel Registro de la Propiedad del DMQ</td>
              <td>{formatUSD(registryFee)}</td>
            </tr>
            <tr>
              <td>Impuesto de Alcabala Municipal (1% del avalúo/precio)</td>
              <td>{formatUSD(alcabalaFee)}</td>
            </tr>
            <tr>
              <td>Tasa del Consejo Provincial de Pichincha (0.11%)</td>
              <td>{formatUSD(provincialFee)}</td>
            </tr>
            <tr className="total-row">
              <td>Total Estimado de Gastos de Cierre Notarial</td>
              <td style={{ color: 'var(--accent-gold-hover)' }}>{formatUSD(Math.round(totalClosingCosts))}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
