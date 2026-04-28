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

interface BalanceSummary {
  totalRentDue: number;
  totalPaid: number;
}

export function calculateProratedRent(prorationDetails: ProrationDetails): number {
  const { moveInDate, leaseDetails } = prorationDetails;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { daysLate, dailyLateFee } = lateFeeDetails;

  if (daysLate < 0) {
    throw new Error('Days late cannot be negative.');
  }

  return daysLate * dailyLateFee;
}

export function getLeaseBalanceSummary(balanceSummary: BalanceSummary): { balance: number; status: string } {
  const { totalRentDue, totalPaid } = balanceSummary;

  if (totalRentDue < 0 || totalPaid < 0) {
    throw new Error('Total rent due and total paid cannot be negative.');
  }

  const balance = totalRentDue - totalPaid;
  const status = balance > 0 ? 'Due' : 'Paid';

  return { balance, status };
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return `$${amount.toFixed(2)}`;
}