// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface ProrationDetails {
  leaseDetails: LeaseDetails;
  moveInDate: Date;
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
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { leaseDetails, moveInDate } = details;
  const { startDate, monthlyRent } = leaseDetails;

  if (moveInDate < startDate) {
    throw new Error("Move-in date cannot be before lease start date.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return (monthlyRent * (lateFeePercentage / 100)) * lateDays;
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): number {
  const { totalRent, paymentsMade } = summary;

  if (paymentsMade > totalRent) {
    throw new Error("Payments made cannot exceed total rent.");
  }

  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}