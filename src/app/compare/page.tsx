import type { Metadata } from 'next'
import CompareCalculator from '../../components/calculators/CompareCalculator'
import AdBanner from '../../components/AdBanner'
import Hero from '../../components/sections/Hero'
import MoreCalculators from '../../components/sections/MoreCalculators'
import JsonLd from '../../components/sections/JsonLd'
import { webApplicationJsonLd } from '../../lib/seo'

export const metadata: Metadata = {
  title: 'Job Offer Comparison Calculator — Compare Take-Home Pay',
  description:
    'Compare two job offers side by side and see which leaves you with more take-home pay after tax. Free job offer comparison calculator for the US, UK, Australia and Canada.',
  alternates: { canonical: '/compare' },
}

export default function ComparePage() {
  return (
    <>
      <Hero
        eyebrow="Compare offers · Real-time results"
        title="Compare job offers after tax"
        subheading="Put two salaries side by side — across states or even countries — and see which one actually leaves more in your pocket after tax."
        titleId="compare-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <CompareCalculator />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="compare-leaderboard" format="leaderboard" />
      </div>

      <MoreCalculators />

      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
