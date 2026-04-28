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
  totalRentPaid: number;
  totalRentDue: number;
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

  return Math.round(proratedRent * 100) / 100;
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

  const lateDays = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = (monthlyRent * lateFeePercentage / 100) * lateDays;

  return Math.round(lateFee * 100) / 100;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue, lateFees } = details;
  if (totalRentPaid < 0 || totalRentDue < 0 || lateFees < 0) {
    throw new Error("Financial amounts cannot be negative.");
  }

  const balance = totalRentDue + lateFees - totalRentPaid;
  return formatCurrency(balance);
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Amount must be a valid number.");
  }
  return `$${amount.toFixed(2)}`;
}