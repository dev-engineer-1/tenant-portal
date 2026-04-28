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
  monthlyRent: number;
  daysLate: number;
  lateFeeRate: number; // percentage of monthly rent
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  paymentsMade: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRent <= 0 || proration.daysOccupied <= 0) {
    throw new Error('Daily rent and days occupied must be greater than zero.');
  }
  return proration.dailyRent * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.monthlyRent <= 0 || details.daysLate < 0 || details.lateFeeRate < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }
  return (details.monthlyRent * (details.lateFeeRate / 100)) * details.daysLate;
}

export function generateLeaseBalanceSummary(lease: LeaseDetails, paymentsMade: number): LeaseBalanceSummary {
  if (lease.monthlyRent <= 0 || paymentsMade < 0) {
    throw new Error('Monthly rent must be greater than zero and payments made cannot be negative.');
  }
  const totalMonths = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 +
                      (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth());
  const totalRentDue = lease.monthlyRent * totalMonths;
  return {
    totalRentDue,
    paymentsMade
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}