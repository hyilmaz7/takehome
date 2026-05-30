import type { Country, TaxInput, TaxBreakdown } from '../types'
import { US_STATES, DEFAULT_INPUTS } from './constants'
import { formatCurrency, formatPercent } from './formatters'

// ─── Data sets driving generateStaticParams ─────────────────────────────────
// These power the programmatic SEO landing pages (one URL per salary/region).

export const US_SALARY_AMOUNTS = [
  30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  175000, 200000, 250000, 300000,
]

// Top 10 US states by search demand (codes match US_STATE_RATES).
export const TOP_US_STATES = ['CA', 'TX', 'NY', 'FL', 'WA', 'IL', 'PA', 'GA', 'NC', 'MA']

export const UK_SALARY_AMOUNTS = [25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 100000]

export const AU_SALARY_AMOUNTS = [60000, 70000, 80000, 90000, 100000, 120000, 150000]

export const HOURLY_RATES = [15, 18, 20, 22, 25, 28, 30, 35, 40, 45, 50, 60, 75, 100, 125, 150, 200]

const COUNTRY_CODES: Country[] = ['us', 'uk', 'au', 'ca']

// ─── Slug helpers ────────────────────────────────────────────────────────────

/** "North Carolina" → "north-carolina" */
export function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export function stateCodeToSlug(code: string): string {
  const s = US_STATES.find((x) => x.code === code)
  return s ? stateNameToSlug(s.name) : code.toLowerCase()
}

export interface ParsedSalary {
  amount: number
  country: Country
  /** US state code (e.g. 'CA'), when the slug targets a specific state. */
  stateCode?: string
  /** Human region name e.g. 'California'. */
  regionName?: string
}

/**
 * Parse a /salary/[amount] slug.
 *   "85000"             → { amount, country: 'us' }                (national)
 *   "85000-california"  → { amount, country: 'us', stateCode, regionName }
 *   "50000-uk"          → { amount, country: 'uk' }
 * Returns null for anything we don't recognise (→ 404).
 */
export function parseSalarySlug(slug: string): ParsedSalary | null {
  const match = slug.match(/^(\d+)(?:-(.+))?$/)
  if (!match) return null

  const amount = parseInt(match[1], 10)
  if (!Number.isFinite(amount) || amount < 1000 || amount > 10_000_000) return null

  const suffix = match[2]?.toLowerCase()
  if (!suffix) return { amount, country: 'us' }

  // 2-letter country codes take precedence (state slugs use full names).
  if ((COUNTRY_CODES as string[]).includes(suffix)) {
    return { amount, country: suffix as Country }
  }

  // Otherwise try to resolve a US state by its full-name slug.
  const state = US_STATES.find((s) => stateNameToSlug(s.name) === suffix)
  if (state) return { amount, country: 'us', stateCode: state.code, regionName: state.name }

  return null
}

/** Build the TaxInput for a parsed salary page. */
export function inputForSalary(parsed: ParsedSalary): TaxInput {
  const base: TaxInput = { ...DEFAULT_INPUTS[parsed.country], grossAnnual: parsed.amount }
  if (parsed.country === 'us') {
    // '' = no state income tax (national page); otherwise the chosen state.
    base.state = parsed.stateCode ?? ''
  }
  return base
}

// ─── Labels ──────────────────────────────────────────────────────────────────

const TAX_YEAR: Record<Country, string> = {
  us: '2026',
  uk: '2026/27',
  au: '2025/26',
  ca: '2026',
}

export function taxYearLabel(country: Country): string {
  return TAX_YEAR[country]
}

/** "California" / "the US" / "the UK" / "Australia" / "Canada" */
export function regionLabel(parsed: ParsedSalary): string {
  if (parsed.regionName) return parsed.regionName
  switch (parsed.country) {
    case 'us': return 'the US'
    case 'uk': return 'the UK'
    case 'au': return 'Australia'
    case 'ca': return 'Canada'
  }
}

/** The page H1 / title subject, e.g. "$85,000 Salary After Tax in California (2026)". */
export function salaryHeadline(parsed: ParsedSalary): string {
  const amount = formatCurrency(parsed.amount, parsed.country)
  return `${amount} Salary After Tax in ${regionLabel(parsed)} (${taxYearLabel(parsed.country)})`
}

