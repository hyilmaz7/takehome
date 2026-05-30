'use client'

import { useId } from 'react'

interface SliderFieldProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  formatValue: (value: number) => string
  sublabel?: string
  ticks?: boolean
}

export default function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatValue,
  sublabel,
  ticks = false,
}: SliderFieldProps) {
  const id = useId()
  const percent = max === min ? 0 : Math.round(((value - min) / (max - min)) * 100)

  return (
    <div className="flex flex-col gap-2.5">
      {/* Label row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <label
            htmlFor={id}
            className="text-sm font-medium select-none"
            style={{ color: 'var(--slate-900)' }}
          >
            {label}
          </label>
          {sublabel && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--slate-500)' }}>
              {sublabel}
            </p>
          )}
        </div>
        <span
          className="text-sm font-semibold tabular-nums shrink-0"
          style={{ color: 'var(--navy)' }}
        >
          {formatValue(value)}
        </span>
      </div>

      {/* Track */}
      <div className="relative flex items-center" style={{ height: '24px' }}>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="slider-track"
          // CSS custom property drives the fill gradient defined in globals.css
          style={{ '--progress': `${percent}%` } as React.CSSProperties}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatValue(value)}
        />
      </div>

      {/* Tick labels */}
      {ticks && (
        <div className="flex justify-between px-0.5">
          <span className="text-xs tabular-nums" style={{ color: 'var(--slate-500)' }}>
            {formatValue(min)}
          </span>
          <span className="text-xs tabular-nums" style={{ color: 'var(--slate-500)' }}>
            {formatValue(Math.round((min + max) / 2))}
          </span>
          <span className="text-xs tabular-nums" style={{ color: 'var(--slate-500)' }}>
            {formatValue(max)}
          </span>
        </div>
      )}
    </div>
  )
}
