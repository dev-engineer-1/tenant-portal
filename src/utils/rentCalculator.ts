interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  paymentDueDate: number; // Day of the month
}

interface ProrationDetails {
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  daysLate: number;
  dailyLateFee: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  const { monthlyRent } = lease;
  const { startDate, endDate } = proration;

  if (startDate > endDate) {
    throw new Error("Start date must be before end date.");
  }

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const proratedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;

  return (monthlyRent / daysInMonth) * proratedDays;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { daysLate, dailyLateFee } = lateFeeDetails;

  if (daysLate < 0) {
    throw new Error("Days late cannot be negative.");
  }

  return daysLate * dailyLateFee;
}

export function getLeaseBalanceSummary(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = calculateTotalRentDue(lease);
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  return {
    totalRentPaid,
    totalRentDue
  };
}

function calculateTotalRentDue(lease: LeaseDetails): number {
  const { monthlyRent, leaseStartDate, leaseEndDate } = lease;
  const months = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());

  return monthlyRent * months;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}