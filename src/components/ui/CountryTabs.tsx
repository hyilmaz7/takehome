'use client'

import type { Country } from '../../types'

interface CountryTabsProps {
  active: Country
  onChange: (c: Country) => void
}

const TABS: { country: Country; flag: string; label: string; shortLabel: string }[] = [
  { country: 'us', flag: '🇺🇸', label: 'United States', shortLabel: 'US' },
  { country: 'uk', flag: '🇬🇧', label: 'United Kingdom', shortLabel: 'UK' },
  { country: 'au', flag: '🇦🇺', label: 'Australia', shortLabel: 'AU' },
  { country: 'ca', flag: '🇨🇦', label: 'Canada', shortLabel: 'CA' },
]

export default function CountryTabs({ active, onChange }: CountryTabsProps) {
  return (
    // Container's bottom border acts as the baseline; active tab's border overrides it
    <div
      className="flex no-scrollbar overflow-x-auto"
      style={{ borderBottom: '1px solid var(--slate-300)' }}
      role="tablist"
      aria-label="Select country"
    >
      {TABS.map(({ country, flag, label, shortLabel }) => {
        const isActive = country === active
        return (
          <button
            key={country}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-panel-${country}`}
            onClick={() => onChange(country)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative flex-shrink-0"
            style={{
              backgroundColor: isActive ? '#ffffff' : 'var(--slate-100)',
              color: isActive ? 'var(--sky)' : 'var(--slate-500)',
              borderRadius: '10px 10px 0 0',
              // Shift down 1px so the 2px sky border covers the container's 1px border
              marginBottom: isActive ? '-1px' : '0',
              borderBottom: isActive ? '2px solid var(--sky)' : 'none',
              zIndex: isActive ? 1 : 0,
            }}
          >
            <span className="text-[15px] leading-none" aria-hidden="true">
              {flag}
            </span>
            {/* Full label on md+, short code on mobile */}
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
