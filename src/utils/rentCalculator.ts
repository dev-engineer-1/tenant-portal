// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  dailyRent?: number;
}

interface PaymentDetails {
  amountPaid: number;
  paymentDate: Date;
}

interface LateFeePolicy {
  flatFee: number;
  dailyFee: number;
  gracePeriodDays: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.startDate || moveInDate > lease.endDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const dailyRent = lease.dailyRent ?? lease.monthlyRent / daysInMonth;

  return dailyRent * daysOccupied;
}

export function calculateLateFee(payment: PaymentDetails, dueDate: Date, policy: LateFeePolicy): number {
  if (payment.paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = Math.max(0, Math.floor((payment.paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) - policy.gracePeriodDays);
  return policy.flatFee + (daysLate * policy.dailyFee);
}

export function calculateLeaseBalanceSummary(lease: LeaseDetails, payments: PaymentDetails[]): number {
  const totalRent = lease.monthlyRent * ((lease.endDate.getFullYear() - lease.startDate.getFullYear()) * 12 + lease.endDate.getMonth() - lease.startDate.getMonth() + 1);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}