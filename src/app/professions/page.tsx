import type { Metadata } from 'next'
import Link from 'next/link'
import { calculate } from '../../lib/tax'
import { formatCurrency, formatPercent } from '../../lib/formatters'
import { PROFESSIONS } from '../../lib/professions'

export const metadata: Metadata = {
  title: 'Salary After Tax by Profession (US, 2025)',
  description:
    'Take-home pay after tax for 28 common US professions — from nurses and teachers to software engineers and doctors. Median salaries from the BLS, take-home computed for 2025.',
  alternates: { canonical: '/professions' },
}

export default function ProfessionsPage() {
  const rows = PROFESSIONS.map((p) => {
    const b = calculate({ country: 'us', grossAnnual: p.median, filingStatus: 'single', state: '' })
    return { ...p, net: b.netAnnual, eff: b.effectiveTaxRate }
  }).sort((a, b) => b.median - a.median)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
        Salary After Tax by Profession
      </h1>
      <p className="text-base mt-4 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        What does each job actually take home after tax? Below are 28 common US professions with their
        median salary and estimated take-home pay (single filer, no state income tax). Tap any role for
        a full breakdown.
      </p>

      <div className="card mt-8" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: 520 }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
                <th className="text-left font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Profession</th>
                <th className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Median salary</th>
                <th className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Take-home / yr</th>
                <th className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Tax rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.slug} style={{ borderTop: '1px solid var(--slate-100)' }}>
                  <td className="px-4 py-3">
                    <Link href={`/professions/${r.slug}`} className="font-medium hover:underline" style={{ color: 'var(--navy)' }}>
                      {r.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: 'var(--slate-700)' }}>
                    {formatCurrency(r.median, 'us')}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-semibold" style={{ color: 'var(--green)' }}>
                    {formatCurrency(Math.round(r.net), 'us')}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>
                    {formatPercent(r.eff)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--slate-400)' }}>
        Median annual wages from the US Bureau of Labor Statistics{' '}
        <a href="https://www.bls.gov/oes/" className="underline" style={{ color: 'var(--sky)' }} target="_blank" rel="noopener noreferrer">
          Occupational Employment and Wage Statistics
        </a>
        . Take-home assumes a single filer with no state income tax — your figure varies by state,
        employer and experience. See <Link href="/take-home-by-state" className="underline" style={{ color: 'var(--sky)' }}>take-home by state</Link> or run your own in the <Link href="/us" className="underline" style={{ color: 'var(--sky)' }}>calculator</Link>.
      </p>
    </div>
  )
}
