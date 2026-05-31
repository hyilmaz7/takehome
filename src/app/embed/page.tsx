import type { Metadata } from 'next'
import type { Country } from '../../types'
import SalaryCalculator from '../../components/calculators/SalaryCalculator'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://salarycalcnet.com'

export const metadata: Metadata = {
  title: 'Salary Calculator Widget',
  // The bare widget shouldn't be indexed as a duplicate of the real pages.
  robots: { index: false, follow: false },
}

type Props = { searchParams: Promise<{ country?: string; lock?: string }> }

export default async function EmbedPage({ searchParams }: Props) {
  const { country, lock } = await searchParams
  const initialCountry: Country = (['us', 'uk', 'au', 'ca'] as const).includes(country as Country)
    ? (country as Country)
    : 'us'
  const locked = lock === '1'

  return (
    <div className="min-h-screen p-3 sm:p-4" style={{ backgroundColor: 'var(--slate-50)' }}>
      {/* Brand bar — links open the parent window, not the iframe */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-3">
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: 'var(--navy)', color: 'var(--sky)' }}
          >
            $
          </span>
          <span className="font-semibold text-[15px]" style={{ color: 'var(--navy)' }}>
            Salary<span style={{ color: 'var(--sky)' }}>Calc</span>
          </span>
        </a>
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium"
          style={{ color: 'var(--sky)' }}
        >
          Full calculator →
        </a>
      </div>

      <div className="max-w-3xl mx-auto">
        <SalaryCalculator initialCountry={initialCountry} locked={locked} compact />
      </div>

      {/* Attribution backlink */}
      <p className="max-w-3xl mx-auto mt-4 text-center text-xs" style={{ color: 'var(--slate-400)' }}>
        Powered by{' '}
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: 'var(--sky)' }}
        >
          SalaryCalc
        </a>{' '}
        — free salary &amp; tax calculator for the US, UK, Australia &amp; Canada.
      </p>
    </div>
  )
}
