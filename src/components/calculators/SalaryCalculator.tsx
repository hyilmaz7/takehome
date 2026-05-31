'use client'

import { useState, useMemo, useEffect, useRef, useCallback, useId } from 'react'
import { useRouter } from 'next/navigation'
import type { TaxInput, TaxBreakdown, PayPeriod, Country, FilingStatus } from '../../types'
import { calculate } from '../../lib/tax'
import { formatCurrency, formatPercent, getPeriodLabel } from '../../lib/formatters'
import { trackEvent, bucketSalary } from '../../lib/analytics'
import {
  US_STATES,
  NO_TAX_STATES,
  CA_PROVINCES,
  AU_STATES,
  DEFAULT_INPUTS,
} from '../../lib/constants'
import CountryTabs from '../ui/CountryTabs'
import SliderField from '../ui/SliderField'
import PeriodToggle from '../ui/PeriodToggle'
import ResultCard from '../ui/ResultCard'
import ShareButtons from '../ui/ShareButtons'

// ─── Types ─────────────────────────────────────────────────────────────────
type UpdateFn = <K extends keyof TaxInput>(key: K, val: TaxInput[K]) => void

// ─── Small reusable sub-components ─────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative w-10 h-6 rounded-full transition-colors flex-shrink-0 focus:outline-none focus-visible:ring-2"
        style={{
          backgroundColor: checked ? 'var(--sky)' : 'var(--slate-300)',
        }}
      >
        <span
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
          style={{
            left: '4px',
            transition: 'transform 0.18s ease',
            transform: checked ? 'translateX(16px)' : 'translateX(0)',
          }}
        />
      </button>
      <span className="text-sm leading-snug" style={{ color: 'var(--slate-700)' }}>
        {label}
      </span>
    </label>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-widest"
      style={{ color: 'var(--slate-400)' }}
    >
      {children}
    </p>
  )
}

function FieldLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-medium block mb-1.5"
      style={{ color: 'var(--slate-600)' }}
    >
      {children}
    </label>
  )
}

function SelectField({
  value,
  onChange,
  children,
  id,
}: {
  value: string
  onChange: (v: string) => void
  children: React.ReactNode
  id?: string
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl px-3 py-2.5 text-sm appearance-none"
      style={{
        border: '1px solid var(--slate-300)',
        color: 'var(--slate-900)',
        backgroundColor: '#fff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        paddingRight: '36px',
      }}
    >
      {children}
    </select>
  )
}

