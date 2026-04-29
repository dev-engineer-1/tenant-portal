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
  lateFeeRate: number; // as a percentage
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < leaseDetails.leaseStartDate || moveInDate > leaseDetails.leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
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
  const lateFee = lateFeeDetails.lateFeeRate / 100 * daysLate;

  return lateFee;
}

export function getLeaseBalanceSummary(leaseBalanceSummary: LeaseBalanceSummary): string {
  const balance = leaseBalanceSummary.totalRentDue - leaseBalanceSummary.totalPaid;
  return `Total Rent Due: ${formatCurrency(leaseBalanceSummary.totalRentDue)}, Total Paid: ${formatCurrency(leaseBalanceSummary.totalPaid)}, Balance: ${formatCurrency(balance)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return `$${amount.toFixed(2)}`;
}