interface RentDetails {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  baseRent: number;
  lateFeePercentage: number;
  daysLate: number;
}

interface LeaseBalanceDetails {
  totalLeaseAmount: number;
  amountPaid: number;
}

interface CurrencyFormatOptions {
  locale: string;
  currency: string;
}

export function calculateProratedRent(details: RentDetails): number {
  const { monthlyRent, daysInMonth, daysOccupied } = details;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error("Invalid input for prorated rent calculation.");
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { baseRent, lateFeePercentage, daysLate } = details;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error("Invalid input for late fee calculation.");
  }

  return (baseRent * (lateFeePercentage / 100)) * daysLate;
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { totalLeaseAmount, amountPaid } = details;

  if (totalLeaseAmount < 0 || amountPaid < 0) {
    throw new Error("Invalid input for lease balance calculation.");
  }

  return totalLeaseAmount - amountPaid;
}

export function formatCurrency(amount: number, options: CurrencyFormatOptions): string {
  const { locale, currency } = options;

  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}