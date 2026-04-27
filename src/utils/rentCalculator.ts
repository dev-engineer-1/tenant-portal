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

interface LeaseBalanceDetails {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.dailyRent <= 0 || prorationDetails.daysOccupied < 0) {
    throw new Error('Invalid proration details provided.');
  }
  return prorationDetails.dailyRent * prorationDetails.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = lateFeeDetails;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error('Invalid late fee percentage.');
  }
  if (paymentDate <= rentDueDate) {
    return 0;
  }
  const daysLate = Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysLate * (lateFeePercentage / 100);
}

export function getLeaseBalanceSummary(leaseBalanceDetails: LeaseBalanceDetails): string {
  const { totalRentPaid, totalRentDue } = leaseBalanceDetails;
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Invalid lease balance details.');
  }
  const balance = totalRentDue - totalRentPaid;
  return balance >= 0 ? `Balance due: $${balance.toFixed(2)}` : `Overpaid: $${Math.abs(balance).toFixed(2)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return `$${amount.toFixed(2)}`;
}