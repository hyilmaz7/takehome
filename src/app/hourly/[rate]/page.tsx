import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { calculate } from '../../../lib/tax'
import { formatCurrency, formatHourlyRate, formatPercent } from '../../../lib/formatters'
import { DEFAULT_INPUTS } from '../../../lib/constants'
import { HOURLY_RATES } from '../../../lib/salaryPage'
import { webApplicationJsonLd, faqPageJsonLd, type FaqEntry } from '../../../lib/seo'
import HourlyCalculator from '../../../components/calculators/HourlyCalculator'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import JsonLd from '../../../components/sections/JsonLd'
import { H2, P, A } from '../../../components/sections/Prose'

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

function annualForHours(rate: number, hours: number): number {
  return Math.round(rate * hours * WEEKS)
}

// US national (no state tax) — users can add their state in the calculator.
function breakdownForAnnual(grossAnnual: number) {
  return calculate({ ...DEFAULT_INPUTS.us, state: '', grossAnnual })
}

function breakdownForRate(rate: number) {
  return breakdownForAnnual(annualForHours(rate, HOURS_PER_WEEK))
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
  const rateStr = formatHourlyRate(rate)
  return {
    title: `${rateStr} an Hour Is How Much a Year After Taxes? (2025)`,
    description: `${rateStr} an hour is ${formatCurrency(b.grossAnnual, 'us')} a year before tax. After federal tax and FICA your take-home pay is ${formatCurrency(Math.round(b.netAnnual), 'us')}/year — about ${formatCurrency(Math.round(b.netAnnual / 12), 'us')}/month. See the full breakdown by week, month and year.`,
    alternates: { canonical: `/hourly/${rateSlug}` },
  }
}

// ─── Pay-period breakdown (gross vs take-home for each pay frequency) ─────────

