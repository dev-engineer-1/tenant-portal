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
  monthlyRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
  outstandingBalance: number;
}

function calculateDailyRate(monthlyRent: number): number {
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  return monthlyRent / 30;
}

function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  const { monthlyRent } = leaseDetails;
  const { dailyRate, daysOccupied } = prorationDetails;

  if (daysOccupied < 0 || daysOccupied > 30) {
    throw new Error("Days occupied must be between 0 and 30.");
  }

  return dailyRate * daysOccupied;
}

function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { monthlyRent, lateFeePercentage, daysLate } = lateFeeDetails;

  if (monthlyRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error("Invalid input values for late fee calculation.");
  }

  const lateFee = (monthlyRent * (lateFeePercentage / 100)) * daysLate;
  return lateFee;
}

function generateLeaseBalanceSummary(totalRentPaid: number, totalRentDue: number): LeaseBalanceSummary {
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error("Total rent paid and due must be non-negative.");
  }

  const outstandingBalance = totalRentDue - totalRentPaid;
  return {
    totalRentPaid,
    totalRentDue,
    outstandingBalance,
  };
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount must be non-negative.");
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export {
  LeaseDetails,
  ProrationDetails,
  LateFeeDetails,
  LeaseBalanceSummary,
  calculateDailyRate,
  calculateProratedRent,
  calculateLateFee,
  generateLeaseBalanceSummary,
  formatCurrency,
};