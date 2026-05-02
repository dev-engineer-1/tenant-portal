interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month
}

interface ProrationDetails {
  moveInDate: Date;
  leaseDetails: LeaseDetails;
}

interface LateFeeDetails {
  daysLate: number;
  dailyLateFee: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, leaseDetails } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { daysLate, dailyLateFee } = details;

  if (daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }

  return daysLate * dailyLateFee;
}

export function generateLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  const { totalRentPaid, totalRentDue } = summary;

  if (totalRentPaid < 0 || totalRentDue < 0) {
    throw new Error("Rent values cannot be negative.");
  }

  const balance = totalRentDue - totalRentPaid;
  return balance > 0 ? `Balance due: ${formatCurrency(balance)}` : `Overpaid: ${formatCurrency(-balance)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return `$${amount.toFixed(2)}`;
}