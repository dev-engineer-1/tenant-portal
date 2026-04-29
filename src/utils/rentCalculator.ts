// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
  balanceDue: number;
}

function calculateProratedRent(details: ProrationDetails): number {
  const { startDate, endDate, monthlyRent } = details;
  if (endDate < startDate) {
    throw new Error("End date cannot be earlier than start date.");
  }

  const totalDaysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (monthlyRent / totalDaysInMonth) * proratedDays;
}

function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeePercentage } = details;
  if (paymentDate <= dueDate) {
    return 0;
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  return (lateFeePercentage / 100) * daysLate;
}

function summarizeLeaseBalance(totalRent: number, paymentsMade: number): LeaseBalanceSummary {
  if (paymentsMade > totalRent) {
    throw new Error("Payments made cannot exceed total rent.");
  }

  const balanceDue = totalRent - paymentsMade;
  return {
    totalRent,
    paymentsMade,
    balanceDue,
  };
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

export {
  LeaseDetails,
  ProrationDetails,
  LateFeeDetails,
  LeaseBalanceSummary,
  calculateProratedRent,
  calculateLateFee,
  summarizeLeaseBalance,
  formatCurrency,
};