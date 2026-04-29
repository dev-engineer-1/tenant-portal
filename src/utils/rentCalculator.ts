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
  balanceDue: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { startDate, endDate, monthlyRent } = details;
  if (startDate > endDate) {
    throw new Error("Start date must be before end date.");
  }

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysRented = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return parseFloat(((monthlyRent / daysInMonth) * daysRented).toFixed(2));
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error("Late fee percentage must be between 0 and 100.");
  }

  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return parseFloat(((lateFeePercentage / 100) * lateDays).toFixed(2));
}

export function getLeaseBalanceSummary(lease: LeaseDetails, paymentsMade: number): LeaseBalanceSummary {
  const { monthlyRent, leaseStartDate, leaseEndDate } = lease;
  if (leaseStartDate > leaseEndDate) {
    throw new Error("Lease start date must be before lease end date.");
  }

  const months = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth()) + 1;
  const totalRent = monthlyRent * months;
  const balanceDue = totalRent - paymentsMade;

  return {
    totalRent,
    paymentsMade,
    balanceDue,
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}