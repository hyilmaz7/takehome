'use client'

import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import type { TaxItem } from '../../types'

interface BreakdownPieProps {
  items: TaxItem[]
  size?: number
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ payload: TaxItem }>
}) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs shadow-xl"
      style={{ backgroundColor: 'var(--navy)', color: '#fff', whiteSpace: 'nowrap' }}
    >
      <p className="font-semibold">{item.label}</p>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>
        {item.percent.toFixed(1)}% of gross
      </p>
    </div>
  )
}

export default function BreakdownPie({ items, size = 260 }: BreakdownPieProps) {
  const pieData = items.filter((i) => i.amount > 1)
  const takeHome = items.find((i) => !i.isDeduction)

  const cx = size / 2
  const cy = size / 2
  const innerR = Math.round(cx * 0.52)
  const outerR = Math.round(cx * 0.76)

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Donut chart */}
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        {/* key forces re-animation when data changes */}
        <PieChart
          key={pieData.map((i) => Math.round(i.amount)).join(',')}
          width={size}
          height={size}
        >
          <Pie
            data={pieData}
            cx={cx}
            cy={cy}
            innerRadius={innerR}
            outerRadius={outerR}
            dataKey="amount"
            nameKey="label"
            paddingAngle={2}
            strokeWidth={0}
            animationBegin={0}
            animationDuration={550}
            isAnimationActive
          >
            {pieData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>

        {/* Center overlay */}
        {takeHome && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-3xl font-semibold tabular-nums"
              style={{ color: 'var(--green)', letterSpacing: '-0.02em', lineHeight: 1 }}
            >
              {Math.round(takeHome.percent)}%
            </span>
            <span className="text-xs mt-1" style={{ color: 'var(--slate-500)' }}>
              take-home
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="w-full flex flex-col gap-2">
        {pieData.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span className="truncate" style={{ color: 'var(--slate-700)' }}>
                {entry.label}
              </span>
            </div>
            <span
              className="font-medium tabular-nums ml-3 shrink-0"
              style={{ color: 'var(--slate-900)' }}
            >
              {entry.percent.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
