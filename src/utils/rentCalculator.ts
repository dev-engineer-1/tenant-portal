interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRate: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  baseLateFee: number;
  dailyLateFee: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
  balance: number;
}

export function calculateProratedRent(lease: LeaseDetails, proration: ProrationDetails): number {
  if (proration.dailyRate <= 0 || proration.daysOccupied < 0) {
    throw new Error("Invalid proration details provided.");
  }
  return proration.dailyRate * proration.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.baseLateFee < 0 || lateFeeDetails.dailyLateFee < 0 || lateFeeDetails.daysLate < 0) {
    throw new Error("Invalid late fee details provided.");
  }
  return lateFeeDetails.baseLateFee + (lateFeeDetails.dailyLateFee * lateFeeDetails.daysLate);
}

export function generateLeaseBalanceSummary(lease: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  if (lease.monthlyRent <= 0 || payments.some(payment => payment < 0)) {
    throw new Error("Invalid lease or payment details provided.");
  }
  const totalRentDue = lease.monthlyRent * getMonthsBetween(lease.leaseStartDate, lease.leaseEndDate);
  const totalPaid = payments.reduce((acc, payment) => acc + payment, 0);
  const balance = totalRentDue - totalPaid;

  return {
    totalRentDue,
    totalPaid,
    balance
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function getMonthsBetween(startDate: Date, endDate: Date): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months -= start.getMonth();
  months += end.getMonth();
  return months <= 0 ? 0 : months;
}