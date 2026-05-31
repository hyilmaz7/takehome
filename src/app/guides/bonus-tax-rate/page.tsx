import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'bonus-tax-rate'
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
        You got a $5,000 bonus, but only about $3,000 landed in your account — so bonuses are taxed at
        40%, right? Not exactly. The high deduction you saw is <strong>withholding</strong>, not your
        final tax bill. Understanding the difference can save you from a nasty surprise (in either
        direction) at tax time.
      </P>

      <H2>How bonuses are withheld</H2>
      <P>
        The IRS treats bonuses as “supplemental wages,” and employers usually withhold them using the
        flat-rate method:
      </P>
      <UL>
        <LI><strong>22% federal withholding</strong> on the bonus (flat rate up to $1 million).</LI>
        <LI><strong>37%</strong> on any portion of bonuses above $1 million in a year.</LI>
        <LI>Plus <strong>FICA (7.65%)</strong> and any <strong>state tax</strong> — just like normal pay.</LI>
      </UL>
      <P>
        Add 22% + 7.65% + state, and a bonus can easily lose 30–40% up front. That’s why it looks so
        heavily taxed.
      </P>

      <Callout>
        <strong>Withholding ≠ your actual tax.</strong> A bonus is just income. At tax time it’s
        added to your salary and taxed at your real rates. If your marginal rate is below 22%, you’ll
        get some of that withholding back as a refund; if it’s above 22%, you may owe a little more.
      </Callout>

      <H2>The aggregate method</H2>
      <P>
        Some employers instead lump the bonus into a regular paycheck and withhold as if you earn
        that much every period — which can withhold even more temporarily. Again, it all evens out
        when you file; only the timing differs.
      </P>

      <H2>How to think about it</H2>
      <P>
        The real question isn’t “what’s the bonus tax rate” — it’s “what’s my{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">marginal tax rate</A>.” That’s the rate your
        bonus is genuinely taxed at once everything settles. A $5,000 bonus for someone in the 22%
        bracket really costs about 22% federal + FICA + state — not the 40% the paystub implied.
      </P>

      <H2>Reduce the hit</H2>
      <P>
        Directing a bonus into a traditional 401(k) can defer the income tax entirely (FICA still
        applies) — see <A href="/guides/401k-and-take-home-pay">how 401(k) contributions work</A>. To
        see your true marginal rate, run your salary through the calculator and check the marginal
        rate badge.
      </P>
    </Article>
  )
}
