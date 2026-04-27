// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  moveInDate: Date;
  leaseDetails: LeaseDetails;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  dailyLateFeeRate: number;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, leaseDetails } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, dailyLateFeeRate } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

  return lateDays * dailyLateFeeRate * monthlyRent;
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  const { totalRentDue, totalPaid } = summary;

  if (totalPaid > totalRentDue) {
    throw new Error('Total paid cannot exceed total rent due.');
  }

  const balance = totalRentDue - totalPaid;
  return formatCurrency(balance);
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return `$${amount.toFixed(2)}`;
}