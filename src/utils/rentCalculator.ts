// src/utils/rentCalculator.ts

export interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
  daysInMonth: number;
}

export interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number;
}

export interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

export function calculateProratedRent(details: RentDetails): number {
  const { monthlyRent, startDate, endDate, daysInMonth } = details;

  if (monthlyRent <= 0 || daysInMonth <= 0) {
    throw new Error('Monthly rent and days in month must be greater than zero.');
  }

  const daysOccupied = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  if (daysOccupied <= 0) {
    throw new Error('End date must be after start date.');
  }

  const proratedRent = (monthlyRent / daysInMonth) * daysOccupied;
  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, lateFeeRate } = details;

  if (lateFeeRate < 0) {
    throw new Error('Late fee rate must be non-negative.');
  }

  const daysLate = (paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysLate <= 0) {
    return 0;
  }

  const lateFee = lateFeeRate * Math.ceil(daysLate);
  return parseFloat(lateFee.toFixed(2));
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { totalLeaseAmount, paymentsMade } = details;

  if (totalLeaseAmount < 0) {
    throw new Error('Total lease amount must be non-negative.');
  }

  const totalPayments = paymentsMade.reduce((acc, payment) => {
    if (payment < 0) {
      throw new Error('Payments must be non-negative.');
    }
    return acc + payment;
  }, 0);

  const balance = totalLeaseAmount - totalPayments;
  return parseFloat(balance.toFixed(2));
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number.');
  }

  return `$${amount.toFixed(2)}`;
}