'use client'

import { useState, useCallback } from 'react'
import type { TaxItem } from '../../types'

interface TooltipState {
  visible: boolean
  x: number
  y: number
  item: TaxItem | null
}

interface BreakdownBarProps {
  items: TaxItem[]
}

export default function BreakdownBar({ items }: BreakdownBarProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  })

  const showTooltip = useCallback((e: React.MouseEvent, item: TaxItem) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 6,
      item,
    })
  }, [])

  const hideTooltip = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }))
  }, [])

  // Deductions first (in order), then take-home fills the rest
  const deductions = items.filter((i) => i.isDeduction && i.amount > 0.5)
  const takeHome = items.find((i) => !i.isDeduction)

  return (
    <>
      <div
        className="flex w-full overflow-hidden"
        style={{ height: 10, borderRadius: 5 }}
        aria-label="Tax breakdown bar"
        role="img"
      >
        {deductions.map((item, idx) => (
          <div
            key={idx}
            style={{
              width: `${item.percent}%`,
              backgroundColor: item.color,
              flexShrink: 0,
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'default',
            }}
            onMouseEnter={(e) => showTooltip(e, item)}
            onMouseLeave={hideTooltip}
            aria-label={`${item.label}: ${item.percent.toFixed(1)}%`}
          />
        ))}
        {takeHome && (
          <div
            style={{
              flex: 1,
              backgroundColor: takeHome.color,
              transition: 'flex 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              minWidth: 0,
              cursor: 'default',
            }}
            onMouseEnter={(e) => showTooltip(e, takeHome)}
            onMouseLeave={hideTooltip}
            aria-label={`${takeHome.label}: ${takeHome.percent.toFixed(1)}%`}
          />
        )}
      </div>

      {/* Fixed-position tooltip — renders above everything via viewport coords */}
      {tooltip.visible && tooltip.item && (
        <div
          className="pointer-events-none rounded-xl px-3 py-2 text-xs shadow-xl"
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
            backgroundColor: 'var(--navy)',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
          aria-hidden="true"
        >
          <p className="font-semibold">{tooltip.item.label}</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>
            {tooltip.item.percent.toFixed(1)}% of gross
          </p>
        </div>
      )}
    </>
  )
}
