interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentAmount: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceSummaryInput {
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormattingInput {
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
  const { rentAmount, lateFeePercentage, daysLate } = input;
  if (rentAmount <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }
  return rentAmount * (lateFeePercentage / 100) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { totalPaid: number; balanceRemaining: number } {
  const { totalLeaseAmount, paymentsMade } = input;
  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }
  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const balanceRemaining = totalLeaseAmount - totalPaid;
  return { totalPaid, balanceRemaining };
}

export function formatCurrency(input: CurrencyFormattingInput): string {
  const { amount, currencyCode } = input;
  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}