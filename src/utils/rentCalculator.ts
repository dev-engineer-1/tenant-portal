interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRent: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.daysOccupied < 0) {
    throw new Error("Days occupied cannot be negative.");
  }
  if (lease.monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  const proratedRent = proration.dailyRent * proration.daysOccupied;
  return proratedRent;
}

export function calculateLateFee(details: LateFeeDetails, rentAmount: number): number {
  if (rentAmount <= 0) {
    throw new Error("Rent amount must be greater than zero.");
  }
  if (details.lateFeePercentage < 0 || details.lateFeePercentage > 100) {
    throw new Error("Late fee percentage must be between 0 and 100.");
  }
  const daysLate = Math.max(0, Math.ceil((details.paymentDate.getTime() - details.dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = (rentAmount * (details.lateFeePercentage / 100)) * daysLate;
  return lateFee;
}

export function calculateLeaseBalanceSummary(lease: LeaseDetails, paymentsMade: number): number {
  if (paymentsMade < 0) {
    throw new Error("Payments made cannot be negative.");
  }
  const totalLeaseDurationInMonths = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 + (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth());
  const totalRent = lease.monthlyRent * totalLeaseDurationInMonths;
  const balance = totalRent - paymentsMade;
  return balance;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat(options.locale, { style: 'currency', currency: options.currency }).format(amount);
}