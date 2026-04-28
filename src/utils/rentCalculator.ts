// src/utils/rentCalculator.ts

interface RentDetails {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  monthlyRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: RentDetails): number {
  const { monthlyRent, daysInMonth, daysOccupied } = details;
  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid rent details provided.');
  }
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { monthlyRent, lateFeePercentage, daysLate } = details;
  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid late fee details provided.');
  }
  const dailyLateFee = (monthlyRent * (lateFeePercentage / 100)) / 30;
  return dailyLateFee * daysLate;
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { totalLeaseAmount, paymentsMade } = details;
  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid lease balance details provided.');
  }
  const totalPaymentsMade = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  return totalLeaseAmount - totalPaymentsMade;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;
  if (amount < 0 || !locale || !currency) {
    throw new Error('Invalid currency format options provided.');
  }
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}