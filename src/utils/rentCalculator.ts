// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRent: number;
  daysOccupied: number;
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
  if (proration.daysOccupied < 0) {
    throw new Error('Days occupied cannot be negative.');
  }
  const dailyRent = lease.monthlyRent / 30; // Assuming 30 days in a month for simplicity
  return dailyRent * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;
  if (paymentDate <= dueDate) {
    return 0;
  }
  const daysLate = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLate < 0) {
    throw new Error('Days late cannot be negative.');
  }
  return (details.lateFeePercentage / 100) * daysLate;
}

export function summarizeLeaseBalance(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = lease.monthlyRent * ((lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 + (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth()));
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);
  
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Total rent paid or due cannot be negative.');
  }

  return {
    totalRentPaid,
    totalRentDue
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}