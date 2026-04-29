// src/utils/rentCalculator.ts

interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentDueDate: Date;
  paymentDate: Date;
  dailyLateFee: number;
  maxLateFee: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  locale: string;
  currency: string;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error("Invalid input values for rent proration.");
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentDueDate, paymentDate, dailyLateFee, maxLateFee } = input;

  if (dailyLateFee < 0 || maxLateFee < 0) {
    throw new Error("Invalid input values for late fee calculation.");
  }

  const daysLate = Math.floor((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLate <= 0) {
    return 0;
  }

  const calculatedLateFee = daysLate * dailyLateFee;
  return Math.min(calculatedLateFee, maxLateFee);
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { remainingBalance: number } {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error("Invalid input values for lease balance summary.");
  }

  const totalPaymentsMade = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const remainingBalance = totalLeaseAmount - totalPaymentsMade;

  return { remainingBalance };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, locale, currency } = input;

  if (amount < 0) {
    throw new Error("Invalid amount for currency formatting.");
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}