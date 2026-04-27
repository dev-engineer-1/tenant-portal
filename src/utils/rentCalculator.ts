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
  const { monthlyRent } = leaseDetails;
  const { dailyRent, daysOccupied } = prorationDetails;

  if (monthlyRent <= 0 || dailyRent <= 0 || daysOccupied < 0) {
    throw new Error("Invalid input values for rent calculation.");
  }

  return dailyRent * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = lateFeeDetails;

  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error("Late fee percentage must be between 0 and 100.");
  }

  const daysLate = (paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysLate <= 0) {
    return 0;
  }

  return (lateFeePercentage / 100) * daysLate;
}

export function summarizeLeaseBalance(leaseBalanceSummary: LeaseBalanceSummary): number {
  const { totalRentPaid, totalRentDue } = leaseBalanceSummary;

  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error("Invalid input values for lease balance summary.");
  }

  return totalRentDue - totalRentPaid;
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}