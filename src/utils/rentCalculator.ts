// src/utils/rentCalculator.ts

export interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

export interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // percentage
}

export interface LeaseBalance {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(rentDetails: RentDetails): number {
  const { monthlyRent, startDate, endDate } = rentDetails;
  if (monthlyRent <= 0) throw new Error('Monthly rent must be greater than zero.');
  if (endDate <= startDate) throw new Error('End date must be after start date.');

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (monthlyRent / totalDaysInMonth) * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;
  if (lateFeeRate < 0) throw new Error('Late fee rate must be non-negative.');
  if (paymentDate <= dueDate) return 0;

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return lateFeeRate * daysLate;
}

export function calculateLeaseBalance(leaseBalance: LeaseBalance): number {
  const { totalRent, paymentsMade } = leaseBalance;
  if (totalRent < 0 || paymentsMade < 0) throw new Error('Total rent and payments made must be non-negative.');

  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) throw new Error('Amount must be non-negative.');

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}