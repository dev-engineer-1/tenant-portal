// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  const { monthlyRent } = lease;
  const { startDate, endDate } = proration;

  if (startDate > endDate) {
    throw new Error("Start date cannot be after end date.");
  }

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (monthlyRent / totalDaysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;

  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error("Late fee percentage must be between 0 and 100.");
  }

  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysLate * (lateFeePercentage / 100);
}

export function generateLeaseBalanceSummary(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = lease.monthlyRent * ((lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 + (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth()));
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  return {
    totalRentPaid,
    totalRentDue
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}