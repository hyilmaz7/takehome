'use client'

import type { PayPeriod } from '../../types'

interface PeriodToggleProps {
  value: PayPeriod
  onChange: (p: PayPeriod) => void
  compact?: boolean
}

const PERIODS: { period: PayPeriod; label: string; short: string }[] = [
  { period: 'weekly',      label: 'Weekly',      short: 'Wk'   },
  { period: 'biweekly',    label: 'Bi-weekly',   short: '2-Wk' },
  { period: 'semimonthly', label: 'Semi-mo',     short: 'SM'   },
  { period: 'monthly',     label: 'Monthly',     short: 'Mo'   },
  { period: 'annual',      label: 'Annual',      short: 'Yr'   },
]

export default function PeriodToggle({ value, onChange, compact = false }: PeriodToggleProps) {
  return (
    <div
      className="inline-flex p-0.5 rounded-full"
      style={{
        backgroundColor: 'var(--slate-100)',
        border: '1px solid var(--slate-300)',
      }}
      role="group"
      aria-label="Select pay period"
    >
      {PERIODS.map(({ period, label, short }) => {
        const isActive = period === value
        return (
          <button
            key={period}
            onClick={() => onChange(period)}
            className="px-2.5 py-1.5 text-xs font-medium rounded-full transition-all whitespace-nowrap"
            style={{
              backgroundColor: isActive ? 'var(--navy)' : 'transparent',
              color: isActive ? '#ffffff' : 'var(--slate-500)',
              boxShadow: isActive ? '0 1px 3px rgba(15,23,42,0.25)' : 'none',
              lineHeight: 1.4,
            }}
            aria-pressed={isActive}
          >
            {compact ? short : label}
          </button>
        )
      })}
    </div>
  )
}
