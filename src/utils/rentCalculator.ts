// src/utils/rentCalculator.ts

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
    baseFee: number;
    dailyFee: number;
    daysLate: number;
}

interface LeaseBalanceSummary {
    totalRentPaid: number;
    totalRentDue: number;
}

function calculateDailyRent(monthlyRent: number): number {
    if (monthlyRent <= 0) {
        throw new Error("Monthly rent must be greater than zero.");
    }
    return monthlyRent / 30;
}

function calculateProratedRent(details: ProrationDetails): number {
    const { dailyRent, daysOccupied } = details;
    if (dailyRent <= 0 || daysOccupied < 0) {
        throw new Error("Invalid proration details provided.");
    }
    return dailyRent * daysOccupied;
}

function calculateLateFee(details: LateFeeDetails): number {
    const { baseFee, dailyFee, daysLate } = details;
    if (baseFee < 0 || dailyFee < 0 || daysLate < 0) {
        throw new Error("Invalid late fee details provided.");
    }
    return baseFee + (dailyFee * daysLate);
}

function calculateLeaseBalanceSummary(leaseDetails: LeaseDetails, payments: number[]): LeaseBalanceSummary {
    const { monthlyRent, leaseStartDate, leaseEndDate } = leaseDetails;
    if (monthlyRent <= 0 || leaseStartDate >= leaseEndDate) {
        throw new Error("Invalid lease details provided.");
    }

    const totalMonths = (leaseEndDate.getFullYear() - leaseStartDate.getFullYear()) * 12 + (leaseEndDate.getMonth() - leaseStartDate.getMonth());
    const totalRentDue = monthlyRent * totalMonths;
    const totalRentPaid = payments.reduce((acc, payment) => acc + payment, 0);

    return {
        totalRentPaid,
        totalRentDue
    };
}

function formatCurrency(amount: number, currency: string = 'USD'): string {
    if (amount < 0) {
        throw new Error("Amount cannot be negative.");
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export {
    LeaseDetails,
    ProrationDetails,
    LateFeeDetails,
    LeaseBalanceSummary,
    calculateDailyRent,
    calculateProratedRent,
    calculateLateFee,
    calculateLeaseBalanceSummary,
    formatCurrency
};