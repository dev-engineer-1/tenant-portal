// src/utils/rentCalculator.ts

interface ProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeInput {
  baseRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceInput {
  totalRent: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateProratedRent(input: ProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeInput): number {
  const { baseRent, lateFeePercentage } = input;

  if (baseRent <= 0 || lateFeePercentage < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  return baseRent * (lateFeePercentage / 100);
}

export function calculateLeaseBalance(input: LeaseBalanceInput): number {
  const { totalRent, paymentsMade } = input;

  if (totalRent < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance calculation.');
  }

  const totalPayments = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  return totalRent - totalPayments;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}