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
  outstandingBalance: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.daysOccupied < 0) {
    throw new Error("Days occupied cannot be negative.");
  }
  if (leaseDetails.monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  return prorationDetails.dailyRent * prorationDetails.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }
  if (lateFeeDetails.baseLateFee < 0 || lateFeeDetails.dailyLateFee < 0) {
    throw new Error("Late fees must be non-negative.");
  }
  return lateFeeDetails.baseLateFee + (lateFeeDetails.dailyLateFee * lateFeeDetails.daysLate);
}

export function generateLeaseBalanceSummary(totalRentPaid: number, leaseDetails: LeaseDetails): LeaseBalanceSummary {
  if (totalRentPaid < 0) {
    throw new Error("Total rent paid cannot be negative.");
  }
  const totalRentDue = calculateTotalRentDue(leaseDetails);
  const outstandingBalance = totalRentDue - totalRentPaid;
  return {
    totalRentPaid,
    totalRentDue,
    outstandingBalance
  };
}

function calculateTotalRentDue(leaseDetails: LeaseDetails): number {
  const months = calculateMonthsBetween(leaseDetails.leaseStartDate, leaseDetails.leaseEndDate);
  return leaseDetails.monthlyRent * months;
}

function calculateMonthsBetween(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  return months <= 0 ? 0 : months;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return `$${amount.toFixed(2)}`;
}