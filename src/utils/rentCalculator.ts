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
  totalLeaseAmount: number;
  paymentsMade: number;
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage, daysLate } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  return (monthlyRent * (lateFeePercentage / 100)) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount < 0 || paymentsMade < 0) {
    throw new Error('Invalid input for lease balance summary.');
  }

  return totalLeaseAmount - paymentsMade;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}