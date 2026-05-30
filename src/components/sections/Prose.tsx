import Link from 'next/link'

// Shared typographic building blocks for editorial/article content.

export function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-medium mt-10 mb-3" style={{ color: 'var(--navy)' }}>
      {children}
    </h2>
  )
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold mt-6 mb-2" style={{ color: 'var(--navy)' }}>
      {children}
    </h3>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed mb-4" style={{ color: 'var(--slate-700)' }}>
      {children}
    </p>
  )
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-5 mb-4 flex flex-col gap-1.5">{children}</ul>
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-[15px] leading-relaxed" style={{ color: 'var(--slate-700)' }}>
      {children}
    </li>
  )
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  if (external) {
    return (
      <a href={href} className="underline" style={{ color: 'var(--sky)' }} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className="underline" style={{ color: 'var(--sky)' }}>
      {children}
    </Link>
  )
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-5 my-6 text-[15px] leading-relaxed"
      style={{ backgroundColor: 'var(--sky-pale)', color: 'var(--slate-700)' }}
    >
      {children}
    </div>
  )
}
