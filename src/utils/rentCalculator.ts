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
  totalLeaseAmount: number;
  paymentsMade: number[];
}

interface CurrencyFormatInput {
  amount: number;
  currencyCode: string;
}

export function calculateProratedRent(input: RentProrationInput): number {
  const { totalRent, daysInMonth, daysOccupied } = input;

  if (totalRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error("Invalid input values for rent proration.");
  }

  return (totalRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { baseRent, lateFeePercentage, daysLate } = input;

  if (baseRent <= 0 || lateFeePercentage < 0 || daysLate < 0) {
    throw new Error("Invalid input values for late fee calculation.");
  }

  return (baseRent * (lateFeePercentage / 100)) * daysLate;
}

export function generateLeaseBalanceSummary(input: LeaseBalanceSummaryInput): string {
  const { totalLeaseAmount, paymentsMade } = input;

  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error("Invalid input values for lease balance summary.");
  }

  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const balance = totalLeaseAmount - totalPaid;

  return `Total Lease Amount: ${totalLeaseAmount}, Total Paid: ${totalPaid}, Balance: ${balance}`;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;

  if (amount < 0 || !currencyCode) {
    throw new Error("Invalid input values for currency formatting.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}