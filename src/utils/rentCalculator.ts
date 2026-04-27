// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface PaymentDetails {
  dueDate: Date;
  paymentDate: Date;
  amountPaid: number;
}

interface LateFeePolicy {
  gracePeriodDays: number;
  lateFeePercentage: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.startDate || moveInDate > lease.endDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const dailyRent = lease.monthlyRent / daysInMonth;

  return dailyRent * daysOccupied;
}

export function calculateLateFee(payment: PaymentDetails, policy: LateFeePolicy): number {
  const daysLate = Math.max(0, Math.floor((payment.paymentDate.getTime() - payment.dueDate.getTime()) / (1000 * 60 * 60 * 24)) - policy.gracePeriodDays);

  if (daysLate > 0) {
    return payment.amountPaid * (policy.lateFeePercentage / 100);
  }

  return 0;
}

export function calculateLeaseBalanceSummary(lease: LeaseDetails, payments: PaymentDetails[]): number {
  const totalRent = lease.monthlyRent * ((lease.endDate.getFullYear() - lease.startDate.getFullYear()) * 12 + lease.endDate.getMonth() - lease.startDate.getMonth() + 1);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}