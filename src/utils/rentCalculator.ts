// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRate: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // Percentage as a decimal, e.g., 0.05 for 5%
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.dailyRate <= 0 || prorationDetails.daysOccupied <= 0) {
    throw new Error("Invalid proration details: daily rate and days occupied must be greater than zero.");
  }
  
  const proratedRent = prorationDetails.dailyRate * prorationDetails.daysOccupied;
  return proratedRent;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;

  if (lateFeeRate < 0) {
    throw new Error("Invalid late fee rate: it must be a non-negative value.");
  }

  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = daysLate * lateFeeRate;
  return lateFee;
}

export function calculateLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = leaseDetails.monthlyRent * ((leaseDetails.leaseEndDate.getFullYear() - leaseDetails.leaseStartDate.getFullYear()) * 12 + (leaseDetails.leaseEndDate.getMonth() - leaseDetails.leaseStartDate.getMonth()));
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  return {
    totalRentPaid,
    totalRentDue
  };
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  if (amount < 0) {
    throw new Error("Invalid amount: it must be a non-negative value.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}