function PeriodBreakdown({
  grossAnnual,
  netAnnual,
}: {
  grossAnnual: number
  netAnnual: number
}) {
  const money = (n: number) => formatCurrency(Math.round(n), 'us')
  const rows: { label: string; divisor: number }[] = [
    { label: 'Per year', divisor: 1 },
    { label: 'Per month', divisor: 12 },
    { label: 'Every 2 weeks', divisor: 26 },
    { label: 'Per week', divisor: 52 },
    { label: 'Per day (8h)', divisor: 260 },
  ]
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
            <th className="text-left font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Pay period
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Gross (before tax)
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Take-home (after tax)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} style={{ borderTop: '1px solid var(--slate-100)' }}>
              <td className="px-5 py-3 font-medium" style={{ color: 'var(--slate-800)' }}>
                {r.label}
              </td>
              <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>
                {money(grossAnnual / r.divisor)}
              </td>
              <td className="px-5 py-3 text-right tabular-nums font-semibold" style={{ color: 'var(--green)' }}>
                {money(netAnnual / r.divisor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Same rate, different weekly hours (part-time vs full-time) ───────────────

function HoursBreakdown({ rate }: { rate: number }) {
  const money = (n: number) => formatCurrency(Math.round(n), 'us')
  const hoursOptions = [20, 25, 30, 35, 40]
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
            <th className="text-left font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Hours / week
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Gross / year
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Take-home / year
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Take-home / month
            </th>
          </tr>
        </thead>
        <tbody>
          {hoursOptions.map((h) => {
            const gross = annualForHours(rate, h)
            const b = breakdownForAnnual(gross)
            const isFullTime = h === HOURS_PER_WEEK
            return (
              <tr
                key={h}
                style={{
                  borderTop: '1px solid var(--slate-100)',
                  backgroundColor: isFullTime ? 'var(--sky-pale)' : undefined,
                }}
              >
                <td className="px-5 py-3 font-medium" style={{ color: 'var(--slate-800)' }}>
                  {h} hrs{isFullTime ? ' (full-time)' : ''}
                </td>
                <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>
                  {money(gross)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums font-semibold" style={{ color: 'var(--green)' }}>
                  {money(b.netAnnual)}
                </td>
                <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-600)' }}>
                  {money(b.netAnnual / 12)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ─── Nearby rates (closest by value) instead of dumping all 60+ ──────────────

function SimilarRates({ rate }: { rate: number }) {
  const nearby = [...HOURLY_RATES]
    .filter((r) => r !== rate)
    .sort((a, b) => Math.abs(a - rate) - Math.abs(b - rate))
    .slice(0, 10)
    .sort((a, b) => a - b)
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>
        Nearby hourly rates
      </h2>
      <div className="flex flex-wrap gap-3">
        {nearby.map((r) => (
          <Link
            key={r}
            href={`/hourly/${r}`}
            className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}
          >
            {formatHourlyRate(r)}/hour after tax
          </Link>
        ))}
        <Link
          href="/hourly"
          className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium underline"
          style={{ color: 'var(--sky)' }}
        >
          See all hourly rates →
        </Link>
      </div>
    </section>
  )
}

// ─── Visible FAQ (mirrored into FAQPage JSON-LD for rich results) ─────────────

function FaqSection({ items }: { items: FaqEntry[] }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.q}>
            <h3 className="text-lg font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>
              {item.q}
            </h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--slate-700)' }}>
              {item.a}
            </p>
          </div>
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
  const rateStr = formatHourlyRate(rate)
  const grossStr = formatCurrency(breakdown.grossAnnual, 'us')
  const netYr = formatCurrency(Math.round(breakdown.netAnnual), 'us')
  const netMo = formatCurrency(Math.round(breakdown.netAnnual / 12), 'us')
  const netWk = formatCurrency(Math.round(breakdown.netAnnual / 52), 'us')
  const netBiweekly = formatCurrency(Math.round(breakdown.netAnnual / 26), 'us')
  const effStr = formatPercent(breakdown.effectiveTaxRate)

  const headline = `${rateStr} an Hour After Tax (2025)`
  const answer = `Working ${HOURS_PER_WEEK} hours a week at ${rateStr} an hour is ${grossStr} a year. After federal income tax, Social Security and Medicare, your take-home pay is about ${netYr} a year (${netMo} a month). Your effective tax rate is ${effStr}. Add your state in the calculator above for an exact figure.`

  // Q&A reused for both the visible section and the FAQPage structured data.
  const faqItems: FaqEntry[] = [
    {
      q: `How much is ${rateStr} an hour after taxes?`,
      a: `At ${rateStr} an hour working full-time (40 hours a week), you earn ${grossStr} a year before tax. After federal income tax and FICA (Social Security and Medicare), your take-home pay is roughly ${netYr} a year, or ${netMo} a month. This is a US national estimate with no state income tax — add your state in the calculator for an exact number.`,
    },
    {
      q: `${rateStr} an hour is how much a year?`,
      a: `${rateStr} an hour is ${grossStr} a year before tax, based on a standard full-time schedule of 40 hours a week for 52 weeks. After tax, that comes to about ${netYr} a year in take-home pay.`,
    },
    {
      q: `${rateStr} an hour is how much a month?`,
      a: `${rateStr} an hour works out to about ${formatCurrency(Math.round(breakdown.grossAnnual / 12), 'us')} a month before tax, and roughly ${netMo} a month after federal tax and FICA.`,
    },
    {
      q: `${rateStr} an hour is how much biweekly and weekly?`,
      a: `Paid every two weeks, ${rateStr} an hour is about ${netBiweekly} take-home per paycheck. Weekly, that's roughly ${netWk} after tax. Before tax, a 40-hour week at ${rateStr} an hour is ${formatCurrency(Math.round(rate * HOURS_PER_WEEK), 'us')}.`,
    },
  ]

  const faq = faqPageJsonLd(faqItems)

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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
        <H2>{rateStr} an hour by pay period</H2>
        <P>
          Here&apos;s what {rateStr} an hour looks like across each pay frequency, both before tax
          (gross) and after federal tax and FICA (take-home), assuming a full-time 40-hour week.
        </P>
        <PeriodBreakdown grossAnnual={breakdown.grossAnnual} netAnnual={breakdown.netAnnual} />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <H2>What if you work part-time?</H2>
        <P>
          Your annual pay scales with the hours you work. The table below shows {rateStr} an hour at
          common weekly schedules — useful if you work part-time or pick up extra shifts.
        </P>
        <HoursBreakdown rate={rate} />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <H2>How we worked this out</H2>
        <P>
          To convert an hourly wage to an annual salary we multiply by the hours worked per week and
          by 52 weeks: {rateStr} × {HOURS_PER_WEEK} × 52 = {grossStr} a year. We then run that gross
          figure through the 2025 US federal tax brackets, the standard deduction, and FICA (6.2%
          Social Security up to the wage base, plus 1.45% Medicare) to get your take-home pay.
        </P>
        <P>
          These figures assume a salaried full-year schedule with no state income tax and no overtime
          premium. Real paychecks vary with your state, pre-tax deductions like a{' '}
          <A href="/guides/401k-and-take-home-pay">401(k)</A>, and benefits. To see your exact
          number, enter your state in the calculator above or read{' '}
          <A href="/guides/how-much-tax-on-paycheck">how much tax comes out of your paycheck</A>.
        </P>
      </section>

      <FaqSection items={faqItems} />

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
