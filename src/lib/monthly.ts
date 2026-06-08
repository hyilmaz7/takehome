import { calculate } from './tax'
import { DEFAULT_INPUTS } from './constants'

// ─── Monthly-pay landing pages ───────────────────────────────────────────────
// One /monthly/{amount} page per common monthly *gross* wage. Built to capture
// the "$7,000 a month is how much a year (after taxes)" long tail seen in Search
// Console (those queries rank position 6-12 via the /reverse pages, which answer
// the opposite question). Annual-sized figures ("35000 monthly") are intentionally
// left to /salary pages, which already show the monthly breakdown.

export const MONTHLY_AMOUNTS = [
  1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
  6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 11000, 12000, 15000, 20000,
]

// Curated subset for index/"popular" chips, so we don't dump every amount.
export const POPULAR_MONTHLY_AMOUNTS = [2000, 3000, 4000, 5000, 6000, 7000, 8000, 10000, 15000]

export function monthlySlug(amount: number): string {
  return String(amount)
}

/** Parse a /monthly/[amount] slug. Returns the monthly gross, or null (→ 404). */
export function parseMonthlySlug(slug: string): number | null {
  if (!/^\d+$/.test(slug)) return null
  const amount = parseInt(slug, 10)
  if (!Number.isFinite(amount) || amount < 100 || amount > 1_000_000) return null
  return amount
}

/** US national (no state income tax) breakdown for a monthly gross amount. */
export function breakdownForMonthly(monthly: number) {
  return calculate({ ...DEFAULT_INPUTS.us, state: '', grossAnnual: monthly * 12 })
}
