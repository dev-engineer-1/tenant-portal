interface RentProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentAmount: number;
  lateFeePercentage: number;
  daysLate: number;
  gracePeriod: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currency: string;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;
  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration.');
  }
  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentAmount, lateFeePercentage, daysLate, gracePeriod } = input;
  if (rentAmount <= 0 || lateFeePercentage < 0 || daysLate < 0 || gracePeriod < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }
  if (daysLate <= gracePeriod) {
    return 0;
  }
  return rentAmount * (lateFeePercentage / 100);
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { remainingBalance: number, totalPaid: number } {
  const { totalLeaseAmount, paymentsMade } = input;
  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }
  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const remainingBalance = totalLeaseAmount - totalPaid;
  return { remainingBalance, totalPaid };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currency } = input;
  if (amount < 0 || !currency) {
    throw new Error('Invalid input values for currency formatting.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}