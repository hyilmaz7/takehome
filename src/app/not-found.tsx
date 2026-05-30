import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

const POPULAR_SALARIES = [
  { label: '$50,000 after tax', href: '/salary/50000-california' },
  { label: '$75,000 after tax', href: '/salary/75000-texas' },
  { label: '$100,000 after tax', href: '/salary/100000-new-york' },
  { label: '£40,000 after tax (UK)', href: '/salary/40000-uk' },
  { label: 'A$80,000 after tax (AU)', href: '/salary/80000-au' },
  { label: '$25/hour after tax', href: '/hourly/25' },
]

const CALCULATORS = [
  { label: 'Salary Calculator', href: '/' },
  { label: 'Hourly Calculator', href: '/hourly' },
  { label: 'Compare Jobs', href: '/compare' },
  { label: 'Reverse Calculator', href: '/reverse' },
]

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <p className="text-6xl font-semibold" style={{ color: 'var(--sky)' }}>
        404
      </p>
      <h1 className="mt-3 text-2xl font-medium" style={{ color: 'var(--navy)' }}>
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 text-base leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Try one of the popular
        calculators below, or jump straight to a salary breakdown.
      </p>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--slate-400)' }}>
        Popular salary pages
      </h2>
      <div className="flex flex-wrap gap-3">
        {POPULAR_SALARIES.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)', color: 'var(--navy)' }}
          >
            {item.label}
            <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--sky)' }} />
          </Link>
        ))}
      </div>

      <h2 className="mt-10 mb-4 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--slate-400)' }}>
        Calculators
      </h2>
      <div className="flex flex-wrap gap-3">
        {CALCULATORS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ backgroundColor: 'var(--sky-pale)', color: 'var(--sky)' }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
