import { Coins, Calculator, Wallet } from 'lucide-react'

const STEPS: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}[] = [
  {
    icon: Coins,
    title: 'Enter your salary',
    description:
      'Drag the slider or type your gross pay and pick your country, state and any pre-tax deductions.',
  },
  {
    icon: Calculator,
    title: 'We calculate your exact taxes',
    description:
      'We apply the latest 2026 income tax brackets, FICA and local rates to your income in real time.',
  },
  {
    icon: Wallet,
    title: 'See your real take-home',
    description:
      'Get your net pay per year, month and paycheck — with a full, itemised breakdown of every deduction.',
  },
]

export default function HowItWorks() {
  return (
    <section style={{ backgroundColor: 'var(--sky-pale)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl font-medium mb-8" style={{ color: 'var(--navy)' }}>
          How it works
        </h2>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map(({ icon: Icon, title, description }, idx) => (
            <li key={title} className="card flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{ backgroundColor: 'var(--navy)', color: '#fff' }}
                >
                  {idx + 1}
                </span>
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: 'var(--sky-pale)', color: 'var(--sky)' }}
                >
                  <Icon className="w-5 h-5" />
                </span>
              </div>
              <h3 className="text-base font-semibold" style={{ color: 'var(--navy)' }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--slate-500)' }}>
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
