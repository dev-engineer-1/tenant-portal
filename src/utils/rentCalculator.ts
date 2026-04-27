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
  lateFeeRate: number; // as a percentage, e.g., 5 for 5%
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < leaseDetails.leaseStartDate || moveInDate > leaseDetails.leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const dailyRent = leaseDetails.monthlyRent / daysInMonth;
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return dailyRent * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.paymentDate <= lateFeeDetails.dueDate) {
    return 0;
  }

  const daysLate = Math.ceil((lateFeeDetails.paymentDate.getTime() - lateFeeDetails.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = (lateFeeDetails.lateFeeRate / 100) * daysLate;

  return lateFee;
}

export function generateLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = calculateTotalRentDue(leaseDetails);
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  return {
    totalRentPaid,
    totalRentDue
  };
}

function calculateTotalRentDue(leaseDetails: LeaseDetails): number {
  const months = (leaseDetails.leaseEndDate.getFullYear() - leaseDetails.leaseStartDate.getFullYear()) * 12 +
    (leaseDetails.leaseEndDate.getMonth() - leaseDetails.leaseStartDate.getMonth()) + 1;

  return leaseDetails.monthlyRent * months;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}