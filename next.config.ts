import type { NextConfig } from 'next'

// Content-Security-Policy — allows Google AdSense, GA4 and GTM while keeping
// everything else same-origin. 'unsafe-inline'/'unsafe-eval' are required by
// Next's hydration bootstrap and Google's ad/analytics scripts.
const cspBase = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://adservice.google.com https://*.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "frame-src 'self' https://*.googlesyndication.com https://*.g.doubleclick.net https://*.doubleclick.net https://www.google.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.googlesyndication.com https://*.g.doubleclick.net",
]

// Main site: lock framing to same-origin.
const csp = [...cspBase, "frame-ancestors 'self'"].join('; ')
// Embeddable widget (/embed): allow any site to iframe it.
const embedCsp = [...cspBase, 'frame-ancestors *'].join('; ')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: csp },
]

// Same as above but no X-Frame-Options and a permissive frame-ancestors, so the
// widget can be embedded on third-party sites.
const embedHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Content-Security-Policy', value: embedCsp },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true, // gzip responses

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async headers() {
    return [
      // The widget route is framable; everything else is locked to same-origin.
      { source: '/embed', headers: embedHeaders },
      { source: '/((?!embed).*)', headers: securityHeaders },
    ]
  },
}

export default nextConfig
