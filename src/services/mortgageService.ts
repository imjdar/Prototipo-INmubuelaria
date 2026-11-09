/**
 * DOMAIN SERVICE: Mortgage & Notarial Closing Costs Calculation Engine
 * Follows Single Responsibility Principle (SRP)
 * Provides deterministic, pure calculations for BIESS (5.99%), Private Bank (8.45%) and DMQ taxes.
 */

import { LoanType, MortgageCalculation } from '../types/property';

export const OFFICIAL_INTEREST_RATES: Record<LoanType, number> = {
  BIESS: 0.0599,    // Tasa preferencial pública BIESS 5.99%
  PRIVATE: 0.0845,  // Tasa promedio banca privada Pichincha/Produbanco 8.45%
  CASH: 0.0         // Fondos propios / Contado
};

export const NOTARIAL_CONSTANTS_DMQ = {
  NOTARY_FEE_USD: 650,         // Arancel protocolización notarial promedio DMQ
  REGISTRY_FEE_USD: 420,       // Tasa de inscripción Registro de la Propiedad DMQ
  ALCABALA_RATE: 0.01,         // 1% Impuesto de Alcabala Municipal DMQ
  PROVINCIAL_RATE: 0.0011      // 0.11% Tasa Consejo Provincial de Pichincha
};

export class MortgageService {
  /**
   * Computes French amortization monthly annuity:
   * M = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
   */
  public calculateMonthlyPayment(loanAmount: number, annualRate: number, termYears: number): number {
    if (loanAmount <= 0 || annualRate <= 0 || termYears <= 0) {
      return 0;
    }

    const months = termYears * 12;
    const monthlyRate = annualRate / 12;
    const factor = Math.pow(1 + monthlyRate, months);

    if (!isFinite(factor) || factor <= 1) {
      return 0;
    }

    const payment = (loanAmount * monthlyRate * factor) / (factor - 1);
    return isFinite(payment) ? payment : 0;
  }

  /**
   * Calculates closing costs according to Distrito Metropolitano de Quito regulations
   */
  public calculateClosingCosts(propertyPrice: number) {
    const alcabalaFee = propertyPrice * NOTARIAL_CONSTANTS_DMQ.ALCABALA_RATE;
    const provincialFee = propertyPrice * NOTARIAL_CONSTANTS_DMQ.PROVINCIAL_RATE;
    const notaryFee = NOTARIAL_CONSTANTS_DMQ.NOTARY_FEE_USD;
    const registryFee = NOTARIAL_CONSTANTS_DMQ.REGISTRY_FEE_USD;
    const totalClosingCosts = notaryFee + registryFee + alcabalaFee + provincialFee;

    return {
      notaryFee,
      registryFee,
      alcabalaFee,
      provincialFee,
      totalClosingCosts
    };
  }

  /**
   * Full calculation summary for UI and legal diligence
   */
  public computeFullCalculation(
    propertyPrice: number,
    downPaymentPct: number,
    termYears: number,
    loanType: LoanType
  ): MortgageCalculation {
    const safePrice = Math.max(0, propertyPrice);
    const safeDownPct = Math.min(100, Math.max(0, downPaymentPct));
    const downPaymentAmount = safePrice * (safeDownPct / 100);
    const loanAmount = Math.max(0, safePrice - downPaymentAmount);
    const interestRate = OFFICIAL_INTEREST_RATES[loanType];

    const monthlyPayment = loanType === 'CASH' 
      ? 0 
      : this.calculateMonthlyPayment(loanAmount, interestRate, termYears);

    const closingCosts = this.calculateClosingCosts(safePrice);

    return {
      price: safePrice,
      downPaymentPct: safeDownPct,
      downPaymentAmount,
      loanAmount,
      termYears,
      interestRate,
      monthlyPayment,
      closingCosts
    };
  }
}

export const mortgageService = new MortgageService();
