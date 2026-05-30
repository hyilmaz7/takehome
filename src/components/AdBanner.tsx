'use client'

import { useEffect, useRef } from 'react'

type AdFormat = 'leaderboard' | 'rectangle' | 'auto'

interface AdBannerProps {
  slot: string
  format?: AdFormat
  className?: string
}

const SIZE_MAP: Record<AdFormat, { width: number | string; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  auto: { width: '100%', height: 90 },
}

declare global {
  interface Window {
    adsbygoogle: object[]
  }
}

function DevPlaceholder({ slot, format }: { slot: string; format: AdFormat }) {
  const { width, height } = SIZE_MAP[format]
  return (
    <div
      className="flex items-center justify-center rounded-lg select-none"
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: `${height}px`,
        backgroundColor: 'var(--slate-100)',
        border: '1px dashed var(--slate-300)',
        maxWidth: '100%',
      }}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--slate-300)' }}
        >
          Ad
        </span>
        <span className="text-xs" style={{ color: 'var(--slate-300)' }}>
          {format} · slot {slot}
        </span>
      </div>
    </div>
  )
}

const isDev = process.env.NODE_ENV === 'development'
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

export default function AdBanner({ slot, format = 'auto', className }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (isDev || !adsenseId || pushed.current) return
    try {
      pushed.current = true
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // AdSense not yet loaded — the script in layout.tsx will initialise it
    }
  }, [])

  if (isDev) {
    return (
      <div className={className}>
        <DevPlaceholder slot={slot} format={format} />
      </div>
    )
  }

  if (!adsenseId) return null

  const { width, height } = SIZE_MAP[format]

  return (
    <div className={className} style={{ overflow: 'hidden' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: typeof width === 'number' ? `${width}px` : width,
          height: `${height}px`,
        }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format === 'auto' ? 'auto' : undefined}
        data-full-width-responsive={format === 'auto' ? 'true' : undefined}
      />
    </div>
  )
}
