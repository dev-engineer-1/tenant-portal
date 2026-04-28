// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month when rent is due
}

interface ProrationDetails extends LeaseDetails {
  moveInDate: Date;
}

interface LateFeeDetails {
  rentAmount: number;
  daysLate: number;
  dailyLateFeeRate: number; // Percentage of rent charged as late fee per day
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
  outstandingBalance: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { monthlyRent, moveInDate, leaseStartDate } = details;

  if (moveInDate < leaseStartDate) {
    throw new Error("Move-in date cannot be before lease start date.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { rentAmount, daysLate, dailyLateFeeRate } = details;

  if (daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }

  if (dailyLateFeeRate < 0 || dailyLateFeeRate > 1) {
    throw new Error("Daily late fee rate must be between 0 and 1.");
  }

  return rentAmount * dailyLateFeeRate * daysLate;
}

export function generateLeaseBalanceSummary(totalRentPaid: number, totalRentDue: number): LeaseBalanceSummary {
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error("Total rent paid and total rent due must be non-negative.");
  }

  const outstandingBalance = totalRentDue - totalRentPaid;

  return {
    totalRentPaid,
    totalRentDue,
    outstandingBalance,
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}