// ─── Featured-snippet answer paragraph ───────────────────────────────────────
// Uses the real calculated figures — this specificity is the whole SEO play.

export function salaryAnswer(parsed: ParsedSalary, b: TaxBreakdown): string {
  const c = parsed.country
  const money = (n: number) => formatCurrency(Math.round(n), c)
  const gross = money(b.grossAnnual)
  const netMonthly = money(b.netAnnual / 12)
  const eff = formatPercent(b.effectiveTaxRate)
  const region = regionLabel(parsed)

  if (c === 'us') {
    const fica = b.socialSecurity + b.medicare
    if (parsed.stateCode && b.stateTax > 0.5) {
      return `A ${gross} annual salary in ${region} results in a monthly take-home pay of ${netMonthly} after deducting ${money(b.federalTax)} in federal income tax, ${money(b.stateTax)} in ${region} state tax, and ${money(fica)} in FICA taxes. Your effective tax rate is ${eff}.`
    }
    const noTaxNote = parsed.regionName ? ` ${region} charges no state income tax.` : ''
    return `A ${gross} annual salary in ${region} results in a monthly take-home pay of ${netMonthly} after deducting ${money(b.federalTax)} in federal income tax and ${money(fica)} in FICA taxes (Social Security and Medicare).${noTaxNote} Your effective tax rate is ${eff}.`
  }

  if (c === 'uk') {
    return `A ${gross} annual salary in the UK gives you a monthly take-home pay of ${netMonthly} after deducting ${money(b.federalTax)} in income tax and ${money(b.stateTax)} in National Insurance. Your effective tax rate is ${eff}.`
  }

  if (c === 'au') {
    const mls = b.medicare > 0.5 ? ` and ${money(b.medicare)} Medicare Levy Surcharge` : ''
    return `A ${gross} annual salary in Australia gives you a monthly take-home pay of ${netMonthly} after deducting ${money(b.federalTax)} in income tax, ${money(b.stateTax)} Medicare Levy${mls}. Your effective tax rate is ${eff}.`
  }

  // ca
  const cppEi = b.socialSecurity + b.medicare
  return `A ${gross} annual salary in Canada gives you a monthly take-home pay of ${netMonthly} after deducting ${money(b.federalTax)} in federal tax, ${money(b.stateTax)} in provincial tax, and ${money(cppEi)} in CPP and EI contributions. Your effective tax rate is ${eff}.`
}

// ─── Meta description (kept concise for SERP display) ────────────────────────

export function salaryMetaDescription(parsed: ParsedSalary, b: TaxBreakdown): string {
  const c = parsed.country
  const money = (n: number) => formatCurrency(Math.round(n), c)
  const gross = money(b.grossAnnual)
  const netMonthly = money(b.netAnnual / 12)
  const region = regionLabel(parsed)

  if (c === 'us') {
    const fica = b.socialSecurity + b.medicare
    if (parsed.stateCode && b.stateTax > 0.5) {
      return `Take-home pay on a ${gross} salary in ${region}: ${netMonthly}/month after federal tax (${money(b.federalTax)}), ${region} state tax (${money(b.stateTax)}) and FICA (${money(fica)}). See the full breakdown.`
    }
    return `Take-home pay on a ${gross} salary in ${region}: ${netMonthly}/month after federal income tax (${money(b.federalTax)}) and FICA (${money(fica)}). See the full breakdown.`
  }
  if (c === 'uk') {
    return `Take-home pay on a ${gross} salary in the UK: ${netMonthly}/month after income tax (${money(b.federalTax)}) and National Insurance (${money(b.stateTax)}). Full 2026/27 breakdown.`
  }
  if (c === 'au') {
    return `Take-home pay on a ${gross} salary in Australia: ${netMonthly}/month after income tax (${money(b.federalTax)}) and the Medicare Levy (${money(b.stateTax)}). Full 2025/26 breakdown.`
  }
  return `Take-home pay on a ${gross} salary in Canada: ${netMonthly}/month after federal and provincial tax plus CPP and EI. Full 2026 breakdown.`
}