function FilingStatusPicker({
  value,
  onChange,
}: {
  value: FilingStatus
  onChange: (v: FilingStatus) => void
}) {
  const opts: { value: FilingStatus; label: string }[] = [
    { value: 'single', label: 'Single' },
    { value: 'married_joint', label: 'Married' },
    { value: 'head_of_household', label: 'Head of HH' },
  ]
  return (
    <div
      className="flex rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--slate-300)' }}
      role="group"
      aria-label="Filing status"
    >
      {opts.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="flex-1 py-2 text-xs font-medium transition-colors"
          style={{
            backgroundColor: value === opt.value ? 'var(--navy)' : 'transparent',
            color: value === opt.value ? '#fff' : 'var(--slate-600)',
          }}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── Country-specific input panels ─────────────────────────────────────────

function USInputs({ inputs, update }: { inputs: TaxInput; update: UpdateFn }) {
  const noTaxGroup = US_STATES.filter((s) => NO_TAX_STATES.has(s.code))
  const taxGroup = US_STATES.filter((s) => !NO_TAX_STATES.has(s.code))
  const hsaOn = (inputs.hsaContribution ?? 0) > 0
  const healthMonthly = Math.round((inputs.preTaxHealthcare ?? 0) / 12)

  return (
    <div className="flex flex-col gap-5">
      {/* State */}
      <div>
        <FieldLabel>State</FieldLabel>
        <SelectField
          value={inputs.state ?? 'CA'}
          onChange={(v) => update('state', v)}
        >
          <optgroup label="No State Income Tax">
            {noTaxGroup.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="All States">
            {taxGroup.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </optgroup>
        </SelectField>
      </div>

      {/* Filing status */}
      <div>
        <FieldLabel>Filing Status</FieldLabel>
        <FilingStatusPicker
          value={inputs.filingStatus ?? 'single'}
          onChange={(v) => update('filingStatus', v)}
        />
      </div>

      {/* Pre-tax deductions */}
      <div className="flex flex-col gap-4">
        <SectionLabel>Pre-tax deductions (optional)</SectionLabel>

        <SliderField
          label="401(k) contribution"
          sublabel="Traditional pre-tax — reduces taxable income"
          value={inputs.k401Percent ?? 0}
          min={0}
          max={23}
          step={0.5}
          onChange={(v) => update('k401Percent', v)}
          formatValue={(v) => `${v}%`}
        />

        <SliderField
          label="Health insurance premium"
          sublabel="Pre-tax via employer Section 125 plan"
          value={healthMonthly}
          min={0}
          max={500}
          step={10}
          onChange={(v) => update('preTaxHealthcare', v * 12)}
          formatValue={(v) => `$${v}/mo`}
        />

        <Toggle
          checked={hsaOn}
          onChange={(v) => update('hsaContribution', v ? 4300 : 0)}
          label="HSA contribution — $4,300/yr self-only limit (2025)"
        />
      </div>
    </div>
  )
}

function UKInputs({ inputs, update }: { inputs: TaxInput; update: UpdateFn }) {
  const plans = [
    { value: 'none', label: 'None' },
    { value: 'plan1', label: 'Plan 1' },
    { value: 'plan2', label: 'Plan 2' },
    { value: 'plan4', label: 'Plan 4' },
    { value: 'postgrad', label: 'Postgrad' },
  ] as const
  const currentPlan = inputs.studentLoan ?? 'none'

  return (
    <div className="flex flex-col gap-5">
      {/* Student loan */}
      <div>
        <FieldLabel>Student Loan Plan</FieldLabel>
        <div className="flex flex-wrap gap-1.5">
          {plans.map((p) => (
            <button
              key={p.value}
              onClick={() => update('studentLoan', p.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-full border transition-colors"
              style={{
                backgroundColor: currentPlan === p.value ? 'var(--navy)' : 'transparent',
                color: currentPlan === p.value ? '#fff' : 'var(--slate-600)',
                borderColor: currentPlan === p.value ? 'var(--navy)' : 'var(--slate-300)',
              }}
              aria-pressed={currentPlan === p.value}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Pension */}
      <SliderField
        label="Pension contribution"
        sublabel="Salary sacrifice — reduces income tax and National Insurance"
        value={inputs.pensionPercent ?? 0}
        min={0}
        max={15}
        step={0.5}
        onChange={(v) => update('pensionPercent', v)}
        formatValue={(v) => `${v}%`}
        ticks
      />

      {/* Scottish taxpayer — switches to Scottish income tax bands */}
      <Toggle
        checked={inputs.scottish ?? false}
        onChange={(v) => update('scottish', v)}
        label="Scottish taxpayer — uses Scottish income tax bands"
      />
    </div>
  )
}

function AUInputs({ inputs, update }: { inputs: TaxInput; update: UpdateFn }) {
  const [territory, setTerritory] = useState('NSW')
  const showMLSWarning = !(inputs.hasPrivateHealth) && (inputs.grossAnnual ?? 0) > 93000

  return (
    <div className="flex flex-col gap-5">
      {/* State/Territory — informational (no state income tax in AU) */}
      <div>
        <FieldLabel>
          State / Territory{' '}
          <span className="badge badge-sky ml-1">No state income tax</span>
        </FieldLabel>
        <SelectField value={territory} onChange={setTerritory}>
          {AU_STATES.map((s) => (
            <option key={s.code} value={s.code}>
              {s.name}
            </option>
          ))}
        </SelectField>
      </div>

      {/* Private health */}
      <Toggle
        checked={inputs.hasPrivateHealth ?? false}
        onChange={(v) => update('hasPrivateHealth', v)}
        label="I have private hospital cover"
      />

      {/* MLS warning */}
      {showMLSWarning && (
        <div
          className="text-xs rounded-xl px-3 py-2.5"
          style={{ backgroundColor: '#fef9ec', color: '#92400e' }}
        >
          Medicare Levy Surcharge applies — incomes above $93,000 without private
          hospital cover attract 1–1.5% surcharge.
        </div>
      )}

      {/* Employer super info */}
      <div
        className="flex items-center justify-between py-3 px-4 rounded-xl"
        style={{ backgroundColor: 'var(--sky-pale)' }}
      >
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>
            Employer Superannuation
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--slate-500)' }}>
            Paid on top of your salary — not deducted from take-home
          </p>
        </div>
        <span className="badge badge-sky shrink-0 ml-3">12% compulsory</span>
      </div>
    </div>
  )
}

function CAInputs({ inputs, update }: { inputs: TaxInput; update: UpdateFn }) {
  const showCPP2Note = inputs.cpp2 && (inputs.grossAnnual ?? 0) < 71300

  return (
    <div className="flex flex-col gap-5">
      {/* Province */}
      <div>
        <FieldLabel>Province / Territory</FieldLabel>
        <SelectField
          value={inputs.province ?? 'ON'}
          onChange={(v) => update('province', v)}
        >
          {CA_PROVINCES.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </SelectField>
      </div>

      {/* CPP2 */}
      <div className="flex flex-col gap-2">
        <Toggle
          checked={inputs.cpp2 ?? false}
          onChange={(v) => update('cpp2', v)}
          label="CPP2 contribution applies"
        />
        <p className="text-xs pl-13" style={{ color: 'var(--slate-500)', paddingLeft: '52px' }}>
          Additional 4% on earnings between $71,300 and $81,200 (2025)
        </p>
        {showCPP2Note && (
          <p
            className="text-xs rounded-xl px-3 py-2 ml-0"
            style={{ backgroundColor: '#fef9ec', color: '#92400e' }}
          >
            CPP2 only applies when earnings exceed $71,300
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Calculation explanation ────────────────────────────────────────────────

const DEDUCTION_EXPLANATIONS: Record<
  Country,
  Array<{ match: string; color: string; text: string }>
> = {
  us: [
    {
      match: 'Federal',
      color: '#EF4444',
      text: 'Progressive federal tax using 2025 brackets (10%–37%). Applied to taxable income after the standard deduction and pre-tax contributions.',
    },
    {
      match: 'State',
      color: '#F97316',
      text: 'State income tax varies by state — nine states collect no income tax at all. Applied to adjusted gross income (before the federal standard deduction).',
    },
    {
      match: 'Social Security',
      color: '#8B5CF6',
      text: '6.2% of wages up to $176,100 (2025 wage base). Funds retirement, disability, and survivor benefits.',
    },
    {
      match: 'Medicare',
      color: '#A78BFA',
      text: '1.45% on all wages. An additional 0.9% applies to wages above $200,000 (single) or $250,000 (married filing jointly).',
    },
    {
      match: '401(k)',
      color: '#14B8A6',
      text: 'Pre-tax contributions to a traditional 401(k) reduce both federal and state taxable income. Funds grow tax-deferred until retirement.',
    },
    {
      match: 'Health',
      color: '#F59E0B',
      text: 'Employer-sponsored health premiums paid via Section 125 cafeteria plan reduce federal income tax, state income tax, and FICA (SS + Medicare) wages.',
    },
  ],
  uk: [
    {
      match: 'Income Tax',
      color: '#EF4444',
      text: 'Applied above the £12,570 personal allowance. Basic rate 20% to £50,270; higher rate 40% to £125,140; additional rate 45% above. The personal allowance tapers away above £100,000.',
    },
    {
      match: 'National Insurance',
      color: '#F97316',
      text: 'Employee Class 1 NI: 8% on earnings £12,570–£50,270, then 2% above. Salary-sacrifice pension reduces NI wages, saving you NI contributions.',
    },
    {
      match: 'Pension',
      color: '#14B8A6',
      text: 'Salary sacrifice pension contributions reduce your gross pay before tax, saving income tax at your marginal rate and National Insurance at your NI rate.',
    },
    {
      match: 'Student Loan',
      color: '#F59E0B',
      text: 'Repaid as a percentage of income above the relevant threshold. Plan 2 threshold: £28,470 at 9%. Postgrad: £21,000 at 6%. Not a tax but collected alongside PAYE.',
    },
  ],
  au: [
    {
      match: 'Income Tax',
      color: '#EF4444',
      text: 'Progressive rates from 0% (below $18,200 tax-free threshold) to 45% above $180,000. The Low Income Tax Offset (LITO) reduces tax by up to $700 for lower earners.',
    },
    {
      match: 'Medicare Levy',
      color: '#A78BFA',
      text: '2% of taxable income (phased in for lower incomes from ~$26,000). Funds Medicare — Australia\'s universal public health system.',
    },
    {
      match: 'Surcharge',
      color: '#F59E0B',
      text: 'Medicare Levy Surcharge of 1–1.5% applies if your income exceeds $93,000 and you don\'t have private hospital cover. Taking out a suitable policy removes the surcharge.',
    },
  ],
  ca: [
    {
      match: 'Federal',
      color: '#EF4444',
      text: 'Federal tax (15%–33%) applied to total income, minus a Basic Personal Amount credit of ~$2,419. Quebec residents receive a 16.5% abatement since they fund their own programs.',
    },
    {
      match: 'Tax',
      color: '#F97316',
      text: 'Provincial/territorial income tax is levied separately. Rates and brackets vary significantly. Ontario adds a surtax for higher earners on top of the basic provincial tax.',
    },
    {
      match: 'CPP',
      color: '#8B5CF6',
      text: 'Canada Pension Plan: 5.95% on earnings between $3,500–$71,300. CPP2 adds 4% on the next $9,900 (up to $81,200). Both contributions qualify for tax credits.',
    },
    {
      match: 'EI',
      color: '#A78BFA',
      text: 'Employment Insurance premiums: 1.64% on insurable earnings up to $65,700. Provides temporary income support for job loss, illness, or parental leave.',
    },
  ],
}

function CalculationFlow({
  breakdown,
  inputs,
}: {
  breakdown: TaxBreakdown
  inputs: TaxInput
}) {
  const country = inputs.country
  const explanations = DEDUCTION_EXPLANATIONS[country]

  // Match each breakdown item to an explanation
  const activeExplanations = explanations.filter((exp) =>
    breakdown.items.some(
      (item) => item.isDeduction && item.amount > 0.5 && item.label.includes(exp.match),
    ),
  )

  return (
    <div className="card mt-6">
      <h2
        className="text-base font-semibold mb-5"
        style={{ color: 'var(--navy)' }}
      >
        How is this calculated?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step-by-step flow */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--slate-400)' }}
          >
            Step-by-step breakdown
          </p>

          <div className="flex flex-col">
            {/* Gross */}
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderBottom: '1px solid var(--slate-100)' }}
            >
              <span className="text-sm font-medium" style={{ color: 'var(--slate-700)' }}>
                Gross salary
              </span>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ color: 'var(--navy)' }}
              >
                {formatCurrency(breakdown.grossAnnual, country)}
              </span>
            </div>

            {/* Each deduction */}
            {breakdown.items
              .filter((i) => i.isDeduction && i.amount > 0.5)
              .map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: '1px solid var(--slate-100)' }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span
                      className="text-sm truncate"
                      style={{ color: 'var(--slate-600)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span
                      className="text-xs tabular-nums"
                      style={{ color: 'var(--slate-400)' }}
                    >
                      {formatPercent(item.percent)}
                    </span>
                    <span
                      className="text-sm tabular-nums"
                      style={{ color: item.color, minWidth: '5rem', textAlign: 'right' }}
                    >
                      −{formatCurrency(Math.round(item.amount), country)}
                    </span>
                  </div>
                </div>
              ))}

            {/* Take-home result */}
            <div
              className="flex items-center justify-between py-3 px-3 rounded-xl mt-2"
              style={{ backgroundColor: 'var(--sky-pale)' }}
            >
              <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                = Take-home pay
              </span>
              <div className="text-right">
                <span
                  className="text-sm font-bold tabular-nums block"
                  style={{ color: 'var(--green)' }}
                >
                  {formatCurrency(Math.round(breakdown.netAnnual), country)}/yr
                </span>
                <span
                  className="text-xs tabular-nums"
                  style={{ color: 'var(--sky)' }}
                >
                  {formatPercent(100 - breakdown.effectiveTaxRate)} of gross
                </span>
              </div>
            </div>

            {/* Rate summary */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <span className="badge badge-sky">
                {formatPercent(breakdown.effectiveTaxRate)} effective rate
              </span>
              <span
                className="badge"
                style={{ backgroundColor: '#fef9ec', color: '#92400e' }}
              >
                {formatPercent(breakdown.marginalTaxRate, 0)} marginal rate
              </span>
            </div>
          </div>
        </div>

        {/* Plain English explanations */}
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--slate-400)' }}
          >
            What each deduction means
          </p>
          <div className="flex flex-col gap-4">
            {activeExplanations.map((exp, idx) => (
              <div key={idx} className="flex gap-3">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: exp.color }}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--slate-900)' }}>
                    {explanations[idx]?.match}
                  </p>
                  <p
                    className="text-xs mt-1 leading-relaxed"
                    style={{ color: 'var(--slate-500)' }}
                  >
                    {exp.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Disclaimer */}
            <p
              className="text-xs mt-2 pt-3"
              style={{
                color: 'var(--slate-400)',
                borderTop: '1px solid var(--slate-100)',
              }}
            >
              Estimates use the latest 2025 tax rates. Individual circumstances vary. Not
              financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

interface SalaryCalculatorProps {
  initialCountry?: Country
  /** When true, the country is fixed: the country tabs are hidden and the
   *  `country` URL parameter is ignored. Used by the dedicated country pages. */
  locked?: boolean
  /** Pre-fill the gross salary (used by the /salary/[amount] landing pages). */
  initialGross?: number
  /** Pre-fill the US state or CA province (used by the salary landing pages). */
  initialRegion?: string
  /** Compact mode for the embeddable widget: hides the long explanation and
   *  the share/compare buttons (which would navigate the parent iframe). */
  compact?: boolean
}

export default function SalaryCalculator({
  initialCountry = 'us',
  locked = false,
  initialGross,
  initialRegion,
  compact = false,
}: SalaryCalculatorProps) {
  const router = useRouter()
  const mountedRef = useRef(false)

  // ── State ──────────────────────────────────────────────────────────────
  const [inputs, setInputs] = useState<TaxInput>(() => ({
    ...DEFAULT_INPUTS[initialCountry],
    ...(initialGross != null ? { grossAnnual: initialGross } : {}),
    ...(initialRegion !== undefined
      ? initialCountry === 'ca'
        ? { province: initialRegion }
        : { state: initialRegion }
      : {}),
  }))
  const [viewPeriod, setViewPeriod] = useState<PayPeriod>('monthly')
  // Draft text for the editable salary field — null means "show the slider value".
  const [salaryDraft, setSalaryDraft] = useState<string | null>(null)

  const salaryInputId = useId()
  const salaryErrorId = useId()

  // Helper: update a single field
  const update = useCallback(<K extends keyof TaxInput>(key: K, val: TaxInput[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }))
  }, [])

  // Helper: set gross from the slider/ticks (also clears any text draft)
  const setGross = useCallback((value: number) => {
    setSalaryDraft(null)
    setInputs((prev) => ({ ...prev, grossAnnual: value }))
  }, [])

  // Helper: switch country and reset to that country's defaults (preserve gross)
  const handleCountryChange = useCallback((c: Country) => {
    setInputs((prev) => ({
      ...DEFAULT_INPUTS[c],
      grossAnnual: prev.grossAnnual,
      country: c,
    }))
  }, [])

  // ── Salary text input validation ───────────────────────────────────────
  const salaryError =
    salaryDraft !== null &&
    (salaryDraft.trim() === '' || Number.isNaN(Number(salaryDraft)) || Number(salaryDraft) < 0)
      ? 'Please enter a valid salary'
      : ''

  const handleSalaryInput = useCallback((raw: string) => {
    setSalaryDraft(raw)
    const n = Number(raw)
    if (raw.trim() !== '' && !Number.isNaN(n) && n >= 0) {
      setInputs((prev) => ({ ...prev, grossAnnual: Math.min(n, 10_000_000) }))
    }
  }, [])

  // ── Tax calculation (pure math — guarded so a bad input never crashes) ──
  const breakdown = useMemo<TaxBreakdown | null>(() => {
    try {
      return calculate(inputs)
    } catch {
      return null
    }
  }, [inputs])

  // ── Analytics: calculator_used (debounced so we don't spam on every tick) ─
  useEffect(() => {
    const t = setTimeout(() => {
      trackEvent({
        name: 'calculator_used',
        params: {
          country: inputs.country,
          salary_range: bucketSalary(inputs.grossAnnual),
          has_state: Boolean(inputs.state || inputs.province),
        },
      })
    }, 800)
    return () => clearTimeout(t)
  }, [inputs.country, inputs.grossAnnual, inputs.state, inputs.province])

  // ── URL sync: read params on mount ────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const updates: Partial<TaxInput> = {}

    const gross = params.get('gross')
    if (gross && !isNaN(Number(gross))) updates.grossAnnual = Number(gross)

    if (!locked) {
      const country = params.get('country') as Country
      if (country && ['us', 'uk', 'au', 'ca'].includes(country)) updates.country = country
    }

    // US params
    const state = params.get('state')
    if (state) updates.state = state

    const filing = params.get('filing') as FilingStatus
    if (filing) updates.filingStatus = filing

    const k401 = params.get('k401')
    if (k401) updates.k401Percent = Number(k401)

    const health = params.get('health')
    if (health) updates.preTaxHealthcare = Number(health) * 12

    // UK params
    const loan = params.get('loan') as TaxInput['studentLoan']
    if (loan) updates.studentLoan = loan

    const pension = params.get('pension')
    if (pension) updates.pensionPercent = Number(pension)

    if (params.get('scottish') === '1') updates.scottish = true

    // CA params
    const province = params.get('province')
    if (province) updates.province = province

    if (params.get('cpp2') === '1') updates.cpp2 = true

    // Display
    const period = params.get('period') as PayPeriod
    if (period && ['weekly', 'biweekly', 'semimonthly', 'monthly', 'annual'].includes(period)) {
      setViewPeriod(period)
    }

    if (Object.keys(updates).length > 0) {
      // If country changed, start from that country's defaults
      const baseCountry = (updates.country ?? initialCountry) as Country
      setInputs((prev) => ({ ...DEFAULT_INPUTS[baseCountry], ...prev, ...updates }))
    }
  }, [initialCountry, locked])

  // ── URL sync: write params on change (skip very first mount cycle) ─────
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }

    const params = new URLSearchParams()
    params.set('gross', String(Math.round(inputs.grossAnnual)))
    params.set('country', inputs.country)

    if (viewPeriod !== 'monthly') params.set('period', viewPeriod)

    if (inputs.country === 'us') {
      if (inputs.state) params.set('state', inputs.state)
      if (inputs.filingStatus && inputs.filingStatus !== 'single')
        params.set('filing', inputs.filingStatus)
      if (inputs.k401Percent) params.set('k401', String(inputs.k401Percent))
      if (inputs.preTaxHealthcare)
        params.set('health', String(Math.round((inputs.preTaxHealthcare ?? 0) / 12)))
    } else if (inputs.country === 'uk') {
      if (inputs.studentLoan && inputs.studentLoan !== 'none')
        params.set('loan', inputs.studentLoan)
      if (inputs.pensionPercent) params.set('pension', String(inputs.pensionPercent))
      if (inputs.scottish) params.set('scottish', '1')
    } else if (inputs.country === 'ca') {
      if (inputs.province && inputs.province !== 'ON') params.set('province', inputs.province)
      if (inputs.cpp2) params.set('cpp2', '1')
    }

    router.replace(`?${params.toString()}`, { scroll: false })
  }, [inputs, viewPeriod, router])

  // Slider fill %
  const salaryFillPct = Math.round(((inputs.grossAnnual - 20000) / 480000) * 100)

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Main 2-column grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── LEFT: inputs ─────────────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Country tabs — visually connects to input card below.
              Hidden on the dedicated country pages where the country is locked. */}
          {!locked && (
            <CountryTabs
              active={inputs.country}
              onChange={(c) => {
                if (c !== inputs.country) {
                  trackEvent({ name: 'country_switched', params: { from: inputs.country, to: c } })
                }
                handleCountryChange(c)
              }}
            />
          )}

          <div
            className="card flex flex-col gap-6"
            style={
              locked
                ? undefined
                : {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    borderTop: 'none',
                  }
            }
          >
            {/* ── Salary hero ────────────────────────────────────── */}
            <div>
              {/* Large formatted number */}
              <div className="text-center pt-3 pb-5">
                <div
                  className="text-5xl font-semibold tabular-nums"
                  style={{
                    color: 'var(--navy)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                  }}
                  aria-live="polite"
                >
                  {formatCurrency(inputs.grossAnnual, inputs.country)}
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--slate-500)' }}>
                  annual gross salary
                </p>
              </div>

              {/* Range slider */}
              <input
                type="range"
                min={20000}
                max={500000}
                step={1000}
                value={inputs.grossAnnual}
                onChange={(e) => setGross(Number(e.target.value))}
                className="slider-track"
                style={
                  { '--progress': `${salaryFillPct}%` } as React.CSSProperties
                }
                aria-label="Annual gross salary"
                aria-valuemin={20000}
                aria-valuemax={500000}
                aria-valuenow={inputs.grossAnnual}
                aria-valuetext={formatCurrency(inputs.grossAnnual, inputs.country)}
              />

              {/* Tick labels — clickable shortcuts */}
              <div className="relative h-6 mt-2">
                {[100000, 200000, 300000, 400000].map((tick) => {
                  const left = ((tick - 20000) / 480000) * 100
                  return (
                    <button
                      key={tick}
                      onClick={() => setGross(tick)}
                      className="absolute text-xs transform -translate-x-1/2 transition-colors hover:font-medium"
                      style={{
                        left: `${left}%`,
                        color: 'var(--slate-400)',
                      }}
                    >
                      ${tick / 1000}K
                    </button>
                  )
                })}
              </div>

              {/* Editable amount — type-in entry with a numeric mobile keyboard */}
              <div className="mt-5">
                <label
                  htmlFor={salaryInputId}
                  className="text-xs font-medium block mb-1.5"
                  style={{ color: 'var(--slate-600)' }}
                >
                  Or type an exact amount
                </label>
                <input
                  id={salaryInputId}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  value={salaryDraft ?? String(Math.round(inputs.grossAnnual))}
                  onChange={(e) => handleSalaryInput(e.target.value)}
                  onBlur={() => setSalaryDraft(null)}
                  className={`field-input${salaryError ? ' invalid' : ''}`}
                  aria-label="Annual gross salary"
                  aria-invalid={Boolean(salaryError)}
                  aria-describedby={salaryError ? salaryErrorId : undefined}
                />
                {salaryError && (
                  <p
                    id={salaryErrorId}
                    role="alert"
                    className="text-xs mt-1.5"
                    style={{ color: '#DC2626' }}
                  >
                    {salaryError}
                  </p>
                )}
              </div>
            </div>

            {/* ── Divider ────────────────────────────────────────── */}
            <div style={{ borderTop: '1px solid var(--slate-100)' }} />

            {/* ── Country-specific inputs ─────────────────────────  */}
            {inputs.country === 'us' && (
              <USInputs inputs={inputs} update={update} />
            )}
            {inputs.country === 'uk' && (
              <UKInputs inputs={inputs} update={update} />
            )}
            {inputs.country === 'au' && (
              <AUInputs inputs={inputs} update={update} />
            )}
            {inputs.country === 'ca' && (
              <CAInputs inputs={inputs} update={update} />
            )}

            {/* ── Pay frequency ───────────────────────────────────── */}
            <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: '16px' }}>
              <p
                className="text-xs font-medium mb-2"
                style={{ color: 'var(--slate-600)' }}
              >
                Display pay period
              </p>
              <PeriodToggle
                value={viewPeriod}
                onChange={(p) => {
                  setViewPeriod(p)
                  trackEvent({ name: 'period_changed', params: { period: p } })
                }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: results (sticky on desktop) ───────────────────── */}
        <div className="lg:sticky" style={{ top: '84px' }}>
          <div className="card">
            {breakdown ? (
              <>
                <ResultCard
                  breakdown={breakdown}
                  period={viewPeriod}
                  country={inputs.country}
                />
                {!compact && (
                  <div
                    className="mt-5 pt-4"
                    style={{ borderTop: '1px solid var(--slate-100)' }}
                  >
                    <ShareButtons
                      breakdown={breakdown}
                      period={viewPeriod}
                      country={inputs.country}
                    />
                  </div>
                )}
              </>
            ) : (
              <div role="alert" className="text-center py-8">
                <p className="text-base font-medium" style={{ color: 'var(--navy)' }}>
                  We couldn&apos;t calculate that
                </p>
                <p className="text-sm mt-2" style={{ color: 'var(--slate-500)' }}>
                  Please check the salary amount and try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Explanation section (hidden in compact/embed mode) ────── */}
      {!compact && breakdown && <CalculationFlow breakdown={breakdown} inputs={inputs} />}
    </div>
  )
}
