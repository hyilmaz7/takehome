import { ImageResponse } from 'next/og'

// Shared renderer for the app icons (PWA manifest + favicons). A simple navy
// tile with a sky-blue "$" — full-bleed so it also works as a maskable icon.
export function brandIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F172A',
          color: '#0EA5E9',
          fontSize: Math.round(size * 0.62),
          fontWeight: 700,
          fontFamily: 'sans-serif',
        }}
      >
        $
      </div>
    ),
    { width: size, height: size },
  )
}
