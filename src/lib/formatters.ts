import type { Country, PayPeriod } from '../types'

const PERIOD_DIVISORS: Record<PayPeriod, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annual: 1,
}

export function formatCurrency(amount: number, country: Country): string {
  const abs = Math.abs(Math.round(amount))
  const formatted = abs.toLocaleString('en-US')
  const sign = amount < 0 ? '-' : ''
  switch (country) {
    case 'us': return `${sign}$${formatted}`
    case 'uk': return `${sign}£${formatted}`
    case 'au': return `${sign}A$${formatted}`
    case 'ca': return `${sign}CA$${formatted}`
  }
}

const CURRENCY_SYMBOLS: Record<Country, string> = {
  us: '$',
  uk: '£',
  au: 'A$',
  ca: 'CA$',
}

/**
 * Format an hourly rate, preserving cents when present: 19.5 → "$19.50", 20 → "$20".
 * Unlike formatCurrency (which rounds to whole units), this keeps the half-dollar
 * rates people actually search for ("$19.50 an hour").
 */
export function formatHourlyRate(rate: number, country: Country = 'us'): string {
  const symbol = CURRENCY_SYMBOLS[country]
  const decimals = Number.isInteger(rate) ? 0 : 2
  return `${symbol}${rate.toFixed(decimals)}`
}

export function formatPeriod(annual: number, period: PayPeriod): number {
  return annual / PERIOD_DIVISORS[period]
}

export function formatPercent(rate: number, decimals = 1): string {
  return `${rate.toFixed(decimals)}%`
}

export function getPeriodLabel(period: PayPeriod): string {
  const labels: Record<PayPeriod, string> = {
    weekly: 'per week',
    biweekly: 'every 2 weeks',
    semimonthly: 'twice a month',
    monthly: 'per month',
    annual: 'per year',
  }
  return labels[period]
}

export function getPeriodShortLabel(period: PayPeriod): string {
  const labels: Record<PayPeriod, string> = {
    weekly: '/wk',
    biweekly: '/2wk',
    semimonthly: '/sm',
    monthly: '/mo',
    annual: '/yr',
  }
  return labels[period]
}
