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

interface LeaseBalanceDetails {
  leaseDetails: LeaseDetails;
  paymentsMade: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { leaseDetails, moveInDate } = details;
  const { startDate, monthlyRent } = leaseDetails;

  if (moveInDate < startDate) {
    throw new Error("Move-in date cannot be before the lease start date.");
  }

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
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

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { leaseDetails, paymentsMade } = details;
  const { startDate, endDate, monthlyRent } = leaseDetails;

  if (endDate < startDate) {
    throw new Error("Lease end date cannot be before the start date.");
  }

  const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
  const totalRent = totalMonths * monthlyRent;

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