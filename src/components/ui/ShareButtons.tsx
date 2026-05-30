'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Link2, ArrowLeftRight } from 'lucide-react'
import type { TaxBreakdown, PayPeriod, Country } from '../../types'
import { formatCurrency, formatPeriod, formatPercent, getPeriodLabel } from '../../lib/formatters'
import { trackEvent } from '../../lib/analytics'

interface ShareButtonsProps {
  breakdown: TaxBreakdown
  period: PayPeriod
  country: Country
}

const COUNTRY_NAMES: Record<Country, string> = {
  us: 'United States',
  uk: 'United Kingdom',
  au: 'Australia',
  ca: 'Canada',
}

function buildResultText(breakdown: TaxBreakdown, period: PayPeriod, country: Country): string {
  const gross = formatCurrency(breakdown.grossAnnual, country)
  const net = formatCurrency(Math.round(formatPeriod(breakdown.netAnnual, period)), country)
  const netAnnual = formatCurrency(breakdown.netAnnual, country)

  const lines: string[] = [
    `TakeHomePay.io — Tax Breakdown`,
    `Country: ${COUNTRY_NAMES[country]}`,
    ``,
    `Gross Salary: ${gross}/year`,
    ``,
    ...breakdown.items
      .filter((i) => i.isDeduction && i.amount > 0.5)
      .map(
        (i) =>
          `  ${i.label.padEnd(26)} ${formatCurrency(Math.round(i.amount), country).padStart(9)}  (${formatPercent(i.percent)})`,
      ),
    ``,
    `  Take-Home (annual)         ${netAnnual.padStart(9)}`,
    `  Take-Home (${getPeriodLabel(period)})  ${net.padStart(9)}`,
    ``,
    `  Effective tax rate: ${formatPercent(breakdown.effectiveTaxRate)}`,
    `  Marginal tax rate:  ${formatPercent(breakdown.marginalTaxRate, 0)}`,
    ``,
    `Calculate yours → ${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://takehomepay.io'}`,
  ]

  return lines.join('\n')
}

function buildShareUrl(breakdown: TaxBreakdown, period: PayPeriod, country: Country): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://takehomepay.io'
  const params = new URLSearchParams({
    gross: String(Math.round(breakdown.grossAnnual)),
    period,
  })
  return `${base}/${country}?${params.toString()}`
}

export default function ShareButtons({ breakdown, period, country }: ShareButtonsProps) {
  const router = useRouter()
  const [copied, setCopied] = useState<'result' | 'url' | null>(null)

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(buildResultText(breakdown, period, country))
      setCopied('result')
      trackEvent({ name: 'result_copied', params: { country, period } })
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard API unavailable (e.g. non-HTTPS dev environment)
    }
  }

  async function shareUrl() {
    try {
      await navigator.clipboard.writeText(buildShareUrl(breakdown, period, country))
      setCopied('url')
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: '8px',
    border: '1px solid var(--slate-300)',
    backgroundColor: 'transparent',
    color: 'var(--slate-700)',
    cursor: 'pointer',
    transition: 'background-color 0.15s, color 0.15s',
    whiteSpace: 'nowrap',
  }

  const btnActive: React.CSSProperties = {
    backgroundColor: 'var(--sky-pale)',
    color: 'var(--sky)',
    borderColor: 'var(--sky)',
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Copy result text */}
      <button
        onClick={copyResult}
        style={copied === 'result' ? { ...btnBase, ...btnActive } : btnBase}
        aria-label="Copy tax breakdown to clipboard"
      >
        <Copy className="w-3.5 h-3.5" />
        {copied === 'result' ? 'Copied!' : 'Copy result'}
      </button>

      {/* Share URL */}
      <button
        onClick={shareUrl}
        style={copied === 'url' ? { ...btnBase, ...btnActive } : btnBase}
        aria-label="Copy shareable link to clipboard"
      >
        <Link2 className="w-3.5 h-3.5" />
        {copied === 'url' ? 'Copied!' : 'Share URL'}
      </button>

      {/* Compare states / provinces */}
      <button
        onClick={() => router.push('/compare')}
        style={btnBase}
        aria-label="Compare tax across states or provinces"
      >
        <ArrowLeftRight className="w-3.5 h-3.5" />
        Compare states
      </button>
    </div>
  )
}
