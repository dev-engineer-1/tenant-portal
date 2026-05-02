// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  rentAmount: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  rentAmount: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
  balance: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { rentAmount, daysInMonth, daysOccupied } = details;
  if (daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid days in month or days occupied.');
  }
  return (rentAmount / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { rentAmount, lateFeePercentage, daysLate } = details;
  if (lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Late fee percentage and days late must be non-negative.');
  }
  return rentAmount * (lateFeePercentage / 100) * daysLate;
}

export function getLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  if (leaseStartDate >= leaseEndDate) {
    throw new Error('Lease start date must be before lease end date.');
  }
  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRentDue = monthlyRent * totalMonths;
  const totalPaid = payments.reduce((acc, payment) => acc + payment, 0);
  const balance = totalRentDue - totalPaid;

  return { totalRentDue, totalPaid, balance };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount must be non-negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}