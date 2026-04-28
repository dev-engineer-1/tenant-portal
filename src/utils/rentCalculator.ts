interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentDueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;
  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration calculation.');
  }
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = input;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error('Late fee percentage must be between 0 and 100.');
  }
  const daysLate = (paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 3600 * 24);
  if (daysLate <= 0) {
    return 0;
  }
  return (lateFeePercentage / 100) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalLeaseAmount, paymentsMade } = input;
  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalLeaseAmount - totalPayments;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}