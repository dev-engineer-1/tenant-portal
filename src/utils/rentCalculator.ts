// src/utils/rentCalculator.ts

interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentDueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummaryInput {
  monthlyRent: number;
  monthsRemaining: number;
  outstandingBalance: number;
}

interface CurrencyFormatInput {
  amount: number;
  currency: string;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;
  
  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid input values for rent proration calculation.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentDueDate, paymentDate, monthlyRent, lateFeePercentage } = input;
  
  if (monthlyRent <= 0 || lateFeePercentage < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24)));
  
  return daysLate > 0 ? (monthlyRent * (lateFeePercentage / 100)) : 0;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { monthlyRent, monthsRemaining, outstandingBalance } = input;
  
  if (monthlyRent < 0 || monthsRemaining < 0 || outstandingBalance < 0) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  return (monthlyRent * monthsRemaining) + outstandingBalance;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currency } = input;
  
  if (amount < 0 || !currency) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}