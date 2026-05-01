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
  lateFeeRate: number; // percentage
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRent <= 0 || proration.daysOccupied < 0) {
    throw new Error('Invalid proration details');
  }

  const totalDaysInMonth = new Date(lease.leaseStartDate.getFullYear(), lease.leaseStartDate.getMonth() + 1, 0).getDate();
  const proratedRent = proration.dailyRent * proration.daysOccupied;

  if (proratedRent > lease.monthlyRent) {
    throw new Error('Prorated rent cannot exceed monthly rent');
  }

  return proratedRent;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = lateFeeDetails;

  if (lateFeeRate < 0 || lateFeeRate > 100) {
    throw new Error('Invalid late fee rate');
  }

  const daysLate = Math.floor((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLate <= 0) {
    return 0;
  }

  return (lateFeeRate / 100) * daysLate;
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  if (summary.totalRentPaid < 0 || summary.totalRentDue < 0) {
    throw new Error('Invalid lease balance summary');
  }

  const balance = summary.totalRentDue - summary.totalRentPaid;
  return balance >= 0 ? `Balance due: $${balance.toFixed(2)}` : `Overpaid by: $${Math.abs(balance).toFixed(2)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }

  return `$${amount.toFixed(2)}`;
}