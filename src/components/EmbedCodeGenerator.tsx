'use client'

import { useEffect, useState } from 'react'
import type { Country } from '../types'

const FALLBACK_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.salarycalcnet.com'

const COUNTRIES: { value: Country; label: string }[] = [
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'au', label: '🇦🇺 Australia' },
  { value: 'ca', label: '🇨🇦 Canada' },
]

export default function EmbedCodeGenerator() {
  const [country, setCountry] = useState<Country>('us')
  const [lock, setLock] = useState(false)
  const [copied, setCopied] = useState(false)
  // Prefer the configured site URL; otherwise use the current origin so the
  // preview works on whatever domain this page is served from.
  const [siteUrl, setSiteUrl] = useState(FALLBACK_URL)
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SITE_URL && typeof window !== 'undefined') {
      setSiteUrl(window.location.origin)
    }
  }, [])
  const SITE_URL = siteUrl

  const src = `${SITE_URL}/embed?country=${country}${lock ? '&lock=1' : ''}`
  const code = `<iframe src="${src}" title="Salary Calculator by SalaryCalc" width="100%" height="880" style="border:0;max-width:760px;" loading="lazy"></iframe>
<p style="font-size:12px;text-align:center;margin-top:6px;">Salary calculator by <a href="${SITE_URL}" target="_blank" rel="noopener">SalaryCalc</a></p>`

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Options */}
      <div className="card flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="flex-1">
          <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--slate-600)' }}>
            Default country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
            className="w-full rounded-xl px-3 py-2.5 text-sm"
            style={{ border: '1px solid var(--slate-300)', color: 'var(--slate-900)', backgroundColor: '#fff' }}
          >
            {COUNTRIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer select-none pb-2.5">
          <input type="checkbox" checked={lock} onChange={(e) => setLock(e.target.checked)} />
          <span className="text-sm" style={{ color: 'var(--slate-700)' }}>Lock to this country</span>
        </label>
      </div>

      {/* Code */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium" style={{ color: 'var(--navy)' }}>Copy this code</p>
          <button
            onClick={copy}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ backgroundColor: copied ? 'var(--positive)' : 'var(--navy)', color: '#fff' }}
          >
            {copied ? 'Copied!' : 'Copy code'}
          </button>
        </div>
        <pre
          className="text-xs overflow-x-auto rounded-xl p-4"
          style={{ backgroundColor: 'var(--navy)', color: '#e2e8f0', lineHeight: 1.6 }}
        >
          <code>{code}</code>
        </pre>
      </div>

      {/* Live preview */}
      <div>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>Live preview</p>
        <div className="rounded-xl overflow-hidden" style={{ border: '0.5px solid var(--slate-300)' }}>
          <iframe
            key={src}
            src={src}
            title="Salary Calculator preview"
            width="100%"
            height={880}
            style={{ border: 0, display: 'block' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
