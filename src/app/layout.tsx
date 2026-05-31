import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ConsentBanner from '../components/ConsentBanner'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | SalaryCalc',
    default: 'SalaryCalc — Free Salary & Tax Calculator',
  },
  description:
    'Calculate your exact take-home pay after tax. Free salary calculator for US, UK, Australia and Canada. Real-time results, no signup required.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://salarycalcnet.com'),
  openGraph: {
    siteName: 'SalaryCalc',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'SalaryCalc — Free Salary & Tax Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SalaryCalc — Free Salary & Tax Calculator',
    description:
      'Calculate your exact take-home pay after tax. Real-time results for US, UK, Australia & Canada.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
  // Allow users to pinch-zoom up to 5× for accessibility, while a 16px input
  // font size prevents the disorienting auto-zoom on focus.
  maximumScale: 5,
}

const gaId = process.env.NEXT_PUBLIC_GA_ID
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        {/* Google Consent Mode v2 — default everything to denied until the user
            chooses (or restore a previous choice). Must run before GA/AdSense. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var granted = false;
            try { granted = localStorage.getItem('thp-consent') === 'granted'; } catch(e){}
            gtag('consent', 'default', {
              ad_storage: granted ? 'granted' : 'denied',
              ad_user_data: granted ? 'granted' : 'denied',
              ad_personalization: granted ? 'granted' : 'denied',
              analytics_storage: granted ? 'granted' : 'denied',
              wait_for_update: 500
            });
          `}
        </Script>
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConsentBanner />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  )
}
