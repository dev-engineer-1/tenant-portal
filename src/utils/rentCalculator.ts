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
  totalLeaseAmount: number;
  amountPaid: number;
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
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

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { remainingBalance: number } {
  const { totalLeaseAmount, amountPaid } = input;

  if (totalLeaseAmount < 0 || amountPaid < 0) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const remainingBalance = totalLeaseAmount - amountPaid;
  return { remainingBalance };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}