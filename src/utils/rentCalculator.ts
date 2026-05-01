interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  monthlyRent: number;
  lateFeePercentage: number;
}

interface LeaseBalanceSummaryInput {
  monthlyRent: number;
  monthsRemaining: number;
  paidToDate: number;
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0 || daysOccupied > daysInMonth) {
    throw new Error('Invalid input for rent proration calculation.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { monthlyRent, lateFeePercentage } = input;

  if (monthlyRent <= 0 || lateFeePercentage < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }

  return (monthlyRent * lateFeePercentage) / 100;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { monthlyRent, monthsRemaining, paidToDate } = input;

  if (monthlyRent < 0 || monthsRemaining < 0 || paidToDate < 0) {
    throw new Error('Invalid input for lease balance summary.');
  }

  const totalLeaseAmount = monthlyRent * monthsRemaining;
  return totalLeaseAmount - paidToDate;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input for currency formatting.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}