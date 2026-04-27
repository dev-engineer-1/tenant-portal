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
  gracePeriodDays: number;
  lateFeeAmount: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < leaseDetails.leaseStartDate || moveInDate > leaseDetails.leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (leaseDetails.monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(paymentDetails: PaymentDetails, leaseDetails: LeaseDetails, lateFeePolicy: LateFeePolicy): number {
  const dueDate = new Date(leaseDetails.leaseStartDate);
  dueDate.setMonth(dueDate.getMonth() + 1);

  const gracePeriodEndDate = new Date(dueDate);
  gracePeriodEndDate.setDate(dueDate.getDate() + lateFeePolicy.gracePeriodDays);

  if (paymentDetails.paymentDate > gracePeriodEndDate) {
    return lateFeePolicy.lateFeeAmount;
  }
  
  return 0;
}

export function calculateLeaseBalance(leaseDetails: LeaseDetails, payments: PaymentDetails[]): number {
  const totalPaid = payments.reduce((total, payment) => total + payment.amountPaid, 0);
  const totalRent = leaseDetails.monthlyRent * (leaseDetails.leaseEndDate.getMonth() - leaseDetails.leaseStartDate.getMonth() + 1);
  
  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}