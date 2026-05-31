import type { Metadata } from 'next'
import ReverseCalculator from '../../components/calculators/ReverseCalculator'
import AdBanner from '../../components/AdBanner'
import Hero from '../../components/sections/Hero'
import MoreCalculators from '../../components/sections/MoreCalculators'
import PopularExamples from '../../components/sections/PopularExamples'
import JsonLd from '../../components/sections/JsonLd'
import { webApplicationJsonLd } from '../../lib/seo'
import { REVERSE_MONTHLY, reverseSlug } from '../../lib/reverse'
import { formatCurrency } from '../../lib/formatters'

export const metadata: Metadata = {
  title: 'Reverse Salary Calculator — What Gross Salary Do I Need?',
  description:
    'Enter the take-home pay you want and find out the gross salary you need to earn after tax. Free reverse salary calculator for the US, UK, Australia and Canada.',
  alternates: { canonical: '/reverse' },
}

export default function ReversePage() {
  return (
    <>
      <Hero
        eyebrow="Reverse calculation · Real-time results"
        title="What gross salary do I need?"
        subheading="Tell us the take-home pay you want and we'll work backwards through the 2025 tax brackets to find the gross salary you need to earn."
        titleId="reverse-title"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <ReverseCalculator />
      </div>

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="reverse-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="Popular take-home targets"
        intro="See the gross salary you need for a specific monthly take-home goal."
        examples={REVERSE_MONTHLY.map((n) => ({
          label: `Take home ${formatCurrency(n, 'us')}/mo`,
          href: `/reverse/${reverseSlug(n, 'month')}`,
        }))}
      />

      <MoreCalculators />

      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
