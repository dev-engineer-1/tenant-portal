// src/utils/rentCalculator.ts

interface RentProrationInput {
  monthlyRent: number;
  totalDaysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  monthlyRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceSummaryInput {
  monthlyRent: number;
  monthsRemaining: number;
  paidToDate: number;
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, totalDaysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || totalDaysInMonth <= 0 || daysOccupied < 0) {
    throw new Error("Invalid input values for rent proration calculation.");
  }

  const dailyRent = monthlyRent / totalDaysInMonth;
  return dailyRent * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage, daysLate } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error("Invalid input values for late fee calculation.");
  }

  const lateFee = (monthlyRent * lateFeePercentage) / 100;
  return lateFee * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { monthlyRent, monthsRemaining, paidToDate } = input;

  if (monthlyRent <= 0 || monthsRemaining < 0 || paidToDate < 0) {
    throw new Error("Invalid input values for lease balance summary.");
  }

  const totalLeaseCost = monthlyRent * monthsRemaining;
  return totalLeaseCost - paidToDate;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error("Invalid input values for currency formatting.");
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}