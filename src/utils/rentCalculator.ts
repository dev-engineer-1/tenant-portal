interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  baseRent: number;
  lateFeePercentage: number;
  daysLate: number;
  maxLateFee: number;
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
  const { baseRent, lateFeePercentage, daysLate, maxLateFee } = input;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0 || maxLateFee < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  const lateFee = (baseRent * lateFeePercentage * daysLate) / 100;
  return Math.min(lateFee, maxLateFee);
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number; totalPaid: number } {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalPaid = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  const balance = totalLeaseAmount - totalPaid;

  return { balance, totalPaid };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}