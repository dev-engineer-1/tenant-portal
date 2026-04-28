// src/utils/rentCalculator.ts

interface RentDetails {
  monthlyRent: number;
  daysInMonth: number;
  moveInDay: number;
}

interface LateFeeDetails {
  baseRent: number;
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
  const { monthlyRent, daysInMonth, moveInDay } = details;

  if (monthlyRent <= 0 || daysInMonth <= 0 || moveInDay <= 0 || moveInDay > daysInMonth) {
    throw new Error('Invalid rent details provided.');
  }

  const dailyRent = monthlyRent / daysInMonth;
  const proratedRent = dailyRent * (daysInMonth - moveInDay + 1);

  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { baseRent, lateFeePercentage, daysLate } = details;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid late fee details provided.');
  }

  const lateFee = (baseRent * (lateFeePercentage / 100)) * daysLate;

  return parseFloat(lateFee.toFixed(2));
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { totalLeaseAmount, paymentsMade } = details;

  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid lease balance details provided.');
  }

  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const balance = totalLeaseAmount - totalPayments;

  return parseFloat(balance.toFixed(2));
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;

  if (amount < 0 || !locale || !currency) {
    throw new Error('Invalid currency format options provided.');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}