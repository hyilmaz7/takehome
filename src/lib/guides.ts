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
  {
    slug: 'fica-tax-explained',
    title: 'FICA Tax Explained: Social Security & Medicare (2025)',
    description:
      'FICA is the 7.65% payroll tax on your paycheck — 6.2% Social Security plus 1.45% Medicare. Here’s how it works, the wage base, and the extra Medicare surtax.',
    excerpt:
      'That “FICA” line on your paystub is 7.65% of your pay. Here’s exactly what it funds, where it caps, and why your 401(k) doesn’t reduce it.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'how-much-tax-on-paycheck',
    title: 'How Much Tax Comes Out of My Paycheck?',
    description:
      'Federal tax, state tax, Social Security and Medicare all come out before you’re paid. Here’s how much to expect — and what changes it.',
    excerpt:
      'Most US workers lose 20–35% of gross pay to taxes before it hits their account. Here’s the breakdown and how to estimate yours.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'bonus-tax-rate',
    title: 'How Is a Bonus Taxed? The Real Bonus Tax Rate',
    description:
      'Bonuses are withheld at a flat 22% federal rate (37% above $1M) plus FICA and state tax — but that’s withholding, not your final tax. Here’s the difference.',
    excerpt:
      'Your bonus looked like it got taxed at 40%+. It didn’t — that’s just withholding. Here’s how bonus tax actually works.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'how-to-read-your-pay-stub',
    title: 'How to Read Your Pay Stub',
    description:
      'Gross pay, FICA, federal and state withholding, pre-tax deductions and net pay — a line-by-line guide to understanding your paycheck.',
    excerpt:
      'Confused by your paystub? Here’s what every line means — gross, FICA, withholding, pre-tax deductions and the net pay you actually keep.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'social-security-tax-explained',
    title: 'Social Security Tax Explained (2025)',
    description:
      'Social Security tax is 6.2% of your wages up to $176,100 in 2025. Here’s how it works, what it funds, the wage base cap, and what self-employed people pay.',
    excerpt:
      'The 6.2% Social Security line on your paystub stops at $176,100 of earnings. Here’s what it funds and why it caps out.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'medicare-tax-explained',
    title: 'Medicare Tax Explained (2025)',
    description:
      'Medicare tax is 1.45% of all your wages with no cap, plus an extra 0.9% surtax for high earners. Here’s how the Medicare payroll tax actually works.',
    excerpt:
      'Medicare is 1.45% on every dollar you earn — with an extra 0.9% once you pass $200,000. Here’s the full picture.',
    date: '2026-05-31',
    readMins: 4,
  },
  {
    slug: 'self-employed-tax-guide',
    title: 'Self-Employed Taxes Explained (2025)',
    description:
      'Self-employment tax is 15.3% on top of income tax, because you pay both halves of Social Security and Medicare. Here’s how it works and how to lower it.',
    excerpt:
      'Working for yourself means paying both halves of FICA — a 15.3% self-employment tax. Here’s how it works, plus the deductions that soften it.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'negotiate-salary-after-tax',
    title: 'How to Negotiate Salary (Think in After-Tax Terms)',
    description:
      'A $10,000 raise isn’t $10,000 in your pocket. Negotiate using take-home pay, total comp and marginal rates — not just the headline number.',
    excerpt:
      'The headline salary number is the wrong thing to anchor on. Here’s how to negotiate in after-tax, total-comp terms.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'remote-work-taxes',
    title: 'Remote Work Taxes: Which State Do I Pay In?',
    description:
      'Remote workers generally pay state income tax where they live and work — but “convenience of employer” rules and reciprocity agreements complicate it.',
    excerpt:
      'Work remotely across state lines? Where you owe state income tax usually depends on where you sit — but there are big exceptions.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'uk-national-insurance-explained',
    title: 'UK National Insurance Explained (2025/26)',
    description:
      'National Insurance is a separate UK payroll contribution: 8% on earnings between £12,570 and £50,270, then 2% above. Here’s what it funds and how it works.',
    excerpt:
      'NI isn’t income tax — it’s a separate 8%/2% contribution that funds your State Pension. Here’s how it’s calculated.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'california-vs-texas-salary',
    title: 'California vs Texas: Who Takes Home More?',
    description:
      'Texas has no state income tax; California’s tops out at 13.3%. On the same salary, a Texan keeps thousands more — but cost of living tells the rest of the story.',
    excerpt:
      'Same $100k salary, very different take-home. We compare California and Texas paycheck-to-paycheck — and the catch.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'what-salary-for-5000-month',
    title: 'What Salary Do I Need to Take Home $5,000 a Month?',
    description:
      'To net $5,000 a month ($60,000 a year) you need a gross salary of roughly $74,000 in a no-tax state — more in California. Here’s how to work it out.',
    excerpt:
      'Targeting $5,000/month in your account? Here’s the gross salary you actually need — and why your state changes the answer.',
    date: '2026-05-31',
    readMins: 4,
  },
  {
    slug: 'australia-income-tax-guide',
    title: 'Australia Income Tax Explained (2025/26)',
    description:
      'How Australian take-home pay works for 2025/26 — the $18,200 tax-free threshold, the 16/30/37/45% brackets, the Medicare Levy, surcharge and superannuation.',
    excerpt:
      'From the $18,200 tax-free threshold to the Medicare Levy and 12% super — a plain-English guide to Australian income tax.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'canada-income-tax-guide',
    title: 'Canada Income Tax Explained (2025)',
    description:
      'How Canadian take-home pay works — federal and provincial tax, CPP and EI, and the basic personal amount. A plain-English guide for 2025.',
    excerpt:
      'Two layers of tax plus CPP and EI — here’s how Canadian income tax actually works, and why your province matters.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'uk-vs-us-salary-comparison',
    title: 'UK vs US Salary: Who Takes Home More?',
    description:
      'US workers keep a higher percentage of gross pay than UK workers — but healthcare, currency and state tax make a direct comparison tricky. Here’s the real picture.',
    excerpt:
      'On paper, US take-home percentages beat the UK’s. But once you add healthcare and cost of living, the comparison gets interesting.',
    date: '2026-05-31',
    readMins: 6,
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
