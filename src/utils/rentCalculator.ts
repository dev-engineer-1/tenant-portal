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
  paymentsMade: number[];
}

interface CurrencyFormattingInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
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

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalPaymentsMade = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalLeaseAmount - totalPaymentsMade;
}

export function formatCurrency(input: CurrencyFormattingInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}