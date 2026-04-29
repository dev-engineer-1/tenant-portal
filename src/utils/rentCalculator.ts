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
  rentDueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.dailyRent <= 0 || prorationDetails.daysOccupied < 0) {
    throw new Error("Invalid proration details provided.");
  }
  return prorationDetails.dailyRent * prorationDetails.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails, monthlyRent: number): number {
  if (lateFeeDetails.lateFeePercentage < 0 || lateFeeDetails.lateFeePercentage > 100) {
    throw new Error("Invalid late fee percentage provided.");
  }
  const daysLate = Math.floor((lateFeeDetails.paymentDate.getTime() - lateFeeDetails.rentDueDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLate <= 0) {
    return 0;
  }
  return (monthlyRent * (lateFeeDetails.lateFeePercentage / 100)) * daysLate;
}

export function getLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = leaseDetails.monthlyRent * ((leaseDetails.leaseEndDate.getFullYear() - leaseDetails.leaseStartDate.getFullYear()) * 12 + (leaseDetails.leaseEndDate.getMonth() - leaseDetails.leaseStartDate.getMonth()));
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  if (totalRentPaid < 0 || totalRentPaid > totalRentDue) {
    throw new Error("Invalid payment details provided.");
  }

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