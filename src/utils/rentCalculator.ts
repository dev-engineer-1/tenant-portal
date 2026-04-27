interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent } = details;
  if (!(moveInDate instanceof Date) || isNaN(moveInDate.getTime())) {
    throw new Error('Invalid move-in date');
  }
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error('Invalid due date');
  }
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error('Invalid payment date');
  }
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }
  if (lateFeePercentage < 0) {
    throw new Error('Late fee percentage cannot be negative');
  }

  const daysLate = Math.max(0, Math.floor((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  return daysLate > 0 ? (monthlyRent * (lateFeePercentage / 100)) : 0;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue } = details;
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Total rent paid and total rent due must be non-negative');
  }

  const balance = totalRentDue - totalRentPaid;
  return balance > 0 ? `Balance due: ${formatCurrency(balance)}` : `Overpaid: ${formatCurrency(-balance)}`;
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) {
    throw new Error('Invalid amount');
  }
  return `$${amount.toFixed(2)}`;
}