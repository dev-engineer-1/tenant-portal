// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRent: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface BalanceSummary {
  totalRent: number;
  totalPaid: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRent <= 0 || proration.daysOccupied < 0) {
    throw new Error('Invalid proration details');
  }
  return proration.dailyRent * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error('Invalid late fee percentage');
  }
  if (paymentDate <= dueDate) {
    return 0;
  }
  const daysLate = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysLate * (lateFeePercentage / 100);
}

export function calculateLeaseBalanceSummary(summary: BalanceSummary): number {
  const { totalRent, totalPaid } = summary;
  if (totalRent < 0 || totalPaid < 0) {
    throw new Error('Invalid balance summary details');
  }
  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}