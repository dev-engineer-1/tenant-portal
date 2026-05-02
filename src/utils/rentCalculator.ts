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
  totalRent: number;
  paymentsMade: number[];
  additionalCharges: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;

  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration.');
  }

  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { baseRent, lateFeePercentage, daysLate } = input;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  return (baseRent * (lateFeePercentage / 100)) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalRent, paymentsMade, additionalCharges } = input;

  if (totalRent < 0 || paymentsMade.some(payment => payment < 0) || additionalCharges.some(charge => charge < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const totalCharges = additionalCharges.reduce((acc, charge) => acc + charge, 0);

  return totalRent - totalPayments + totalCharges;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}