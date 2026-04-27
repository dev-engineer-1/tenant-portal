interface LeaseDetails {
  monthlyRent: number;
  leaseStartDate: Date;
  leaseEndDate: Date;
}

interface PaymentDetails {
  amountPaid: number;
  paymentDate: Date;
}

interface LateFeePolicy {
  feeAmount: number;
  gracePeriodDays: number;
}

export function calculateProratedRent(leaseDetails: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < leaseDetails.leaseStartDate || moveInDate > leaseDetails.leaseEndDate) {
    throw new Error("Move-in date must be within the lease period.");
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const proratedRent = (leaseDetails.monthlyRent / daysInMonth) * daysOccupied;

  return parseFloat(proratedRent.toFixed(2));
}

export function calculateLateFee(paymentDetails: PaymentDetails, dueDate: Date, lateFeePolicy: LateFeePolicy): number {
  const daysLate = Math.floor((paymentDetails.paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

  if (daysLate > lateFeePolicy.gracePeriodDays) {
    return lateFeePolicy.feeAmount;
  }

  return 0;
}

export function calculateLeaseBalance(leaseDetails: LeaseDetails, payments: PaymentDetails[]): number {
  const totalRent = leaseDetails.monthlyRent * ((leaseDetails.leaseEndDate.getFullYear() - leaseDetails.leaseStartDate.getFullYear()) * 12 + (leaseDetails.leaseEndDate.getMonth() - leaseDetails.leaseStartDate.getMonth()) + 1);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amountPaid, 0);

  return parseFloat((totalRent - totalPaid).toFixed(2));
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount < 0) {
    throw new Error("Amount cannot be negative.");
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}