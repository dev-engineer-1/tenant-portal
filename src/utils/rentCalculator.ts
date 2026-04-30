interface RentProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeInput {
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
  currency: string;
  locale: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;
  
  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeInput): number {
  const { baseRent, lateFeePercentage, daysLate } = input;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  return baseRent * (lateFeePercentage / 100) * daysLate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalRent, paymentsMade } = input;

  if (totalRent <= 0 || !Array.isArray(paymentsMade) || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input for lease balance summary.');
  }

  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalRent - totalPayments;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currency, locale } = input;

  if (amount < 0 || !currency || !locale) {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}