import type { Country, TaxInput } from '../types'

// ─── US States ─────────────────────────────────────────────────────────────
export const US_STATES: { code: string; name: string }[] = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'DC', name: 'District of Columbia' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
]

// States with no individual income tax
export const NO_TAX_STATES = new Set(['AK', 'FL', 'NV', 'NH', 'SD', 'TN', 'TX', 'WA', 'WY'])

// ─── Canadian provinces & territories ──────────────────────────────────────
export const CA_PROVINCES: { code: string; name: string }[] = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland & Labrador' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
]

// ─── Australian states & territories ──────────────────────────────────────
export const AU_STATES: { code: string; name: string }[] = [
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NT', name: 'Northern Territory' },
]

// ─── Chart colors ──────────────────────────────────────────────────────────
export const CHART_COLORS = {
  takeHome: '#22C55E',
  federalTax: '#EF4444',
  stateTax: '#F97316',
  socialSecurity: '#8B5CF6',
  medicare: '#A78BFA',
  retirement: '#14B8A6',
  other: '#F59E0B',
} as const

// ─── UK student loan plans ─────────────────────────────────────────────────
export const UK_STUDENT_LOAN_PLANS = [
  { value: 'none',    label: 'None',     threshold: 0,     rate: 0    },
  { value: 'plan1',   label: 'Plan 1',   threshold: 26065, rate: 0.09 },
  { value: 'plan2',   label: 'Plan 2',   threshold: 28470, rate: 0.09 },
  { value: 'plan4',   label: 'Plan 4',   threshold: 32745, rate: 0.09 },
  { value: 'postgrad',label: 'Postgrad', threshold: 21000, rate: 0.06 },
] as const

// ─── Default inputs per country ────────────────────────────────────────────
export const DEFAULT_INPUTS: Record<Country, TaxInput> = {
  us: {
    grossAnnual: 75000,
    country: 'us',
    filingStatus: 'single',
    state: 'CA',
    k401Percent: 0,
    preTaxHealthcare: 0,
    hsaContribution: 0,
  },
  uk: {
    grossAnnual: 45000,
    country: 'uk',
    studentLoan: 'none',
    pensionPercent: 0,
  },
  au: {
    grossAnnual: 80000,
    country: 'au',
    superPercent: 12,
    medicareExempt: false,
    hasPrivateHealth: false,
  },
  ca: {
    grossAnnual: 80000,
    country: 'ca',
    province: 'ON',
    cpp2: false,
  },
}
