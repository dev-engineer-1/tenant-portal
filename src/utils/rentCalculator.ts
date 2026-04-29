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
  gracePeriodDays: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currency: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentDueDate, paymentDate, dailyLateFee, gracePeriodDays } = input;

  if (dailyLateFee < 0 || gracePeriodDays < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24)) - gracePeriodDays);

  return daysLate * dailyLateFee;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { remainingBalance: number; totalPaid: number } {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input for lease balance summary.');
  }

  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const remainingBalance = totalLeaseAmount - totalPaid;

  return { remainingBalance, totalPaid };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currency } = input;

  if (amount < 0 || !currency) {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}