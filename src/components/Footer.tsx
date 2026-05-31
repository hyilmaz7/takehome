'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CALCULATOR_LINKS = [
  { label: 'Salary Calculator', href: '/' },
  { label: 'Hourly Calculator', href: '/hourly' },
  { label: 'Compare Jobs', href: '/compare' },
  { label: 'Reverse Calculator', href: '/reverse' },
]

const COUNTRY_LINKS = [
  { flag: '🇺🇸', label: 'United States', href: '/us' },
  { flag: '🇬🇧', label: 'United Kingdom', href: '/uk' },
  { flag: '🇦🇺', label: 'Australia', href: '/au' },
  { flag: '🇨🇦', label: 'Canada', href: '/ca' },
]

function FooterLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm select-none flex-shrink-0"
        style={{ backgroundColor: 'rgba(14,165,233,0.15)', color: '#0EA5E9' }}
      >
        $
      </div>
      <span className="font-semibold text-[17px] tracking-tight text-white">
        Salary<span style={{ color: '#0EA5E9' }}>Calc</span>
      </span>
    </div>
  )
}

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/embed')) return null

  return (
    <footer style={{ backgroundColor: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <FooterLogo />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Free salary calculators for the US, UK, Australia &amp; Canada.
              Real-time tax estimates with no signup required.
            </p>
          </div>

          {/* Col 2 — Calculators */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Calculators
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CALCULATOR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = '#fff')
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)')
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Countries */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Countries
            </h3>
            <ul className="flex flex-col gap-2.5">
              {COUNTRY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = '#fff')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        'rgba(255,255,255,0.65)')
                    }
                  >
                    <span>{link.flag}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company */}
          <div>
            <h3
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Guides', href: '/guides' },
                { label: 'Salary by profession', href: '/professions' },
                { label: 'Take-home by state', href: '/take-home-by-state' },
                { label: 'Take-home by country', href: '/take-home-by-country' },
                { label: 'Embed widget', href: '/widget' },
                { label: 'About', href: '/about' },
                { label: 'Methodology', href: '/methodology' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.65)')
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <p>Updated for the 2025 tax year · Not financial advice</p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Terms of Use
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('thp-open-consent'))}
              className="transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}
            >
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
