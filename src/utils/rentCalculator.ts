interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month
}

interface ProrationDetails {
  leaseDetails: LeaseDetails;
  moveInDate: Date;
}

interface LateFeeDetails {
  leaseDetails: LeaseDetails;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  leaseDetails: LeaseDetails;
  paymentsMade: number[];
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { leaseDetails, moveInDate } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (moveInDate < leaseStartDate || moveInDate > leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { leaseDetails, paymentDate, lateFeePercentage } = details;
  const { monthlyRent, paymentDueDate } = leaseDetails;

  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error('Late fee percentage must be between 0 and 100.');
  }

  const dueDate = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDueDate);
  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  return (monthlyRent * (lateFeePercentage / 100)) * lateDays;
}

export function summarizeLeaseBalance(details: LeaseBalanceSummary): number {
  const { leaseDetails, paymentsMade } = details;
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  const totalLeaseMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth()) + 1;
  const totalRent = monthlyRent * totalLeaseMonths;
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);

  return totalRent - totalPayments;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}