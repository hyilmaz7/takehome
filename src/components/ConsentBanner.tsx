'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const STORAGE_KEY = 'thp-consent'

// Google Consent Mode v2 — flip the ad/analytics signals when the user chooses.
function applyConsent(granted: boolean) {
  const value = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage blocked — show the banner so the user can still choose.
      setVisible(true)
    }
    // Footer "Cookie settings" re-opens the banner via this custom event.
    const open = () => setVisible(true)
    window.addEventListener('thp-open-consent', open)
    return () => window.removeEventListener('thp-open-consent', open)
  }, [])

  function choose(granted: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied')
    } catch {
      // ignore — choice just won't persist
    }
    applyConsent(granted)
    setVisible(false)
  }

  if (pathname.startsWith('/embed')) return null
  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        style={{
          backgroundColor: '#fff',
          border: '0.5px solid var(--slate-300)',
          boxShadow: '0 8px 32px rgba(15,23,42,0.16)',
        }}
      >
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--slate-600)' }}>
          We use cookies for anonymous analytics and to show ads that keep this calculator free. The
          calculators work either way. See our{' '}
          <Link href="/privacy" className="underline" style={{ color: 'var(--sky)' }}>
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => choose(false)}
            className="px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
            style={{ border: '1px solid var(--slate-300)', color: 'var(--slate-700)', minHeight: 44 }}
          >
            Reject non-essential
          </button>
          <button
            onClick={() => choose(true)}
            className="px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors"
            style={{ backgroundColor: 'var(--navy)', color: '#fff', minHeight: 44 }}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
