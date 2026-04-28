// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  monthlyRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { startDate, endDate, monthlyRent } = details;
  if (startDate >= endDate) {
    throw new Error('Start date must be before end date.');
  }

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return (monthlyRent / totalDaysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { monthlyRent, lateFeePercentage, daysLate } = details;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error('Late fee percentage must be between 0 and 100.');
  }
  if (daysLate < 0) {
    throw new Error('Days late cannot be negative.');
  }

  return (monthlyRent * (lateFeePercentage / 100)) * daysLate;
}

export function calculateLeaseBalance(lease: LeaseDetails, paymentsMade: number): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = lease;
  if (leaseStartDate >= leaseEndDate) {
    throw new Error('Lease start date must be before lease end date.');
  }
  if (paymentsMade < 0) {
    throw new Error('Payments made cannot be negative.');
  }

  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRent = monthlyRent * totalMonths;

  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}