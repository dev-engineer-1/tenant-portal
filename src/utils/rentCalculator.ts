// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month rent is due
}

interface ProrationDetails {
  leaseDetails: LeaseDetails;
  moveInDate: Date;
}

interface LateFeeDetails {
  leaseDetails: LeaseDetails;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { leaseDetails, moveInDate } = details;
  const { monthlyRent, leaseStartDate } = leaseDetails;

  if (moveInDate < leaseStartDate) {
    throw new Error("Move-in date cannot be before lease start date.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const proratedRent = (monthlyRent / daysInMonth) * daysOccupied;

  return proratedRent;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { leaseDetails, paymentDate, lateFeePercentage } = details;
  const { monthlyRent, paymentDueDate } = leaseDetails;

  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error("Late fee percentage must be between 0 and 100.");
  }

  const dueDate = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDueDate);
  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateFee = (monthlyRent * lateFeePercentage) / 100;
  return lateFee;
}

export function getLeaseBalanceSummary(leaseDetails: LeaseDetails, paymentsMade: number): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRent = monthlyRent * totalMonths;
  const balance = totalRent - paymentsMade;

  return balance;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;

  if (!locale || !currency) {
    throw new Error("Locale and currency must be specified for formatting.");
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}