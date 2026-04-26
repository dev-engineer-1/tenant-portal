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
  rentDueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  totalPaid: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRent <= 0 || proration.daysOccupied < 0) {
    throw new Error("Invalid proration details provided.");
  }
  return proration.dailyRent * proration.daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = details;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error("Late fee percentage must be between 0 and 100.");
  }
  if (paymentDate <= rentDueDate) {
    return 0;
  }
  const daysLate = Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24));
  return daysLate * (lateFeePercentage / 100);
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): number {
  const { totalRent, totalPaid } = summary;
  if (totalRent < 0 || totalPaid < 0) {
    throw new Error("Total rent and total paid must be non-negative.");
  }
  return totalRent - totalPaid;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount must be non-negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}