// src/utils/rentCalculator.ts

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
  baseFee: number;
  dailyFee: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
  outstandingBalance: number;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.leaseStartDate || moveInDate > lease.leaseEndDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const dailyRent = lease.monthlyRent / daysInMonth;
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return dailyRent * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (details.daysLate < 0) {
    throw new Error('Days late cannot be negative.');
  }

  return details.baseFee + (details.dailyFee * details.daysLate);
}

export function summarizeLeaseBalance(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const totalRentDue = calculateTotalRentDue(lease);
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);
  const outstandingBalance = totalRentDue - totalRentPaid;

  return {
    totalRentPaid,
    totalRentDue,
    outstandingBalance,
  };
}

function calculateTotalRentDue(lease: LeaseDetails): number {
  const months = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 +
                 (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth()) + 1;
  return lease.monthlyRent * months;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}