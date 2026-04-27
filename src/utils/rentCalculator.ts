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
  totalRentDue: number;
  totalPaid: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRent <= 0 || proration.daysOccupied <= 0) {
    throw new Error("Daily rent and days occupied must be greater than zero.");
  }
  return proration.dailyRent * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = details;
  if (lateFeeRate < 0) {
    throw new Error("Late fee rate must be non-negative.");
  }
  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  return daysLate > 0 ? lateFeeRate / 100 : 0;
}

export function summarizeLeaseBalance(summary: LeaseBalanceSummary): number {
  const { totalRentDue, totalPaid } = summary;
  if (totalRentDue < 0 || totalPaid < 0) {
    throw new Error("Total rent due and total paid must be non-negative.");
  }
  return totalRentDue - totalPaid;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount must be non-negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}