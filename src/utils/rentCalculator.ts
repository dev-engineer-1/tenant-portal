// src/utils/rentCalculator.ts

export interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

export interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // e.g., 0.05 for 5%
}

export interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

export function calculateProratedRent(rentDetails: RentDetails): number {
  const { monthlyRent, startDate, endDate } = rentDetails;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (startDate >= endDate) throw new Error("Start date must be before end date.");

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return (monthlyRent / totalDaysInMonth) * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;
  if (lateFeeRate < 0) throw new Error("Late fee rate must be non-negative.");
  if (paymentDate <= dueDate) return 0;

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return lateFeeRate * daysLate;
}

export function calculateLeaseBalance(leaseBalanceDetails: LeaseBalanceDetails): number {
  const { totalLeaseAmount, paymentsMade } = leaseBalanceDetails;
  if (totalLeaseAmount <= 0) throw new Error("Total lease amount must be greater than zero.");
  if (paymentsMade.some(payment => payment < 0)) throw new Error("Payments made cannot contain negative values.");

  const totalPaymentsMade = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalLeaseAmount - totalPaymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) throw new Error("Amount must be non-negative.");
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}