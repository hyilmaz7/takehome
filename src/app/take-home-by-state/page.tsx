import type { Metadata } from 'next'
import Link from 'next/link'
import { calculate } from '../../lib/tax'
import { US_STATES } from '../../lib/constants'
import { formatCurrency, formatPercent } from '../../lib/formatters'
import JsonLd from '../../components/sections/JsonLd'

const SALARY = 100000

export const metadata: Metadata = {
  title: 'Take-Home Pay by US State (2025) — $100k Salary Ranked',
  description:
    'All 50 states (plus DC) ranked by take-home pay on a $100,000 salary in 2025. See where your paycheck goes furthest after federal tax, state tax and FICA.',
  alternates: { canonical: '/take-home-by-state' },
}

export default function TakeHomeByStatePage() {
  const rows = US_STATES.map((s) => {
    const b = calculate({ country: 'us', grossAnnual: SALARY, filingStatus: 'single', state: s.code })
    return {
      code: s.code,
      name: s.name,
      netMonthly: b.netAnnual / 12,
      netAnnual: b.netAnnual,
      stateTax: b.stateTax,
      effective: b.effectiveTaxRate,
      noTax: b.stateTax <= 0.5,
    }
  }).sort((a, b) => b.netAnnual - a.netAnnual)

  const best = rows[0]
  const worst = rows[rows.length - 1]
  const spread = best.netAnnual - worst.netAnnual

  // ItemList structured data for the ranking
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Take-Home Pay by US State on a $100,000 Salary (2025)',
    itemListElement: rows.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.name,
    })),
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <h1
        style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}
      >
        Take-Home Pay by US State (2025)
      </h1>
      <p className="text-base mt-4 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        Federal income tax and FICA are the same wherever you live — but state income tax isn’t. Here
        are all 50 states and DC ranked by what a single filer actually keeps on a{' '}
        <strong>$100,000</strong> salary. The difference between the top and bottom is{' '}
        <strong>{formatCurrency(Math.round(spread), 'us')}/year</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <div className="card">
          <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--slate-400)' }}>
            Highest take-home
          </p>
          <p className="text-lg font-semibold mt-1" style={{ color: 'var(--navy)' }}>{best.name}</p>
          <p className="text-2xl font-semibold tabular-nums mt-1" style={{ color: 'var(--green)' }}>
            {formatCurrency(Math.round(best.netMonthly), 'us')}/mo
          </p>
        </div>
        <div className="card">
          <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--slate-400)' }}>
            Lowest take-home
          </p>
          <p className="text-lg font-semibold mt-1" style={{ color: 'var(--navy)' }}>{worst.name}</p>
          <p className="text-2xl font-semibold tabular-nums mt-1" style={{ color: 'var(--navy)' }}>
            {formatCurrency(Math.round(worst.netMonthly), 'us')}/mo
          </p>
        </div>
      </div>

      <div className="card mt-6" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
                <th className="text-left font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>#</th>
                <th className="text-left font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>State</th>
                <th className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Take-home / mo</th>
                <th className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>State tax / yr</th>
                <th className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Effective rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.code} style={{ borderTop: '1px solid var(--slate-100)' }}>
                  <td className="px-4 py-2.5 tabular-nums" style={{ color: 'var(--slate-400)' }}>{i + 1}</td>
                  <td className="px-4 py-2.5">
                    <Link
                      href={`/?gross=${SALARY}&country=us&state=${r.code}`}
                      className="font-medium hover:underline"
                      style={{ color: 'var(--navy)' }}
                    >
                      {r.name}
                    </Link>
                    {r.noTax && <span className="badge badge-green ml-2">no state tax</span>}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums font-semibold" style={{ color: 'var(--green)' }}>
                    {formatCurrency(Math.round(r.netMonthly), 'us')}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums" style={{ color: 'var(--slate-600)' }}>
                    {r.noTax ? '—' : formatCurrency(Math.round(r.stateTax), 'us')}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>
                    {formatPercent(r.effective)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs mt-4" style={{ color: 'var(--slate-400)' }}>
        Single filer, 2025 rates, standard deduction, no other deductions. Figures are estimates —
        click any state to run your exact numbers. Read the full write-up in our guide:{' '}
        <Link href="/guides/100k-after-tax-by-state" className="underline" style={{ color: 'var(--sky)' }}>
          How much is $100,000 after tax?
        </Link>
      </p>

      <JsonLd data={itemListLd} />
    </div>
  )
}
