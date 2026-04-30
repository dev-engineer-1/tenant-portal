interface RentProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentAmount: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummaryInput {
  totalRent: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;

  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration calculation.');
  }

  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentAmount, lateFeePercentage } = input;

  if (rentAmount <= 0 || lateFeePercentage < 0) {
    throw new Error('Invalid input values for late fee calculation.');
  }

  return rentAmount * (lateFeePercentage / 100);
}

export function generateLeaseBalanceSummary(input: LeaseBalanceSummaryInput): string {
  const { totalRent, paymentsMade } = input;

  if (totalRent <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalPayments = paymentsMade.reduce((sum, payment) => sum + payment, 0);
  const balance = totalRent - totalPayments;

  return `Total Rent: ${totalRent}, Total Payments: ${totalPayments}, Balance: ${balance}`;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input values for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}