// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface PaymentDetails {
  paymentDate: Date;
  dueDate: Date;
  amountPaid: number;
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
  const dailyRent = lease.monthlyRent / daysInMonth;
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return dailyRent * daysOccupied;
}

export function calculateLateFee(payment: PaymentDetails, lateFeeRate: number): number {
  if (payment.paymentDate <= payment.dueDate) {
    return 0;
  }

  const daysLate = Math.ceil((payment.paymentDate.getTime() - payment.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysLate * lateFeeRate;
}

export function getLeaseBalanceSummary(lease: LeaseDetails, payments: PaymentDetails[]): number {
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