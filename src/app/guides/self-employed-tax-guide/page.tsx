import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'self-employed-tax-guide'
const guide = getGuide(SLUG)!

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: `/guides/${SLUG}` },
}

export default function Page() {
  return (
    <Article slug={SLUG}>
      <P>
        Going self-employed changes how you’re taxed in one big way: you owe <strong>self-employment
        tax</strong> on top of regular income tax. That’s because when you work for yourself, you’re
        both the employee <em>and</em> the employer — so you pay both halves of Social Security and
        Medicare.
      </P>

      <H2>The 15.3% self-employment tax</H2>
      <P>
        Self-employment (SE) tax is <strong>15.3%</strong>: 12.4% for{' '}
        <A href="/guides/social-security-tax-explained">Social Security</A> (up to the $176,100 wage
        base) plus 2.9% for <A href="/guides/medicare-tax-explained">Medicare</A> (no cap). An
        employee splits this 50/50 with their employer; you cover all of it.
      </P>

      <Callout>
        SE tax is calculated on <strong>92.35%</strong> of your net business profit (not gross
        revenue), and you can <strong>deduct half</strong> of the SE tax you pay when calculating your
        income tax. Both rules soften the headline 15.3%.
      </Callout>

      <H2>Income tax is separate and on top</H2>
      <P>
        SE tax only covers Social Security and Medicare. You still owe federal (and usually state)
        income tax on your business profit, at the same progressive brackets as everyone else — see{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">effective vs marginal rates</A>.
      </P>

      <H2>Quarterly estimated taxes</H2>
      <P>
        With no employer withholding, the IRS expects you to pay as you go via{' '}
        <strong>quarterly estimated payments</strong> (roughly mid-April, June, September and
        January). Missing them can mean an underpayment penalty. A common rule of thumb is to set
        aside <strong>25–30%</strong> of profit for taxes, more at higher incomes.
      </P>

      <H2>Deductions that lower the bill</H2>
      <UL>
        <LI><strong>Business expenses</strong> — home office, equipment, software, mileage.</LI>
        <LI><strong>Half of SE tax</strong> — an automatic above-the-line deduction.</LI>
        <LI><strong>Self-employed retirement plans</strong> — SEP-IRA or Solo 401(k) can shelter a lot of income.</LI>
        <LI><strong>Health insurance premiums</strong> — often deductible for the self-employed.</LI>
      </UL>

      <Callout>
        This guide explains the rules; it isn’t a self-employment tax calculator, and SE situations
        vary widely. For anything beyond a simple estimate, talk to a tax professional.
      </Callout>

      <H2>Estimate the employee side first</H2>
      <P>
        To get a feel for the income-tax portion, you can model an equivalent salary in our
        calculator — just remember to add the employer half of FICA that an employee wouldn’t see.
      </P>
    </Article>
  )
}
