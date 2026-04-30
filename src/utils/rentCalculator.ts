// src/utils/rentCalculator.ts

interface ProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeInput {
  rentAmount: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
  locale: string;
}

export function calculateProratedRent(input: ProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;

  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeInput): number {
  const { rentAmount, lateFeePercentage } = input;

  if (rentAmount <= 0 || lateFeePercentage < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  return rentAmount * (lateFeePercentage / 100);
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number; totalPaid: number } {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input for lease balance summary.');
  }

  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const balance = totalLeaseAmount - totalPaid;

  return { balance, totalPaid };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode, locale } = input;

  if (amount < 0 || !currencyCode || !locale) {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode }).format(amount);
}