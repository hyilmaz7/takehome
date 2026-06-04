import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'how-to-calculate-salary-after-tax'
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
        Working out your salary after taxes by hand isn’t hard once you know the order of operations.
        The trick is that different taxes are calculated on different numbers — income tax uses your{' '}
        <em>taxable</em> income, while FICA uses your <em>gross</em> salary. Here’s the six-step
        method, followed by a full worked example.
      </P>

      <H2>The six steps</H2>
      <UL>
        <LI><strong>1. Start with your gross annual salary</strong> — the headline figure before anything is taken out.</LI>
        <LI><strong>2. Subtract pre-tax deductions</strong> like a traditional 401(k) or HSA — see <A href="/guides/tax-deductions-on-salary">tax deductions on your salary</A>.</LI>
        <LI><strong>3. Subtract the standard deduction</strong> ($15,000 single / $30,000 married in 2025) to get your taxable income.</LI>
        <LI><strong>4. Apply the federal tax brackets</strong> to that taxable income (only the slice inside each bracket is taxed at that rate).</LI>
        <LI><strong>5. Add FICA</strong> — 6.2% Social Security (up to $176,100) + 1.45% Medicare, calculated on your <strong>gross</strong> salary, not your taxable income.</LI>
        <LI><strong>6. Add state income tax</strong> if your state has one, then subtract every tax from gross to get your net pay.</LI>
      </UL>

      <H2>Worked example: $70,000, single, no state tax</H2>
      <P>
        Let’s run a $70,000 salary for a single filer in a no-income-tax state, taking the standard
        deduction and no 401(k):
      </P>
      <UL>
        <LI><strong>Gross salary:</strong> $70,000</LI>
        <LI><strong>Taxable income:</strong> $70,000 − $15,000 standard deduction = $55,000</LI>
        <LI>
          <strong>Federal income tax (2025):</strong> 10% on the first $11,925, 12% to $48,475, then
          22% on the rest of the $55,000 ≈ <strong>$7,241</strong>
        </LI>
        <LI><strong>Social Security:</strong> 6.2% × $70,000 = $4,340</LI>
        <LI><strong>Medicare:</strong> 1.45% × $70,000 = $1,015</LI>
        <LI><strong>State tax:</strong> $0</LI>
      </UL>
      <P>
        Total tax is roughly <strong>$12,596</strong>, leaving a take-home pay of about{' '}
        <strong>$57,400 a year</strong> — close to <strong>$4,780 a month</strong>. That’s an
        effective tax rate near 18%, even though the top bracket touched is 22%. (See{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">effective vs marginal tax rate</A> for why
        those differ.)
      </P>

      <Callout>
        <strong>Why your paycheck isn’t salary ÷ 12:</strong> that division gives you gross monthly
        pay. Your actual deposit is the <em>net</em> figure after the taxes above — typically 20–35%
        lower depending on your salary and state.
      </Callout>

      <H2>Adding a state and a 401(k)</H2>
      <P>
        A state income tax simply adds another layer calculated on your state taxable income (rules
        vary by state). A traditional 401(k) is subtracted at step 2, lowering the income tax in step
        4 — but remember it doesn’t reduce the FICA in step 5, which is always charged on your gross.
      </P>

      <H2>Or skip the math</H2>
      <P>
        Our <A href="/">free calculator</A> runs all six steps for any salary, state and 401(k)
        percentage instantly, and shows each deduction as a separate line. It’s the fastest way to go
        from gross to net — but now you know exactly what it’s doing under the hood.
      </P>
    </Article>
  )
}
