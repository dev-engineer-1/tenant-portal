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
  rentDueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  totalPaid: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.dailyRent <= 0 || prorationDetails.daysOccupied < 0) {
    throw new Error('Invalid proration details');
  }

  const proratedRent = prorationDetails.dailyRent * prorationDetails.daysOccupied;
  return proratedRent;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = lateFeeDetails;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error('Invalid late fee percentage');
  }

  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = daysLate > 0 ? (lateFeePercentage / 100) * daysLate : 0;
  return lateFee;
}

export function getLeaseBalanceSummary(leaseBalanceSummary: LeaseBalanceSummary): string {
  const { totalRent, totalPaid } = leaseBalanceSummary;
  if (totalRent < 0 || totalPaid < 0) {
    throw new Error('Invalid lease balance summary details');
  }

  const balance = totalRent - totalPaid;
  return formatCurrency(balance);
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid amount');
  }

  return `$${amount.toFixed(2)}`;
}