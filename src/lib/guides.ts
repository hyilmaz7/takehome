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
  {
    slug: 'us-vs-canada-salary',
    title: 'US vs Canada Salary: Who Takes Home More?',
    description:
      'Americans keep a higher share of the same nominal salary than Canadians — but US health insurance, state taxes and the exchange rate change the story. A real comparison.',
    excerpt:
      'On the same 100k salary, a US worker keeps more after tax than a Canadian — until you add health insurance and a high-tax state. Here’s the full picture.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'uk-vs-australia-salary',
    title: 'UK vs Australia Salary: Who Takes Home More?',
    description:
      'Australians keep noticeably more of a 100k salary than Brits — plus 12% superannuation on top. For the UK→Australia move, here’s what changes about your take-home pay.',
    excerpt:
      'One of the world’s biggest migration corridors, and the take-home maths favours Australia: ~77% vs ~69%, plus super on top.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'australia-vs-canada-salary',
    title: 'Australia vs Canada Salary: Who Takes Home More?',
    description:
      'Australia and Canada are close on take-home pay, but Australia edges it — and adds 12% super on top. A head-to-head for anyone weighing the two.',
    excerpt:
      'Two popular expat destinations, neck and neck on tax — but Australia keeps slightly more and stacks superannuation on top.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'us-vs-australia-salary',
    title: 'US vs Australia Salary: Who Takes Home More?',
    description:
      'The US and Australia have nearly identical take-home percentages — but Australia adds 12% super and universal healthcare, while US state tax and insurance change the maths.',
    excerpt:
      'Almost the same take-home %, but Australia stacks super and Medicare on top while US workers buy their own health cover.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'uk-vs-canada-salary',
    title: 'UK vs Canada Salary: Who Takes Home More?',
    description:
      'Canadians keep more of the same nominal salary than Brits and avoid the £100k allowance taper — though both fund healthcare through tax. A clear comparison.',
    excerpt:
      'Canada keeps more of a 100k salary than the UK (~74% vs ~69%) and skips the brutal £100k tax trap.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'moving-to-australia-from-the-uk',
    title: 'Moving to Australia from the UK: What Happens to Your Pay',
    description:
      'Relocating from the UK to Australia? Here’s how your take-home pay, tax system, pension and healthcare change — and what to sort out before you go.',
    excerpt:
      'Swapping the £12,570 personal allowance for an $18,200 tax-free threshold, NI for the Medicare Levy, and a pension for 12% super. Here’s the full picture.',
    date: '2026-05-31',
    readMins: 7,
  },
  {
    slug: 'moving-to-canada-from-the-uk',
    title: 'Moving to Canada from the UK: What Happens to Your Pay',
    description:
      'Relocating from the UK to Canada? How your take-home pay, tax, pension and healthcare change when you swap PAYE for federal + provincial tax, CPP and EI.',
    excerpt:
      'From National Insurance to CPP and EI, and from one income tax to two layers — here’s what changes about your pay when you move to Canada.',
    date: '2026-05-31',
    readMins: 7,
  },
  {
    slug: 'federal-withholding-explained',
    title: 'What Is Federal Income Tax Withholding?',
    description:
      'Federal withholding is the income tax your employer takes out of each paycheck and sends to the IRS on your behalf. Here’s how it’s calculated and how to adjust it.',
    excerpt:
      'The biggest deduction on most US paychecks isn’t your final tax bill — it’s an estimate. Here’s how federal withholding works and how to fix it.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'standard-deduction-explained',
    title: 'The Standard Deduction Explained (2025)',
    description:
      'The standard deduction is the slice of income the IRS doesn’t tax — $15,000 for single filers in 2025. Here’s how it works and when to itemise instead.',
    excerpt:
      'Before any tax bracket touches your income, the standard deduction takes $15,000 (single) off the top. Here’s what that means for your take-home.',
    date: '2026-05-31',
    readMins: 4,
  },
  {
    slug: 'tax-brackets-explained',
    title: 'How US Tax Brackets Actually Work',
    description:
      'Moving into a higher tax bracket doesn’t tax all your income at that rate — only the portion inside it. Here’s how the 2025 brackets really work.',
    excerpt:
      'The most misunderstood idea in personal finance: a raise can’t leave you worse off. Here’s how progressive tax brackets actually work.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'w4-explained',
    title: 'How to Fill Out a W-4 (and How It Affects Your Pay)',
    description:
      'Your W-4 tells your employer how much federal tax to withhold. Get it wrong and you’ll over- or under-pay all year. Here’s how to fill it out.',
    excerpt:
      'The W-4 is the form that decides how much tax comes out of every paycheck. Here’s how to set it so you don’t owe — or over-lend the IRS — at tax time.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'married-vs-single-tax',
    title: 'Married vs Single: How Filing Status Changes Your Take-Home',
    description:
      'Getting married usually lowers your combined tax bill thanks to wider brackets — but two high earners can hit a “marriage penalty.” Here’s how it works.',
    excerpt:
      'Filing status changes your brackets and standard deduction. For most couples that’s a bonus; for two big earners it can be a penalty. Here’s the maths.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'w2-vs-1099-take-home',
    title: 'W-2 vs 1099: How Your Take-Home Pay Differs',
    description:
      'A 1099 contractor pays both halves of FICA (15.3% self-employment tax) and gets no employer benefits — so the same headline rate means very different take-home.',
    excerpt:
      'A $100k W-2 job and a $100k 1099 contract are not the same money. Here’s why the contractor keeps less — and what to charge to make up for it.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'ny-vs-ca-vs-tx-salary',
    title: 'New York vs California vs Texas: Take-Home Pay Compared',
    description:
      'The three biggest US job markets, three very different tax bills. On a $100,000 salary, Texas keeps thousands more than California or New York.',
    excerpt:
      'Same $100k salary, three of America’s biggest job hubs. Texas wins on tax — but the cities’ costs tell the rest of the story.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'moving-to-the-us-from-the-uk',
    title: 'Moving to the US from the UK: What Happens to Your Pay',
    description:
      'Relocating from the UK to the US? You’ll usually take home more — but you swap the NHS for paid health insurance, and your state choice matters a lot.',
    excerpt:
      'Higher take-home, but you buy your own healthcare and your state can swing your pay by thousands. Here’s what changes moving UK → US.',
    date: '2026-05-31',
    readMins: 7,
  },
  {
    slug: 'moving-to-the-uk-from-the-us',
    title: 'Moving to the UK from the US: What Happens to Your Pay',
    description:
      'Relocating from the US to the UK? You’ll likely take home a smaller share — but income tax and National Insurance fund the NHS. Here’s what changes.',
    excerpt:
      'Lower take-home percentage, but no health-insurance bill and no state tax to dodge. Here’s how your pay changes moving US → UK.',
    date: '2026-05-31',
    readMins: 7,
  },
  {
    slug: 'moving-to-canada-from-the-us',
    title: 'Moving to Canada from the US: What Happens to Your Pay',
    description:
      'Relocating from the US to Canada? You’ll trade a bit more tax for universal healthcare — and swap FICA for CPP and EI. Here’s the full picture.',
    excerpt:
      'A little more tax, no health-insurance premiums, and two layers of income tax instead of state-by-state. Here’s what changes moving US → Canada.',
    date: '2026-05-31',
    readMins: 7,
  },
  {
    slug: 'first-job-take-home-pay',
    title: 'Your First Job: Understanding Your Take-Home Pay',
    description:
      'Starting your first job? Here’s why your paycheck is smaller than your salary ÷ 12 — federal tax, FICA, state tax and benefits, explained simply.',
    excerpt:
      'Your salary isn’t what lands in your account. Here’s a plain-English guide to every deduction on your first paycheck — and how to plan around it.',
    date: '2026-05-31',
    readMins: 5,
  },
  {
    slug: 'how-to-evaluate-a-job-offer',
    title: 'How to Evaluate a Job Offer (Beyond the Salary)',
    description:
      'The headline salary is only part of an offer. Compare take-home pay, 401(k) match, benefits, state tax and total comp before you decide.',
    excerpt:
      'Two offers with the same salary can be worth thousands apart. Here’s a framework for comparing job offers on what actually matters: after-tax total comp.',
    date: '2026-05-31',
    readMins: 6,
  },
  {
    slug: 'side-hustle-taxes',
    title: 'Side Hustle Taxes: What You’ll Actually Keep',
    description:
      'Side-hustle income is taxed at your marginal rate plus 15.3% self-employment tax. Here’s how to estimate what you keep — and set money aside.',
    excerpt:
      'That extra $10k from your side gig won’t all be yours. Here’s how side-hustle income is taxed and how much to set aside so April isn’t a shock.',
    date: '2026-05-31',
    readMins: 5,
  },
]

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
