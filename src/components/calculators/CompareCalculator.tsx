'use client'

import { useState, useMemo, useCallback } from 'react'
import type { TaxInput, Country } from '../../types'
import { calculate } from '../../lib/tax'
import { formatCurrency, formatPercent } from '../../lib/formatters'
import { US_STATES, NO_TAX_STATES, CA_PROVINCES, DEFAULT_INPUTS } from '../../lib/constants'
import SliderField from '../ui/SliderField'

const COUNTRY_OPTIONS: { value: Country; label: string }[] = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'au', label: '🇦🇺 Australia' },
  { value: 'ca', label: '🇨🇦 Canada' },
]

interface Offer {
  name: string
  input: TaxInput
  benefits: number // annual value of perks (health, equity, bonus…) added to total comp
}

function selectStyle(): React.CSSProperties {
  return { border: '1px solid var(--slate-300)', color: 'var(--slate-900)', backgroundColor: '#fff' }
}

function OfferCard({
  offer,
  accent,
  onName,
  onCountry,
  onGross,
  onRegion,
  onRetirement,
  onBenefits,
}: {
  offer: Offer
  accent: string
  onName: (v: string) => void
  onCountry: (c: Country) => void
  onGross: (v: number) => void
  onRegion: (v: string) => void
  onRetirement: (v: number) => void
  onBenefits: (v: number) => void
}) {
  const { input } = offer
  const fillPct = Math.round(Math.max(0, Math.min(100, ((input.grossAnnual - 20000) / (500000 - 20000)) * 100)))

  const showRetirement = input.country === 'us' || input.country === 'uk'
  const retirementPct = input.country === 'uk' ? (input.pensionPercent ?? 0) : (input.k401Percent ?? 0)
  const retirementMax = input.country === 'uk' ? 15 : 23
  const retirementLabel = input.country === 'uk' ? 'Pension contribution' : '401(k) contribution'

  return (
    <div className="card flex flex-col gap-5" style={{ borderTop: `3px solid ${accent}` }}>
      {/* Editable offer name */}
      <input
        value={offer.name}
        onChange={(e) => onName(e.target.value)}
        className="text-base font-semibold bg-transparent outline-none w-full"
        style={{ color: 'var(--navy)' }}
        aria-label="Offer name"
      />

      {/* Gross hero + slider */}
      <div>
        <div className="text-center pb-4">
          <div
            className="text-4xl font-semibold tabular-nums"
            style={{ color: 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            {formatCurrency(input.grossAnnual, input.country)}
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--slate-500)' }}>annual gross</p>
        </div>
        <input
          type="range"
          min={20000} max={500000} step={1000}
          value={input.grossAnnual}
          onChange={(e) => onGross(Number(e.target.value))}
          className="slider-track"
          style={{ '--progress': `${fillPct}%` } as React.CSSProperties}
          aria-label={`${offer.name} gross salary`}
          aria-valuemin={20000}
          aria-valuemax={500000}
          aria-valuenow={input.grossAnnual}
          aria-valuetext={formatCurrency(input.grossAnnual, input.country)}
        />
      </div>

      {/* Country */}
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>Country</label>
        <select
          value={input.country}
          onChange={(e) => onCountry(e.target.value as Country)}
          className="w-full rounded-xl px-3 py-2.5 text-sm"
          style={selectStyle()}
        >
          {COUNTRY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Region (US states / CA provinces) */}
      {input.country === 'us' && (
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>State</label>
          <select
            value={input.state ?? 'CA'}
            onChange={(e) => onRegion(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-sm"
            style={selectStyle()}
          >
            <optgroup label="No State Tax">
              {US_STATES.filter((s) => NO_TAX_STATES.has(s.code)).map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
            </optgroup>
            <optgroup label="All States">
              {US_STATES.filter((s) => !NO_TAX_STATES.has(s.code)).map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
            </optgroup>
          </select>
        </div>
      )}
      {input.country === 'ca' && (
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>Province / Territory</label>
          <select
            value={input.province ?? 'ON'}
            onChange={(e) => onRegion(e.target.value)}
            className="w-full rounded-xl px-3 py-2.5 text-sm"
            style={selectStyle()}
          >
            {CA_PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
          </select>
        </div>
      )}

      {/* Pre-tax retirement contribution */}
      {showRetirement && (
        <SliderField
          label={retirementLabel}
          value={retirementPct}
          min={0}
          max={retirementMax}
          step={0.5}
          onChange={onRetirement}
          formatValue={(v) => `${v}%`}
        />
      )}

      {/* Benefits value */}
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>
          Benefits value (annual)
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          step={500}
          value={offer.benefits ? String(offer.benefits) : ''}
          onChange={(e) => {
            const n = Number(e.target.value)
            onBenefits(e.target.value.trim() === '' || Number.isNaN(n) || n < 0 ? 0 : n)
          }}
          placeholder="e.g. health, bonus, equity"
          className="field-input"
          aria-label={`${offer.name} benefits value`}
        />
      </div>
    </div>
  )
}

export default function CompareCalculator() {
  const [offers, setOffers] = useState<Offer[]>([
    { name: 'Current job', input: { ...DEFAULT_INPUTS.us, grossAnnual: 75000 }, benefits: 0 },
    { name: 'New offer', input: { ...DEFAULT_INPUTS.us, grossAnnual: 90000 }, benefits: 0 },
  ])

  const patchInput = useCallback((idx: number, changes: Partial<TaxInput>) => {
    setOffers((prev) =>
      prev.map((o, i) => (i === idx ? { ...o, input: { ...o.input, ...changes } } : o)),
    )
  }, [])

  const setName = useCallback((idx: number, name: string) => {
    setOffers((prev) => prev.map((o, i) => (i === idx ? { ...o, name } : o)))
  }, [])

  const setBenefits = useCallback((idx: number, benefits: number) => {
    setOffers((prev) => prev.map((o, i) => (i === idx ? { ...o, benefits } : o)))
  }, [])

  const setRetirement = useCallback((idx: number, pct: number) => {
    setOffers((prev) =>
      prev.map((o, i) => {
        if (i !== idx) return o
        const field = o.input.country === 'uk' ? 'pensionPercent' : 'k401Percent'
        return { ...o, input: { ...o.input, [field]: pct } }
      }),
    )
  }, [])

  const changeCountry = useCallback((idx: number, c: Country) => {
    setOffers((prev) =>
      prev.map((o, i) =>
        i === idx ? { ...o, input: { ...DEFAULT_INPUTS[c], grossAnnual: o.input.grossAnnual } } : o,
      ),
    )
  }, [])

  const results = useMemo(() => offers.map((o) => calculate(o.input)), [offers])

  const ACCENTS = ['#0EA5E9', '#8B5CF6']

  // Derived comparison figures (effective value = take-home + benefits).
  const stats = offers.map((offer, idx) => {
    const net = results[idx].netAnnual
    return {
      net,
      benefits: offer.benefits,
      totalComp: offer.input.grossAnnual + offer.benefits, // gross + perks
      value: net + offer.benefits, // what actually lands with you
    }
  })

  const valueDiff = stats[0].value - stats[1].value
  const winnerIdx = valueDiff === 0 ? -1 : valueDiff > 0 ? 0 : 1
  const maxValue = Math.max(stats[0].value, stats[1].value, 1)

  // Surprising inversion: the offer with the higher *gross* takes home *less* after tax.
  const grossA = offers[0].input.grossAnnual
  const grossB = offers[1].input.grossAnnual
  const higherGrossIdx = grossA >= grossB ? 0 : 1
  const higherNetIdx = results[0].netAnnual >= results[1].netAnnual ? 0 : 1
  const inversion =
    Math.abs(grossA - grossB) > 1 &&
    Math.abs(results[0].netAnnual - results[1].netAnnual) > 1 &&
    higherGrossIdx !== higherNetIdx

  return (
    <div className="flex flex-col gap-6">
      {/* Two offers side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {offers.map((offer, idx) => (
          <OfferCard
            key={idx}
            offer={offer}
            accent={ACCENTS[idx]}
            onName={(v) => setName(idx, v)}
            onCountry={(c) => changeCountry(idx, c)}
            onGross={(v) => patchInput(idx, { grossAnnual: v })}
            onRegion={(v) =>
              patchInput(idx, offer.input.country === 'ca' ? { province: v } : { state: v })
            }
            onRetirement={(v) => setRetirement(idx, v)}
            onBenefits={(v) => setBenefits(idx, v)}
          />
        ))}
      </div>

      {/* Comparison summary */}
      <div className="card flex flex-col gap-5">
        <h2 className="text-base font-semibold" style={{ color: 'var(--navy)' }}>
          After-tax comparison
        </h2>

        {/* Per-offer take-home rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {offers.map((offer, idx) => {
            const s = stats[idx]
            const r = results[idx]
            const isWinner = winnerIdx === idx
            return (
              <div
                key={idx}
                className="rounded-xl p-4"
                style={{
                  backgroundColor: isWinner ? 'var(--sky-pale)' : 'transparent',
                  border: `1px solid ${isWinner ? 'var(--sky)' : 'var(--slate-300)'}`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--navy)' }}>{offer.name}</span>
                  {isWinner && <span className="badge badge-green">Best value</span>}
                </div>
                <div className="text-2xl font-semibold tabular-nums" style={{ color: 'var(--green)' }}>
                  {formatCurrency(Math.round(r.netAnnual), offer.input.country)}
                  <span className="text-sm font-normal" style={{ color: 'var(--slate-400)' }}>/yr take-home</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: 'var(--slate-500)' }}>
                  <span>{formatCurrency(Math.round(r.netAnnual / 12), offer.input.country)}/mo</span>
                  <span>{formatPercent(r.effectiveTaxRate)} effective tax</span>
                  {s.benefits > 0 && (
                    <span>+{formatCurrency(s.benefits, offer.input.country)} benefits</span>
                  )}
                </div>
                <div
                  className="mt-2 pt-2 text-xs flex items-center justify-between"
                  style={{ borderTop: '1px solid var(--slate-100)', color: 'var(--slate-600)' }}
                >
                  <span>Total comp (gross + benefits)</span>
                  <span className="font-medium tabular-nums" style={{ color: 'var(--navy)' }}>
                    {formatCurrency(s.totalComp, offer.input.country)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Visual difference bars (effective value = take-home + benefits) */}
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-medium" style={{ color: 'var(--slate-500)' }}>
            Effective value (take-home + benefits)
          </p>
          {offers.map((offer, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-xs w-24 shrink-0 truncate" style={{ color: 'var(--slate-600)' }}>
                {offer.name}
              </span>
              <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--slate-100)' }}>
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${Math.round((stats[idx].value / maxValue) * 100)}%`,
                    backgroundColor: ACCENTS[idx],
                    transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />
              </div>
              <span className="text-xs tabular-nums w-24 text-right shrink-0 font-medium" style={{ color: 'var(--navy)' }}>
                {formatCurrency(Math.round(stats[idx].value), offer.input.country)}
              </span>
            </div>
          ))}
        </div>

        {/* Difference banner */}
        <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--navy)', color: '#fff' }}>
          {winnerIdx === -1 ? (
            <p className="text-sm">Both offers leave you with the same effective value.</p>
          ) : (
            <p className="text-sm">
              <span className="font-semibold">{offers[winnerIdx].name}</span> is worth{' '}
              <span className="font-semibold tabular-nums" style={{ color: 'var(--sky-light)' }}>
                {formatCurrency(Math.round(Math.abs(valueDiff)), offers[winnerIdx].input.country)}/yr
              </span>{' '}
              more ({formatCurrency(Math.round(Math.abs(valueDiff) / 12), offers[winnerIdx].input.country)} per month) after tax and benefits.
            </p>
          )}
        </div>

        {/* Surprising inversion insight */}
        {inversion && (
          <div
            className="rounded-xl p-4 text-sm"
            style={{ backgroundColor: '#fef9ec', color: '#92400e' }}
          >
            💡 Even though <span className="font-semibold">{offers[higherGrossIdx].name}</span> pays{' '}
            {formatCurrency(Math.round(Math.abs(grossA - grossB)), offers[higherGrossIdx].input.country)} more
            gross, <span className="font-semibold">{offers[higherNetIdx].name}</span> takes home{' '}
            {formatCurrency(Math.round(Math.abs(results[0].netAnnual - results[1].netAnnual)), offers[higherNetIdx].input.country)} more
            after tax — thanks to lower income/state taxes.
          </div>
        )}

        <p className="text-xs text-center" style={{ color: 'var(--slate-400)' }}>
          Comparisons across different countries use each offer’s local currency and current tax rates.
        </p>
      </div>
    </div>
  )
}
