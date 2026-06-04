import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'gross-vs-net-pay'
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
        <strong>Gross pay</strong> is the salary you’re offered and agree to — the big number on your
        contract. <strong>Net pay</strong> is what actually lands in your bank account after
        everything is taken out. The difference between the two is the single most common surprise on
        a first paycheck, and it’s usually larger than people expect.
      </P>

      <H2>What is gross pay?</H2>
      <P>
        Gross pay is your total earnings before any deductions: your base salary, plus any overtime,
        bonuses or commissions. If your offer letter says $60,000 a year, that’s your annual gross.
        Divided across 12 months, your gross monthly pay is $5,000 — but that’s not what you’ll
        receive.
      </P>

      <H2>What is net pay?</H2>
      <P>
        Net pay — also called “take-home pay” — is what’s left after all deductions. For a typical US
        employee, the gap between gross and net is made up of:
      </P>
      <UL>
        <LI><strong>Federal income tax</strong> — withheld based on your W-4 and the tax brackets.</LI>
        <LI><strong>FICA</strong> — 7.65% for Social Security and Medicare (see <A href="/guides/fica-tax-explained">FICA explained</A>).</LI>
        <LI><strong>State (and sometimes local) income tax</strong> — depends entirely on where you live.</LI>
        <LI><strong>Pre-tax deductions</strong> — like a 401(k) or health premiums, which also lower your tax.</LI>
        <LI><strong>After-tax deductions</strong> — such as a Roth 401(k) or certain insurance.</LI>
      </UL>

      <Callout>
        <strong>Rule of thumb:</strong> most US workers take home roughly 65–80% of their gross
        salary. The exact share depends on how much you earn, your state, and your pre-tax
        contributions.
      </Callout>

      <H2>A quick example</H2>
      <P>
        On a $60,000 salary for a single filer in a no-tax state, federal income tax is around $4,900
        and FICA is $4,590, leaving net pay of about <strong>$50,500 a year</strong> — roughly{' '}
        <strong>$4,200 a month</strong>, not the $5,000 that salary ÷ 12 suggests. Add a state income
        tax or a 401(k) contribution and the monthly deposit shifts again.
      </P>

      <H2>Why it matters</H2>
      <P>
        Budgets should be built on net pay, not gross — rent, bills and savings all come out of what
        you actually receive. It also matters when comparing job offers: a higher gross in a
        high-tax state can mean a <em>lower</em> net than a smaller offer somewhere with no income
        tax. That’s the whole point of <A href="/guides/how-to-evaluate-a-job-offer">evaluating an
        offer on after-tax terms</A>.
      </P>

      <H2>See your gross-to-net gap</H2>
      <P>
        Enter any salary and your state in our <A href="/">calculator</A> to see your exact net pay
        and a line-by-line breakdown of everything between gross and net. To dig into a single
        paycheck, read <A href="/guides/how-to-read-your-pay-stub">how to read your pay stub</A>.
      </P>
    </Article>
  )
}
