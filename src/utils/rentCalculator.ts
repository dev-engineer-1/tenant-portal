interface RentProrationInput {
  monthlyRent: number;
  daysInMonth: number;
  daysOccupied: number;
}

interface LateFeeCalculationInput {
  rentDueDate: Date;
  paymentDate: Date;
  dailyLateFee: number;
}

interface LeaseBalanceSummaryInput {
  monthlyRent: number;
  paymentsMade: number[];
  monthsElapsed: number;
}

interface CurrencyFormatInput {
  amount: number;
  currency: string;
}

export function calculateRentProration(input: RentProrationInput): number {
  const { monthlyRent, daysInMonth, daysOccupied } = input;

  if (monthlyRent <= 0 || daysInMonth <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent proration calculation.');
  }

  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(input: LateFeeCalculationInput): number {
  const { rentDueDate, paymentDate, dailyLateFee } = input;

  if (dailyLateFee < 0) {
    throw new Error('Daily late fee must be a non-negative number.');
  }

  const lateDays = Math.max(0, Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24)));

  return lateDays * dailyLateFee;
}

export function getLeaseBalanceSummary(input: LeaseBalanceSummaryInput): number {
  const { monthlyRent, paymentsMade, monthsElapsed } = input;

  if (monthlyRent <= 0 || monthsElapsed < 0 || paymentsMade.some(payment => payment < 0)) {
    throw new Error('Invalid input values for lease balance summary.');
  }

  const totalRentDue = monthlyRent * monthsElapsed;
  const totalPaymentsMade = paymentsMade.reduce((sum, payment) => sum + payment, 0);

  return totalRentDue - totalPaymentsMade;
}

export function formatCurrency(input: CurrencyFormatInput): string {
  const { amount, currency } = input;

  if (amount < 0) {
    throw new Error('Amount must be a non-negative number.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}