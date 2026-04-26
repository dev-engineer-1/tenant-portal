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
  if (prorationDetails.daysOccupied < 0) {
    throw new Error("Days occupied cannot be negative.");
  }
  const { monthlyRent } = leaseDetails;
  const { dailyRent, daysOccupied } = prorationDetails;
  return dailyRent * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = lateFeeDetails;
  if (paymentDate <= rentDueDate) {
    return 0;
  }
  const daysLate = Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysLate < 0) {
    throw new Error("Payment date cannot be before the rent due date.");
  }
  return daysLate * lateFeePercentage;
}

export function generateLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRentDue = monthlyRent * totalMonths;
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error("Rent values cannot be negative.");
  }
  return {
    totalRentPaid,
    totalRentDue,
  };
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return `$${amount.toFixed(2)}`;
}