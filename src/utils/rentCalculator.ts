// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface PaymentDetails {
  paymentDate: Date;
  amountPaid: number;
}

interface LateFeePolicy {
  dailyLateFee: number;
  gracePeriodDays: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  const { monthlyRent, leaseStartDate } = leaseDetails;

  if (moveInDate < leaseStartDate) {
    throw new Error("Move-in date cannot be before lease start date.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(paymentDetails: PaymentDetails, leaseDetails: LeaseDetails, lateFeePolicy: LateFeePolicy): number {
  const { paymentDate } = paymentDetails;
  const { leaseStartDate } = leaseDetails;
  const { dailyLateFee, gracePeriodDays } = lateFeePolicy;

  const dueDate = new Date(leaseStartDate);
  dueDate.setMonth(dueDate.getMonth() + 1);
  dueDate.setDate(1);

  const gracePeriodEndDate = new Date(dueDate);
  gracePeriodEndDate.setDate(gracePeriodEndDate.getDate() + gracePeriodDays);

  if (paymentDate <= gracePeriodEndDate) {
    return 0;
  }

  const lateDays = Math.floor((paymentDate.getTime() - gracePeriodEndDate.getTime()) / (1000 * 60 * 60 * 24));
  return lateDays * dailyLateFee;
}

export function calculateLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: PaymentDetails[]): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  const totalLeaseMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRent = totalLeaseMonths * monthlyRent;

  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;

  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}