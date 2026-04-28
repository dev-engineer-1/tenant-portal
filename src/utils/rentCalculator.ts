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
  paymentsMade: number[];
  totalMonths: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent } = details;
  if (!(moveInDate instanceof Date) || isNaN(moveInDate.getTime())) {
    throw new Error("Invalid move-in date");
  }
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const proratedRent = (monthlyRent / daysInMonth) * (daysInMonth - moveInDate.getDate() + 1);
  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error("Invalid due date");
  }
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error("Invalid payment date");
  }
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero");
  }
  if (lateFeePercentage < 0) {
    throw new Error("Late fee percentage must be non-negative");
  }

  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = (monthlyRent * lateFeePercentage / 100) * daysLate;
  return parseFloat(lateFee.toFixed(2));
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { monthlyRent, paymentsMade, totalMonths } = details;
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero");
  }
  if (totalMonths <= 0) {
    throw new Error("Total months must be greater than zero");
  }

  const totalRent = monthlyRent * totalMonths;
  const totalPayments = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  const balance = totalRent - totalPayments;
  return parseFloat(balance.toFixed(2));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount");
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}