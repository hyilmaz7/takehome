import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getGuide, GUIDES } from '../../lib/guides'
import JsonLd from './JsonLd'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://takehomepay.io'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Article({ slug, children }: { slug: string; children: React.ReactNode }) {
  const guide = getGuide(slug)
  if (!guide) return null

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.date,
    author: { '@type': 'Organization', name: 'TakeHomePay.io', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'TakeHomePay.io', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/guides/${guide.slug}`,
  }

  const related = GUIDES.filter((g) => g.slug !== slug).slice(0, 3)

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs mb-5" style={{ color: 'var(--slate-400)' }} aria-label="Breadcrumb">
        <Link href="/guides" className="hover:underline" style={{ color: 'var(--sky)' }}>
          Guides
        </Link>
        <span className="mx-1.5">/</span>
        <span>{guide.title}</span>
      </nav>

      <h1
        style={{ fontSize: '34px', fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--navy)' }}
      >
        {guide.title}
      </h1>
      <p className="text-xs mt-3 mb-8" style={{ color: 'var(--slate-400)' }}>
        Updated {formatDate(guide.date)} · {guide.readMins} min read
      </p>

      <div>{children}</div>

      {/* CTA */}
      <div
        className="rounded-2xl p-6 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ backgroundColor: 'var(--navy)' }}
      >
        <div>
          <p className="text-base font-semibold text-white">Calculate your own take-home pay</p>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Free, instant, no signup — for the US, UK, Australia &amp; Canada.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold shrink-0"
          style={{ backgroundColor: 'var(--sky)', color: '#fff' }}
        >
          Open the calculator
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--navy)' }}>
            Related guides
          </h2>
          <div className="flex flex-col gap-2">
            {related.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors"
                style={{ backgroundColor: '#fff', border: '0.5px solid var(--slate-300)' }}
              >
                <span className="font-medium" style={{ color: 'var(--navy)' }}>{g.title}</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2" style={{ color: 'var(--sky)' }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      <JsonLd data={articleLd} />
    </article>
  )
}
