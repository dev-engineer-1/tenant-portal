// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage, e.g., 5 for 5%
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  const { monthlyRent } = lease;
  const { startDate, endDate } = proration;

  if (endDate < startDate) {
    throw new Error('End date must be after start date.');
  }

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (monthlyRent / totalDaysInMonth) * proratedDays;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysLate * lateFeeRate;
}

export function getLeaseBalanceSummary(lease: LeaseDetails, paymentsMade: number): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = lease;

  if (leaseEndDate < leaseStartDate) {
    throw new Error('Lease end date must be after lease start date.');
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