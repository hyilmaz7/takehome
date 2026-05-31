// ─── Structured-data (JSON-LD) helpers ──────────────────────────────────────
// Centralises the schema.org objects embedded in pages for rich search results.

export interface FaqEntry {
  q: string
  a: string
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://salarycalcnet.com'

/** schema.org FAQPage built from the same Q&A list rendered on the page. */
export function faqPageJsonLd(items: FaqEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

/** schema.org WebApplication describing the free calculator. */
export function webApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SalaryCalc',
    url: SITE_URL,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description:
      'Free real-time salary and tax calculator for the US, UK, Australia and Canada. Calculate your exact take-home pay after tax.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}
