// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  leaseDetails: LeaseDetails;
  moveInDate: Date;
}

interface LateFeeDetails {
  monthlyRent: number;
  daysLate: number;
  dailyLateFeeRate: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { leaseDetails, moveInDate } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { monthlyRent, daysLate, dailyLateFeeRate } = details;

  if (daysLate < 0) {
    throw new Error('Days late cannot be negative.');
  }

  return monthlyRent * dailyLateFeeRate * daysLate;
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue } = summary;

  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Total rent paid and total rent due cannot be negative.');
  }

  const balance = totalRentDue - totalRentPaid;
  return balance > 0 ? `Balance Due: ${formatCurrency(balance)}` : `Overpaid: ${formatCurrency(-balance)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return `$${amount.toFixed(2)}`;
}