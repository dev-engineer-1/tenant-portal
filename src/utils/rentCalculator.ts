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
  baseLateFee: number;
  dailyLateFee: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRate <= 0 || proration.daysOccupied < 0) {
    throw new Error("Invalid proration details provided.");
  }
  return proration.dailyRate * proration.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.baseLateFee < 0 || lateFeeDetails.dailyLateFee < 0 || lateFeeDetails.daysLate < 0) {
    throw new Error("Invalid late fee details provided.");
  }
  return lateFeeDetails.baseLateFee + (lateFeeDetails.dailyLateFee * lateFeeDetails.daysLate);
}

export function generateLeaseBalanceSummary(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = calculateTotalRentDue(lease);
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  if (totalRentPaid < 0) {
    throw new Error("Total rent paid cannot be negative.");
  }

  return {
    totalRentPaid,
    totalRentDue
  };
}

function calculateTotalRentDue(lease: LeaseDetails): number {
  const months = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 +
    (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth());
  return lease.monthlyRent * months;
}

export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}