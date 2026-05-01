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
  monthlyRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface BalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  validateLeaseDetails(leaseDetails);
  validateProrationDetails(prorationDetails);

  const { dailyRent, daysOccupied } = prorationDetails;
  return dailyRent * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  validateLateFeeDetails(lateFeeDetails);

  const { monthlyRent, lateFeePercentage, daysLate } = lateFeeDetails;
  if (daysLate <= 0) {
    return 0;
  }
  return (monthlyRent * (lateFeePercentage / 100)) * daysLate;
}

export function generateLeaseBalanceSummary(leaseDetails: LeaseDetails, balanceSummary: BalanceSummary): string {
  validateLeaseDetails(leaseDetails);
  validateBalanceSummary(balanceSummary);

  const { totalRentPaid, totalRentDue } = balanceSummary;
  const balance = totalRentDue - totalRentPaid;
  return `Lease Balance Summary: Total Rent Paid: ${formatCurrency(totalRentPaid)}, Total Rent Due: ${formatCurrency(totalRentDue)}, Balance: ${formatCurrency(balance)}`;
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount for currency formatting.');
  }
  return `$${amount.toFixed(2)}`;
}

function validateLeaseDetails(leaseDetails: LeaseDetails): void {
  if (!leaseDetails || typeof leaseDetails.monthlyRent !== 'number' || isNaN(leaseDetails.monthlyRent)) {
    throw new Error('Invalid lease details.');
  }
  if (!(leaseDetails.leaseStartDate instanceof Date) || !(leaseDetails.leaseEndDate instanceof Date)) {
    throw new Error('Invalid lease start or end date.');
  }
}

function validateProrationDetails(prorationDetails: ProrationDetails): void {
  if (!prorationDetails || typeof prorationDetails.dailyRent !== 'number' || isNaN(prorationDetails.dailyRent)) {
    throw new Error('Invalid proration details.');
  }
  if (typeof prorationDetails.daysOccupied !== 'number' || isNaN(prorationDetails.daysOccupied)) {
    throw new Error('Invalid number of days occupied.');
  }
}

function validateLateFeeDetails(lateFeeDetails: LateFeeDetails): void {
  if (!lateFeeDetails || typeof lateFeeDetails.monthlyRent !== 'number' || isNaN(lateFeeDetails.monthlyRent)) {
    throw new Error('Invalid late fee details.');
  }
  if (typeof lateFeeDetails.lateFeePercentage !== 'number' || isNaN(lateFeeDetails.lateFeePercentage)) {
    throw new Error('Invalid late fee percentage.');
  }
  if (typeof lateFeeDetails.daysLate !== 'number' || isNaN(lateFeeDetails.daysLate)) {
    throw new Error('Invalid number of days late.');
  }
}

function validateBalanceSummary(balanceSummary: BalanceSummary): void {
  if (!balanceSummary || typeof balanceSummary.totalRentPaid !== 'number' || isNaN(balanceSummary.totalRentPaid)) {
    throw new Error('Invalid balance summary.');
  }
  if (typeof balanceSummary.totalRentDue !== 'number' || isNaN(balanceSummary.totalRentDue)) {
    throw new Error('Invalid total rent due.');
  }
}