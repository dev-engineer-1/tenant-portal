// src/utils/rentCalculator.ts

interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface RentProrationInput {
  leaseDetails: LeaseDetails;
  moveInDate: Date;
}

interface LateFeeCalculationInput {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummaryInput {
  leaseDetails: LeaseDetails;
  paymentsMade: number;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { leaseDetails, moveInDate } = input;
  
  if (moveInDate < leaseDetails.startDate || moveInDate > leaseDetails.endDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const dailyRent = leaseDetails.monthlyRent / daysInMonth;

  return parseFloat((dailyRent * daysOccupied).toFixed(2));
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage } = input;
  
  if (paymentDate <= dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = (monthlyRent * lateFeePercentage / 100) * lateDays;

  return parseFloat(lateFee.toFixed(2));
}

export function summarizeLeaseBalance(input: LeaseBalanceSummaryInput): number {
  const { leaseDetails, paymentsMade } = input;
  const totalLeaseAmount = leaseDetails.monthlyRent * ((leaseDetails.endDate.getFullYear() - leaseDetails.startDate.getFullYear()) * 12 + leaseDetails.endDate.getMonth() - leaseDetails.startDate.getMonth() + 1);
  
  if (paymentsMade < 0) {
    throw new Error('Payments made cannot be negative.');
  }

  const balance = totalLeaseAmount - paymentsMade;
  return parseFloat(balance.toFixed(2));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}