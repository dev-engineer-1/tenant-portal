// src/utils/rentCalculator.ts

interface RentProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  baseRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;

  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  const dailyRent = totalRent / daysInMonth;
  return dailyRent * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { baseRent, lateFeePercentage, daysLate } = input;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  const lateFee = (baseRent * lateFeePercentage) / 100;
  return lateFee * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount <= 0 || !Array.isArray(paymentsMade)) {
    throw new Error('Invalid input for lease balance summary.');
  }

  const totalPayments = paymentsMade.reduce((acc, payment) => {
    if (payment < 0) {
      throw new Error('Invalid payment amount in paymentsMade array.');
    }
    return acc + payment;
  }, 0);

  return totalLeaseAmount - totalPayments;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || typeof currencyCode !== 'string') {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}