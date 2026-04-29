// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface ProrationDetails {
  moveInDate: Date;
  leaseDetails: LeaseDetails;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, leaseDetails } = details;
  const { startDate, monthlyRent } = leaseDetails;

  if (moveInDate < startDate) {
    throw new Error("Move-in date cannot be before the lease start date.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
  const lateFee = (monthlyRent * lateFeePercentage) / 100;

  return lateFee * lateDays;
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  const { totalRentDue, totalPaid } = summary;
  const balance = totalRentDue - totalPaid;

  return formatCurrency(balance);
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount for currency formatting.");
  }

  return `$${amount.toFixed(2)}`;
}