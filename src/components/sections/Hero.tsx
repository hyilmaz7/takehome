// Hero band shown at the top of the calculator pages.
// Renders on a sky-pale background; the calculator itself sits below on the page.

interface HeroProps {
  eyebrow: string
  title: string
  subheading: string
  /** id wired to aria-labelledby / used as the page's single <h1>. */
  titleId?: string
}

export default function Hero({ eyebrow, title, subheading, titleId }: HeroProps) {
  return (
    <section style={{ backgroundColor: 'var(--sky-pale)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-10 text-center">
        <p
          className="inline-flex items-center text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
          style={{ backgroundColor: '#fff', color: 'var(--sky)' }}
        >
          {eyebrow}
        </p>
        <h1
          id={titleId}
          className="mx-auto max-w-2xl"
          style={{
            fontSize: '36px',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--navy)',
          }}
        >
          {title}
        </h1>
        <p
          className="mx-auto max-w-xl mt-4 text-base sm:text-lg leading-relaxed"
          style={{ color: 'var(--slate-500)' }}
        >
          {subheading}
        </p>
      </div>
    </section>
  )
}
