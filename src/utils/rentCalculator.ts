interface RentProrationInput {
  totalRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentDue: number;
  daysLate: number;
  dailyLateFeeRate: number;
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
  const { rentDue, daysLate, dailyLateFeeRate } = input;
  if (rentDue <= 0 || daysLate < 0 || dailyLateFeeRate < 0) {
    throw new Error("Invalid input values for late fee calculation.");
  }
  return rentDue * daysLate * dailyLateFeeRate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { totalLeaseAmount, paymentsMade } = input;
  if (totalLeaseAmount <= 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error("Invalid input values for lease balance summary.");
  }
  const totalPayments = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  return totalLeaseAmount - totalPayments;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;
  if (amount < 0 || !currencyCode) {
    throw new Error("Invalid input values for currency formatting.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}