interface RentDetails {
  monthlyRent: number;
  startDate: Date;
  endDate: Date;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  dailyLateFee: number;
}

interface LeaseBalance {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(details: RentDetails): number {
  const { monthlyRent, startDate, endDate } = details;
  if (monthlyRent <= 0) throw new Error('Monthly rent must be greater than zero.');
  if (startDate >= endDate) throw new Error('Start date must be before end date.');

  const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();
  const rentedDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24) + 1;

  return (monthlyRent / daysInMonth) * rentedDays;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, dailyLateFee } = details;
  if (dailyLateFee < 0) throw new Error('Daily late fee cannot be negative.');
  if (paymentDate <= dueDate) return 0;

  const lateDays = Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
  return lateDays * dailyLateFee;
}

export function calculateLeaseBalance(details: LeaseBalance): number {
  const { totalRent, paymentsMade } = details;
  if (totalRent < 0 || paymentsMade < 0) throw new Error('Total rent and payments made must be non-negative.');
  if (paymentsMade > totalRent) throw new Error('Payments made cannot exceed total rent.');

  return totalRent - paymentsMade;
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) throw new Error('Amount cannot be negative.');
  if (!currency) throw new Error('Currency must be specified.');

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}