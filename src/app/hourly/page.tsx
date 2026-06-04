import type { Metadata } from 'next'
import HourlyCalculator from '../../components/calculators/HourlyCalculator'
import AdBanner from '../../components/AdBanner'
import Hero from '../../components/sections/Hero'
import MoreCalculators from '../../components/sections/MoreCalculators'
import PopularExamples from '../../components/sections/PopularExamples'
import JsonLd from '../../components/sections/JsonLd'
import { webApplicationJsonLd } from '../../lib/seo'
import { POPULAR_HOURLY_RATES } from '../../lib/salaryPage'
import { formatHourlyRate } from '../../lib/formatters'

export const metadata: Metadata = {
  title: 'Hourly Wage Calculator — Annual & Monthly Take-Home Pay',
  description:
    'Convert your hourly wage into annual, monthly, weekly and daily take-home pay after tax. Free hourly paycheck calculator for the US, UK, Australia and Canada.',
  alternates: { canonical: '/hourly' },
}

export default function HourlyPage() {
  return (
    <>
      <Hero
        eyebrow="Hourly wage · Real-time results"
        title="Hourly Wage Calculator"
        subheading="Turn your hourly rate into annual, monthly, weekly and daily take-home pay after tax — adjust your hours and country instantly."
        titleId="hourly-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <HourlyCalculator />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="hourly-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular hourly rates"
        intro="See the annual and monthly take-home pay for a specific hourly wage."
        examples={POPULAR_HOURLY_RATES.map((r) => ({
          label: `${formatHourlyRate(r)}/hour`,
          href: `/hourly/${r}`,
        }))}
      />

      <MoreCalculators />

      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
