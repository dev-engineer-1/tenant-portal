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
  baseLateFee: number;
  dailyLateFee: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
  balance: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.daysOccupied < 0) {
    throw new Error("Days occupied cannot be negative.");
  }
  const { monthlyRent } = leaseDetails;
  const { dailyRent, daysOccupied } = prorationDetails;
  return dailyRent * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }
  const { baseLateFee, dailyLateFee, daysLate } = lateFeeDetails;
  return baseLateFee + (dailyLateFee * daysLate);
}

export function generateLeaseBalanceSummary(leaseDetails: LeaseDetails, totalRentPaid: number): LeaseBalanceSummary {
  if (totalRentPaid < 0) {
    throw new Error("Total rent paid cannot be negative.");
  }
  const totalLeaseDurationMonths = (leaseDetails.leaseEndDate.getFullYear() - leaseDetails.leaseStartDate.getFullYear()) * 12 +
    (leaseDetails.leaseEndDate.getMonth() - leaseDetails.leaseStartDate.getMonth());
  const totalRentDue = leaseDetails.monthlyRent * totalLeaseDurationMonths;
  const balance = totalRentDue - totalRentPaid;
  return { totalRentPaid, totalRentDue, balance };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}