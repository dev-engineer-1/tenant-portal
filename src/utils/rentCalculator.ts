// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  moveInDate: Date;
  leaseDetails: LeaseDetails;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  dailyLateFee: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  leaseDetails: LeaseDetails;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, leaseDetails } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, dailyLateFee } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return lateDays * dailyLateFee;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentPaid, leaseDetails } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  const totalLeaseMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth()) + 1;
  const totalLeaseAmount = monthlyRent * totalLeaseMonths;
  const balance = totalLeaseAmount - totalRentPaid;

  return `Total Lease Amount: ${totalLeaseAmount}, Total Rent Paid: ${totalRentPaid}, Balance: ${balance}`;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;

  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}