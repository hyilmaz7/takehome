import type { Metadata } from 'next'
import SalaryCalculator from '../../components/calculators/SalaryCalculator'
import AdBanner from '../../components/AdBanner'
import Hero from '../../components/sections/Hero'
import MoreCalculators from '../../components/sections/MoreCalculators'
import PopularExamples from '../../components/sections/PopularExamples'
import JsonLd from '../../components/sections/JsonLd'
import { webApplicationJsonLd } from '../../lib/seo'
import { POPULAR_MONTHLY_AMOUNTS } from '../../lib/monthly'
import { formatCurrency } from '../../lib/formatters'

export const metadata: Metadata = {
  title: 'Monthly Salary Calculator — How Much a Year After Taxes?',
  description:
    'Convert monthly pay into annual, weekly and hourly take-home pay after tax. See what $X a month is per year and after federal tax and FICA — free monthly salary calculator.',
  alternates: { canonical: '/monthly' },
}

export default function MonthlyPage() {
  return (
    <>
      <Hero
        eyebrow="Monthly pay · Real-time results"
        title="Monthly Salary Calculator"
        subheading="See what your monthly pay is per year — and your take-home after federal tax and FICA. Enter an amount, add your state, and get the breakdown instantly."
        titleId="monthly-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="monthly-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular monthly amounts"
        intro="See the annual and after-tax take-home pay for a specific monthly wage."
        examples={POPULAR_MONTHLY_AMOUNTS.map((a) => ({
          label: `${formatCurrency(a, 'us')}/month`,
          href: `/monthly/${a}`,
        }))}
      />

      <MoreCalculators />

      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
