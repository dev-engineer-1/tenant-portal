// src/utils/rentCalculator.ts

interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  baseRent: number;
  lateFeePercentage: number;
  daysLate: number;
  maxLateFee?: number;
}

interface LeaseBalanceSummaryInput {
  totalRent: number;
  paymentsMade: number;
  lateFees: number;
}

interface CurrencyFormatInput {
  amount: number;
  currency: string;
  locale?: string;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;
  
  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration.');
  }
  
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { baseRent, lateFeePercentage, daysLate, maxLateFee } = input;
  
  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }
  
  const calculatedLateFee = (baseRent * (lateFeePercentage / 100)) * daysLate;
  return maxLateFee !== undefined ? Math.min(calculatedLateFee, maxLateFee) : calculatedLateFee;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number } {
  const { totalRent, paymentsMade, lateFees } = input;
  
  if (totalRent < 0 || paymentsMade < 0 || lateFees < 0) {
    throw new Error('Invalid input values for lease balance summary.');
  }
  
  const balance = totalRent - paymentsMade + lateFees;
  return { balance };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currency, locale = 'en-US' } = input;
  
  if (amount < 0 || !currency) {
    throw new Error('Invalid input values for currency formatting.');
  }
  
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}