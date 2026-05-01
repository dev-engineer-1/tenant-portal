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
  gracePeriod: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  amountPaid: number;
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage, daysLate, gracePeriod } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0 || gracePeriod < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  if (daysLate <= gracePeriod) {
    return 0;
  }

  return (monthlyRent * (lateFeePercentage / 100));
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number, status: string } {
  const { totalLeaseAmount, amountPaid } = input;

  if (totalLeaseAmount < 0 || amountPaid < 0) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const balance = totalLeaseAmount - amountPaid;
  const status = balance > 0 ? 'Outstanding' : 'Paid';

  return { balance, status };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (!currencyCode || typeof currencyCode !== 'string') {
    throw new Error('Invalid currency code.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}