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

interface LeaseBalanceSummary {
  totalPaid: number;
  totalDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.daysOccupied < 0) {
    throw new Error('Days occupied cannot be negative.');
  }
  const daysInMonth = new Date(lease.leaseStartDate.getFullYear(), lease.leaseStartDate.getMonth() + 1, 0).getDate();
  const proratedRent = (lease.monthlyRent / daysInMonth) * proration.daysOccupied;
  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.paymentDate <= details.dueDate) {
    return 0;
  }
  const lateDays = (details.paymentDate.getTime() - details.dueDate.getTime()) / (1000 * 60 * 60 * 24);
  if (lateDays < 0) {
    throw new Error('Late days cannot be negative.');
  }
  const lateFee = (details.lateFeePercentage / 100) * lateDays;
  return parseFloat(lateFee.toFixed(2));
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  if (summary.totalPaid < 0 || summary.totalDue < 0) {
    throw new Error('Total paid or total due cannot be negative.');
  }
  const balance = summary.totalDue - summary.totalPaid;
  return formatCurrency(balance);
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return `$${amount.toFixed(2)}`;
}