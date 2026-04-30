interface RentProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  baseRent: number;
  lateFeePercentage: number;
  daysLate: number;
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
  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error("Invalid input for rent proration calculation.");
  }
  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { baseRent, lateFeePercentage, daysLate } = input;
  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error("Invalid input for late fee calculation.");
  }
  return baseRent * (lateFeePercentage / 100) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalRent, paymentsMade } = input;
  if (totalRent < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error("Invalid input for lease balance summary.");
  }
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalRent - totalPayments;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;
  if (amount < 0 || !currencyCode) {
    throw new Error("Invalid input for currency formatting.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}