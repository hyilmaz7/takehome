'use client'

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { TaxInput, PayPeriod, Country, FilingStatus } from '../../types'
import { calculate } from '../../lib/tax'
import { formatCurrency, formatPeriod, getPeriodLabel } from '../../lib/formatters'
import { US_STATES, NO_TAX_STATES, CA_PROVINCES, DEFAULT_INPUTS } from '../../lib/constants'
import CountryTabs from '../ui/CountryTabs'
import SliderField from '../ui/SliderField'
import ResultCard from '../ui/ResultCard'
import ShareButtons from '../ui/ShareButtons'

type UpdateFn = <K extends keyof TaxInput>(key: K, val: TaxInput[K]) => void

// Net pay rises monotonically with gross, so a binary search inverts the tax
// engine: find the gross salary whose take-home equals the target.
function solveGrossForNet(targetNet: number, base: TaxInput): number {
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

// Compact per-country inputs — the same fields that materially change the gross.
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
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid var(--slate-300)' }} role="group">
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
            style={{ left: '4px', transition: 'transform 0.18s ease', transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
          />
        </button>
        <span className="text-sm" style={{ color: 'var(--slate-700)' }}>Private hospital cover</span>
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

export default function ReverseCalculator() {
  const router = useRouter()
  const mountedRef = useRef(false)

  const [targetNet, setTargetNet] = useState(60000) // desired annual take-home
  const [viewPeriod, setViewPeriod] = useState<PayPeriod>('monthly')
  const [inputs, setInputs] = useState<TaxInput>({ ...DEFAULT_INPUTS.us })

  const update = useCallback(<K extends keyof TaxInput>(key: K, val: TaxInput[K]) => {
    setInputs((prev) => ({ ...prev, [key]: val }))
  }, [])

  const handleCountryChange = useCallback((c: Country) => {
    setInputs({ ...DEFAULT_INPUTS[c] })
  }, [])

  const requiredGross = useMemo(
    () => solveGrossForNet(targetNet, inputs),
    [targetNet, inputs],
  )

  const breakdown = useMemo(
    () => calculate({ ...inputs, grossAnnual: requiredGross }),
    [inputs, requiredGross],
  )

  const totalDeductions = requiredGross - breakdown.netAnnual
  const fillPct = Math.round(Math.max(0, Math.min(100, ((targetNet - 15000) / (300000 - 15000)) * 100)))

  // URL sync — read on mount
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    if (p.get('net')) setTargetNet(Math.max(15000, Math.min(300000, Number(p.get('net')))))
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
    p.set('net', String(targetNet))
    p.set('country', inputs.country)
    if (inputs.country === 'us' && inputs.state) p.set('state', inputs.state)
    router.replace(`?${p.toString()}`, { scroll: false })
  }, [targetNet, inputs, router])

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ── LEFT: target take-home ─────────────────────────── */}
        <div className="flex flex-col">
          <CountryTabs active={inputs.country} onChange={handleCountryChange} />
          <div
            className="card flex flex-col gap-6"
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-center" style={{ color: 'var(--slate-400)' }}>
                I want to take home
              </p>
              <div className="text-center pb-5">
                <div
                  className="text-5xl font-semibold tabular-nums"
                  style={{ color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  aria-live="polite"
                >
                  {formatCurrency(targetNet, inputs.country)}
                </div>
                <p className="text-sm mt-2" style={{ color: 'var(--slate-500)' }}>
                  per year · {formatCurrency(Math.round(targetNet / 12), inputs.country)}/month after tax
                </p>
              </div>

              <input
                type="range"
                min={15000} max={300000} step={1000}
                value={targetNet}
                onChange={(e) => setTargetNet(Number(e.target.value))}
                className="slider-track"
                style={{ '--progress': `${fillPct}%` } as React.CSSProperties}
                aria-label="Desired annual take-home pay"
                aria-valuetext={formatCurrency(targetNet, inputs.country)}
              />
              <div className="relative h-6 mt-2">
                {[60000, 120000, 180000, 240000].map((tick) => (
                  <button
                    key={tick}
                    onClick={() => setTargetNet(tick)}
                    className="absolute text-xs transform -translate-x-1/2"
                    style={{ left: `${((tick - 15000) / (300000 - 15000)) * 100}%`, color: 'var(--slate-400)' }}
                  >
                    {tick / 1000}K
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--slate-100)' }} />

            <CountryInputs inputs={inputs} update={update} />
          </div>
        </div>

        {/* ── RIGHT: required gross + breakdown ──────────────── */}
        <div className="lg:sticky" style={{ top: '84px' }}>
          <div className="card flex flex-col gap-5">
            <div className="rounded-xl p-5 text-center" style={{ backgroundColor: 'var(--sky-pale)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--slate-500)' }}>
                You need a gross salary of
              </p>
              <div
                className="text-5xl font-semibold tabular-nums"
                style={{ color: 'var(--sky)', letterSpacing: '-0.03em', lineHeight: 1 }}
              >
                {formatCurrency(requiredGross, inputs.country)}
              </div>
              <p className="text-sm mt-2" style={{ color: 'var(--slate-500)' }}>
                to take home {formatCurrency(targetNet, inputs.country)} a year
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--slate-400)' }}>
                That&apos;s {formatCurrency(Math.round(requiredGross / 2080), inputs.country)}/hr at 40 hours/week
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span style={{ color: 'var(--slate-600)' }}>Total tax & deductions</span>
              <span className="font-semibold tabular-nums" style={{ color: '#EF4444' }}>
                {formatCurrency(Math.round(totalDeductions), inputs.country)}/yr
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--slate-100)' }} />

            <ResultCard breakdown={breakdown} period={viewPeriod} country={inputs.country} />

            <div style={{ borderTop: '1px solid var(--slate-100)' }}>
              <ShareButtons breakdown={breakdown} period={viewPeriod} country={inputs.country} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
