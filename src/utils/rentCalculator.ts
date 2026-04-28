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
  baseFee: number;
  dailyLateFee: number;
  daysLate: number;
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
  balance: number;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (!(lease.monthlyRent > 0)) {
    throw new Error("Monthly rent must be greater than zero.");
  }
  if (moveInDate < lease.leaseStartDate || moveInDate > lease.leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const dailyRate = lease.monthlyRent / daysInMonth;
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;

  return dailyRate * daysOccupied;
}

export function calculateLateFee(details: LateFeeDetails): number {
  if (!(details.baseFee >= 0) || !(details.dailyLateFee >= 0) || !(details.daysLate >= 0)) {
    throw new Error("All fee details must be non-negative numbers.");
  }

  return details.baseFee + (details.dailyLateFee * details.daysLate);
}

export function generateLeaseBalanceSummary(totalRentPaid: number, lease: LeaseDetails): LeaseBalanceSummary {
  if (!(totalRentPaid >= 0)) {
    throw new Error("Total rent paid must be a non-negative number.");
  }

  const totalMonths = (lease.leaseEndDate.getFullYear() - lease.leaseStartDate.getFullYear()) * 12 +
                      (lease.leaseEndDate.getMonth() - lease.leaseStartDate.getMonth()) + 1;
  const totalRentDue = lease.monthlyRent * totalMonths;
  const balance = totalRentPaid - totalRentDue;

  return {
    totalRentPaid,
    totalRentDue,
    balance
  };
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (!(amount >= 0)) {
    throw new Error("Amount must be a non-negative number.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}