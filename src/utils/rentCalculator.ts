// src/utils/rentCalculator.ts

export interface RentDetails {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

export interface LateFeeDetails {
  baseFee: number;
  dailyFee: number;
  daysLate: number;
}

export interface LeaseSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(details: RentDetails): number {
  const { monthlyRent, daysInMonth, daysOccupied } = details;
  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid rent details provided.');
  }
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { baseFee, dailyFee, daysLate } = details;
  if (baseFee < 0 || dailyFee < 0 || daysLate < 0) {
    throw new Error('Invalid late fee details provided.');
  }
  return baseFee + (dailyFee * daysLate);
}

export function generateLeaseBalanceSummary(summary: LeaseSummary): string {
  const { totalRentPaid, totalRentDue } = summary;
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Invalid lease summary details provided.');
  }
  const balance = totalRentDue - totalRentPaid;
  return `Total Rent Due: ${formatCurrency(totalRentDue)}, Total Rent Paid: ${formatCurrency(totalRentPaid)}, Balance: ${formatCurrency(balance)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return `$${amount.toFixed(2)}`;
}