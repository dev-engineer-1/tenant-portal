// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month rent is due
}

interface ProrationDetails {
  leaseStartDate: Date;
  leaseEndDate: Date;
  moveInDate: Date;
}

interface LateFeeDetails {
  daysLate: number;
  dailyLateFee: number;
  maxLateFee: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: ProrationDetails, monthlyRent: number): number {
  const { leaseStartDate, leaseEndDate, moveInDate } = details;
  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { daysLate, dailyLateFee, maxLateFee } = details;
  if (daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }
  const totalLateFee = daysLate * dailyLateFee;
  return totalLateFee > maxLateFee ? maxLateFee : totalLateFee;
}

export function calculateLeaseBalanceSummary(leaseDetails: LeaseDetails, paymentsMade: number[]): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  const totalLeaseMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth()) + 1;
  const totalRent = monthlyRent * totalLeaseMonths;
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalRent - totalPayments;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}