// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month when rent is due
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  daysLate: number;
  dailyLateFee: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.startDate > proration.endDate) {
    throw new Error("Start date cannot be after end date.");
  }
  if (proration.startDate < lease.leaseStartDate || proration.endDate > lease.leaseEndDate) {
    throw new Error("Proration period must be within the lease term.");
  }

  const daysInMonth = new Date(proration.startDate.getFullYear(), proration.startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (proration.endDate.getTime() - proration.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (lease.monthlyRent / daysInMonth) * proratedDays;
}

export function calculateLateFee(lease: LeaseDetails, lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }
  if (lateFeeDetails.dailyLateFee < 0) {
    throw new Error("Daily late fee cannot be negative.");
  }

  return lateFeeDetails.daysLate * lateFeeDetails.dailyLateFee;
}

export function calculateLeaseBalance(lease: LeaseDetails, paymentsMade: number): number {
  const totalLeasePeriodMonths = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 +
    (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth());

  const totalRent = lease.monthlyRent * totalLeasePeriodMonths;
  const balance = totalRent - paymentsMade;

  if (balance < 0) {
    throw new Error("Payments made exceed the total rent due.");
  }

  return balance;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  if (!options.locale || !options.currency) {
    throw new Error("Locale and currency must be specified.");
  }

  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}