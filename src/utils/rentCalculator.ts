// src/utils/rentCalculator.ts

export interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
  paymentDate?: Date;
}

export interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage
}

export interface LeaseBalance {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(rentDetails: RentDetails): number {
  const { monthlyRent, startDate, endDate } = rentDetails;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (startDate >= endDate) throw new Error("Start date must be before end date.");

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const rentDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  return (monthlyRent / daysInMonth) * rentDays;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;
  if (lateFeeRate < 0) throw new Error("Late fee rate must be non-negative.");
  if (paymentDate <= dueDate) return 0;

  const lateDays = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24);
  return lateDays * lateFeeRate;
}

export function calculateLeaseBalance(leaseBalance: LeaseBalance): number {
  const { totalRent, paymentsMade } = leaseBalance;
  if (totalRent < 0 || paymentsMade < 0) throw new Error("Total rent and payments made must be non-negative.");
  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) throw new Error("Amount must be non-negative.");
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}