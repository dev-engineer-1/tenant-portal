// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  daysLate: number;
  dailyLateFee: number;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
}

function calculateProratedRent(details: ProrationDetails): number {
  const { startDate, endDate, monthlyRent } = details;
  if (startDate >= endDate) {
    throw new Error('Start date must be before end date.');
  }

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysOccupied < 0) {
    throw new Error('End date must be after start date.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

function calculateLateFee(details: LateFeeDetails): number {
  const { daysLate, dailyLateFee } = details;
  if (daysLate < 0) {
    throw new Error('Days late cannot be negative.');
  }
  if (dailyLateFee < 0) {
    throw new Error('Daily late fee cannot be negative.');
  }

  return daysLate * dailyLateFee;
}

function getLeaseBalanceSummary(details: LeaseBalanceSummary): string {
  const { totalRentDue, totalPaid } = details;
  if (totalRentDue < 0 || totalPaid < 0) {
    throw new Error('Total rent due and total paid cannot be negative.');
  }

  const balance = totalRentDue - totalPaid;
  return balance > 0 ? `Balance Due: ${formatCurrency(balance)}` : `Overpaid: ${formatCurrency(-balance)}`;
}

function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return `$${amount.toFixed(2)}`;
}

export {
  LeaseDetails,
  ProrationDetails,
  LateFeeDetails,
  LeaseBalanceSummary,
  calculateProratedRent,
  calculateLateFee,
  getLeaseBalanceSummary,
  formatCurrency
};