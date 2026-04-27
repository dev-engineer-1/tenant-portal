// src/utils/rentCalculator.ts

interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  rentAmount: number;
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // percentage as a decimal
}

interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: RentDetails): number {
  const { monthlyRent, startDate, endDate } = details;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (startDate >= endDate) throw new Error("Start date must be before end date.");

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { rentAmount, dueDate, paymentDate, lateFeeRate } = details;
  if (rentAmount <= 0) throw new Error("Rent amount must be greater than zero.");
  if (lateFeeRate < 0) throw new Error("Late fee rate must be non-negative.");
  if (paymentDate <= dueDate) return 0;

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return rentAmount * lateFeeRate * daysLate;
}

export function getLeaseBalanceSummary(details: LeaseBalanceDetails): { balance: number; totalPaid: number } {
  const { totalLeaseAmount, paymentsMade } = details;
  if (totalLeaseAmount <= 0) throw new Error("Total lease amount must be greater than zero.");
  if (paymentsMade.some(payment => payment < 0)) throw new Error("Payments made must be non-negative.");

  const totalPaid = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  const balance = totalLeaseAmount - totalPaid;

  return { balance, totalPaid };
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;
  if (amount < 0) throw new Error("Amount must be non-negative.");
  
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}