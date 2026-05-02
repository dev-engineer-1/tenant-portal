// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRate: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // Percentage as a decimal
}

interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRate <= 0 || proration.daysOccupied < 0) {
    throw new Error('Invalid proration details.');
  }
  return proration.dailyRate * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = details;
  if (lateFeeRate < 0 || lateFeeRate > 1) {
    throw new Error('Invalid late fee rate.');
  }
  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  return daysLate * lateFeeRate;
}

export function summarizeLeaseBalance(summary: LeaseBalanceSummary): number {
  const { totalRent, paymentsMade } = summary;
  if (totalRent < 0 || paymentsMade < 0) {
    throw new Error('Invalid lease balance summary.');
  }
  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}