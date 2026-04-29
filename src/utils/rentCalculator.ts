interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface PaymentDetails {
  paymentDate: Date;
  dueDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.leaseStartDate || moveInDate > lease.leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const dailyRent = lease.monthlyRent / daysInMonth;

  return parseFloat((dailyRent * daysOccupied).toFixed(2));
}

export function calculateLateFee(payment: PaymentDetails): number {
  if (payment.paymentDate <= payment.dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((payment.paymentDate.getTime() - payment.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = (payment.monthlyRent * payment.lateFeePercentage) / 100;

  return parseFloat((lateFee * lateDays).toFixed(2));
}

export function summarizeLeaseBalance(lease: LeaseDetails, paymentsMade: number): number {
  const leaseDurationMonths = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 
    + lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth();
  const totalLeaseAmount = lease.monthlyRent * leaseDurationMonths;

  if (paymentsMade > totalLeaseAmount) {
    throw new Error("Payments made cannot exceed the total lease amount.");
  }

  return parseFloat((totalLeaseAmount - paymentsMade).toFixed(2));
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}