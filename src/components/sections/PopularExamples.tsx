import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export interface SalaryExample {
  label: string
  href: string
}

interface PopularExamplesProps {
  title: string
  intro?: string
  examples: SalaryExample[]
}

// A row of pre-filled salary shortcuts. Each link carries a `gross` query param
// the calculator reads on mount to populate itself.
export default function PopularExamples({ title, intro, examples }: PopularExamplesProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h2 className="text-2xl font-medium mb-1" style={{ color: 'var(--navy)' }}>
        {title}
      </h2>
      {intro && (
        <p className="text-sm mb-6" style={{ color: 'var(--slate-500)' }}>
          {intro}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        {examples.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="group inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            style={{
              backgroundColor: '#fff',
              border: '0.5px solid var(--slate-300)',
              color: 'var(--navy)',
            }}
          >
            {example.label}
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
              style={{ color: 'var(--sky)' }}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}
