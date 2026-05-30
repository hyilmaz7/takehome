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
import { CA_FAQ } from '../../lib/faq'

export const metadata: Metadata = {
  title: 'Canadian Salary Calculator 2025 — Federal & Provincial Tax',
  description:
    'Calculate your Canadian take-home pay for 2025. Includes federal and provincial income tax, CPP and EI deductions for every province and territory.',
  alternates: { canonical: '/ca' },
}

const CA_EXAMPLES = [
  { label: 'CA$50K after tax', href: '/ca?gross=50000' },
  { label: 'CA$70K after tax', href: '/ca?gross=70000' },
  { label: 'CA$90K after tax', href: '/ca?gross=90000' },
  { label: 'CA$120K after tax', href: '/ca?gross=120000' },
]

export default function CAPage() {
  return (
    <>
      <Hero
        eyebrow="Canada · 2025 tax year"
        title="Canadian Salary Calculator — federal & provincial tax"
        subheading="See your take-home pay after federal and provincial income tax, CPP and EI. Choose any province or territory for an accurate 2025 estimate."
        titleId="ca-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator initialCountry="ca" locked />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="ca-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular salary examples"
        intro="CA$50K · CA$70K · CA$90K · CA$120K — tap to pre-fill the calculator."
        examples={CA_EXAMPLES}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-4" style={{ color: 'var(--navy)' }}>
          How Canadian take-home pay is calculated
        </h2>
        <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--slate-600)' }}>
          <p>
            Canadians pay tax in two layers on the same income: federal income tax (15% to 33% for
            2025) and a separate provincial or territorial tax. Provincial rates vary widely — Ontario
            adds its own brackets plus a surtax for higher earners, while Alberta uses lower flat-ish
            rates — so your take-home depends heavily on where you live.
          </p>
          <p>
            Two payroll deductions also come off your pay. The Canada Pension Plan (CPP) takes 5.95%
            of earnings between the $3,500 exemption and the $71,300 ceiling, and Employment Insurance
            (EI) takes 1.64% up to $65,700. Both fund benefits and qualify for federal tax credits.
          </p>
          <p>
            The basic personal amount — about $16,129 federally for 2025, plus a provincial amount —
            shelters the first slice of income from tax via a 15% credit. This calculator combines all
            of these to show your real net pay for the province you choose.
          </p>
        </div>
      </section>

      <MoreCalculators />
      <HowItWorks />
      <Faq items={CA_FAQ} heading="Canadian salary & tax — frequently asked questions" />

      <JsonLd data={faqPageJsonLd(CA_FAQ)} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
