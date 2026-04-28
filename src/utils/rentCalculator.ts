// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  moveInDate: Date;
  leaseDetails: LeaseDetails;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // percentage
}

interface LeaseBalanceDetails {
  leaseDetails: LeaseDetails;
  paymentsMade: number[];
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, leaseDetails } = details;
  const { monthlyRent, leaseStartDate } = leaseDetails;

  if (moveInDate < leaseStartDate) {
    throw new Error("Move-in date cannot be before lease start date.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = details;

  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

  return daysLate * (lateFeeRate / 100);
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { leaseDetails, paymentsMade } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRent = totalMonths * monthlyRent;
  const totalPaid = paymentsMade.reduce((sum, payment) => sum + payment, 0);

  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}