export type Country = 'us' | 'uk' | 'au' | 'ca'
export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household'
export type PayPeriod = 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annual'

export interface TaxInput {
  grossAnnual: number
  country: Country
  // US specific
  filingStatus?: FilingStatus
  state?: string
  k401Percent?: number       // 0–23 (percent of gross)
  preTaxHealthcare?: number  // annual amount
  hsaContribution?: number   // annual amount
  // UK specific
  studentLoan?: 'none' | 'plan1' | 'plan2' | 'plan4' | 'postgrad'
  pensionPercent?: number    // salary-sacrifice pension %
  scottish?: boolean         // Scottish taxpayer — uses Scottish income tax bands
  // AU specific
  superPercent?: number      // employer super rate (default 11.5%)
  medicareExempt?: boolean
  hasPrivateHealth?: boolean // affects Medicare Levy Surcharge
  // CA specific
  province?: string
  cpp2?: boolean
}

export interface TaxBreakdown {
  grossAnnual: number
  federalTax: number        // income tax / federal tax
  stateTax: number          // NI / state-territory / provincial tax
  socialSecurity: number    // SS / CPP (employee)
  medicare: number          // Medicare / Medicare levy / EI
  k401: number              // 401k / pension / voluntary super
  otherDeductions: number   // healthcare, HSA, student loan
  netAnnual: number
  effectiveTaxRate: number  // % of gross going to tax (excl. voluntary deductions)
  marginalTaxRate: number   // % rate on the next dollar
  items: TaxItem[]
}

export interface TaxItem {
  label: string
  amount: number
  percent: number           // of grossAnnual
  color: string             // hex color for chart
  isDeduction: boolean
}

export interface StateRate {
  name: string
  rate: number              // flat rate (decimal) — used when no brackets
  brackets?: [number, number][]  // [upper_income_limit, rate_decimal]
}
