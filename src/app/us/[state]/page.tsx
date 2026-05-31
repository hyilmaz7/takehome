import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { calculate } from '../../../lib/tax'
import { formatCurrency, formatPercent } from '../../../lib/formatters'
import { US_STATES, NO_TAX_STATES } from '../../../lib/constants'
import { STATE_CALCULATOR_PAGES, stateNameToSlug, stateCodeToSlug } from '../../../lib/salaryPage'
import { faqPageJsonLd, webApplicationJsonLd } from '../../../lib/seo'
import { US_FAQ } from '../../../lib/faq'
import SalaryCalculator from '../../../components/calculators/SalaryCalculator'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import PopularExamples from '../../../components/sections/PopularExamples'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import Faq from '../../../components/sections/Faq'
import JsonLd from '../../../components/sections/JsonLd'

type Props = { params: Promise<{ state: string }> }

export const dynamicParams = false

const REF_SALARY = 100000

export function generateStaticParams(): { state: string }[] {
  return STATE_CALCULATOR_PAGES.map((code) => ({ state: stateCodeToSlug(code) }))
}

function resolveState(slug: string) {
  const s = US_STATES.find((x) => stateNameToSlug(x.name) === slug)
  if (!s || !STATE_CALCULATOR_PAGES.includes(s.code)) return null
  return s
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params
  const s = resolveState(state)
  if (!s) notFound()
  return {
    title: `${s.name} Salary Calculator 2025 — Take-Home Pay After Tax`,
    description: `Calculate your ${s.name} take-home pay after federal tax, ${s.name} state tax and FICA. Free 2025 salary calculator with a full breakdown.`,
    alternates: { canonical: `/us/${state}` },
  }
}

export default async function StateCalculatorPage({ params }: Props) {
  const { state } = await params
  const s = resolveState(state)
  if (!s) notFound()

  const noStateTax = NO_TAX_STATES.has(s.code)
  const breakdown = calculate({ country: 'us', grossAnnual: REF_SALARY, filingStatus: 'single', state: s.code })
  const netMonthly = formatCurrency(Math.round(breakdown.netAnnual / 12), 'us')

  const examples = [50000, 75000, 100000, 150000, 200000].map((amt) => ({
    label: `$${amt / 1000}K after tax`,
    href: `/salary/${amt}-${stateCodeToSlug(s.code)}`,
  }))

  const faqLd = faqPageJsonLd(US_FAQ)

  return (
    <>
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-10 text-center">
          <p
            className="inline-flex items-center text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ backgroundColor: '#fff', color: 'var(--sky)' }}
          >
            United States · {s.name} · 2025
          </p>
          <h1
            className="mx-auto max-w-2xl"
            style={{ fontSize: '36px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}
          >
            {s.name} Salary Calculator
          </h1>
          <p className="mx-auto max-w-xl mt-4 text-base sm:text-lg leading-relaxed" style={{ color: 'var(--slate-500)' }}>
            {noStateTax
              ? `${s.name} has no state income tax, so you keep more of every paycheck. See your exact take-home after federal tax and FICA.`
              : `See your ${s.name} take-home pay after federal income tax, ${s.name} state tax and FICA — updated for 2025.`}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator initialCountry="us" initialRegion={s.code} initialGross={REF_SALARY} locked />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="state-leaderboard" format="leaderboard" />
      </div>

      {/* Static reference breakdown */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-2" style={{ color: 'var(--navy)' }}>
          $100,000 salary in {s.name}: the breakdown
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--slate-600)' }}>
          A $100,000 salary in {s.name} leaves a monthly take-home of about{' '}
          <strong>{netMonthly}</strong> ({formatPercent(breakdown.effectiveTaxRate)} effective tax rate).
          {noStateTax
            ? ` There is no ${s.name} state income tax to deduct.`
            : ` That includes ${formatCurrency(Math.round(breakdown.stateTax), 'us')} of ${s.name} state income tax.`}
        </p>
        <BreakdownTable breakdown={breakdown} country="us" />
      </section>

      <PopularExamples
        title={`Popular salaries in ${s.name}`}
        intro="Tap a salary for its full after-tax breakdown in this state."
        examples={examples}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
        <p className="text-sm" style={{ color: 'var(--slate-600)' }}>
          Curious how {s.name} compares? See our{' '}
          <Link href="/take-home-by-state" className="underline" style={{ color: 'var(--sky)' }}>
            take-home pay by US state
          </Link>{' '}
          ranking, or switch states in the{' '}
          <Link href="/us" className="underline" style={{ color: 'var(--sky)' }}>
            US salary calculator
          </Link>
          .
        </p>
      </section>

      <MoreCalculators />
      <Faq items={US_FAQ} />

      <JsonLd data={faqLd} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
