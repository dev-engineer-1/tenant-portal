// src/utils/rentCalculator.ts

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

interface LeaseBalanceDetails {
  monthlyRent: number;
  paymentsMade: number[];
  totalMonths: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent } = details;
  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  
  if (daysOccupied <= 0 || monthlyRent <= 0) {
    throw new Error('Invalid move-in date or monthly rent.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = details;
  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);

  if (daysLate <= 0 || monthlyRent <= 0 || lateFeePercentage <= 0) {
    throw new Error('Invalid payment date, monthly rent, or late fee percentage.');
  }

  return (monthlyRent * (lateFeePercentage / 100));
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { monthlyRent, paymentsMade, totalMonths } = details;
  const totalRent = monthlyRent * totalMonths;
  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);

  if (totalMonths <= 0 || monthlyRent <= 0) {
    throw new Error('Invalid total months or monthly rent.');
  }

  return totalRent - totalPaid;
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