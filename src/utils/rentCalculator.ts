interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  paymentDate: Date;
  dueDate: Date;
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
  const { paymentDate, dueDate, monthlyRent, lateFeePercentage } = details;
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error('Invalid payment date');
  }
  if (dueDate < 1 || dueDate > 31) {
    throw new Error('Invalid due date');
  }
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }
  if (lateFeePercentage < 0) {
    throw new Error('Late fee percentage must be non-negative');
  }

  const dueDateTime = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), dueDate).getTime();
  if (paymentDate.getTime() > dueDateTime) {
    return (monthlyRent * lateFeePercentage) / 100;
  }
  return 0;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue } = details;
  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error('Rent amounts must be non-negative');
  }

  const balance = totalRentDue - totalRentPaid;
  return balance > 0 ? `Balance due: ${formatCurrency(balance)}` : `Overpaid: ${formatCurrency(-balance)}`;
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount');
  }
  return `$${amount.toFixed(2)}`;
}