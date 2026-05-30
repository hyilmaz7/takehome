import type { TaxInput, TaxBreakdown, TaxItem } from '../../types'

// ─── Chart colors ──────────────────────────────────────────────────────────
const C = {
  takeHome: '#22C55E',
  incomeTax: '#EF4444',
  ni: '#F97316',
  pension: '#14B8A6',
  studentLoan: '#F59E0B',
} as const

// ─── UK Income Tax 2026/27 ─────────────────────────────────────────────────
const PERSONAL_ALLOWANCE = 12570
const BASIC_RATE_LIMIT = 50270   // PA + basic rate band (37,700)
const HIGHER_RATE_LIMIT = 125140 // threshold for additional rate
const PA_TAPER_START = 100000    // PA reduces by £1 per £2 above this

const BASIC_RATE = 0.20
const HIGHER_RATE = 0.40
const ADDITIONAL_RATE = 0.45

// ─── Scottish income tax bands 2026/27 ────────────────────────────────────
// Scotland sets its own non-savings income tax bands (NI is reserved/UK-wide).
// Defined as [upper limit of TAXABLE income (after the personal allowance), rate].
const SCOTTISH_BANDS: [number, number][] = [
  [2827, 0.19],    // Starter
  [14921, 0.20],   // Basic
  [31092, 0.21],   // Intermediate
  [62430, 0.42],   // Higher
  [112570, 0.45],  // Advanced
  [Infinity, 0.48], // Top
]

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

function scottishMarginalRate(taxable: number): number {
  for (const [limit, rate] of SCOTTISH_BANDS) {
    if (taxable <= limit) return rate
  }
  return SCOTTISH_BANDS[SCOTTISH_BANDS.length - 1][1]
}

// ─── National Insurance Class 1 (Employee) 2026/27 ────────────────────────
const NI_PRIMARY_THRESHOLD = 12570   // £/year
const NI_UPPER_EARNINGS_LIMIT = 50270 // £/year
const NI_MAIN_RATE = 0.08            // 8% between thresholds
const NI_UPPER_RATE = 0.02           // 2% above UEL

// ─── Student loan repayment thresholds 2026/27 ────────────────────────────
const STUDENT_LOAN_PLANS = {
  plan1:   { threshold: 26065, rate: 0.09 },
  plan2:   { threshold: 28470, rate: 0.09 },
  plan4:   { threshold: 32745, rate: 0.09 },
  postgrad: { threshold: 21000, rate: 0.06 },
}

