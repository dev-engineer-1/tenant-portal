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

  const dailyRent = monthlyRent / daysInMonth;
  return dailyRent * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage, daysLate } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  const lateFee = (monthlyRent * (lateFeePercentage / 100)) * daysLate;
  return lateFee;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number, status: string } {
  const { totalLeaseAmount, amountPaid } = input;

  if (totalLeaseAmount < 0 || amountPaid < 0) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const balance = totalLeaseAmount - amountPaid;
  const status = balance > 0 ? 'Outstanding' : 'Paid in Full';

  return { balance, status };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}