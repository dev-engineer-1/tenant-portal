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

interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
  lateFees: number;
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
  const proratedRent = (monthlyRent / daysInMonth) * (daysInMonth - moveInDate.getDate() + 1);
  return parseFloat(proratedRent.toFixed(2));
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
    throw new Error("Late fee percentage must be non-negative.");
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24);
  if (daysLate <= 0) {
    return 0;
  }

  const lateFee = (monthlyRent * lateFeePercentage) / 100;
  return parseFloat(lateFee.toFixed(2));
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRent, paymentsMade, lateFees } = details;
  if (totalRent < 0 || paymentsMade < 0 || lateFees < 0) {
    throw new Error("Financial values must be non-negative.");
  }

  const balance = totalRent - paymentsMade + lateFees;
  return formatCurrency(balance);
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount.");
  }
  return `$${amount.toFixed(2)}`;
}