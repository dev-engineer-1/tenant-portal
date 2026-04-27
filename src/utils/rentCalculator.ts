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
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.leaseStartDate || moveInDate > lease.leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const dailyRent = lease.monthlyRent / daysInMonth;
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return dailyRent * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.paymentDate <= details.dueDate) {
    return 0;
  }

  const daysLate = Math.ceil((details.paymentDate.getTime() - details.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = (details.lateFeeRate / 100) * daysLate;

  return lateFee;
}

export function generateLeaseBalanceSummary(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = lease.monthlyRent * ((lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 + (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth()));
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  return {
    totalRentPaid,
    totalRentDue
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}