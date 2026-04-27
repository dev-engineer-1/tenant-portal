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
  rentDueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalanceSummary {
  totalRent: number;
  paymentsMade: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, prorationDetails: ProrationDetails): number {
  if (prorationDetails.dailyRate <= 0 || prorationDetails.daysOccupied < 0) {
    throw new Error("Invalid proration details provided.");
  }
  return prorationDetails.dailyRate * prorationDetails.daysOccupied;
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails, monthlyRent: number): number {
  const { rentDueDate, paymentDate, lateFeePercentage } = lateFeeDetails;
  if (lateFeePercentage < 0 || lateFeePercentage > 100) {
    throw new Error("Invalid late fee percentage.");
  }
  if (paymentDate <= rentDueDate) {
    return 0;
  }
  const lateDays = Math.ceil((paymentDate.getTime() - rentDueDate.getTime()) / (1000 * 60 * 60 * 24));
  return (monthlyRent * (lateFeePercentage / 100)) * lateDays;
}

export function getLeaseBalanceSummary(leaseDetails: LeaseDetails, paymentsMade: number): LeaseBalanceSummary {
  if (paymentsMade < 0) {
    throw new Error("Payments made cannot be negative.");
  }
  const totalMonths = Math.ceil((leaseDetails.leaseEndDate.getTime() - leaseDetails.leaseStartDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  const totalRent = leaseDetails.monthlyRent * totalMonths;
  return {
    totalRent,
    paymentsMade
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}