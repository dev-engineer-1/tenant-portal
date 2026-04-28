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
  if (proration.startDate > proration.endDate) {
    throw new Error("Proration start date must be before end date.");
  }

  const daysInMonth = new Date(proration.startDate.getFullYear(), proration.startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (proration.endDate.getTime() - proration.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  if (proratedDays < 0 || proratedDays > daysInMonth) {
    throw new Error("Invalid proration period.");
  }

  return (lease.monthlyRent / daysInMonth) * proratedDays;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.paymentDate <= details.dueDate) {
    return 0;
  }

  const lateDays = (details.paymentDate.getTime() - details.dueDate.getTime()) / (1000 * 60 * 60 * 24);
  if (lateDays < 0) {
    throw new Error("Payment date cannot be before the due date.");
  }

  return (details.lateFeePercentage / 100) * lateDays;
}

export function summarizeLeaseBalance(lease: LeaseDetails, summary: LeaseBalanceSummary): number {
  if (summary.totalRentPaid < 0 || summary.totalRentDue < 0) {
    throw new Error("Total rent paid and due must be non-negative.");
  }

  return summary.totalRentDue - summary.totalRentPaid;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount must be non-negative.");
  }

  return `$${amount.toFixed(2)}`;
}