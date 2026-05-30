import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { calculate } from '../../../lib/tax'
import { formatCurrency } from '../../../lib/formatters'
import { US_STATES, DEFAULT_INPUTS } from '../../../lib/constants'
import {
  parseSalarySlug,
  inputForSalary,
  salaryHeadline,
  salaryAnswer,
  salaryMetaDescription,
  regionLabel,
  stateCodeToSlug,
  US_SALARY_AMOUNTS,
  TOP_US_STATES,
  UK_SALARY_AMOUNTS,
  AU_SALARY_AMOUNTS,
  type ParsedSalary,
} from '../../../lib/salaryPage'
import { webApplicationJsonLd, faqPageJsonLd } from '../../../lib/seo'
import SalaryCalculator from '../../../components/calculators/SalaryCalculator'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import JsonLd from '../../../components/sections/JsonLd'

type Props = { params: Promise<{ amount: string }> }

// Only the slugs from generateStaticParams are valid — any other slug returns a
// real 404 (via the nearest not-found.tsx) instead of a soft-404 with a 200.
export const dynamicParams = false

// ─── Pre-generate the high-value salary × region landing pages ───────────────
export function generateStaticParams(): { amount: string }[] {
  const params: { amount: string }[] = []

  for (const amount of US_SALARY_AMOUNTS) {
    params.push({ amount: String(amount) }) // national (no state tax)
    for (const code of TOP_US_STATES) {
      params.push({ amount: `${amount}-${stateCodeToSlug(code)}` })
    }
  }
  for (const amount of UK_SALARY_AMOUNTS) params.push({ amount: `${amount}-uk` })
  for (const amount of AU_SALARY_AMOUNTS) params.push({ amount: `${amount}-au` })

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { amount } = await params
  const parsed = parseSalarySlug(amount)
  // Resolve the 404 here (before the body streams) so unknown slugs return a
  // real 404 status, not a soft-404 with a 200.
  if (!parsed) notFound()

  const breakdown = calculate(inputForSalary(parsed))
  return {
    title: salaryHeadline(parsed),
    description: salaryMetaDescription(parsed, breakdown),
    alternates: { canonical: `/salary/${amount}` },
  }
}

// ─── "What if I change my state?" — US only, drives internal linking ─────────
function StateComparison({ parsed }: { parsed: ParsedSalary }) {
  const rows = TOP_US_STATES.map((code) => {
    const name = US_STATES.find((s) => s.code === code)?.name ?? code
    const b = calculate({ ...DEFAULT_INPUTS.us, grossAnnual: parsed.amount, state: code })
    return {
      code,
      name,
      netMonthly: b.netAnnual / 12,
      noStateTax: b.stateTax <= 0.5,
      slug: `${parsed.amount}-${stateCodeToSlug(code)}`,
    }
  }).sort((a, b) => b.netMonthly - a.netMonthly)

  const grossStr = formatCurrency(parsed.amount, 'us')

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-1" style={{ color: 'var(--navy)' }}>
        What if I change my state?
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--slate-500)' }}>
        Monthly take-home on a {grossStr} salary, ranked by state. States with no income tax keep the most.
      </p>

      <div className="flex flex-col gap-1">
        {rows.map((row, idx) => {
          const isCurrent = row.code === parsed.stateCode
          const content = (
            <>
              <span className="flex items-center gap-2.5">
                <span
                  className="text-xs tabular-nums w-5 text-right"
                  style={{ color: 'var(--slate-400)' }}
                >
                  {idx + 1}
                </span>
                <span className="font-medium" style={{ color: 'var(--navy)' }}>
                  {row.name}
                </span>
                {row.noStateTax && <span className="badge badge-green">no state tax</span>}
                {isCurrent && <span className="badge badge-sky">this page</span>}
              </span>
              <span className="flex items-center gap-2">
                <span className="font-semibold tabular-nums" style={{ color: 'var(--green)' }}>
                  {formatCurrency(Math.round(row.netMonthly), 'us')}/mo
                </span>
                {!isCurrent && <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--sky)' }} />}
              </span>
            </>
          )

          const rowClass =
            'flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors'
          const rowStyle: React.CSSProperties = {
            backgroundColor: isCurrent ? 'var(--sky-pale)' : '#fff',
            border: '0.5px solid var(--slate-300)',
          }

          return isCurrent ? (
            <div key={row.code} className={rowClass} style={rowStyle}>
              {content}
            </div>
          ) : (
            <Link
              key={row.code}
              href={`/salary/${row.slug}`}
              className={`${rowClass} hover:shadow-sm`}
              style={rowStyle}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </section>
  )
}

// ─── Internal links to nearby salary amounts ─────────────────────────────────
function SimilarSalaries({ parsed }: { parsed: ParsedSalary }) {
  const amounts =
    parsed.country === 'uk'
      ? UK_SALARY_AMOUNTS
      : parsed.country === 'au'
        ? AU_SALARY_AMOUNTS
        : US_SALARY_AMOUNTS

  const suffix =
    parsed.country === 'us'
      ? parsed.stateCode
        ? `-${stateCodeToSlug(parsed.stateCode)}`
        : ''
      : `-${parsed.country}`

  const links = amounts
    .filter((a) => a !== parsed.amount)
    .map((a) => ({ label: formatCurrency(a, parsed.country), href: `/salary/${a}${suffix}` }))

  const where = regionLabel(parsed)

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>
        Other salaries in {where}
      </h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}
          >
            {link.label} after tax
          </Link>
        ))}
      </div>
    </section>
  )
}

export default async function SalaryAmountPage({ params }: Props) {
  const { amount } = await params
  const parsed = parseSalarySlug(amount)
  if (!parsed) notFound()

  const input = inputForSalary(parsed)
  const breakdown = calculate(input)

  const headline = salaryHeadline(parsed)
  const answer = salaryAnswer(parsed, breakdown)
  const grossStr = formatCurrency(parsed.amount, parsed.country)

  const faq = faqPageJsonLd([
    { q: `How much is ${grossStr} after tax in ${regionLabel(parsed)}?`, a: answer },
  ])

  return (
    <>
      {/* H1 + featured-snippet answer (high on the page) */}
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <h1
            style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}
          >
            {headline}
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--slate-600)' }}>
            {answer}
          </p>
        </div>
      </section>

      {/* Pre-filled interactive calculator */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <SalaryCalculator
          initialCountry={parsed.country}
          initialGross={parsed.amount}
          initialRegion={parsed.country === 'us' ? (parsed.stateCode ?? '') : undefined}
          locked
        />
      </div>

      {/* Full breakdown table (static, exact numbers) */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-6" style={{ color: 'var(--navy)' }}>
          Full {grossStr} salary breakdown
        </h2>
        <BreakdownTable breakdown={breakdown} country={parsed.country} />
      </section>

      {parsed.country === 'us' && <StateComparison parsed={parsed} />}

      <SimilarSalaries parsed={parsed} />

      <div className="hidden md:flex justify-center my-8 px-4">
        <AdBanner slot="salary-leaderboard" format="leaderboard" />
      </div>

      <MoreCalculators />

      <JsonLd data={faq} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
