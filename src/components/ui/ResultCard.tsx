'use client'

import { useState, useEffect, useRef, useId } from 'react'
import dynamic from 'next/dynamic'
import type { TaxBreakdown, PayPeriod, Country } from '../../types'
import { formatCurrency, formatPeriod, formatPercent, getPeriodLabel } from '../../lib/formatters'
import { trackEvent } from '../../lib/analytics'
import PeriodToggle from './PeriodToggle'

// The breakdown bar is interactive and client-only; load it lazily with a
// same-height skeleton so there is no layout shift while it hydrates.
const BreakdownBar = dynamic(() => import('../charts/BreakdownBar'), {
  ssr: false,
  loading: () => (
    <div
      className="animate-pulse w-full"
      style={{ height: 10, borderRadius: 5, backgroundColor: 'var(--slate-100)' }}
    />
  ),
})

interface ResultCardProps {
  breakdown: TaxBreakdown
  period: PayPeriod
  country: Country
}

export default function ResultCard({ breakdown, period, country }: ResultCardProps) {
  const [displayPeriod, setDisplayPeriod] = useState<PayPeriod>(period)
  const numberRef = useRef<HTMLSpanElement>(null)
  const panelId = useId()

  // Sync if parent changes period
  useEffect(() => {
    setDisplayPeriod(period)
  }, [period])

  // Animate the hero number whenever net pay OR period changes
  useEffect(() => {
    const el = numberRef.current
    if (!el) return
    el.classList.remove('animate-result')
    // Force reflow so removing+adding the class restarts the animation
    void el.offsetWidth
    el.classList.add('animate-result')
  }, [breakdown.netAnnual, displayPeriod])

  const netPeriod = formatPeriod(breakdown.netAnnual, displayPeriod)
  const grossPeriod = formatPeriod(breakdown.grossAnnual, displayPeriod)

  const deductionItems = breakdown.items.filter((i) => i.isDeduction && i.amount > 0.5)
  const takeHomeItem = breakdown.items.find((i) => !i.isDeduction)

  return (
    <div id={panelId} role="region" aria-label="Tax breakdown result">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="mb-5">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--slate-500)' }}
        >
          Your take-home pay
        </p>

        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <span
              ref={numberRef}
              className="result-number positive block"
              aria-live="polite"
              aria-atomic="true"
            >
              {formatCurrency(Math.round(netPeriod), country)}
            </span>
            <p className="text-sm mt-1" style={{ color: 'var(--slate-500)' }}>
              {getPeriodLabel(displayPeriod)} · gross{' '}
              <span style={{ color: 'var(--slate-700)' }}>
                {formatCurrency(Math.round(grossPeriod), country)}
              </span>
            </p>
          </div>
          <PeriodToggle
            value={displayPeriod}
            onChange={(p) => {
              setDisplayPeriod(p)
              trackEvent({ name: 'period_changed', params: { period: p } })
            }}
            compact
          />
        </div>
      </div>

      {/* ── Stacked bar ──────────────────────────────────────── */}
      <div className="mb-5">
        <BreakdownBar items={breakdown.items} />
      </div>

      {/* ── Itemized breakdown ───────────────────────────────── */}
      <div className="flex flex-col gap-0.5">
        {deductionItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: '1px solid var(--slate-100)' }}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span className="text-sm truncate" style={{ color: 'var(--slate-700)' }}>
                {item.label}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-2">
              <span
                className="text-xs tabular-nums"
                style={{ color: 'var(--slate-500)', minWidth: '3rem', textAlign: 'right' }}
              >
                {formatPercent(item.percent)}
              </span>
              <span
                className="text-sm font-medium tabular-nums"
                style={{ color: 'var(--slate-900)', minWidth: '4.5rem', textAlign: 'right' }}
              >
                {formatCurrency(Math.round(formatPeriod(item.amount, displayPeriod)), country)}
              </span>
            </div>
          </div>
        ))}

        {/* Take-home row */}
        {takeHomeItem && (
          <div className="flex items-center justify-between py-2.5 mt-1 rounded-lg px-2.5 -mx-2.5" style={{ backgroundColor: 'var(--sky-pale)' }}>
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: takeHomeItem.color }}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
                Take-Home Pay
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className="text-xs tabular-nums font-medium"
                style={{ color: 'var(--sky)', minWidth: '3rem', textAlign: 'right' }}
              >
                {formatPercent(takeHomeItem.percent)}
              </span>
              <span
                className="text-sm font-semibold tabular-nums"
                style={{ color: 'var(--green)', minWidth: '4.5rem', textAlign: 'right' }}
              >
                {formatCurrency(Math.round(netPeriod), country)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Tax rate badges ──────────────────────────────────── */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
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
  )
}
