import type { Metadata } from 'next'
import SalaryCalculator from '../components/calculators/SalaryCalculator'
import AdBanner from '../components/AdBanner'
import Hero from '../components/sections/Hero'
import MoreCalculators from '../components/sections/MoreCalculators'
import HowItWorks from '../components/sections/HowItWorks'
import Faq from '../components/sections/Faq'
import PopularExamples from '../components/sections/PopularExamples'
import JsonLd from '../components/sections/JsonLd'
import { faqPageJsonLd, webApplicationJsonLd } from '../lib/seo'
import { US_FAQ } from '../lib/faq'

export const metadata: Metadata = {
  title: 'US Salary Calculator 2025 — Take-Home Pay After Tax | SalaryCalc',
  description:
    'Calculate your exact US take-home pay after federal tax, state tax and FICA. Free real-time salary calculator for all 50 states. Updated for 2025 tax rates.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Free · No signup · Real-time results"
        title="What's your actual take-home pay?"
        subheading="See your net salary instantly after federal, state & local taxes. Updated for the 2025 tax year."
        titleId="home-title"
      />

      {/* Calculator — tucks up under the hero band */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-2 pb-4">
        <SalaryCalculator initialCountry="us" />
      </div>

      {/* Leaderboard ad below the hero (hidden on small screens) */}
      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="home-leaderboard" format="leaderboard" />
      </div>

      <MoreCalculators />

      <PopularExamples
        title="Popular salary lookups"
        intro="Jump straight to a detailed after-tax breakdown for a specific salary."
        examples={[
          { label: '$50,000 after tax', href: '/salary/50000' },
          { label: '$75,000 in California', href: '/salary/75000-california' },
          { label: '$100,000 in Texas', href: '/salary/100000-texas' },
          { label: '$100,000 in New York', href: '/salary/100000-new-york' },
          { label: '$150,000 in California', href: '/salary/150000-california' },
          { label: '$85,000 in Florida', href: '/salary/85000-florida' },
          { label: '£40,000 (UK)', href: '/salary/40000-uk' },
          { label: 'A$80,000 (Australia)', href: '/salary/80000-au' },
        ]}
      />

      <HowItWorks />
      <Faq items={US_FAQ} />

      <JsonLd data={faqPageJsonLd(US_FAQ)} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
