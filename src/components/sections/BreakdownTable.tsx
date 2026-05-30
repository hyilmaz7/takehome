import type { TaxBreakdown, Country } from '../../types'
import { formatCurrency, formatPercent } from '../../lib/formatters'

interface BreakdownTableProps {
  breakdown: TaxBreakdown
  country: Country
}

// Static, server-rendered HTML table — the exact numbers live in the page's
// initial HTML so search engines (and featured snippets) can read them.
export default function BreakdownTable({ breakdown, country }: BreakdownTableProps) {
  const deductions = breakdown.items.filter((i) => i.isDeduction && i.amount > 0.5)
  const money = (n: number) => formatCurrency(Math.round(n), country)

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--sky-pale)' }}>
            <th className="text-left font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Deduction
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Per year
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              Per month
            </th>
            <th className="text-right font-semibold px-5 py-3" style={{ color: 'var(--navy)' }}>
              % of gross
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Gross salary */}
          <tr style={{ borderTop: '1px solid var(--slate-100)' }}>
            <td className="px-5 py-3 font-medium" style={{ color: 'var(--slate-900)' }}>
              Gross salary
            </td>
            <td className="px-5 py-3 text-right tabular-nums font-medium" style={{ color: 'var(--slate-900)' }}>
              {money(breakdown.grossAnnual)}
            </td>
            <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>
              {money(breakdown.grossAnnual / 12)}
            </td>
            <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-400)' }}>
              100%
            </td>
          </tr>

          {/* Each deduction */}
          {deductions.map((item) => (
            <tr key={item.label} style={{ borderTop: '1px solid var(--slate-100)' }}>
              <td className="px-5 py-3">
                <span className="inline-flex items-center gap-2" style={{ color: 'var(--slate-700)' }}>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              </td>
              <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-700)' }}>
                −{money(item.amount)}
              </td>
              <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-500)' }}>
                −{money(item.amount / 12)}
              </td>
              <td className="px-5 py-3 text-right tabular-nums" style={{ color: 'var(--slate-400)' }}>
                {formatPercent(item.percent)}
              </td>
            </tr>
          ))}

          {/* Take-home */}
          <tr style={{ borderTop: '2px solid var(--slate-300)', backgroundColor: 'var(--sky-pale)' }}>
            <td className="px-5 py-3.5 font-semibold" style={{ color: 'var(--navy)' }}>
              Take-home pay
            </td>
            <td className="px-5 py-3.5 text-right tabular-nums font-bold" style={{ color: 'var(--green)' }}>
              {money(breakdown.netAnnual)}
            </td>
            <td className="px-5 py-3.5 text-right tabular-nums font-bold" style={{ color: 'var(--green)' }}>
              {money(breakdown.netAnnual / 12)}
            </td>
            <td className="px-5 py-3.5 text-right tabular-nums font-medium" style={{ color: 'var(--sky)' }}>
              {formatPercent(100 - breakdown.effectiveTaxRate)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
