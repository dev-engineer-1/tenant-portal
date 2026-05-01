// src/utils/rentCalculator.ts

interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  monthlyRent: number;
  lateFeePercentage: number;
  daysLate: number;
  gracePeriodDays: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatOptions {
  locale?: string;
  currency?: string;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage, daysLate, gracePeriodDays } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0 || gracePeriodDays < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  if (daysLate <= gracePeriodDays) {
    return 0;
  }

  return (monthlyRent * (lateFeePercentage / 100));
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalPaymentsMade = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  return totalLeaseAmount - totalPaymentsMade;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
  const { locale = 'en-US', currency = 'USD' } = options;

  if (amount < 0) {
    throw new Error('Amount cannot be negative for currency formatting.');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}