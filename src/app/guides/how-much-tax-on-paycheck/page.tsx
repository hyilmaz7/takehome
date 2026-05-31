import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'how-much-tax-on-paycheck'
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
        If your salary is $80,000 but your paychecks feel a lot smaller, you’re not imagining it.
        Several taxes come out before you’re paid. For a typical US worker, total deductions land
        somewhere between <strong>20% and 35%</strong> of gross pay, depending mostly on your income
        and which state you live in.
      </P>

      <H2>What comes out of every paycheck</H2>
      <UL>
        <LI>
          <strong>Federal income tax.</strong> Progressive, from 10% to 37%, applied to your income
          after the standard deduction ($15,000 single in 2025). This is usually the biggest piece.
        </LI>
        <LI>
          <strong>FICA — 7.65%.</strong> Social Security (6.2%, up to $176,100) plus Medicare (1.45%,
          no cap). See <A href="/guides/fica-tax-explained">FICA explained</A>.
        </LI>
        <LI>
          <strong>State income tax.</strong> Anywhere from 0% (nine states, including Texas and
          Florida) to 10%+ in California or New York.
        </LI>
        <LI>
          <strong>Pre-tax deductions</strong> (optional) — 401(k), health insurance, HSA. These
          actually <em>lower</em> your taxable income.
        </LI>
      </UL>

      <Callout>
        <strong>Example — $80,000, single, no state tax:</strong> roughly $9,700 federal income tax +
        $6,120 FICA ≈ $15,800 in tax, leaving about <strong>$64,200</strong> take-home (≈ $5,350/month).
        That’s an effective tax rate of around 20%.
      </Callout>

      <H2>Why your effective rate is lower than your bracket</H2>
      <P>
        Reaching the “22% bracket” doesn’t mean 22% of your salary disappears. Only the income inside
        that bracket is taxed at 22% — the rest is taxed at 10% and 12%. Your overall (effective)
        rate is always lower. It’s worth understanding the{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">difference between effective and marginal
        rates</A> before assuming how much a raise will really cost you.
      </P>

      <H2>The biggest variables</H2>
      <UL>
        <LI><strong>Your state</strong> — can swing take-home by thousands a year.</LI>
        <LI><strong>Filing status</strong> — married filing jointly widens the brackets.</LI>
        <LI><strong>Pre-tax contributions</strong> — every dollar into a traditional 401(k) is a dollar not taxed today.</LI>
      </UL>

      <H2>Estimate yours exactly</H2>
      <P>
        Rather than guess, drop your salary into the calculator and pick your state — you’ll get an
        itemised breakdown of federal tax, state tax, Social Security and Medicare, plus your
        take-home per month and per paycheck.
      </P>
    </Article>
  )
}
