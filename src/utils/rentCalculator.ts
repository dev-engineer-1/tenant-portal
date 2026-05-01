interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface ProrationDetails {
  dailyRent: number;
  daysOccupied: number;
}

interface LateFeeDetails {
  rentDueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // as a percentage
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  const { monthlyRent } = leaseDetails;
  const { dailyRent, daysOccupied } = prorationDetails;

  if (monthlyRent <= 0 || dailyRent <= 0 || daysOccupied < 0) {
    throw new Error('Invalid input values for rent calculation.');
  }

  return dailyRent * daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  const { rentDueDate, paymentDate, lateFeeRate } = lateFeeDetails;

  if (lateFeeRate < 0 || lateFeeRate > 100) {
    throw new Error('Late fee rate must be between 0 and 100.');
  }

  const daysLate = Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLate <= 0) {
    return 0;
  }

  return (lateFeeRate / 100) * daysLate;
}

export function generateLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
  const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;

  if (monthlyRent <= 0 || leaseStartDate >= leaseEndDate) {
    throw new Error('Invalid lease details.');
  }

  const totalRentDue = monthlyRent * ((leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + leaseEndDate.getMonth() - leaseStartDate.getMonth());
  const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

  return {
    totalRentPaid,
    totalRentDue,
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}