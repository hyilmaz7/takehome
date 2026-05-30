import type { TaxInput, TaxBreakdown, TaxItem, StateRate } from '../../types'

// ─── Chart colors ──────────────────────────────────────────────────────────
const C = {
  takeHome: '#22C55E',
  federalTax: '#EF4444',
  stateTax: '#F97316',
  socialSecurity: '#8B5CF6',
  medicare: '#A78BFA',
  retirement: '#14B8A6',
  other: '#F59E0B',
} as const

// ─── Federal income tax brackets 2026 ─────────────────────────────────────
// Format: [upper_limit, rate]
const US_FEDERAL_BRACKETS = {
  single: [
    [11600, 0.10], [47150, 0.12], [100525, 0.22],
    [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37],
  ] as [number, number][],
  married_joint: [
    [23200, 0.10], [94300, 0.12], [201050, 0.22],
    [383900, 0.24], [487450, 0.32], [731200, 0.35], [Infinity, 0.37],
  ] as [number, number][],
  married_separate: [
    [11600, 0.10], [47150, 0.12], [100525, 0.22],
    [191950, 0.24], [243725, 0.32], [609350, 0.35], [Infinity, 0.37],
  ] as [number, number][],
  head_of_household: [
    [16550, 0.10], [63100, 0.12], [100500, 0.22],
    [191950, 0.24], [243700, 0.32], [609350, 0.35], [Infinity, 0.37],
  ] as [number, number][],
}

// ─── Standard deductions 2026 ──────────────────────────────────────────────
const STANDARD_DEDUCTION = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
}

// ─── FICA constants 2026 ───────────────────────────────────────────────────
const SS_WAGE_BASE = 168600
const SS_RATE = 0.062
const MEDICARE_RATE = 0.0145
const ADDITIONAL_MEDICARE_RATE = 0.009
const ADDITIONAL_MEDICARE_THRESHOLD = {
  single: 200000,
  married_joint: 250000,
  married_separate: 125000,
  head_of_household: 200000,
}

// ─── 401(k) contribution limit 2026 ───────────────────────────────────────
const K401_LIMIT = 23500

