import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { calculate } from '../../../lib/tax'
import { formatCurrency, formatPercent } from '../../../lib/formatters'
import {
  solveGrossForNet,
  parseReverseSlug,
  reverseSlug,
  REVERSE_MONTHLY,
  REVERSE_ANNUAL,
} from '../../../lib/reverse'
import { faqPageJsonLd, webApplicationJsonLd } from '../../../lib/seo'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import PopularExamples from '../../../components/sections/PopularExamples'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import JsonLd from '../../../components/sections/JsonLd'

type Props = { params: Promise<{ target: string }> }

export const dynamicParams = false

export function generateStaticParams(): { target: string }[] {
  return [
    ...REVERSE_MONTHLY.map((n) => ({ target: reverseSlug(n, 'month') })),
    ...REVERSE_ANNUAL.map((n) => ({ target: reverseSlug(n, 'year') })),
  ]
}

const usInput = (state = '') => ({ country: 'us' as const, grossAnnual: 0, filingStatus: 'single' as const, state })

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { target } = await params
  const r = parseReverseSlug(target)
  if (!r) notFound()
  const gross = solveGrossForNet(r.annualNet, usInput(''))
  return {
    title: `What Salary to Take Home ${formatCurrency(r.net, 'us')} a ${r.period}? (2025)`,
    description: `To take home ${formatCurrency(r.net, 'us')} a ${r.period} after tax you need a gross salary of about ${formatCurrency(gross, 'us')} in a no-tax US state. See the breakdown and California comparison.`,
    alternates: { canonical: `/reverse/${target}` },
  }
}

export default async function ReverseTargetPage({ params }: Props) {
  const { target } = await params
  const r = parseReverseSlug(target)
  if (!r) notFound()

  const grossNational = solveGrossForNet(r.annualNet, usInput(''))
  const grossCA = solveGrossForNet(r.annualNet, usInput('CA'))
  const breakdown = calculate({ ...usInput(''), grossAnnual: grossNational })

  const netStr = formatCurrency(r.net, 'us')
  const annualNetStr = formatCurrency(r.annualNet, 'us')
  const grossStr = formatCurrency(grossNational, 'us')
  const grossCAStr = formatCurrency(grossCA, 'us')

  const answer = `To take home ${netStr} a ${r.period} (${annualNetStr} a year) after tax, you need a gross salary of about ${grossStr} in a no-income-tax state. In a higher-tax state like California you'd need closer to ${grossCAStr}. These assume a single filer with no other deductions.`

  // Other monthly targets for internal linking.
  const others = REVERSE_MONTHLY.filter((n) => !(r.period === 'month' && n === r.net))
    .slice(0, 8)
    .map((n) => ({ label: `${formatCurrency(n, 'us')} / month`, href: `/reverse/${reverseSlug(n, 'month')}` }))

  const faq = faqPageJsonLd([{ q: `What salary do I need to take home ${netStr} a ${r.period}?`, a: answer }])

  return (
    <>
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <h1 style={{ fontSize: '32px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
            What salary do I need to take home {netStr} a {r.period}?
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--slate-600)' }}>
            {answer}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-2" style={{ color: 'var(--navy)' }}>
          The breakdown on a {grossStr} salary
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--slate-500)' }}>
          This is the gross salary that nets {netStr}/{r.period} in a no-tax state — single filer,
          {' '}{formatPercent(breakdown.effectiveTaxRate)} effective tax rate.
        </p>
        <BreakdownTable breakdown={breakdown} country="us" />
        <p className="text-xs mt-4" style={{ color: 'var(--slate-400)' }}>
          Estimate for a single US filer, 2025 rates. Your state, filing status and pre-tax
          contributions change the answer — use the{' '}
          <Link href="/reverse" className="underline" style={{ color: 'var(--sky)' }}>reverse salary calculator</Link>{' '}
          to find your exact figure (and for the UK, Australia and Canada).
        </p>
      </section>

      <div className="hidden md:flex justify-center my-6 px-4">
        <AdBanner slot="reverse-target-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Other take-home targets"
        intro="See the gross salary needed for other monthly take-home goals."
        examples={others}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
        <p className="text-sm" style={{ color: 'var(--slate-600)' }}>
          Read the full explainer in{' '}
          <Link href="/guides/what-salary-for-5000-month" className="underline" style={{ color: 'var(--sky)' }}>
            what salary do I need to take home $5,000 a month
          </Link>
          , or see how your state changes it in{' '}
          <Link href="/take-home-by-state" className="underline" style={{ color: 'var(--sky)' }}>take-home by state</Link>.
        </p>
      </section>

      <MoreCalculators />

      <JsonLd data={faq} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
