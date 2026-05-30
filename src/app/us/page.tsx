import type { Metadata } from 'next'
import SalaryCalculator from '../../components/calculators/SalaryCalculator'
import AdBanner from '../../components/AdBanner'
import Hero from '../../components/sections/Hero'
import PopularExamples from '../../components/sections/PopularExamples'
import MoreCalculators from '../../components/sections/MoreCalculators'
import HowItWorks from '../../components/sections/HowItWorks'
import Faq from '../../components/sections/Faq'
import JsonLd from '../../components/sections/JsonLd'
import { faqPageJsonLd, webApplicationJsonLd } from '../../lib/seo'
import { US_FAQ } from '../../lib/faq'

export const metadata: Metadata = {
  title: 'US Salary Calculator 2026 — Federal & State Tax Calculator',
  description:
    'Calculate your US take-home pay after federal income tax, state tax, Social Security and Medicare. Free 2026 salary calculator covering all 50 states.',
  alternates: { canonical: '/us' },
}

const US_EXAMPLES = [
  { label: '$50K salary after tax', href: '/?gross=50000&country=us' },
  { label: '$75K salary after tax', href: '/?gross=75000&country=us' },
  { label: '$100K salary after tax', href: '/?gross=100000&country=us' },
  { label: '$150K salary after tax', href: '/?gross=150000&country=us' },
  { label: '$200K salary after tax', href: '/?gross=200000&country=us' },
]

export default function USPage() {
  return (
    <>
      <Hero
        eyebrow="United States · 2026 tax year"
        title="US Salary Calculator — your take-home pay after tax"
        subheading="See your net pay after federal income tax, state tax, Social Security and Medicare. Pick any of the 50 states for an accurate 2026 estimate."
        titleId="us-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator initialCountry="us" locked />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="us-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular salary examples"
        intro="$50K · $75K · $100K · $150K · $200K salary after tax — tap to pre-fill the calculator."
        examples={US_EXAMPLES}
      />

      {/* US-specific SEO content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--navy)' }}>
          How US take-home pay is calculated
        </h2>
        <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--slate-600)' }}>
          <p>
            Your take-home pay starts with your gross salary and subtracts four main deductions:
            federal income tax, state income tax, and the two FICA taxes — Social Security and
            Medicare. Federal tax is progressive across seven 2026 brackets from 10% to 37%, applied
            to your income after the $14,600 standard deduction (single) and any pre-tax 401(k) or
            health-premium contributions.
          </p>
          <p>
            State income tax varies dramatically. Nine states — Alaska, Florida, Nevada, New
            Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming — levy no income tax on
            wages at all, so residents there keep more of every paycheck. Others, such as California
            and New York, use progressive brackets that can exceed 10% at higher incomes. This
            calculator applies the correct 2026 rates for the state you select.
          </p>
          <p>
            FICA is a flat 7.65%: Social Security at 6.2% up to the $168,600 wage base, plus Medicare
            at 1.45% on all wages (with an extra 0.9% above $200,000 for single filers). Contributing
            to a traditional 401(k) lowers your federal and state income tax but not FICA, since those
            taxes still apply to retirement contributions.
          </p>
        </div>
      </section>

      <MoreCalculators />
      <HowItWorks />
      <Faq items={US_FAQ} />

      <JsonLd data={faqPageJsonLd(US_FAQ)} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
