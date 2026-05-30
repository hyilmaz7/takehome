'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { TaxInput, PayPeriod, Country, FilingStatus } from '../../types'
import { calculate } from '../../lib/tax'
import { formatCurrency, formatPercent } from '../../lib/formatters'
import { US_STATES, NO_TAX_STATES, CA_PROVINCES, DEFAULT_INPUTS } from '../../lib/constants'
import CountryTabs from '../ui/CountryTabs'
import SliderField from '../ui/SliderField'
import ResultCard from '../ui/ResultCard'
import ShareButtons from '../ui/ShareButtons'

// ─── Minimum wages per country (2026 approx) ──────────────────────────────
const MIN_WAGES: Record<Country, { hourly: number; label: string }> = {
  us: { hourly: 7.25,  label: 'US federal minimum wage ($7.25/hr)' },
  uk: { hourly: 11.44, label: 'National Living Wage (£11.44/hr)' },
  au: { hourly: 24.10, label: 'National Minimum Wage (A$24.10/hr)' },
  ca: { hourly: 17.30, label: 'Federal minimum wage (CA$17.30/hr)' },
}

type UpdateFn = <K extends keyof TaxInput>(key: K, val: TaxInput[K]) => void

// ─── Compact country-specific inputs ──────────────────────────────────────
function CountryInputs({ inputs, update }: { inputs: TaxInput; update: UpdateFn }) {
  const { country } = inputs
  const statuses: Array<{ value: FilingStatus; label: string }> = [
    { value: 'single', label: 'Single' },
    { value: 'married_joint', label: 'Married' },
    { value: 'head_of_household', label: 'HoH' },
  ]

  if (country === 'us') {
    const noTax = US_STATES.filter((s) => NO_TAX_STATES.has(s.code))
    const taxed = US_STATES.filter((s) => !NO_TAX_STATES.has(s.code))
    const sel = inputs.filingStatus ?? 'single'
    return (
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>
            State
          </label>
          <select
            value={inputs.state ?? 'CA'}
            onChange={(e) => update('state', e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-sm"
            style={{ border: '1px solid var(--slate-300)', color: 'var(--slate-900)', backgroundColor: '#fff' }}
          >
            <optgroup label="No State Tax">
              {noTax.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
            </optgroup>
            <optgroup label="All States">
              {taxed.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>
            Filing Status
          </label>
          <div
            className="flex rounded-xl overflow-hidden"
            style={{ border: '1px solid var(--slate-300)' }}
            role="group"
          >
            {statuses.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('filingStatus', opt.value)}
                className="flex-1 py-2 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: sel === opt.value ? 'var(--navy)' : 'transparent',
                  color: sel === opt.value ? '#fff' : 'var(--slate-600)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <SliderField
          label="401(k) contribution"
          value={inputs.k401Percent ?? 0}
          min={0} max={23} step={0.5}
          onChange={(v) => update('k401Percent', v)}
          formatValue={(v) => `${v}%`}
        />
      </div>
    )
  }

  if (country === 'uk') {
    return (
      <SliderField
        label="Pension contribution"
        sublabel="Salary sacrifice — reduces income tax and NI"
        value={inputs.pensionPercent ?? 0}
        min={0} max={15} step={0.5}
        onChange={(v) => update('pensionPercent', v)}
        formatValue={(v) => `${v}%`}
      />
    )
  }

  if (country === 'au') {
    const checked = inputs.hasPrivateHealth ?? false
    return (
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <button
          role="switch"
          aria-checked={checked}
          onClick={() => update('hasPrivateHealth', !checked)}
          className="relative w-10 h-6 rounded-full flex-shrink-0 transition-colors"
          style={{ backgroundColor: checked ? 'var(--sky)' : 'var(--slate-300)' }}
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
        <span className="text-sm" style={{ color: 'var(--slate-700)' }}>
          Private hospital cover
        </span>
      </label>
    )
  }

  if (country === 'ca') {
    return (
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>
          Province / Territory
        </label>
        <select
          value={inputs.province ?? 'ON'}
          onChange={(e) => update('province', e.target.value)}
          className="w-full rounded-xl px-3 py-2.5 text-sm"
          style={{ border: '1px solid var(--slate-300)', color: 'var(--slate-900)', backgroundColor: '#fff' }}
        >
          {CA_PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
        </select>
      </div>
    )
  }

  return null
}

// ─── Main component ─────────────────────────────────────────────────────────
interface HourlyCalculatorProps {
  /** Pre-fill the hourly rate (used by the /hourly/[rate] landing pages). */
  initialRate?: number
}

export default function HourlyCalculator({ initialRate }: HourlyCalculatorProps = {}) {
  const router = useRouter()
  const mountedRef = useRef(false)

  const [hourlyRate, setHourlyRate] = useState(initialRate ?? 25)
  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [viewPeriod, setViewPeriod] = useState<PayPeriod>('monthly')
  const [inputs, setInputs] = useState<TaxInput>({ ...DEFAULT_INPUTS.us })

  const update = useCallback(<K extends keyof TaxInput>(key: K, val: TaxInput[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }))
  }, [])

  const handleCountryChange = useCallback((c: Country) => {
    setInputs({ ...DEFAULT_INPUTS[c] })
  }, [])

  // Core conversion: hourly → annual gross → tax calculation
  const annualGross = useMemo(
    () => Math.round(hourlyRate * hoursPerWeek * 52),
    [hourlyRate, hoursPerWeek],
  )

  const taxInput = useMemo<TaxInput>(
    () => ({ ...inputs, grossAnnual: annualGross }),
    [inputs, annualGross],
  )

  const breakdown = useMemo(() => calculate(taxInput), [taxInput])

  // Minimum-wage comparison at 40 hrs/wk with same tax settings
  const minWageInfo = MIN_WAGES[inputs.country]
  const minWageMonthly = useMemo(() => {
    const mw = calculate({ ...inputs, grossAnnual: Math.round(minWageInfo.hourly * 40 * 52) })
    return mw.netAnnual / 12
  }, [inputs, minWageInfo.hourly])

  const netMonthly = breakdown.netAnnual / 12
  const diffVsMinWage = netMonthly - minWageMonthly

  // Per-period table values
  const workHoursYear = hoursPerWeek * 52
  const periods = [
    { label: 'Per hour', amount: breakdown.netAnnual / workHoursYear, sub: `at ${hoursPerWeek} hrs/week` },
    { label: 'Per day', amount: breakdown.netAnnual / 260, sub: '5-day week' },
    { label: 'Per week', amount: breakdown.netAnnual / 52, sub: null },
    { label: 'Per month', amount: breakdown.netAnnual / 12, sub: null },
    { label: 'Per year', amount: breakdown.netAnnual, sub: null },
  ]

  // Slider fill %
  const ratePct = Math.round(Math.max(0, Math.min(100, ((hourlyRate - 7.25) / (200 - 7.25)) * 100)))
  const hoursPct = Math.round(((hoursPerWeek - 20) / 60) * 100)

  // URL sync — read on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    if (p.get('rate')) setHourlyRate(Number(p.get('rate')))
    if (p.get('hours')) setHoursPerWeek(Math.max(20, Math.min(80, Number(p.get('hours')))))
    const c = p.get('country') as Country
    if (c && ['us', 'uk', 'au', 'ca'].includes(c)) {
      const base = { ...DEFAULT_INPUTS[c] }
      if (p.get('state')) base.state = p.get('state')!
      setInputs(base)
    }
  }, [])

  // URL sync — write on change
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return }
    const p = new URLSearchParams()
    p.set('rate', String(hourlyRate))
    p.set('hours', String(hoursPerWeek))
    p.set('country', inputs.country)
    if (inputs.country === 'us' && inputs.state) p.set('state', inputs.state)
    router.replace(`?${p.toString()}`, { scroll: false })
  }, [hourlyRate, hoursPerWeek, inputs, router])

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── LEFT: inputs ───────────────────────────────────── */}
        <div className="flex flex-col">
          <CountryTabs active={inputs.country} onChange={handleCountryChange} />
          <div
            className="card flex flex-col gap-6"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }}
          >
            {/* Hourly rate hero */}
            <div>
              <div className="text-center pt-3 pb-5">
                <div
                  className="text-5xl font-semibold tabular-nums"
                  style={{ color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {formatCurrency(hourlyRate, inputs.country)}
                  <span className="text-2xl ml-1" style={{ color: 'var(--slate-400)' }}>
                    /hr
                  </span>
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--slate-500)' }}>
                  = {formatCurrency(annualGross, inputs.country)} gross per year at {hoursPerWeek} hrs/wk
                </p>
              </div>

              <input
                type="range"
                min={7.25} max={200} step={0.25}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="slider-track"
                style={{ '--progress': `${ratePct}%` } as React.CSSProperties}
                aria-label="Hourly rate"
                aria-valuemin={7.25}
                aria-valuemax={200}
                aria-valuenow={hourlyRate}
                aria-valuetext={`${formatCurrency(hourlyRate, inputs.country)} per hour`}
              />
              <div className="relative h-6 mt-1.5">
                {[50, 100, 150].map((tick) => (
                  <button
                    key={tick}
                    onClick={() => setHourlyRate(tick)}
                    className="absolute text-xs transform -translate-x-1/2"
                    style={{
                      left: `${((tick - 7.25) / (200 - 7.25)) * 100}%`,
                      color: 'var(--slate-400)',
                    }}
                  >
                    ${tick}/hr
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--slate-100)' }} />

            {/* Hours per week */}
            <SliderField
              label="Hours per week"
              value={hoursPerWeek}
              min={20} max={80} step={1}
              onChange={setHoursPerWeek}
              formatValue={(v) => `${v} hrs`}
              sublabel={hoursPerWeek === 40 ? 'Standard full-time' : hoursPerWeek < 40 ? 'Part-time' : 'Overtime'}
            />

            <div style={{ borderTop: '1px solid var(--slate-100)' }} />

            {/* Country-specific inputs */}
            <CountryInputs inputs={inputs} update={update} />
          </div>
        </div>

        {/* ── RIGHT: results ─────────────────────────────────── */}
        <div className="lg:sticky" style={{ top: '84px' }}>
          <div className="card flex flex-col gap-5">

            {/* Per-period breakdown table */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--slate-400)' }}
              >
                Take-home after tax
              </p>
              {periods.map(({ label, amount, sub }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2.5"
                  style={{ borderBottom: '1px solid var(--slate-100)' }}
                >
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--slate-700)' }}>
                      {label}
                    </span>
                    {sub && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--slate-400)' }}>
                        {sub}
                      </p>
                    )}
                  </div>
                  <span
                    className="text-sm font-semibold tabular-nums"
                    style={{ color: label === 'Per year' ? 'var(--navy)' : 'var(--slate-900)' }}
                  >
                    {formatCurrency(Math.round(amount), inputs.country)}
                  </span>
                </div>
              ))}
            </div>

            {/* Min wage comparison */}
            <div
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--sky-pale)' }}
            >
              <p className="text-xs mb-3" style={{ color: 'var(--slate-500)' }}>
                Compared to {minWageInfo.label} at 40 hrs/week
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'var(--slate-600)' }}>
                  Min wage take-home
                </span>
                <span
                  className="text-sm font-medium tabular-nums"
                  style={{ color: 'var(--slate-700)' }}
                >
                  {formatCurrency(Math.round(minWageMonthly), inputs.country)}/mo
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                  Your take-home
                </span>
                <span
                  className="text-sm font-bold tabular-nums"
                  style={{ color: diffVsMinWage >= 0 ? 'var(--green)' : '#EF4444' }}
                >
                  {diffVsMinWage >= 0 ? '+' : ''}
                  {formatCurrency(Math.round(diffVsMinWage), inputs.country)}/mo
                </span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--slate-100)' }} />

            {/* Full tax breakdown */}
            <ResultCard
              breakdown={breakdown}
              period={viewPeriod}
              country={inputs.country}
            />

            <div style={{ borderTop: '1px solid var(--slate-100)' }}>
              <ShareButtons breakdown={breakdown} period={viewPeriod} country={inputs.country} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
