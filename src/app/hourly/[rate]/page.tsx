import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { calculate } from '../../../lib/tax'
import { formatCurrency, formatPercent } from '../../../lib/formatters'
import { DEFAULT_INPUTS } from '../../../lib/constants'
import { HOURLY_RATES } from '../../../lib/salaryPage'
import { webApplicationJsonLd, faqPageJsonLd } from '../../../lib/seo'
import HourlyCalculator from '../../../components/calculators/HourlyCalculator'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import JsonLd from '../../../components/sections/JsonLd'

type Props = { params: Promise<{ rate: string }> }

// Only the pre-generated rates are valid; other slugs return a real 404.
export const dynamicParams = false

const HOURS_PER_WEEK = 40
const WEEKS = 52

function parseRate(slug: string): number | null {
  const rate = Number(slug)
  if (!Number.isFinite(rate) || rate < 1 || rate > 1000) return null
  return rate
}

function annualFromRate(rate: number): number {
  return Math.round(rate * HOURS_PER_WEEK * WEEKS)
}

// US national (no state tax) — users can add their state in the calculator.
function breakdownForRate(rate: number) {
  return calculate({ ...DEFAULT_INPUTS.us, state: '', grossAnnual: annualFromRate(rate) })
}

export function generateStaticParams(): { rate: string }[] {
  return HOURLY_RATES.map((rate) => ({ rate: String(rate) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { rate: rateSlug } = await params
  const rate = parseRate(rateSlug)
  // Resolve the 404 here (before the body streams) for a real 404 status.
  if (rate === null) notFound()

  const b = breakdownForRate(rate)
  const rateStr = formatCurrency(rate, 'us')
  return {
    title: `${rateStr} an Hour After Tax — Take-Home Pay (2025)`,
    description: `${rateStr} an hour is ${formatCurrency(b.grossAnnual, 'us')} a year. After federal tax and FICA your take-home pay is ${formatCurrency(Math.round(b.netAnnual), 'us')}/year (${formatCurrency(Math.round(b.netAnnual / 12), 'us')}/month). See the full breakdown.`,
    alternates: { canonical: `/hourly/${rateSlug}` },
  }
}

function SimilarRates({ rate }: { rate: number }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>
        Other hourly rates
      </h2>
      <div className="flex flex-wrap gap-3">
        {HOURLY_RATES.filter((r) => r !== rate).map((r) => (
          <Link
            key={r}
            href={`/hourly/${r}`}
            className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}
          >
            {formatCurrency(r, 'us')}/hour after tax
          </Link>
        ))}
      </div>
    </section>
  )
}

export default async function HourlyRatePage({ params }: Props) {
  const { rate: rateSlug } = await params
  const rate = parseRate(rateSlug)
  if (rate === null) notFound()

  const breakdown = breakdownForRate(rate)
  const rateStr = formatCurrency(rate, 'us')
  const grossStr = formatCurrency(breakdown.grossAnnual, 'us')
  const netYr = formatCurrency(Math.round(breakdown.netAnnual), 'us')
  const netMo = formatCurrency(Math.round(breakdown.netAnnual / 12), 'us')

  const headline = `${rateStr} an Hour After Tax (2025)`
  const answer = `Working ${HOURS_PER_WEEK} hours a week at ${rateStr} an hour is ${grossStr} a year. After federal income tax, Social Security and Medicare, your take-home pay is about ${netYr} a year (${netMo} a month). Your effective tax rate is ${formatPercent(breakdown.effectiveTaxRate)}. Add your state in the calculator above for an exact figure.`

  const faq = faqPageJsonLd([
    { q: `How much is ${rateStr} an hour after tax?`, a: answer },
  ])

  return (
    <>
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <h1
            style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}
          >
            {headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--slate-600)' }}>
            {answer}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <HourlyCalculator initialRate={rate} />
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>
          Full {rateStr}/hour breakdown
        </h2>
        <BreakdownTable breakdown={breakdown} country="us" />
      </section>

      <SimilarRates rate={rate} />

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="hourly-rate-leaderboard" format="leaderboard" />
      </div>

      <MoreCalculators />

      <JsonLd data={faq} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
