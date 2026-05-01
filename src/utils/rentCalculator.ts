// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month when rent is due
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  daysLate: number;
  dailyLateFee: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
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
  const { daysLate, dailyLateFee } = details;
  if (daysLate < 0) {
    throw new Error('Days late cannot be negative');
  }
  if (dailyLateFee < 0) {
    throw new Error('Daily late fee cannot be negative');
  }

  return daysLate * dailyLateFee;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue } = details;
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Rent amounts cannot be negative');
  }

  const balance = totalRentDue - totalRentPaid;
  return balance > 0 ? `Balance due: ${formatCurrency(balance)}` : `Overpaid: ${formatCurrency(-balance)}`;
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid amount');
  }
  return `$${amount.toFixed(2)}`;
}