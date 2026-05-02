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
  paymentsMade: number[];
}

interface CurrencyFormattingInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage, daysLate, gracePeriod } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0 || gracePeriod < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  if (daysLate <= gracePeriod) {
    return 0;
  }

  return (monthlyRent * (lateFeePercentage / 100));
}

export function generateLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number; totalPaid: number } {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input for lease balance summary.');
  }

  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const balance = totalLeaseAmount - totalPaid;

  return { balance, totalPaid };
}

export function formatCurrency(input: CurrencyFormattingInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}