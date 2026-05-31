import type { MetadataRoute } from 'next'
import {
  US_SALARY_AMOUNTS,
  TOP_US_STATES,
  UK_SALARY_AMOUNTS,
  AU_SALARY_AMOUNTS,
  HOURLY_RATES,
  STATE_CALCULATOR_PAGES,
  stateCodeToSlug,
} from '../lib/salaryPage'
import { GUIDES } from '../lib/guides'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.salarycalcnet.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entries: MetadataRoute.Sitemap = []

  const push = (path: string, priority: number) =>
    entries.push({ url: `${SITE_URL}${path}`, lastModified, changeFrequency: 'monthly', priority })

  // Core pages
  push('/', 1.0)
  push('/us', 0.9)
  for (const code of STATE_CALCULATOR_PAGES) push(`/us/${stateCodeToSlug(code)}`, 0.8)
  push('/uk', 0.9)
  push('/au', 0.8)
  push('/ca', 0.8)
  push('/hourly', 0.7)
  push('/reverse', 0.7)
  push('/compare', 0.7)
  push('/about', 0.4)
  push('/methodology', 0.5)
  push('/contact', 0.3)
  push('/privacy', 0.3)
  push('/terms', 0.3)

  // Content hub
  push('/guides', 0.6)
  push('/take-home-by-state', 0.6)
  push('/widget', 0.4)
  for (const g of GUIDES) push(`/guides/${g.slug}`, 0.6)

  // Programmatic salary landing pages (the SEO long tail)
  for (const amount of US_SALARY_AMOUNTS) {
    push(`/salary/${amount}`, 0.6)
    for (const code of TOP_US_STATES) {
      push(`/salary/${amount}-${stateCodeToSlug(code)}`, 0.6)
    }
  }
  for (const amount of UK_SALARY_AMOUNTS) push(`/salary/${amount}-uk`, 0.6)
  for (const amount of AU_SALARY_AMOUNTS) push(`/salary/${amount}-au`, 0.6)

  // Programmatic hourly-rate landing pages
  for (const rate of HOURLY_RATES) push(`/hourly/${rate}`, 0.5)

  return entries
}
