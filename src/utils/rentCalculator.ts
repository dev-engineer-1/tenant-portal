// src/utils/rentCalculator.ts

interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // percentage
}

interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(rentDetails: RentDetails): number {
  const { monthlyRent, startDate, endDate } = rentDetails;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (endDate <= startDate) throw new Error("End date must be after start date.");

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysRented = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  return (monthlyRent / daysInMonth) * daysRented;
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
  if (paymentsMade.some(payment => payment < 0)) throw new Error("Payments cannot be negative.");

  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalLeaseAmount - totalPayments;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;
  if (amount < 0) throw new Error("Amount cannot be negative.");

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}