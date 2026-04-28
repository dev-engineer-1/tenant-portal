interface LeaseDetails {
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
  currency: string;
}

interface ProrationDetails {
  moveInDate: Date;
  monthlyRent: number;
  currency: string;
}

interface LateFeeDetails {
  dueDate: Date;
  paymentDate: Date;
  monthlyRent: number;
  lateFeePercentage: number;
  currency: string;
}

interface LeaseBalanceSummary {
  totalRentDue: number;
  totalPaid: number;
  currency: string;
}

export function calculateProratedRent(details: ProrationDetails): number {
  const { moveInDate, monthlyRent, currency } = details;
  if (!(moveInDate instanceof Date) || isNaN(moveInDate.getTime())) {
    throw new Error('Invalid move-in date');
  }
  if (monthlyRent <= 0) {
    throw new Error('Monthly rent must be greater than zero');
  }

  const daysInMonth = new Date(moveInDate.getFullYear(), moveInDate.getMonth() + 1, 0).getDate();
  const proratedRent = ((daysInMonth - moveInDate.getDate() + 1) / daysInMonth) * monthlyRent;
  return formatCurrency(proratedRent, currency);
}

export function calculateLateFee(details: LateFeeDetails): number {
  const { dueDate, paymentDate, monthlyRent, lateFeePercentage, currency } = details;
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime()) || !(paymentDate instanceof Date) || isNaN(paymentDate.getTime())) {
    throw new Error('Invalid date');
  }
  if (monthlyRent <= 0 || lateFeePercentage < 0) {
    throw new Error('Monthly rent must be greater than zero and late fee percentage cannot be negative');
  }

  const lateDays = Math.max(0, Math.ceil((paymentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
  const lateFee = (lateDays > 0) ? (monthlyRent * (lateFeePercentage / 100)) : 0;
  return formatCurrency(lateFee, currency);
}

export function getLeaseBalanceSummary(summary: LeaseBalanceSummary): string {
  const { totalRentDue, totalPaid, currency } = summary;
  if (totalRentDue < 0 || totalPaid < 0) {
    throw new Error('Total rent due and total paid cannot be negative');
  }

  const balance = totalRentDue - totalPaid;
  return `Balance: ${formatCurrency(balance, currency)}`;
}

export function formatCurrency(amount: number, currency: string): number {
  if (amount < 0) {
    throw new Error('Amount cannot be negative');
  }
  if (!currency) {
    throw new Error('Currency must be specified');
  }

  return parseFloat(amount.toFixed(2)); // Assuming currency formatting to two decimal places
}