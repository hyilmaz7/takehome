// Registry of editorial guides. Powers the /guides index, each article's
// header/schema, the "related guides" block, and the sitemap.

export interface Guide {
  slug: string
  title: string
  description: string
  excerpt: string
  date: string // ISO published/updated date
  readMins: number
}

export const GUIDES: Guide[] = [
  {
    slug: '100k-after-tax-by-state',
    title: 'How Much Is $100,000 After Tax in 2025? (By State)',
    description:
      'A $100,000 salary leaves very different take-home pay depending on your state. See the numbers, what drives the gap, and how to keep more.',
    excerpt:
      'The same $100k salary can mean $6,500+ a month in Texas or under $6,000 in California. Here’s why — and where your paycheck goes furthest.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'effective-vs-marginal-tax-rate',
    title: 'Effective vs Marginal Tax Rate: What’s the Difference?',
    description:
      'Your marginal rate is the tax on your next dollar; your effective rate is your average. Understanding both changes how you think about raises and 401(k)s.',
    excerpt:
      'Why a “22% tax bracket” almost never means you pay 22% — and how to use both rates to make smarter money decisions.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: '401k-and-take-home-pay',
    title: 'How Your 401(k) Affects Your Take-Home Pay',
    description:
      'A traditional 401(k) lowers your taxable income, so each dollar contributed costs you less than a dollar of take-home. Here’s the real math.',
    excerpt:
      'Contributing $8,000 might only reduce your paycheck by ~$6,000. Here’s how pre-tax retirement contributions actually work.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'uk-take-home-pay-explained',
    title: 'UK Take-Home Pay Explained: Income Tax & National Insurance',
    description:
      'How your UK gross salary becomes net pay for 2025/26 — the personal allowance, the 20/40/45% bands, National Insurance, and the £100k trap.',
    excerpt:
      'From the £12,570 personal allowance to the brutal 60% band above £100k — a plain-English guide to UK take-home pay.',
    date: '2026-05-31',
    readMins: 6,
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
