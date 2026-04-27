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
  baseFee: number;
  dailyFee: number;
  daysLate: number;
}

interface BalanceSummary {
  totalRent: number;
  totalPaid: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRate <= 0 || proration.daysOccupied < 0) {
    throw new Error('Invalid proration details provided.');
  }
  return proration.dailyRate * proration.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.baseFee < 0 || lateFeeDetails.dailyFee < 0 || lateFeeDetails.daysLate < 0) {
    throw new Error('Invalid late fee details provided.');
  }
  return lateFeeDetails.baseFee + (lateFeeDetails.dailyFee * lateFeeDetails.daysLate);
}

export function calculateLeaseBalanceSummary(balanceSummary: BalanceSummary): number {
  if (balanceSummary.totalRent < 0 || balanceSummary.totalPaid < 0) {
    throw new Error('Invalid balance summary details provided.');
  }
  return balanceSummary.totalRent - balanceSummary.totalPaid;
}

export function formatCurrency(amount: number, currencySymbol: string = '$'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return `${currencySymbol}${amount.toFixed(2)}`;
}