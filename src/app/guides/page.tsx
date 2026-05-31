import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BarChart3, Globe } from 'lucide-react'
import { GUIDES } from '../../lib/guides'

export const metadata: Metadata = {
  title: 'Salary & Tax Guides',
  description:
    'Plain-English guides to take-home pay, tax brackets, 401(k)s and National Insurance for the US, UK, Australia and Canada.',
  alternates: { canonical: '/guides' },
}

export default function GuidesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>
        Salary &amp; tax guides
      </h1>
      <p className="text-base mt-3 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        Clear, no-jargon explanations of how your pay is taxed — and how to keep more of it.
      </p>

      {/* Featured data resources */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        <Link
          href="/take-home-by-state"
          className="card group flex items-center gap-4 transition-shadow hover:shadow-md"
        >
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--sky-pale)', color: 'var(--sky)' }}
          >
            <BarChart3 className="w-6 h-6" />
          </span>
          <div className="flex-1">
            <h2 className="text-base font-semibold" style={{ color: 'var(--navy)' }}>
              Take-Home Pay by US State
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--slate-500)' }}>
              All 50 states ranked on a $100,000 salary.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0" style={{ color: 'var(--sky)' }} />
        </Link>

        <Link
          href="/take-home-by-country"
          className="card group flex items-center gap-4 transition-shadow hover:shadow-md"
        >
          <span
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'var(--sky-pale)', color: 'var(--sky)' }}
          >
            <Globe className="w-6 h-6" />
          </span>
          <div className="flex-1">
            <h2 className="text-base font-semibold" style={{ color: 'var(--navy)' }}>
              Take-Home Pay by Country
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--slate-500)' }}>
              US vs UK vs Australia vs Canada, compared.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0" style={{ color: 'var(--sky)' }} />
        </Link>
      </div>

      {/* Article list */}
      <div className="flex flex-col gap-4 mt-6">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="card group transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-semibold" style={{ color: 'var(--navy)' }}>
              {g.title}
            </h2>
            <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--slate-500)' }}>
              {g.excerpt}
            </p>
            <span
              className="inline-flex items-center gap-1 text-sm font-medium mt-3"
              style={{ color: 'var(--sky)' }}
            >
              Read guide
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
