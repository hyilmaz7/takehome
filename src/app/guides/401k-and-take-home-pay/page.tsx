import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = '401k-and-take-home-pay'
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
        A traditional 401(k) is one of the few ways to pay yourself <em>and</em> cut your tax bill at
        the same time. The key is that contributions come out of your pay <strong>before</strong>{' '}
        income tax is calculated — so a dollar saved costs you less than a dollar of take-home pay.
      </P>

      <H2>The core mechanic: pre-tax contributions</H2>
      <P>
        When you contribute to a traditional 401(k), that money is deducted from your taxable income.
        If you earn $80,000 and contribute 10% ($8,000), the IRS only taxes you on $72,000. You still
        own the full $8,000 — it’s just sitting in your retirement account instead of your checking
        account.
      </P>

      <Callout>
        <strong>The real cost:</strong> at a 22% marginal bracket, that $8,000 contribution only
        reduces your take-home pay by about <strong>$6,240</strong>. The other ~$1,760 is tax you
        would have paid anyway. You moved $8,000 into savings for the price of ~$6,240.
      </Callout>

      <H2>What it doesn’t reduce: FICA</H2>
      <P>
        One important catch: 401(k) contributions lower your <em>income</em> tax (federal and state),
        but <strong>not</strong> FICA. Social Security (6.2%) and Medicare (1.45%) are still charged
        on your full salary, including the part you contribute. So a 401(k) reduces income tax, not
        payroll tax.
      </P>

      <H2>Contribution limits (2025)</H2>
      <UL>
        <LI>Employee limit: <strong>$23,500</strong> per year.</LI>
        <LI>Catch-up (age 50+): an extra <strong>$7,500</strong>.</LI>
        <LI>Employer matches don’t count toward your employee limit — that’s free money on top.</LI>
      </UL>

      <H2>Traditional vs Roth, briefly</H2>
      <P>
        A traditional 401(k) gives you the tax break <em>now</em> and you pay tax on withdrawals in
        retirement. A Roth 401(k) is the reverse: no break today, but tax-free withdrawals later.
        Traditional lowers your take-home pay less today; Roth costs more now but can be better if you
        expect to be in a higher bracket in retirement. Both reduce your paycheck — only traditional
        reduces your <em>tax</em> today.
      </P>
      <P>
        The size of the break depends on your{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">marginal tax rate</A> — the higher your
        bracket, the more each pre-tax dollar saves you.
      </P>

      <H2>Model it yourself</H2>
      <P>
        Our US calculator has a 401(k) slider — drag it and watch your take-home pay and tax change
        in real time, so you can find the contribution level that fits your budget.
      </P>
    </Article>
  )
}
