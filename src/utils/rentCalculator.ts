// src/utils/rentCalculator.ts

interface RentProrationInput {
  monthlyRent: number;
  moveInDate: Date;
  daysInMonth: number;
}

interface LateFeeCalculationInput {
  monthlyRent: number;
  daysLate: number;
  lateFeePercentage: number;
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
  const { monthlyRent, moveInDate, daysInMonth } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0) {
    throw new Error("Monthly rent and days in month must be greater than zero.");
  }

  const moveInDay = moveInDate.getDate();
  if (moveInDay < 1 || moveInDay > daysInMonth) {
    throw new Error("Move-in date is invalid for the given month.");
  }

  const daysOccupied = daysInMonth - moveInDay + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, daysLate, lateFeePercentage } = input;

  if (monthlyRent <= 0 || daysLate < 0 || lateFeePercentage < 0) {
    throw new Error("Invalid input values for late fee calculation.");
  }

  return (monthlyRent * (lateFeePercentage / 100)) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { monthlyRent, monthsRemaining, paidToDate } = input;

  if (monthlyRent <= 0 || monthsRemaining < 0 || paidToDate < 0) {
    throw new Error("Invalid input values for lease balance summary.");
  }

  const totalLeaseAmount = monthlyRent * monthsRemaining;
  return totalLeaseAmount - paidToDate;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  if (!currencyCode) {
    throw new Error("Currency code must be provided.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}