// ─── State income tax rates 2026 ──────────────────────────────────────────
export const US_STATE_RATES: Record<string, StateRate> = {
  // ── No income tax ────────────────────────────────────────────────────────
  AK: { name: 'Alaska', rate: 0 },
  FL: { name: 'Florida', rate: 0 },
  NV: { name: 'Nevada', rate: 0 },
  NH: { name: 'New Hampshire', rate: 0 },
  SD: { name: 'South Dakota', rate: 0 },
  TN: { name: 'Tennessee', rate: 0 },
  TX: { name: 'Texas', rate: 0 },
  WA: { name: 'Washington', rate: 0 },
  WY: { name: 'Wyoming', rate: 0 },

  // ── Flat-rate states ─────────────────────────────────────────────────────
  AZ: { name: 'Arizona', rate: 0.025 },
  CO: { name: 'Colorado', rate: 0.044 },
  GA: { name: 'Georgia', rate: 0.0549 },
  ID: { name: 'Idaho', rate: 0.058 },
  IL: { name: 'Illinois', rate: 0.0495 },
  IN: { name: 'Indiana', rate: 0.0305 },
  KY: { name: 'Kentucky', rate: 0.04 },
  LA: { name: 'Louisiana', rate: 0.03 },
  MA: { name: 'Massachusetts', rate: 0.05 },
  MI: { name: 'Michigan', rate: 0.0425 },
  MS: { name: 'Mississippi', rate: 0.047 },
  MT: { name: 'Montana', rate: 0.059 },
  NC: { name: 'North Carolina', rate: 0.045 },
  PA: { name: 'Pennsylvania', rate: 0.0307 },
  SC: { name: 'South Carolina', rate: 0.063 },
  UT: { name: 'Utah', rate: 0.0455 },

  // ── Full graduated brackets ───────────────────────────────────────────────
  CA: {
    name: 'California', rate: 0,
    brackets: [
      [10099, 0.01], [23942, 0.02], [37788, 0.04], [52455, 0.06],
      [66295, 0.08], [338639, 0.093], [406364, 0.103], [677275, 0.113], [Infinity, 0.123],
    ],
  },
  NY: {
    name: 'New York', rate: 0,
    brackets: [
      [17150, 0.04], [23600, 0.045], [27900, 0.0525], [161550, 0.0585],
      [323200, 0.0625], [2155350, 0.0685], [5000000, 0.0965],
      [25000000, 0.103], [Infinity, 0.109],
    ],
  },
  NJ: {
    name: 'New Jersey', rate: 0,
    brackets: [
      [20000, 0.014], [35000, 0.0175], [40000, 0.035], [75000, 0.05525],
      [500000, 0.0637], [1000000, 0.0897], [Infinity, 0.1075],
    ],
  },
  OR: {
    name: 'Oregon', rate: 0,
    brackets: [
      [18400, 0.0475], [46200, 0.0675], [250000, 0.0875], [Infinity, 0.099],
    ],
  },
  MN: {
    name: 'Minnesota', rate: 0,
    brackets: [
      [31690, 0.0535], [104090, 0.068], [193240, 0.0785], [Infinity, 0.0985],
    ],
  },
  CT: {
    name: 'Connecticut', rate: 0,
    brackets: [
      [10000, 0.03], [50000, 0.05], [100000, 0.055], [200000, 0.06],
      [250000, 0.065], [500000, 0.069], [Infinity, 0.0699],
    ],
  },
  ME: {
    name: 'Maine', rate: 0,
    brackets: [[26050, 0.058], [61600, 0.0675], [Infinity, 0.0715]],
  },
  VT: {
    name: 'Vermont', rate: 0,
    brackets: [
      [45400, 0.0335], [110650, 0.066], [229550, 0.076], [Infinity, 0.0875],
    ],
  },
  HI: {
    name: 'Hawaii', rate: 0,
    brackets: [
      [2400, 0.014], [4800, 0.032], [9600, 0.055], [14400, 0.064],
      [19200, 0.068], [24000, 0.072], [36000, 0.076], [48000, 0.079],
      [150000, 0.0825], [175000, 0.09], [200000, 0.10], [Infinity, 0.11],
    ],
  },
  WI: {
    name: 'Wisconsin', rate: 0,
    brackets: [
      [14320, 0.035], [28640, 0.044], [315310, 0.053], [Infinity, 0.0765],
    ],
  },
  DC: {
    name: 'District of Columbia', rate: 0,
    brackets: [
      [10000, 0.04], [40000, 0.06], [60000, 0.065], [250000, 0.085],
      [500000, 0.0925], [1000000, 0.0975], [Infinity, 0.1075],
    ],
  },

  // ── Simplified graduated states ───────────────────────────────────────────
  AL: {
    name: 'Alabama', rate: 0,
    brackets: [[500, 0.02], [3000, 0.04], [Infinity, 0.05]],
  },
  AR: { name: 'Arkansas', rate: 0.039 },
  DE: {
    name: 'Delaware', rate: 0,
    brackets: [
      [2000, 0], [5000, 0.022], [10000, 0.039],
      [20000, 0.048], [25000, 0.052], [60000, 0.0555], [Infinity, 0.066],
    ],
  },
  IA: { name: 'Iowa', rate: 0.057 },
  KS: {
    name: 'Kansas', rate: 0,
    brackets: [[15000, 0.031], [30000, 0.0525], [Infinity, 0.057]],
  },
  MD: {
    name: 'Maryland', rate: 0,
    // State rate only; county/local tax (avg ~3%) is additional
    brackets: [
      [1000, 0.02], [2000, 0.03], [3000, 0.04],
      [100000, 0.0475], [125000, 0.05], [150000, 0.0525],
      [250000, 0.055], [Infinity, 0.0575],
    ],
  },
  MO: { name: 'Missouri', rate: 0.047 },
  ND: { name: 'North Dakota', rate: 0.0141 },
  NE: {
    name: 'Nebraska', rate: 0,
    brackets: [
      [3700, 0.0246], [22170, 0.0351], [35730, 0.0501], [Infinity, 0.0584],
    ],
  },
  NM: {
    name: 'New Mexico', rate: 0,
    brackets: [
      [5500, 0.017], [11000, 0.032], [16000, 0.047],
      [210000, 0.049], [Infinity, 0.059],
    ],
  },
  OH: {
    name: 'Ohio', rate: 0,
    brackets: [
      [25000, 0], [44250, 0.02765], [88450, 0.03226],
      [110650, 0.03688], [Infinity, 0.0399],
    ],
  },
  OK: {
    name: 'Oklahoma', rate: 0,
    brackets: [
      [1000, 0.0025], [2500, 0.0075], [3750, 0.0175],
      [4900, 0.0275], [7200, 0.0375], [Infinity, 0.0475],
    ],
  },
  RI: {
    name: 'Rhode Island', rate: 0,
    brackets: [[77450, 0.0375], [176050, 0.0475], [Infinity, 0.0599]],
  },
  VA: {
    name: 'Virginia', rate: 0,
    brackets: [
      [3000, 0.02], [5000, 0.03], [17000, 0.05], [Infinity, 0.0575],
    ],
  },
  WV: {
    name: 'West Virginia', rate: 0,
    brackets: [
      [10000, 0.0236], [25000, 0.032], [40000, 0.0432],
      [60000, 0.0512], [Infinity, 0.065],
    ],
  },
}

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
export function calculateUS(input: TaxInput): TaxBreakdown {
  const {
    grossAnnual,
    filingStatus = 'single',
    state = '',
    k401Percent = 0,
    preTaxHealthcare = 0,
    hsaContribution = 0,
  } = input

  const gross = Math.max(0, grossAnnual)

  // Pre-tax deductions
  // Traditional 401k reduces income tax but NOT SS/Medicare wages
  // Section 125 healthcare & HSA payroll deductions reduce SS/Medicare wages
  const k401 = Math.min(gross * (k401Percent / 100), K401_LIMIT)
  const totalPreTax = k401 + preTaxHealthcare + hsaContribution

  // Federal AGI (before standard deduction)
  const agi = Math.max(0, gross - totalPreTax)

  // Federal taxable income
  const stdDed = STANDARD_DEDUCTION[filingStatus]
  const federalTaxable = Math.max(0, agi - stdDed)

  // Federal income tax
  const federalBrackets = US_FEDERAL_BRACKETS[filingStatus]
  const federalTax = progressiveTax(federalTaxable, federalBrackets)
  const marginalFederal = getMarginalRate(federalTaxable, federalBrackets)

  // Social Security — applies to gross wages (401k does not reduce SS wages)
  // Healthcare & HSA payroll deductions do reduce SS wages
  const ssWages = Math.max(0, gross - preTaxHealthcare - hsaContribution)
  const ssTaxable = Math.min(ssWages, SS_WAGE_BASE)
  const socialSecurity = ssTaxable * SS_RATE

  // Medicare
  const medicareBase = ssWages
  const medicare = medicareBase * MEDICARE_RATE
  const additionalMedicareThreshold = ADDITIONAL_MEDICARE_THRESHOLD[filingStatus]
  const additionalMedicare =
    Math.max(0, medicareBase - additionalMedicareThreshold) * ADDITIONAL_MEDICARE_RATE
  const totalMedicare = medicare + additionalMedicare

  // State income tax — base is AGI (federal AGI before standard deduction)
  const stateInfo = US_STATE_RATES[state.toUpperCase()]
  let stateTax = 0
  let marginalState = 0
  if (stateInfo) {
    if (stateInfo.brackets) {
      stateTax = progressiveTax(agi, stateInfo.brackets)
      marginalState = getMarginalRate(agi, stateInfo.brackets)
    } else {
      stateTax = agi * stateInfo.rate
      marginalState = stateInfo.rate
    }
  }

  // Totals
  const totalTax = federalTax + stateTax + socialSecurity + totalMedicare
  const netAnnual = gross - totalTax - k401 - preTaxHealthcare - hsaContribution

  const effectiveTaxRate = gross > 0 ? (totalTax / gross) * 100 : 0
  const marginalTaxRate = (marginalFederal + marginalState) * 100

  // Build items (deductions first, then take-home)
  const items: TaxItem[] = []

  items.push(item('Federal Income Tax', federalTax, gross, C.federalTax))
  if (stateTax > 0.5) {
    const stateName = stateInfo?.name ?? state
    items.push(item(`${stateName} State Tax`, stateTax, gross, C.stateTax))
  }
  items.push(item('Social Security', socialSecurity, gross, C.socialSecurity))
  items.push(item('Medicare', totalMedicare, gross, C.medicare))
  if (k401 > 0.5) {
    items.push(item('401(k) Contribution', k401, gross, C.retirement))
  }
  if (preTaxHealthcare > 0.5) {
    items.push(item('Health Insurance', preTaxHealthcare, gross, C.other))
  }
  if (hsaContribution > 0.5) {
    items.push(item('HSA Contribution', hsaContribution, gross, C.other))
  }
  items.push(item('Take-Home Pay', netAnnual, gross, C.takeHome, false))

  return {
    grossAnnual: gross,
    federalTax,
    stateTax,
    socialSecurity,
    medicare: totalMedicare,
    k401,
    otherDeductions: preTaxHealthcare + hsaContribution,
    netAnnual,
    effectiveTaxRate,
    marginalTaxRate,
    items,
  }
}
