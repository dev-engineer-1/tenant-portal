// src/utils/rentCalculator.ts

export interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

export interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage
}

export interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(rentDetails: RentDetails): number {
  const { monthlyRent, startDate, endDate } = rentDetails;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (startDate >= endDate) throw new Error("Start date must be before end date.");

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysOccupied < 0) throw new Error("End date must be after start date.");

  return (monthlyRent / totalDaysInMonth) * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;
  if (lateFeeRate < 0) throw new Error("Late fee rate must be non-negative.");
  if (paymentDate <= dueDate) return 0;

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);

  return daysLate * lateFeeRate;
}

export function generateLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  const { totalRent, paymentsMade } = summary;
  if (totalRent < 0 || paymentsMade < 0) throw new Error("Total rent and payments made must be non-negative.");

  const balance = totalRent - paymentsMade;
  return `Total Rent: ${formatCurrency(totalRent)}, Payments Made: ${formatCurrency(paymentsMade)}, Balance: ${formatCurrency(balance)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) throw new Error("Amount must be non-negative.");
  return `$${amount.toFixed(2)}`;
}