interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
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

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(dueDate: Date, paymentDate: Date, lateFeePolicy: LateFeePolicy): number {
  const { flatFee, dailyFee, gracePeriodDays } = lateFeePolicy;
  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)) - gracePeriodDays);

  if (daysLate <= 0) {
    return 0;
  }

  return flatFee + (dailyFee * daysLate);
}

export function calculateLeaseBalanceSummary(leaseDetails: LeaseDetails, paymentsMade: number[]): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
  const totalLeaseMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth()) + 1;
  const totalRent = monthlyRent * totalLeaseMonths;
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);

  return totalRent - totalPayments;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}