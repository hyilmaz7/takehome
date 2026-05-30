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
import { AU_FAQ } from '../../lib/faq'

export const metadata: Metadata = {
  title: 'Australian Salary Calculator 2025/26 — Tax & Take-Home Pay',
  description:
    'Calculate your Australian take-home pay for the 2025/26 financial year. Includes income tax, the Medicare Levy and superannuation.',
  alternates: { canonical: '/au' },
}

const AU_EXAMPLES = [
  { label: 'A$60K after tax', href: '/au?gross=60000' },
  { label: 'A$80K after tax', href: '/au?gross=80000' },
  { label: 'A$100K after tax', href: '/au?gross=100000' },
  { label: 'A$120K after tax', href: '/au?gross=120000' },
  { label: 'A$150K after tax', href: '/au?gross=150000' },
]

export default function AUPage() {
  return (
    <>
      <Hero
        eyebrow="Australia · 2025/26 financial year"
        title="Australian Salary Calculator — tax & take-home pay"
        subheading="See your net pay after income tax and the Medicare Levy, with superannuation shown separately. Updated for the 2025/26 financial year."
        titleId="au-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator initialCountry="au" locked />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="au-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular salary examples"
        intro="A$60K · A$80K · A$100K · A$120K · A$150K — tap to pre-fill the calculator."
        examples={AU_EXAMPLES}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--navy)' }}>
          How Australian take-home pay is calculated
        </h2>
        <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--slate-600)' }}>
          <p>
            Australian residents pay no income tax on the first $18,200 they earn. For 2025/26 the
            resident rates are 16% to $45,000, 30% to $135,000, 37% to $190,000 and 45% above
            $190,000. Australia has no separate state income tax, so your marginal rate is the same
            wherever you live.
          </p>
          <p>
            On top of income tax, most people pay a 2% Medicare Levy that funds the public health
            system. A Medicare Levy Surcharge of 1–1.5% also applies if you earn over $93,000 without
            private hospital cover — taking out an appropriate policy removes it.
          </p>
          <p>
            Superannuation is paid by your employer on top of your salary at 12% for 2025/26, so it
            does not reduce your take-home pay. This calculator shows your net pay after income tax
            and the Medicare Levy, and notes your employer super contribution separately.
          </p>
        </div>
      </section>

      <MoreCalculators />
      <HowItWorks />
      <Faq items={AU_FAQ} heading="Australian salary & tax — frequently asked questions" />

      <JsonLd data={faqPageJsonLd(AU_FAQ)} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
