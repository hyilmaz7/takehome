import { ImageResponse } from 'next/og'

export const alt = 'SalaryCalc — Free salary calculator for US, UK, Australia & Canada'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const NAVY = '#0F172A'
const SKY = '#0EA5E9'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: NAVY,
          // Subtle radial glow behind the mark
          backgroundImage:
            'radial-gradient(circle at 50% 38%, rgba(14,165,233,0.20), rgba(15,23,42,0) 55%)',
          fontFamily: 'sans-serif',
          padding: '64px',
        }}
      >
        {/* Large $ mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 176,
            height: 176,
            borderRadius: 40,
            backgroundColor: 'rgba(14,165,233,0.14)',
            border: `2px solid ${SKY}`,
            marginBottom: 44,
          }}
        >
          <div style={{ fontSize: 120, fontWeight: 700, color: SKY, lineHeight: 1 }}>$</div>
        </div>

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 76, fontWeight: 700 }}>
          <span style={{ color: '#FFFFFF' }}>Salary</span>
          <span style={{ color: SKY }}>Calc</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 30,
            color: 'rgba(255,255,255,0.72)',
            textAlign: 'center',
          }}
        >
          Free salary calculator for US, UK, Australia &amp; Canada
        </div>
      </div>
    ),
    { ...size },
  )
}
