import type { FaqEntry } from './seo'

// Numbers here mirror the constants used by the tax engine in src/lib/tax/*
// (e.g. US standard deduction $15,000, SS wage base $176,100, 401(k) limit
// $23,500) so the on-page copy, the JSON-LD and the results always agree.

export const US_FAQ: FaqEntry[] = [
  {
    q: 'How is federal income tax calculated?',
    a: 'US federal income tax is progressive: different slices of your income are taxed at increasing rates. For the 2025 tax year there are seven brackets — 10%, 12%, 22%, 24%, 32%, 35% and 37%. The rates apply to your taxable income, which is your gross salary minus the standard deduction ($15,000 for single filers) and any pre-tax contributions such as a traditional 401(k). Only the income that falls inside each bracket is taxed at that bracket’s rate, so a $75,000 salary is never taxed entirely at 22% — the first $11,925 is taxed at just 10%.',
  },
  {
    q: 'What is FICA tax?',
    a: 'FICA (Federal Insurance Contributions Act) is the payroll tax that funds Social Security and Medicare. The Social Security portion is 6.2% of wages up to the annual wage base of $176,100, and the Medicare portion is 1.45% on all wages with no cap. An additional 0.9% Medicare surtax applies to wages above $200,000 for single filers ($250,000 married filing jointly). Together the standard FICA rate is 7.65%, and it is withheld from every paycheck before you see it.',
  },
  {
    q: 'How does the 401(k) contribution reduce my taxes?',
    a: 'Contributions to a traditional 401(k) are made pre-tax, so they lower your taxable income dollar for dollar. If you earn $80,000 and contribute 10% ($8,000), you are only taxed on $72,000, saving roughly $1,760 at the 22% marginal bracket. The 2025 employee contribution limit is $23,500, plus a $7,500 catch-up if you are 50 or older. Note that 401(k) contributions still count as wages for Social Security and Medicare, so they reduce income tax but not FICA.',
  },
  {
    q: 'What’s the difference between effective and marginal tax rate?',
    a: 'Your marginal tax rate is the rate you pay on your next dollar of income — the top bracket your income reaches. Your effective tax rate is the average across all your income: total tax divided by gross salary. For example, a single filer earning $75,000 has a 22% marginal rate but an effective federal income tax rate closer to 11%, because the first $11,925 is taxed at 10% and the next slice at 12%. This calculator shows both, so you can see the tax on a raise (marginal) versus your overall burden (effective).',
  },
  {
    q: 'How accurate is this calculator?',
    a: 'It uses the official 2025 federal tax brackets, standard deductions and FICA rates, plus state income tax rates for all 50 states, to give a close estimate of take-home pay for a standard salaried employee. It assumes the standard deduction rather than itemising, and does not model every tax credit (such as the Child Tax Credit) or every local city tax. For most people the result lands within a few percent of their actual paycheck, but it should not be treated as formal tax advice.',
  },
  {
    q: 'What’s not included in this calculation?',
    a: 'The estimate covers federal income tax, state income tax, Social Security and Medicare (FICA). It does not include city or local income taxes (such as New York City), tax credits, capital gains, self-employment tax, or bonuses taxed through supplemental withholding. It also assumes you work the full year on a single salary. For a complete picture of your situation, consult a qualified tax professional or the IRS.',
  },
]

