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
  lateFeePercentage: number;
}

interface LeaseBalanceDetails {
  leaseDetails: LeaseDetails;
  paymentsMade: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, leaseDetails } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
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
  return (monthlyRent * lateFeePercentage / 100) * lateDays;
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { leaseDetails, paymentsMade } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth()) + 1;
  const totalRent = totalMonths * monthlyRent;

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