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
  lateFeePercentage: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  const { monthlyRent } = lease;
  const { startDate, endDate } = proration;

  if (startDate > endDate) {
    throw new Error("Start date must be before end date.");
  }

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (monthlyRent / daysInMonth) * proratedDays;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return lateFeePercentage * daysLate;
}

export function calculateLeaseBalance(lease: LeaseDetails, paymentsMade: number): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = lease;

  if (leaseStartDate > leaseEndDate) {
    throw new Error("Lease start date must be before lease end date.");
  }

  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + leaseEndDate.getMonth() - leaseStartDate.getMonth();
  const totalRent = monthlyRent * totalMonths;

  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;

  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}