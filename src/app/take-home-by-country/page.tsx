import type { Metadata } from 'next'
import Link from 'next/link'
import type { Country, TaxInput } from '../../types'
import { calculate } from '../../lib/tax'
import { formatPercent } from '../../lib/formatters'
import JsonLd from '../../components/sections/JsonLd'

const BANDS = [50000, 100000, 200000]

const COUNTRIES: {
  code: Country
  name: string
  flag: string
  symbol: string
  href: string
  input: (g: number) => TaxInput
}[] = [
  { code: 'us', name: 'United States', flag: '🇺🇸', symbol: '$', href: '/us', input: (g) => ({ country: 'us', grossAnnual: g, filingStatus: 'single', state: '' }) },
  { code: 'uk', name: 'United Kingdom', flag: '🇬🇧', symbol: '£', href: '/uk', input: (g) => ({ country: 'uk', grossAnnual: g }) },
  { code: 'au', name: 'Australia', flag: '🇦🇺', symbol: 'A$', href: '/au', input: (g) => ({ country: 'au', grossAnnual: g, hasPrivateHealth: true }) },
  { code: 'ca', name: 'Canada', flag: '🇨🇦', symbol: 'CA$', href: '/ca', input: (g) => ({ country: 'ca', grossAnnual: g, province: 'ON' }) },
]

export const metadata: Metadata = {
  title: 'Take-Home Pay by Country: US vs UK vs Australia vs Canada (2025)',
  description:
    'How much of your salary do you keep after tax in the US, UK, Australia and Canada? Compare take-home pay percentages at 50k, 100k and 200k of local income.',
  alternates: { canonical: '/take-home-by-country' },
}

export default function TakeHomeByCountryPage() {
  const rows = COUNTRIES.map((c) => ({
    ...c,
    pcts: BANDS.map((g) => (calculate(c.input(g)).netAnnual / g) * 100),
  })).sort((a, b) => b.pcts[1] - a.pcts[1]) // rank by take-home on 100k

  const best = rows[0]
  const worst = rows[rows.length - 1]

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Take-Home Pay by Country (2025)',
    itemListElement: rows.map((r, i) => ({ '@type': 'ListItem', position: i + 1, name: r.name })),
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
        Take-Home Pay by Country (2025)
      </h1>
      <p className="text-base mt-4 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        How much of your salary do you actually keep after income tax and social contributions? Here’s
        the take-home percentage in the US, UK, Australia and Canada at three income levels. On a
        100,000 local-currency salary, <strong>{best.name}</strong> lets you keep the most
        ({formatPercent(best.pcts[1])}) and <strong>{worst.name}</strong> the least
        ({formatPercent(worst.pcts[1])}).
      </p>

      <div className="card mt-8" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse', minWidth: 520 }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
                <th className="text-left font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>Country</th>
                {BANDS.map((g) => (
                  <th key={g} className="text-right font-semibold px-4 py-3" style={{ color: 'var(--navy)' }}>
                    {g / 1000}k take-home
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.code} style={{ borderTop: '1px solid var(--slate-100)' }}>
                  <td className="px-4 py-3">
                    <Link href={r.href} className="font-medium hover:underline" style={{ color: 'var(--navy)' }}>
                      <span className="mr-2">{r.flag}</span>{r.name}
                    </Link>
                  </td>
                  {r.pcts.map((p, i) => (
                    <td key={i} className="px-4 py-3 text-right tabular-nums font-semibold" style={{ color: 'var(--green)' }}>
                      {formatPercent(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--slate-400)' }}>
        Take-home % = net pay after income tax and employee social contributions, divided by gross.
        Figures use the same <em>nominal</em> amount in each local currency (not currency-converted) to
        compare the tax burden. Single filer; US assumes no state income tax; Canada uses Ontario;
        Australia assumes private hospital cover (no Medicare Levy Surcharge) with super paid on top.
        Estimates only — see each country’s calculator for exact figures.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--navy)' }}>Compare two countries head-to-head</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'UK vs US', href: '/guides/uk-vs-us-salary-comparison' },
            { label: 'US vs Canada', href: '/guides/us-vs-canada-salary' },
            { label: 'UK vs Australia', href: '/guides/uk-vs-australia-salary' },
            { label: 'Australia vs Canada', href: '/guides/australia-vs-canada-salary' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium"
              style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}>
              {l.label}
            </Link>
          ))}
        </div>
        <p className="text-sm mt-4" style={{ color: 'var(--slate-600)' }}>
          Or put two specific salaries side by side with the{' '}
          <Link href="/compare" className="underline" style={{ color: 'var(--sky)' }}>job offer comparison calculator</Link>.
        </p>
      </section>

      <JsonLd data={itemListLd} />
    </div>
  )
}
