import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { calculate } from '../../../lib/tax'
import { formatCurrency, formatPercent } from '../../../lib/formatters'
import { PROFESSIONS, getProfession } from '../../../lib/professions'
import { US_SALARY_AMOUNTS } from '../../../lib/salaryPage'
import { faqPageJsonLd, webApplicationJsonLd } from '../../../lib/seo'
import BreakdownTable from '../../../components/sections/BreakdownTable'
import PopularExamples from '../../../components/sections/PopularExamples'
import AdBanner from '../../../components/AdBanner'
import MoreCalculators from '../../../components/sections/MoreCalculators'
import JsonLd from '../../../components/sections/JsonLd'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams(): { slug: string }[] {
  return PROFESSIONS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = getProfession(slug)
  if (!p) notFound()
  const b = calculate({ country: 'us', grossAnnual: p.median, filingStatus: 'single', state: '' })
  const netMonthly = formatCurrency(Math.round(b.netAnnual / 12), 'us')
  return {
    title: `${p.name} Salary After Tax (2025)`,
    description: `The median ${p.name.toLowerCase()} earns ${formatCurrency(p.median, 'us')}/year (BLS). After federal tax and FICA that's about ${netMonthly}/month take-home. See the full breakdown.`,
    alternates: { canonical: `/professions/${slug}` },
  }
}

export default async function ProfessionPage({ params }: Props) {
  const { slug } = await params
  const p = getProfession(slug)
  if (!p) notFound()

  const breakdown = calculate({ country: 'us', grossAnnual: p.median, filingStatus: 'single', state: '' })
  const medianStr = formatCurrency(p.median, 'us')
  const netYr = formatCurrency(Math.round(breakdown.netAnnual), 'us')
  const netMo = formatCurrency(Math.round(breakdown.netAnnual / 12), 'us')
  const eff = formatPercent(breakdown.effectiveTaxRate)

  // Nearest pre-generated salary pages, for "what you keep at other salaries".
  const nearby = [...US_SALARY_AMOUNTS]
    .sort((a, b) => Math.abs(a - p.median) - Math.abs(b - p.median))
    .slice(0, 4)
    .sort((a, b) => a - b)
    .map((amt) => ({ label: `${formatCurrency(amt, 'us')} after tax`, href: `/salary/${amt}` }))

  const related = PROFESSIONS.filter((x) => x.slug !== p.slug).slice(0, 6)

  const answer = `The median ${p.name.toLowerCase()} in the US earns ${medianStr} a year. After federal income tax and FICA (Social Security and Medicare), that leaves a take-home of about ${netMo} per month (${netYr} per year) — an effective tax rate of ${eff}, before any state income tax.`
  const faq = faqPageJsonLd([{ q: `How much does a ${p.name.toLowerCase()} take home after tax?`, a: answer }])

  return (
    <>
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <nav className="text-xs mb-4" style={{ color: 'var(--slate-400)' }} aria-label="Breadcrumb">
            <Link href="/professions" className="hover:underline" style={{ color: 'var(--sky)' }}>Professions</Link>
            <span className="mx-1.5">/</span>
            <span>{p.name}</span>
          </nav>
          <h1 style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}>
            {p.name} Salary After Tax (2025)
          </h1>
          <p className="mt-4 text-base leading-relaxed" style={{ color: 'var(--slate-600)' }}>
            {answer}{p.note ? ` ${p.note}` : ''}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-medium mb-2" style={{ color: 'var(--navy)' }}>
          {p.name} take-home breakdown
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--slate-500)' }}>
          On the median {medianStr} salary, single filer, no state income tax.
        </p>
        <BreakdownTable breakdown={breakdown} country="us" />
        <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--slate-400)' }}>
          Salary figure: median annual wage for {p.blsLabel ?? p.name.toLowerCase()}, US Bureau of
          Labor Statistics{' '}
          <a href="https://www.bls.gov/oes/" className="underline" style={{ color: 'var(--sky)' }} target="_blank" rel="noopener noreferrer">
            Occupational Employment and Wage Statistics
          </a>
          . Actual pay varies widely by state, employer and experience. Take-home is an estimate —
          add your state in the calculator for an exact figure.
        </p>
      </section>

      <div className="hidden md:flex justify-center my-6 px-4">
        <AdBanner slot="profession-leaderboard" format="leaderboard" />
      </div>

      <PopularExamples
        title="What you keep at other salaries"
        intro="Pay varies a lot within any profession — here are the take-home figures at nearby salaries."
        examples={nearby}
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-4">
        <p className="text-sm" style={{ color: 'var(--slate-600)' }}>
          Your state changes this a lot — see <Link href="/take-home-by-state" className="underline" style={{ color: 'var(--sky)' }}>take-home pay by state</Link>, or run your exact salary in the <Link href="/us" className="underline" style={{ color: 'var(--sky)' }}>US salary calculator</Link>.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xl font-medium mb-4" style={{ color: 'var(--navy)' }}>Other professions</h2>
        <div className="flex flex-wrap gap-3">
          {related.map((r) => (
            <Link key={r.slug} href={`/professions/${r.slug}`} className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium"
              style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}>
              {r.name}
            </Link>
          ))}
        </div>
      </section>

      <MoreCalculators />

      <JsonLd data={faq} />
      <JsonLd data={webApplicationJsonLd()} />
    </>
  )
}
