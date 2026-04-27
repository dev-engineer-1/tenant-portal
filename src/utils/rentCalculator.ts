// src/utils/rentCalculator.ts

interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeeRate: number; // as a percentage, e.g., 5 for 5%
}

interface LeaseBalanceDetails {
  monthlyRent: number;
  paymentsMade: number[];
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent } = details;
  if (!(moveInDate instanceof Date) || isNaN(moveInDate.getTime())) {
    throw new Error("Invalid move-in date.");
  }
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const proratedRent = (monthlyRent / daysInMonth) * (daysInMonth - moveInDate.getDate() + 1);
  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeeRate } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    throw new Error("Invalid due date.");
  }
  if (!(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error("Invalid payment date.");
  }
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  if (lateFeeRate < 0) {
    throw new Error("Late fee rate must be non-negative.");
  }

  const daysLate = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = (daysLate > 0) ? (monthlyRent * (lateFeeRate / 100)) : 0;
  return parseFloat(lateFee.toFixed(2));
}

export function calculateLeaseBalance(details: LeaseBalanceDetails): number {
  const { monthlyRent, paymentsMade } = details;
  if (monthlyRent <= 0) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  if (!Array.isArray(paymentsMade) || paymentsMade.some(payment => payment < 0)) {
    throw new Error("Payments made must be a non-negative number array.");
  }

  const totalPaid = paymentsMade.reduce((acc, payment) => acc + payment, 0);
  const balance = monthlyRent - totalPaid;
  return parseFloat(balance.toFixed(2));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error("Invalid amount.");
  }
  if (typeof currency !== 'string' || currency.length !== 3) {
    throw new Error("Invalid currency code.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}