interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  monthlyRent: number;
  moveInDate: Date;
}

interface LateFeeDetails {
  monthlyRent: number;
  daysLate: number;
  dailyLateFeeRate: number;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  paymentsMade: number;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { monthlyRent, moveInDate } = details;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (!(moveInDate instanceof Date)) throw new Error("Invalid move-in date.");

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  return (monthlyRent / daysInMonth) * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { monthlyRent, daysLate, dailyLateFeeRate } = details;
  if (monthlyRent <= 0) throw new Error("Monthly rent must be greater than zero.");
  if (daysLate < 0) throw new Error("Days late cannot be negative.");
  if (dailyLateFeeRate < 0) throw new Error("Daily late fee rate cannot be negative.");

  return daysLate * dailyLateFeeRate * monthlyRent;
}

export function getLeaseBalanceSummary(details: LeaseBalanceSummary): number {
  const { totalRentDue, paymentsMade } = details;
  if (totalRentDue < 0) throw new Error("Total rent due cannot be negative.");
  if (paymentsMade < 0) throw new Error("Payments made cannot be negative.");

  return totalRentDue - paymentsMade;
}

export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number') throw new Error("Amount must be a number.");
  return `$${amount.toFixed(2)}`;
}