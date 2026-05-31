import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'negotiate-salary-after-tax'
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
        Most salary negotiations anchor on one number: the gross figure. But you don’t spend gross —
        you spend take-home. Negotiating with after-tax and total-compensation thinking leads to
        better decisions than chasing the biggest headline number.
      </P>

      <H2>A raise is worth less than it looks</H2>
      <P>
        A $10,000 raise doesn’t add $10,000 to your bank account. It’s taxed at your{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">marginal rate</A> — the rate on your next
        dollar. At a 24% federal bracket plus FICA and state tax, that $10,000 might net closer to
        <strong> $6,500</strong>. Still great — just know the real number you’re negotiating.
      </P>

      <Callout>
        <strong>Reframe the ask:</strong> instead of “I want $10k more,” think “I want $X more in my
        monthly take-home,” then work backwards to the gross that delivers it.
      </Callout>

      <H2>Compare total comp, not just base</H2>
      <P>
        Two offers with the same salary can be worth very different amounts once you include:
      </P>
      <UL>
        <LI><strong>401(k) match</strong> — free money, often 3–6% of salary.</LI>
        <LI><strong>Health insurance</strong> — a good plan can be worth thousands pre-tax.</LI>
        <LI><strong>Bonus and equity</strong> — but remember <A href="/guides/bonus-tax-rate">how bonuses are taxed</A>.</LI>
        <LI><strong>State tax</strong> — a lower salary in a no-tax state can beat a higher one elsewhere.</LI>
      </UL>
      <P>
        Our <A href="/compare">job offer comparison calculator</A> puts two offers side by side after
        tax and benefits, so you can see which actually leaves you with more.
      </P>

      <H2>Base salary vs bonus</H2>
      <P>
        Where you can, weight the negotiation toward <strong>base salary</strong>. It’s guaranteed,
        compounds future raises, and isn’t subject to the flat supplemental withholding that makes
        bonuses feel small upfront.
      </P>

      <H2>Mind the bracket and the cliff</H2>
      <P>
        A raise can nudge you into a higher bracket (only the income above the threshold is taxed
        more — not all of it). In the UK, watch the £100k personal-allowance taper; in Australia,
        watch the Medicare Levy Surcharge thresholds. Model the exact figure before you accept.
      </P>

      <H2>Run the numbers</H2>
      <P>
        Before your next conversation, plug both the current and proposed salary into the calculator
        and compare the take-home. Negotiating from real numbers is far more convincing than a gut
        feel.
      </P>
    </Article>
  )
}
