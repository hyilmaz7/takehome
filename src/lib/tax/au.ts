import type { TaxInput, TaxBreakdown, TaxItem } from '../../types'

// ─── Chart colors ──────────────────────────────────────────────────────────
const C = {
  takeHome: '#22C55E',
  incomeTax: '#EF4444',
  medicareLevy: '#A78BFA',
  mls: '#F59E0B',
  employerSuper: '#14B8A6',
} as const

// ─── Income tax brackets 2025/26 ──────────────────────────────────────────
// [upper_income_limit, marginal_rate]
const AU_BRACKETS: [number, number][] = [
  [18200, 0],
  [45000, 0.19],
  [120000, 0.325],
  [180000, 0.37],
  [Infinity, 0.45],
]

// ─── Helpers ───────────────────────────────────────────────────────────────
function progressiveTax(income: number, brackets: [number, number][]): number {
  if (income <= 0) return 0
  let tax = 0
  let prev = 0
  for (const [limit, rate] of brackets) {
    if (income <= prev) break
    tax += (Math.min(income, limit) - prev) * rate
    prev = limit
  }
  return tax
}

function getMarginalRate(income: number, brackets: [number, number][]): number {
  for (const [limit, rate] of brackets) {
    if (income <= limit) return rate
  }
  return brackets[brackets.length - 1][1]
}

// Low Income Tax Offset 2025/26
function calculateLITO(income: number): number {
  if (income <= 37500) return 700
  if (income <= 45000) return Math.max(0, 700 - (income - 37500) * 0.05)
  if (income <= 66667) return Math.max(0, 325 - (income - 45000) * 0.015)
  return 0
}

// Medicare Levy — 2% with phase-in for low incomes
function calculateMedicareLevy(income: number, exempt: boolean): number {
  if (exempt) return 0
  const THRESHOLD = 26000   // approx 2025/26 lower threshold
  const SHADE_END = 32500   // where full 2% applies
  if (income <= THRESHOLD) return 0
  if (income <= SHADE_END) return (income - THRESHOLD) * 0.10  // phase-in at 10¢/$
  return income * 0.02
}

// Medicare Levy Surcharge — if income > $93k and no private hospital cover
function calculateMLS(
  income: number,
  hasPrivateHealth: boolean | undefined,
  exempt: boolean,
): number {
  if (exempt || hasPrivateHealth) return 0
  if (income <= 93000) return 0
  if (income <= 108000) return income * 0.010
  if (income <= 144000) return income * 0.0125
  return income * 0.015
}

function item(
  label: string,
  amount: number,
  gross: number,
  color: string,
  isDeduction = true,
): TaxItem {
  return { label, amount, percent: gross > 0 ? (amount / gross) * 100 : 0, color, isDeduction }
}

// ─── Main calculation ──────────────────────────────────────────────────────
export function calculateAU(input: TaxInput): TaxBreakdown {
  const {
    grossAnnual,
    medicareExempt = false,
    hasPrivateHealth = false,
    superPercent = 11.5,
  } = input

  const gross = Math.max(0, grossAnnual)

  // Income tax (before LITO)
  const rawTax = progressiveTax(gross, AU_BRACKETS)

  // LITO — non-refundable offset
  const lito = calculateLITO(gross)
  const netIncomeTax = Math.max(0, rawTax - lito)

  // Medicare levy
  const medicareLevy = calculateMedicareLevy(gross, medicareExempt)

  // Medicare Levy Surcharge
  const mls = calculateMLS(gross, hasPrivateHealth, medicareExempt)

  // Employer super — informational only; paid ON TOP of gross, not deducted
  const employerSuper = gross * (superPercent / 100)

  // Net take-home
  const netAnnual = gross - netIncomeTax - medicareLevy - mls

  const totalTax = netIncomeTax + medicareLevy + mls
  const effectiveTaxRate = gross > 0 ? (totalTax / gross) * 100 : 0

  // Marginal rate — statutory bracket + Medicare + MLS where applicable
  const marginalBracket = getMarginalRate(gross, AU_BRACKETS)
  const marginalMedicare = !medicareExempt && gross > 32500 ? 0.02 : 0
  const marginalMLS =
    !medicareExempt && !hasPrivateHealth && gross > 93000
      ? gross > 144000 ? 0.015 : gross > 108000 ? 0.0125 : 0.01
      : 0
  const marginalTaxRate = (marginalBracket + marginalMedicare + marginalMLS) * 100

  // Items
  const items: TaxItem[] = []
  items.push(item('Income Tax', netIncomeTax, gross, C.incomeTax))
  if (medicareLevy > 0.5) {
    items.push(item('Medicare Levy', medicareLevy, gross, C.medicareLevy))
  }
  if (mls > 0.5) {
    items.push(item('Medicare Levy Surcharge', mls, gross, C.mls))
  }
  // Employer super shown as an informational item (not a deduction from take-home)
  if (employerSuper > 0.5) {
    items.push(
      item(`Employer Super (${superPercent}%)`, employerSuper, gross, C.employerSuper, false),
    )
  }
  items.push(item('Take-Home Pay', netAnnual, gross, C.takeHome, false))

  return {
    grossAnnual: gross,
    federalTax: netIncomeTax,
    stateTax: medicareLevy,
    socialSecurity: 0,
    medicare: mls,
    k401: 0,
    otherDeductions: 0,
    netAnnual,
    effectiveTaxRate,
    marginalTaxRate,
    items,
  }
}
