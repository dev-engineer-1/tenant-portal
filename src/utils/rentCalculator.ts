interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface LateFeePolicy {
  dailyLateFee: number;
  gracePeriodDays: number;
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

export function calculateLateFee(dueDate: Date, paymentDate: Date, policy: LateFeePolicy): number {
  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) - policy.gracePeriodDays);

  if (daysLate <= 0) {
    return 0;
  }

  return daysLate * policy.dailyLateFee;
}

export function summarizeLeaseBalance(lease: LeaseDetails, paymentsMade: number[]): number {
  const totalRent = lease.monthlyRent * ((lease.endDate.getFullYear() - lease.startDate.getFullYear()) * 12 + lease.endDate.getMonth() - lease.startDate.getMonth() + 1);
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);

  return totalRent - totalPayments;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error('Amount must be non-negative.');
  }

  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}