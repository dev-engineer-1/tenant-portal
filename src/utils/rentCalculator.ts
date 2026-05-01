interface RentProrationInput {
  monthlyRent: number;
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
  amountPaid: number;
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
  const { rentDue, daysLate, dailyLateFeeRate } = input;
  if (rentDue <= 0 || daysLate < 0 || dailyLateFeeRate < 0) {
    throw new Error('Invalid input for late fee calculation.');
  }
  return rentDue * daysLate * dailyLateFeeRate;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): { balance: number; status: string } {
  const { totalLeaseAmount, amountPaid } = input;
  if (totalLeaseAmount < 0 || amountPaid < 0 || amountPaid > totalLeaseAmount) {
    throw new Error('Invalid input for lease balance summary.');
  }
  const balance = totalLeaseAmount - amountPaid;
  const status = balance === 0 ? 'Paid in Full' : 'Outstanding Balance';
  return { balance, status };
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currencyCode } = input;
  if (amount < 0 || !currencyCode) {
    throw new Error('Invalid input for currency formatting.');
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);
}