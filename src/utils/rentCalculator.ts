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
}

interface LeaseBalanceSummaryInput {
  monthlyRent: number;
  monthsRemaining: number;
  paidToDate: number;
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
  const { monthlyRent, lateFeePercentage, daysLate } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  const lateFee = (monthlyRent * (lateFeePercentage / 100)) * daysLate;
  return lateFee;
}

export function calculateLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { monthlyRent, monthsRemaining, paidToDate } = input;

  if (monthlyRent <= 0 || monthsRemaining < 0 || paidToDate < 0) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalLeaseCost = monthlyRent * monthsRemaining;
  return totalLeaseCost - paidToDate;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions = {}): string {
  const { locale = 'en-US', currency = 'USD' } = options;

  if (amount < 0) {
    throw new Error('Amount cannot be negative for currency formatting.');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}