// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { startDate, endDate, monthlyRent } = details;
  if (startDate >= endDate) {
    throw new Error("Start date must be before end date.");
  }

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysOccupied < 0) {
    throw new Error("End date must be after start date.");
  }

  return (monthlyRent / totalDaysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;
  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysLate < 0) {
    throw new Error("Payment date must be after due date.");
  }

  return (lateFeePercentage / 100) * daysLate;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): number {
  const { totalRent, paymentsMade } = details;
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