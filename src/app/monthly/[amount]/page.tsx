import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatCurrency, formatHourlyRate, formatPercent } from '../../../lib/formatters'
import { MONTHLY_AMOUNTS, monthlySlug, parseMonthlySlug, breakdownForMonthly } from '../../../lib/monthly'
import { US_SALARY_AMOUNTS } from '../../../lib/salaryPage'
import { REVERSE_MONTHLY, reverseSlug } from '../../../lib/reverse'
import { webApplicationJsonLd, faqPageJsonLd, type FaqEntry } from '../../../lib/seo'
import SalaryCalculator from '../../../components/calculators/SalaryCalculator'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import JsonLd from '../../../components/sections/JsonLd'
import { H2, P, A } from '../../../components/sections/Prose'

type Props = { params: Promise<{ amount: string }> }

// Only the pre-generated amounts are valid; other slugs return a real 404.
export const dynamicParams = false

const HOURS_PER_WEEK = 40
const WEEKS = 52

export function generateStaticParams(): { amount: string }[] {
  return MONTHLY_AMOUNTS.map((a) => ({ amount: monthlySlug(a) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount: slug } = await params
  const monthly = parseMonthlySlug(slug)
  if (monthly === null) notFound()

  const b = breakdownForMonthly(monthly)
  const monthlyStr = formatCurrency(monthly, 'us')
  return {
    title: `${monthlyStr} a Month Is How Much a Year? (After Taxes, 2025)`,
    description: `${monthlyStr} a month is ${formatCurrency(b.grossAnnual, 'us')} a year before tax. After federal tax and FICA your take-home pay is about ${formatCurrency(Math.round(b.netAnnual), 'us')} a year — ${formatCurrency(Math.round(b.netAnnual / 12), 'us')} a month. See the full breakdown by year, month, week and hour.`,
    alternates: { canonical: `/monthly/${slug}` },
  }
}

// ─── Pay-period breakdown (gross vs take-home for each pay frequency) ─────────

function PeriodBreakdown({ grossAnnual, netAnnual }: { grossAnnual: number; netAnnual: number }) {
  const money = (n: number) => formatCurrency(Math.round(n), 'us')
  const rows: { label: string; divisor: number }[] = [
    { label: 'Per year', divisor: 1 },
    { label: 'Per month', divisor: 12 },
    { label: 'Every 2 weeks', divisor: 26 },
    { label: 'Per week', divisor: 52 },
    { label: 'Per hour (40h week)', divisor: WEEKS * HOURS_PER_WEEK },
  ]
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
            <th className="text-left font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>Pay period</th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>Gross (before tax)</th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>Take-home (after tax)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} style={{ borderTop: '1px solid var(--slate-100)' }}>
              <td className="px-5 py-3 font-medium" style={{ color: 'var(--slate-800)' }}>{r.label}</td>
              <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>{money(grossAnnual / r.divisor)}</td>
              <td className="px-5 py-3 text-right tabular-nums font-semibold" style={{ color: 'var(--green)' }}>{money(netAnnual / r.divisor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Nearby monthly amounts (closest by value) ───────────────────────────────

function NearbyAmounts({ monthly }: { monthly: number }) {
  const nearby = [...MONTHLY_AMOUNTS]
    .filter((a) => a !== monthly)
    .sort((a, b) => Math.abs(a - monthly) - Math.abs(b - monthly))
    .slice(0, 10)
    .sort((a, b) => a - b)
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>Nearby monthly amounts</h2>
      <div className="flex flex-wrap gap-3">
        {nearby.map((a) => (
          <Link
            key={a}
            href={`/monthly/${a}`}
            className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}
          >
            {formatCurrency(a, 'us')}/month after tax
          </Link>
        ))}
        <Link href="/monthly" className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium underline" style={{ color: 'var(--sky)' }}>
          See all monthly amounts →
        </Link>
      </div>
    </section>
  )
}

// ─── Visible FAQ (mirrored into FAQPage JSON-LD for rich results) ─────────────

function FaqSection({ items }: { items: FaqEntry[] }) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>Frequently asked questions</h2>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <div key={item.q}>
            <h3 className="text-lg font-semibold mb-1.5" style={{ color: 'var(--navy)' }}>{item.q}</h3>
            <p className="text-[15px] leading-relaxed" style={{ color: 'var(--slate-700)' }}>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default async function MonthlyAmountPage({ params }: Props) {
  const { amount: slug } = await params
  const monthly = parseMonthlySlug(slug)
  if (monthly === null) notFound()

  const breakdown = breakdownForMonthly(monthly)
  const annualGross = monthly * 12
  const hourly = annualGross / (WEEKS * HOURS_PER_WEEK)

  const monthlyStr = formatCurrency(monthly, 'us')
  const grossStr = formatCurrency(annualGross, 'us')
  const netYr = formatCurrency(Math.round(breakdown.netAnnual), 'us')
  const netMo = formatCurrency(Math.round(breakdown.netAnnual / 12), 'us')
  const hourlyStr = formatHourlyRate(Number(hourly.toFixed(2)))
  const effStr = formatPercent(breakdown.effectiveTaxRate)

  const headline = `${monthlyStr} a Month After Tax`
  const answer = `${monthlyStr} a month is ${grossStr} a year before tax. After federal income tax, Social Security and Medicare, your take-home pay is about ${netYr} a year — roughly ${netMo} a month. That works out to about ${hourlyStr} an hour on a full-time 40-hour week, and your effective tax rate is ${effStr}. Add your state in the calculator below for an exact figure.`

  // Deep-link to the matching pages only when they actually exist (both use
  // dynamicParams = false), so we never emit a broken internal link.
  const hasSalaryPage = US_SALARY_AMOUNTS.includes(annualGross)
  const hasReversePage = REVERSE_MONTHLY.includes(monthly)

  const faqItems: FaqEntry[] = [
    {
      q: `${monthlyStr} a month is how much a year?`,
      a: `${monthlyStr} a month is ${grossStr} a year before tax (${monthlyStr} × 12). After federal income tax and FICA (Social Security and Medicare), that comes to about ${netYr} a year in take-home pay.`,
    },
    {
      q: `How much is ${monthlyStr} a month after taxes?`,
      a: `Earning ${monthlyStr} a month (${grossStr} a year), your take-home pay is roughly ${netYr} a year, or ${netMo} a month, after federal tax and FICA. This is a US national estimate with no state income tax — add your state in the calculator for an exact number.`,
    },
    {
      q: `${monthlyStr} a month is how much an hour?`,
      a: `${monthlyStr} a month is about ${hourlyStr} an hour before tax, based on a full-time schedule of 40 hours a week for 52 weeks (${grossStr} a year ÷ 2,080 hours).`,
    },
    {
      q: `What if ${monthlyStr} is my take-home, not my gross?`,
      a: hasReversePage
        ? `If you want ${monthlyStr} a month in take-home pay (after tax), you'll need a higher gross salary. See our reverse calculation for the exact gross you need to take home ${monthlyStr} a month.`
        : `If ${monthlyStr} is the amount you want left after tax (not your gross pay), you'll need to earn more than ${grossStr} a year. Use the reverse calculator to find the gross salary required to hit that take-home target.`,
    },
  ]

  const faq = faqPageJsonLd(faqItems)

  return (
    <>
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <h1 style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
            {headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--slate-600)' }}>{answer}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <SalaryCalculator initialCountry="us" initialGross={annualGross} />
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>Full {monthlyStr}/month breakdown</h2>
        <BreakdownTable breakdown={breakdown} country="us" />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
        <H2>{monthlyStr} a month by pay period</H2>
        <P>
          Here&apos;s what {monthlyStr} a month looks like across each pay frequency, both before tax
          (gross) and after federal tax and FICA (take-home), assuming a full-time 40-hour week.
        </P>
        <PeriodBreakdown grossAnnual={annualGross} netAnnual={breakdown.netAnnual} />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <H2>How we worked this out</H2>
        <P>
          To turn monthly pay into an annual salary we multiply by 12: {monthlyStr} × 12 = {grossStr} a
          year. We then run that gross figure through the 2025 US federal tax brackets, the standard
          deduction, and FICA (6.2% Social Security up to the wage base, plus 1.45% Medicare) to get
          your take-home pay of about {netYr} a year ({netMo} a month).
        </P>
        <P>
          These figures assume a full year of equal monthly paychecks with no state income tax and no
          pre-tax deductions. Your real take-home varies with your state, a{' '}
          <A href="/guides/401k-and-take-home-pay">401(k)</A>, and benefits.{' '}
          {hasSalaryPage ? (
            <>
              See the full annual view on the <A href={`/salary/${annualGross}`}>{grossStr} salary page</A>, or read{' '}
            </>
          ) : (
            <>Read </>
          )}
          <A href="/guides/how-much-tax-on-paycheck">how much tax comes out of your paycheck</A>.
        </P>
      </section>

      <FaqSection items={faqItems} />

      <NearbyAmounts monthly={monthly} />

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="monthly-amount-leaderboard" format="leaderboard" />
      </div>

      <MoreCalculators />

      <JsonLd data={faq} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
