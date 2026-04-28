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

interface LateFeePolicy {
  dailyLateFee: number;
  gracePeriodDays: number;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.startDate || moveInDate > lease.endDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const proratedRent = (lease.monthlyRent / daysInMonth) * daysOccupied;

  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(payment: PaymentDetails, lateFeePolicy: LateFeePolicy): number {
  const gracePeriodEndDate = new Date(payment.dueDate);
  gracePeriodEndDate.setDate(gracePeriodEndDate.getDate() + lateFeePolicy.gracePeriodDays);

  if (payment.paymentDate <= gracePeriodEndDate) {
    return 0;
  }

  const lateDays = Math.ceil((payment.paymentDate.getTime() - gracePeriodEndDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = lateDays * lateFeePolicy.dailyLateFee;

  return parseFloat(lateFee.toFixed(2));
}

export function calculateLeaseBalance(lease: LeaseDetails, payments: PaymentDetails[]): number {
  const totalRent = lease.monthlyRent * ((lease.endDate.getFullYear() - lease.startDate.getFullYear()) * 12 + (lease.endDate.getMonth() - lease.startDate.getMonth() + 1));
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

  if (totalPaid > totalRent) {
    throw new Error('Total payments exceed total rent.');
  }

  const balance = totalRent - totalPaid;
  return parseFloat(balance.toFixed(2));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}