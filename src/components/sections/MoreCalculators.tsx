import Link from 'next/link'
import { Clock, CalendarDays, RefreshCcw, GitCompare, Globe, ArrowRight } from 'lucide-react'

interface CalcCard {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
}

const CARDS: CalcCard[] = [
  {
    icon: Clock,
    title: 'Hourly Calculator',
    description: 'Turn an hourly wage into annual, monthly and weekly take-home pay.',
    href: '/hourly',
  },
  {
    icon: CalendarDays,
    title: 'Monthly Calculator',
    description: 'See what monthly pay is per year — and your take-home after tax.',
    href: '/monthly',
  },
  {
    icon: RefreshCcw,
    title: 'Reverse Calculator',
    description: 'Work out the gross salary you need to hit a target take-home amount.',
    href: '/reverse',
  },
  {
    icon: GitCompare,
    title: 'Compare Jobs',
    description: 'Put two job offers side by side and compare take-home pay after tax.',
    href: '/compare',
  },
  {
    icon: Globe,
    title: 'Other Countries',
    description: 'Calculate take-home pay for the UK, Australia and Canada.',
    href: '/uk',
  },
]

export default function MoreCalculators() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <h2
        className="text-2xl font-medium mb-1"
        style={{ color: 'var(--navy)' }}
      >
        More calculators
      </h2>
      <p className="text-sm mb-7" style={{ color: 'var(--slate-500)' }}>
        Free tools to plan every angle of your pay.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CARDS.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href}
            href={href}
            className="card group flex flex-col gap-3 transition-shadow hover:shadow-md"
          >
            <span
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--sky-pale)', color: 'var(--sky)' }}
            >
              <Icon className="w-5 h-5" />
            </span>
            <h3 className="text-base font-semibold" style={{ color: 'var(--navy)' }}>
              {title}
            </h3>
            <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--slate-500)' }}>
              {description}
            </p>
            <span
              className="inline-flex items-center gap-1 text-sm font-medium"
              style={{ color: 'var(--sky)' }}
            >
              Open
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
