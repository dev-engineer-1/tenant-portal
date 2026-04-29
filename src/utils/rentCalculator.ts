// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceDetails {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent } = details;
  if (!(moveInDate instanceof Date) || isNaN(moveInDate.getTime())) {
    throw new Error("Invalid move-in date.");
  }
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error("Invalid due date.");
  }
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error("Invalid payment date.");
  }
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  if (lateFeePercentage < 0) {
    throw new Error("Late fee percentage cannot be negative.");
  }

  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  return (monthlyRent * lateFeePercentage / 100) * daysLate;
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { totalRent, paymentsMade } = details;
  if (totalRent < 0) {
    throw new Error("Total rent cannot be negative.");
  }
  if (paymentsMade < 0) {
    throw new Error("Payments made cannot be negative.");
  }

  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  if (!currency) {
    throw new Error("Currency must be specified.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}