export const UK_FAQ: FaqEntry[] = [
  {
    q: 'What is National Insurance?',
    a: 'National Insurance (NI) is a contribution separate from income tax that funds the State Pension and certain benefits. Employees pay Class 1 NI at 8% on earnings between £12,570 and £50,270 a year, then 2% on everything above £50,270. It is deducted automatically through PAYE alongside income tax. Salary-sacrifice pension contributions reduce the earnings NI is charged on, lowering your NI bill.',
  },
  {
    q: 'What is the personal allowance?',
    a: 'The personal allowance is the amount you can earn before paying any income tax — £12,570 for the 2025/26 tax year. Income above it is taxed at 20% (basic rate) up to £50,270, 40% (higher rate) up to £125,140, and 45% (additional rate) above that. The allowance is reduced by £1 for every £2 you earn over £100,000, so it disappears entirely at £125,140 — creating an effective 60% marginal rate between £100,000 and £125,140.',
  },
  {
    q: 'How is take-home pay calculated in the UK?',
    a: 'Your net pay is your gross salary minus income tax, National Insurance, any pension contribution and student loan repayments. For 2025/26, income tax uses the £12,570 personal allowance with 20%/40%/45% bands, and NI is 8% then 2%. A £40,000 salary, for example, pays around £5,486 income tax and £2,194 National Insurance, leaving roughly £32,320 take-home before any pension.',
  },
  {
    q: 'How do student loan repayments work?',
    a: 'Student loan repayments are deducted as a percentage of income above a plan-specific threshold, not as a tax. Plan 2 (most English and Welsh graduates since 2012) repays 9% above £28,470; Plan 1 above £26,065; Plan 4 (Scotland) above £32,745; and Postgraduate loans 6% above £21,000. You can owe more than one type at once, and repayments stop automatically once the balance is cleared.',
  },
  {
    q: 'What pension contributions should I make?',
    a: 'Pension contributions made by salary sacrifice come out of gross pay before income tax and National Insurance, making them highly tax-efficient. Contributing 5% of a £50,000 salary (£2,500) saves 20% income tax and 8% NI on that amount. Many employers match contributions, and the annual allowance for tax-relieved pension saving is £60,000 for 2025/26. This calculator lets you model different pension percentages instantly.',
  },
]

export const AU_FAQ: FaqEntry[] = [
  {
    q: 'What is the tax-free threshold?',
    a: 'Australian residents pay no income tax on the first $18,200 they earn — the tax-free threshold. Above that, the 2025/26 resident rates are 16% to $45,000, 30% to $135,000, 37% to $190,000 and 45% above $190,000. Only the income within each band is taxed at that band’s rate, so your average (effective) rate is always lower than your top marginal rate.',
  },
  {
    q: 'How does the Medicare Levy work?',
    a: 'Most taxpayers pay a 2% Medicare Levy on their taxable income to fund Australia’s public health system, phased in gradually for lower incomes. A separate Medicare Levy Surcharge of 1–1.5% applies if your income exceeds $93,000 and you don’t hold private hospital cover. Taking out an appropriate private policy removes the surcharge.',
  },
  {
    q: 'Is superannuation deducted from my take-home pay?',
    a: 'No. Employer superannuation (12% of your ordinary earnings for 2025/26) is paid by your employer on top of your salary, so it does not reduce your take-home pay. It goes straight into your super fund for retirement. This calculator shows your take-home after income tax and the Medicare Levy, with super noted separately.',
  },
]

export const CA_FAQ: FaqEntry[] = [
  {
    q: 'How do federal and provincial taxes combine?',
    a: 'Canadians pay both federal income tax and a separate provincial or territorial tax on the same income. Federal rates for 2025 run from 15% up to 33%, while provincial rates and brackets vary widely — Ontario, for example, adds its own brackets plus a surtax for higher earners. This calculator combines both layers so you see your true take-home pay for the province you choose.',
  },
  {
    q: 'What are CPP and EI?',
    a: 'The Canada Pension Plan (CPP) is a mandatory contribution of 5.95% on earnings between the $3,500 basic exemption and the $71,300 ceiling, funding your retirement pension. Employment Insurance (EI) premiums are 1.64% on insurable earnings up to $65,700 and provide temporary income support for job loss, illness or parental leave. Both are deducted from your pay and qualify for federal tax credits.',
  },
  {
    q: 'What is the basic personal amount?',
    a: 'The basic personal amount is income you can earn before federal tax applies — about $16,129 for 2025, delivered as a 15% non-refundable tax credit. Each province also has its own basic personal amount. Together they mean the first slice of your income is effectively tax-free, which is why low earners pay little or no income tax.',
  },
]
