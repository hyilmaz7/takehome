import type { TaxInput } from '../types'
import { calculate } from './tax'

// Net pay rises monotonically with gross, so a binary search inverts the tax
// engine: find the gross salary whose take-home equals the target.
export function solveGrossForNet(targetNet: number, base: TaxInput): number {
  let lo = targetNet
  let hi = targetNet * 4 + 20000
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2
    const net = calculate({ ...base, grossAnnual: mid }).netAnnual
    if (net < targetNet) lo = mid
    else hi = mid
  }
  return Math.round((lo + hi) / 2)
}

// Target take-home amounts that get a dedicated landing page.
export const REVERSE_MONTHLY = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000]
export const REVERSE_ANNUAL = [50000, 75000, 100000]

export interface ParsedReverse {
  net: number // the target amount as entered
  period: 'month' | 'year'
  annualNet: number // target converted to annual
}

export function parseReverseSlug(slug: string): ParsedReverse | null {
  const m = slug.match(/^(\d+)-a-(month|year)$/)
  if (!m) return null
  const net = parseInt(m[1], 10)
  if (!Number.isFinite(net) || net < 100 || net > 5_000_000) return null
  const period = m[2] as 'month' | 'year'
  return { net, period, annualNet: period === 'month' ? net * 12 : net }
}

export function reverseSlug(amount: number, period: 'month' | 'year'): string {
  return `${amount}-a-${period}`
}
