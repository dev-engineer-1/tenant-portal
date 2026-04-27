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
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

function calculateProratedRent(details: ProrationDetails): number {
  const { startDate, endDate, monthlyRent } = details;
  if (startDate >= endDate) {
    throw new Error("Start date must be before end date.");
  }

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysRented = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return (monthlyRent / daysInMonth) * daysRented;
}

function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;
  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return (monthlyRent * (lateFeePercentage / 100)) * daysLate;
}

function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue } = details;
  const balance = totalRentDue - totalRentPaid;

  return balance > 0
    ? `Balance due: ${formatCurrency(balance)}`
    : `Overpaid: ${formatCurrency(-balance)}`;
}

function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return `$${amount.toFixed(2)}`;
}

export {
  LeaseDetails,
  ProrationDetails,
  LateFeeDetails,
  LeaseBalanceSummary,
  calculateProratedRent,
  calculateLateFee,
  getLeaseBalanceSummary,
  formatCurrency
};