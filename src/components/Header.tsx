'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Salary', href: '/' },
  { label: 'Hourly', href: '/hourly' },
  { label: 'Compare Jobs', href: '/compare' },
  { label: 'Reverse Calc', href: '/reverse' },
  { label: 'Guides', href: '/guides' },
]

const COUNTRIES = [
  { flag: '🇺🇸', label: 'United States', code: 'US', href: '/us' },
  { flag: '🇬🇧', label: 'United Kingdom', code: 'UK', href: '/uk' },
  { flag: '🇦🇺', label: 'Australia', code: 'AU', href: '/au' },
  { flag: '🇨🇦', label: 'Canada', code: 'CA', href: '/ca' },
]

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm select-none"
        style={{ backgroundColor: 'var(--navy)', color: 'var(--sky)' }}
      >
        $
      </div>
      <span
        className="font-semibold text-[17px] tracking-tight"
        style={{ color: 'var(--navy)' }}
      >
        Salary
        <span style={{ color: 'var(--sky)' }}>Calc</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const pathname = usePathname()
  const scrolled = useScrolled()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [countriesOpen, setCountriesOpen] = useState(false)
  const countriesRef = useRef<HTMLDivElement>(null)

  const currentCountry =
    COUNTRIES.find((c) => pathname.startsWith(c.href)) ?? COUNTRIES[0]

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countriesRef.current && !countriesRef.current.contains(e.target as Node)) {
        setCountriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCountriesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full transition-all duration-200"
        style={{
          backgroundColor: 'rgba(255,255,255,0.97)',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(15,23,42,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">
            <Logo />

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-slate-50"
                    style={{ color: isActive ? 'var(--sky)' : 'var(--slate-500)' }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3.5 right-3.5 h-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--sky)' }}
                      />
                    )}
                  </Link>
                )
              })}

              {/* Countries dropdown */}
              <div className="relative" ref={countriesRef}>
                <button
                  onClick={() => setCountriesOpen((v) => !v)}
                  className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-slate-50"
                  style={{ color: 'var(--slate-500)' }}
                  aria-expanded={countriesOpen}
                  aria-haspopup="true"
                >
                  Countries
                  <ChevronDown
                    className="w-3.5 h-3.5 transition-transform duration-150"
                    style={{
                      transform: countriesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                </button>

                {countriesOpen && (
                  <div
                    className="absolute top-full left-0 mt-1.5 w-52 py-1 z-50 rounded-2xl"
                    style={{
                      background: '#fff',
                      border: '0.5px solid var(--slate-300)',
                      boxShadow: '0 8px 24px rgba(15,23,42,0.1)',
                    }}
                    role="menu"
                  >
                    {COUNTRIES.map((c) => {
                      const isSelected = pathname.startsWith(c.href)
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          role="menuitem"
                          className="flex items-center gap-3 mx-1 px-3 py-2.5 text-sm rounded-xl transition-colors hover:bg-slate-50"
                          style={
                            isSelected
                              ? {
                                  color: 'var(--sky)',
                                  backgroundColor: 'var(--sky-pale)',
                                  fontWeight: 500,
                                }
                              : { color: 'var(--slate-900)' }
                          }
                        >
                          <span className="text-base">{c.flag}</span>
                          <span>{c.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Country pill — desktop */}
              <Link
                href={currentCountry.href}
                className="hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-colors hover:bg-slate-50"
                style={{
                  borderColor: 'var(--slate-300)',
                  color: 'var(--slate-900)',
                }}
              >
                <span>{currentCountry.flag}</span>
                <span>{currentCountry.code}</span>
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 rounded-lg transition-colors hover:bg-slate-100"
                style={{ color: 'var(--slate-500)' }}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(15,23,42,0.25)',
              backdropFilter: 'blur(2px)',
            }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Slide-down panel */}
          <div
            className="absolute top-16 left-0 right-0"
            style={{
              backgroundColor: '#fff',
              borderBottom: '1px solid var(--slate-100)',
              boxShadow: '0 8px 32px rgba(15,23,42,0.12)',
            }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-base rounded-xl transition-colors"
                    style={
                      isActive
                        ? {
                            color: 'var(--sky)',
                            backgroundColor: 'var(--sky-pale)',
                            fontWeight: 600,
                          }
                        : { color: 'var(--slate-900)' }
                    }
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div
              className="px-4 py-3 flex flex-col gap-1"
              style={{ borderTop: '1px solid var(--slate-100)' }}
            >
              <p
                className="px-4 pb-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--slate-500)' }}
              >
                Countries
              </p>
              {COUNTRIES.map((c) => {
                const isSelected = pathname.startsWith(c.href)
                return (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-3 px-4 py-3 text-base rounded-xl transition-colors"
                    style={
                      isSelected
                        ? {
                            color: 'var(--sky)',
                            backgroundColor: 'var(--sky-pale)',
                            fontWeight: 600,
                          }
                        : { color: 'var(--slate-900)' }
                    }
                  >
                    <span className="text-lg">{c.flag}</span>
                    <span>{c.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
