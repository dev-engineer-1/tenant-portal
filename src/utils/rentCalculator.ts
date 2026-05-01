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
  monthlyRent: number;
  daysLate: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRent <= 0 || proration.daysOccupied < 0) {
    throw new Error('Invalid proration details provided.');
  }
  return proration.dailyRent * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.monthlyRent <= 0 || details.daysLate < 0 || details.lateFeePercentage < 0) {
    throw new Error('Invalid late fee details provided.');
  }
  return (details.monthlyRent * (details.lateFeePercentage / 100)) * details.daysLate;
}

export function calculateLeaseBalance(summary: LeaseBalanceSummary): number {
  if (summary.totalRent < 0 || summary.paymentsMade < 0) {
    throw new Error('Invalid lease balance summary provided.');
  }
  return summary.totalRent - summary.paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}