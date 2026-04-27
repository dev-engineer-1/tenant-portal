// src/utils/rentCalculator.ts

interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage
}

interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

export function calculateProratedRent(rentDetails: RentDetails): number {
  const { monthlyRent, startDate, endDate } = rentDetails;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (startDate >= endDate) throw new Error("Start date must be before end date.");

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
  return (monthlyRent / daysInMonth) * proratedDays;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;
  if (lateFeeRate < 0) throw new Error("Late fee rate must be non-negative.");
  if (paymentDate <= dueDate) return 0;

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24);
  return lateFeeRate * daysLate;
}

export function calculateLeaseBalance(leaseBalanceDetails: LeaseBalanceDetails): number {
  const { totalLeaseAmount, paymentsMade } = leaseBalanceDetails;
  if (totalLeaseAmount <= 0) throw new Error("Total lease amount must be greater than zero.");
  if (paymentsMade.some(payment => payment < 0)) throw new Error("Payments made cannot be negative.");

  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalLeaseAmount - totalPayments;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) throw new Error("Amount cannot be negative.");
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}