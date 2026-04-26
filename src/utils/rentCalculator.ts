// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  dailyLateFee: number;
  currency: string;
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  dailyLateFee: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  totalPaid: number;
  currency: string;
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
  const { dueDate, paymentDate, dailyLateFee } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error("Invalid due date.");
  }
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error("Invalid payment date.");
  }
  if (dailyLateFee < 0) {
    throw new Error("Daily late fee cannot be negative.");
  }

  const lateDays = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  return lateDays * dailyLateFee;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRent, totalPaid, currency } = details;
  if (totalRent < 0 || totalPaid < 0) {
    throw new Error("Total rent and total paid must be non-negative.");
  }

  const balance = totalRent - totalPaid;
  return formatCurrency(balance, currency);
}

export function formatCurrency(amount: number, currency: string): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error("Invalid amount.");
  }
  if (typeof currency !== 'string' || currency.length !== 3) {
    throw new Error("Invalid currency code.");
  }

  return `${currency} ${amount.toFixed(2)}`;
}