// ─── Helpers ───────────────────────────────────────────────────────────────
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
export function calculateUK(input: TaxInput): TaxBreakdown {
  const {
    grossAnnual,
    studentLoan = 'none',
    pensionPercent = 0,
    scottish = false,
  } = input

  const gross = Math.max(0, grossAnnual)

  // Pension via salary sacrifice — reduces both income tax and NI wages
  const pension = gross * (pensionPercent / 100)
  const incomeAfterPension = Math.max(0, gross - pension)

  // ── Personal Allowance (with taper above £100k) ──────────────────────────
  let personalAllowance = PERSONAL_ALLOWANCE
  if (incomeAfterPension > PA_TAPER_START) {
    // PA reduces by £1 for every £2 above £100,000
    personalAllowance = Math.max(
      0,
      PERSONAL_ALLOWANCE - Math.floor((incomeAfterPension - PA_TAPER_START) / 2),
    )
  }

  // ── Income Tax ────────────────────────────────────────────────────────────
  const taxableIncome = Math.max(0, incomeAfterPension - personalAllowance)
  const basicBand = Math.max(0, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) // £37,700

  const basicTaxable = Math.min(taxableIncome, basicBand)
  const higherTaxable = Math.min(
    Math.max(0, taxableIncome - basicBand),
    Math.max(0, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT),
  )
  const additionalTaxable = Math.max(0, taxableIncome - basicBand - (HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT))

  const incomeTax = scottish
    ? progressiveTax(taxableIncome, SCOTTISH_BANDS)
    : basicTaxable * BASIC_RATE +
      higherTaxable * HIGHER_RATE +
      additionalTaxable * ADDITIONAL_RATE

  // ── National Insurance (Class 1 employee) ─────────────────────────────────
  let ni = 0
  if (incomeAfterPension > NI_PRIMARY_THRESHOLD) {
    const mainNIEarnings =
      Math.min(incomeAfterPension, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD
    ni += Math.max(0, mainNIEarnings) * NI_MAIN_RATE
    if (incomeAfterPension > NI_UPPER_EARNINGS_LIMIT) {
      ni += (incomeAfterPension - NI_UPPER_EARNINGS_LIMIT) * NI_UPPER_RATE
    }
  }

  // ── Student loan repayments ────────────────────────────────────────────────
  let studentLoanRepayment = 0
  if (studentLoan !== 'none') {
    const plan = STUDENT_LOAN_PLANS[studentLoan]
    if (plan && incomeAfterPension > plan.threshold) {
      studentLoanRepayment = (incomeAfterPension - plan.threshold) * plan.rate
    }
  }

  // ── Marginal rate ─────────────────────────────────────────────────────────
  // Between £100k and £125,140 the effective marginal rate is 60%
  // (40% tax + 20% from losing £0.50 of personal allowance per £1 earned)
  let marginalIncomeTax: number
  if (scottish) {
    // In the £100k–£125,140 taper band the personal allowance is withdrawn at
    // £0.50/£1, adding the advanced rate (45%) again on that half → ~67.5%.
    marginalIncomeTax =
      incomeAfterPension > PA_TAPER_START && incomeAfterPension <= HIGHER_RATE_LIMIT
        ? 0.675
        : scottishMarginalRate(taxableIncome)
  } else if (incomeAfterPension > HIGHER_RATE_LIMIT) {
    marginalIncomeTax = ADDITIONAL_RATE
  } else if (incomeAfterPension > PA_TAPER_START) {
    marginalIncomeTax = 0.60 // effective taper band rate
  } else if (incomeAfterPension > BASIC_RATE_LIMIT) {
    marginalIncomeTax = HIGHER_RATE
  } else if (incomeAfterPension > PERSONAL_ALLOWANCE) {
    marginalIncomeTax = BASIC_RATE
  } else {
    marginalIncomeTax = 0
  }

  let marginalNI: number
  if (incomeAfterPension > NI_UPPER_EARNINGS_LIMIT) {
    marginalNI = NI_UPPER_RATE
  } else if (incomeAfterPension > NI_PRIMARY_THRESHOLD) {
    marginalNI = NI_MAIN_RATE
  } else {
    marginalNI = 0
  }

  // ── Net ───────────────────────────────────────────────────────────────────
  const netAnnual = gross - incomeTax - ni - pension - studentLoanRepayment
  const effectiveTaxRate = gross > 0 ? ((incomeTax + ni) / gross) * 100 : 0
  const marginalTaxRate = (marginalIncomeTax + marginalNI) * 100

  // ── Items ─────────────────────────────────────────────────────────────────
  const items: TaxItem[] = []

  items.push(item(scottish ? 'Income Tax (Scotland)' : 'Income Tax', incomeTax, gross, C.incomeTax))
  items.push(item('National Insurance', ni, gross, C.ni))
  if (pension > 0.5) {
    items.push(item('Pension Contribution', pension, gross, C.pension))
  }
  if (studentLoanRepayment > 0.5) {
    const planLabel = studentLoan === 'postgrad' ? 'Postgrad Loan' : `Student Loan (${studentLoan.toUpperCase()})`
    items.push(item(planLabel, studentLoanRepayment, gross, C.studentLoan))
  }
  items.push(item('Take-Home Pay', netAnnual, gross, C.takeHome, false))

  return {
    grossAnnual: gross,
    federalTax: incomeTax,
    stateTax: ni,
    socialSecurity: 0,  // NI is in stateTax field
    medicare: 0,
    k401: pension,
    otherDeductions: studentLoanRepayment,
    netAnnual,
    effectiveTaxRate,
    marginalTaxRate,
    items,
  }
}
