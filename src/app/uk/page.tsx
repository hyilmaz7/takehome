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
import { UK_FAQ } from '../../lib/faq'

export const metadata: Metadata = {
  title: 'UK Salary Calculator 2026/27 — Income Tax & NI Calculator',
  description:
    'Calculate your UK take-home pay for the 2026/27 tax year. Includes income tax, National Insurance, student loan and pension deductions.',
  alternates: { canonical: '/uk' },
}

const UK_EXAMPLES = [
  { label: '£25K after tax', href: '/uk?gross=25000' },
  { label: '£30K after tax', href: '/uk?gross=30000' },
  { label: '£40K after tax', href: '/uk?gross=40000' },
  { label: '£50K after tax', href: '/uk?gross=50000' },
  { label: '£60K after tax', href: '/uk?gross=60000' },
  { label: '£80K after tax', href: '/uk?gross=80000' },
  { label: '£100K after tax', href: '/uk?gross=100000' },
]

export default function UKPage() {
  return (
    <>
      <Hero
        eyebrow="United Kingdom · 2026/27 tax year"
        title="UK Salary Calculator — income tax & National Insurance"
        subheading="See your take-home pay after income tax, National Insurance, student loan and pension. Updated for the 2026/27 tax year."
        titleId="uk-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator initialCountry="uk" locked />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="uk-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular salary examples"
        intro="£25K · £30K · £40K · £50K · £60K · £80K · £100K — tap to pre-fill the calculator."
        examples={UK_EXAMPLES}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--navy)' }}>
          How UK take-home pay is calculated
        </h2>
        <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--slate-600)' }}>
          <p>
            UK take-home pay is your gross salary minus income tax, National Insurance and any pension
            or student loan deductions. For 2026/27 the personal allowance is £12,570 — earn less than
            that and you pay no income tax. Above it, the basic rate of 20% applies up to £50,270, the
            higher rate of 40% up to £125,140, and the additional rate of 45% above that.
          </p>
          <p>
            National Insurance is charged separately: employees pay 8% on earnings between £12,570 and
            £50,270, then 2% on anything above. A salary-sacrifice pension reduces both your income tax
            and your National Insurance, because the contribution comes out of gross pay before either
            is calculated — one of the most tax-efficient things you can do with a pay rise.
          </p>
          <p>
            Watch the £100,000 threshold: the personal allowance tapers away by £1 for every £2 earned
            above it, fully gone at £125,140. This creates an effective 60% marginal rate on that band
            of income, which a pension contribution can help you avoid.
          </p>
        </div>
      </section>

      <MoreCalculators />
      <HowItWorks />
      <Faq items={UK_FAQ} heading="UK salary & tax — frequently asked questions" />

      <JsonLd data={faqPageJsonLd(UK_FAQ)} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
