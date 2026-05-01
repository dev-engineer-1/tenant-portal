interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
  daysInMonth: number;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeeRate: number; // percentage as a decimal
}

interface LeaseBalanceSummary {
  totalRentPaid: number;
  totalRentDue: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < leaseDetails.leaseStartDate || moveInDate > leaseDetails.leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInLeaseMonth = leaseDetails.daysInMonth;
  const daysOccupied = daysInLeaseMonth - moveInDate.getDate() + 1;
  const dailyRent = leaseDetails.monthlyRent / daysInLeaseMonth;
  return parseFloat((dailyRent * daysOccupied).toFixed(2));
}

export function calculateLateFee(lateFeeDetails: LateFeeDetails): number {
  if (lateFeeDetails.paymentDate <= lateFeeDetails.dueDate) {
    return 0;
  }

  const daysLate = (lateFeeDetails.paymentDate.getTime() - lateFeeDetails.dueDate.getTime()) / (1000 * 60 * 60 * 24);
  const lateFee = lateFeeDetails.lateFeeRate * daysLate;
  return parseFloat(lateFee.toFixed(2));
}

export function generateLeaseBalanceSummary(leaseBalance: LeaseBalanceSummary): string {
  const balance = leaseBalance.totalRentDue - leaseBalance.totalRentPaid;
  return `Total Rent Paid: ${formatCurrency(leaseBalance.totalRentPaid)}, Total Rent Due: ${formatCurrency(leaseBalance.totalRentDue)}, Balance: ${formatCurrency(balance)}`;
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }
  return `$${amount.toFixed(2)}`;
}