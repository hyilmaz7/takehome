import type { Metadata } from 'next'
import Link from 'next/link'
import { formatCurrency } from '../../lib/formatters'
import { US_STATES } from '../../lib/constants'
import {
  US_SALARY_AMOUNTS,
  TOP_US_STATES,
  UK_SALARY_AMOUNTS,
  AU_SALARY_AMOUNTS,
  CA_SALARY_AMOUNTS,
  stateCodeToSlug,
} from '../../lib/salaryPage'

export const metadata: Metadata = {
  title: 'Salary After Tax — Browse by Amount, State & Country',
  description:
    'Browse take-home pay pages for every salary, US state and country — US, UK, Australia and Canada. Pick a salary to see the full after-tax breakdown.',
  alternates: { canonical: '/salary' },
}

function Chip({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm transition-colors"
      style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}
    >
      {label}
    </Link>
  )
}

const stateName = (code: string) => US_STATES.find((s) => s.code === code)?.name ?? code

export default function SalaryIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <h1 style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
        Salary after tax — all pages
      </h1>
      <p className="text-base mt-4 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        Pick a salary for a full take-home breakdown after federal, state and FICA taxes. Browse by
        amount, by US state, or by country.
      </p>

      {/* US national */}
      <h2 className="text-xl font-medium mt-10 mb-4" style={{ color: 'var(--navy)' }}>US salary (federal + FICA)</h2>
      <div className="flex flex-wrap gap-2">
        {US_SALARY_AMOUNTS.map((a) => (
          <Chip key={a} href={`/salary/${a}`} label={formatCurrency(a, 'us')} />
        ))}
      </div>

      {/* Countries */}
      <h2 className="text-xl font-medium mt-10 mb-4" style={{ color: 'var(--navy)' }}>United Kingdom</h2>
      <div className="flex flex-wrap gap-2">
        {UK_SALARY_AMOUNTS.map((a) => (
          <Chip key={a} href={`/salary/${a}-uk`} label={formatCurrency(a, 'uk')} />
        ))}
      </div>

      <h2 className="text-xl font-medium mt-10 mb-4" style={{ color: 'var(--navy)' }}>Australia</h2>
      <div className="flex flex-wrap gap-2">
        {AU_SALARY_AMOUNTS.map((a) => (
          <Chip key={a} href={`/salary/${a}-au`} label={formatCurrency(a, 'au')} />
        ))}
      </div>

      <h2 className="text-xl font-medium mt-10 mb-4" style={{ color: 'var(--navy)' }}>Canada</h2>
      <div className="flex flex-wrap gap-2">
        {CA_SALARY_AMOUNTS.map((a) => (
          <Chip key={a} href={`/salary/${a}-ca`} label={formatCurrency(a, 'ca')} />
        ))}
      </div>

      {/* US by state */}
      <h2 className="text-xl font-medium mt-12 mb-2" style={{ color: 'var(--navy)' }}>US salary by state</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--slate-500)' }}>
        Take-home including state income tax. Tap a state name for its calculator, or an amount for the breakdown.
      </p>
      <div className="flex flex-col gap-6">
        {TOP_US_STATES.map((code) => {
          const slug = stateCodeToSlug(code)
          return (
            <div key={code}>
              <Link href={`/us/${slug}`} className="text-sm font-semibold hover:underline" style={{ color: 'var(--navy)' }}>
                {stateName(code)} →
              </Link>
              <div className="flex flex-wrap gap-2 mt-2">
                {US_SALARY_AMOUNTS.map((a) => (
                  <Chip key={a} href={`/salary/${a}-${slug}`} label={formatCurrency(a, 'us')} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-sm mt-10" style={{ color: 'var(--slate-600)' }}>
        Looking for a different state? See <Link href="/take-home-by-state" className="underline" style={{ color: 'var(--sky)' }}>take-home pay by state</Link> (all 50 + DC), or run any salary in the <Link href="/us" className="underline" style={{ color: 'var(--sky)' }}>calculator</Link>.
      </p>
    </div>
  )
}
