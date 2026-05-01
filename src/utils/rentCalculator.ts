interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRate: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.daysOccupied < 0) {
    throw new Error('Days occupied cannot be negative.');
  }
  if (lease.monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero.');
  }
  const proratedRent = proration.dailyRate * proration.daysOccupied;
  return proratedRent;
}

export function calculateDailyRate(monthlyRent: number): number {
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero.');
  }
  const dailyRate = monthlyRent / 30; // Assuming a 30-day month for simplicity
  return dailyRate;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.paymentDate <= details.dueDate) {
    return 0;
  }
  if (details.lateFeeRate < 0) {
    throw new Error('Late fee rate cannot be negative.');
  }
  const daysLate = Math.ceil((details.paymentDate.getTime() - details.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = daysLate * details.lateFeeRate;
  return lateFee;
}

export function summarizeLeaseBalance(summary: LeaseBalanceSummary): number {
  if (summary.totalRentPaid < 0 || summary.totalRentDue < 0) {
    throw new Error('Rent values cannot be negative.');
  }
  const balance = summary.totalRentDue - summary.totalRentPaid;
  return balance;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}