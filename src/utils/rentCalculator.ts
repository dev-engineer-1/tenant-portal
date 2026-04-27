// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRate: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage
}

interface LeaseBalanceSummary {
  totalRent: number;
  totalPaid: number;
  balanceDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.daysOccupied < 0) {
    throw new Error("Days occupied cannot be negative.");
  }
  if (prorationDetails.dailyRate <= 0) {
    throw new Error("Daily rate must be greater than zero.");
  }
  return prorationDetails.dailyRate * prorationDetails.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;
  if (lateFeeRate < 0) {
    throw new Error("Late fee rate cannot be negative.");
  }
  if (paymentDate <= dueDate) {
    return 0;
  }
  const daysLate = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysLate * lateFeeRate;
}

export function getLeaseBalanceSummary(leaseDetails: LeaseDetails, totalPaid: number): LeaseBalanceSummary {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  if (leaseEndDate <= leaseStartDate) {
    throw new Error("Lease end date must be after the start date.");
  }
  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRent = monthlyRent * totalMonths;
  const balanceDue = totalRent - totalPaid;
  return { totalRent, totalPaid, balanceDue };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}