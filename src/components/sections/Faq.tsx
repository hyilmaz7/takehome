import type { FaqEntry } from '../../lib/seo'

interface FaqProps {
  items: FaqEntry[]
  heading?: string
}

// SEO-friendly FAQ rendered with native <details>/<summary> accordions so the
// answers are present in the static HTML for crawlers and work without JS.
export default function Faq({ items, heading = 'Frequently asked questions' }: FaqProps) {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h2 className="text-2xl font-medium mb-7" style={{ color: 'var(--navy)' }}>
        {heading}
      </h2>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="card group"
            style={{ padding: 0 }}
          >
            <summary
              className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 text-base font-medium"
              style={{ color: 'var(--navy)' }}
            >
              {item.q}
              <span
                className="shrink-0 text-xl leading-none transition-transform group-open:rotate-45"
                style={{ color: 'var(--sky)' }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: 'var(--slate-500)' }}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}
