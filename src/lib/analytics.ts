import type { Country, PayPeriod } from '../types'

// ─── GA4 event tracking ──────────────────────────────────────────────────────
// Thin, typed wrapper around gtag. The gtag function itself is injected by
// <GoogleAnalytics> (@next/third-parties) in the root layout. All calls are
// no-ops when GA is not loaded (e.g. local dev without NEXT_PUBLIC_GA_ID).

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      targetOrName: string,
      params?: Record<string, unknown>,
    ) => void
  }
}

export type SalaryRange =
  | 'under_30k'
  | '30k_50k'
  | '50k_75k'
  | '75k_100k'
  | '100k_150k'
  | '150k_250k'
  | 'over_250k'

/** Bucket a raw salary so we don't send high-cardinality values to GA. */
export function bucketSalary(amount: number): SalaryRange {
  if (amount < 30000) return 'under_30k'
  if (amount < 50000) return '30k_50k'
  if (amount < 75000) return '50k_75k'
  if (amount < 100000) return '75k_100k'
  if (amount < 150000) return '100k_150k'
  if (amount < 250000) return '150k_250k'
  return 'over_250k'
}

// Discriminated union of every event we emit, so callers get full type-checking.
type AnalyticsEvent =
  | { name: 'calculator_used'; params: { country: Country; salary_range: SalaryRange; has_state: boolean } }
  | { name: 'result_copied'; params: { country: Country; period: PayPeriod } }
  | { name: 'country_switched'; params: { from: Country; to: Country } }
  | { name: 'period_changed'; params: { period: PayPeriod } }

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  try {
    window.gtag('event', event.name, event.params)
  } catch {
    // Never let analytics break the UI.
  }
}
