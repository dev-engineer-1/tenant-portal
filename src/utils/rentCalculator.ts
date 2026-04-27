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
  monthlyRent: number;
  paymentsMade: number;
  monthsElapsed: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent } = details;
  if (!(moveInDate instanceof Date) || isNaN(moveInDate.getTime())) {
    throw new Error('Invalid move-in date');
  }
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error('Invalid due date');
  }
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error('Invalid payment date');
  }
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }
  if (lateFeePercentage < 0) {
    throw new Error('Late fee percentage must be non-negative');
  }

  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  return daysLate > 0 ? (monthlyRent * (lateFeePercentage / 100)) : 0;
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { monthlyRent, paymentsMade, monthsElapsed } = details;
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }
  if (paymentsMade < 0) {
    throw new Error('Payments made cannot be negative');
  }
  if (monthsElapsed < 0) {
    throw new Error('Months elapsed cannot be negative');
  }

  const totalRentDue = monthlyRent * monthsElapsed;
  return totalRentDue - paymentsMade;
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount');
  }
  return `$${amount.toFixed(2)}`;
}