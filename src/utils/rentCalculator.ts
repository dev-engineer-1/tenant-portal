interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
}

interface PaymentDetails {
  dueDate: Date;
  paymentDate: Date;
  lateFeePercentage: number;
}

interface LeaseBalance {
  totalRentDue: number;
  totalPaid: number;
}

export function calculateProratedRent(lease: LeaseDetails, moveInDate: Date): number {
  if (moveInDate < lease.startDate || moveInDate > lease.endDate) {
    throw new Error('Move-in date must be within the lease period.');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const daysOccupied = daysInMonth - moveInDate.getDate() + 1;
  const dailyRent = lease.monthlyRent / daysInMonth;

  return parseFloat((dailyRent * daysOccupied).toFixed(2));
}

export function calculateLateFee(payment: PaymentDetails): number {
  if (payment.paymentDate <= payment.dueDate) {
    return 0;
  }

  const lateDays = Math.ceil((payment.paymentDate.getTime() - payment.dueDate.getTime()) / (1000 * 60 * 60 * 24));
  const lateFee = (payment.lateFeePercentage / 100) * lateDays;

  return parseFloat(lateFee.toFixed(2));
}

export function summarizeLeaseBalance(balance: LeaseBalance): string {
  if (balance.totalPaid > balance.totalRentDue) {
    throw new Error('Total paid cannot exceed total rent due.');
  }

  const remainingBalance = balance.totalRentDue - balance.totalPaid;
  return formatCurrency(remainingBalance);
}

export function formatCurrency(amount: number): string {
  if (amount < 0) {
    throw new Error('Amount cannot be negative.');
  }

  return `$${amount.toFixed(2)}`;
}