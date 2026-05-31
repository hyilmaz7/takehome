import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'how-to-evaluate-a-job-offer'
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
        The salary number is the easiest part of an offer to compare — and the most misleading. Two
        offers with the same headline can be worth thousands of dollars apart once you account for
        tax, benefits and where you’ll live. Here’s a framework for judging the whole package.
      </P>

      <H2>1. Start with take-home, not gross</H2>
      <P>
        A $110,000 offer in California can leave you with less than a $100,000 offer in Texas, because
        of state income tax. Always convert offers to <em>after-tax</em> pay for your state — see{' '}
        <A href="/take-home-by-state">take-home by state</A>.
      </P>

      <H2>2. Add the benefits that have real value</H2>
      <UL>
        <LI><strong>401(k) match</strong> — 3–6% of salary in free money.</LI>
        <LI><strong>Health insurance</strong> — a strong plan can be worth thousands pre-tax.</LI>
        <LI><strong>Bonus &amp; equity</strong> — but discount them for risk and tax; see <A href="/guides/bonus-tax-rate">how bonuses are taxed</A>.</LI>
        <LI><strong>PTO, remote flexibility, pension/RRSP/super</strong> — all real comp.</LI>
      </UL>

      <Callout>
        <strong>Compare total comp, after tax.</strong> Salary + match + benefits − taxes is the
        number that actually matters. Our <A href="/compare">job offer comparison calculator</A> puts
        two offers side by side after tax and benefits.
      </Callout>

      <H2>3. Weight base salary over variable pay</H2>
      <P>
        Base salary is guaranteed, compounds future raises, and isn’t subject to the flat supplemental
        withholding that makes bonuses feel small. Where you can, push the negotiation toward base —
        more in <A href="/guides/negotiate-salary-after-tax">how to negotiate salary after tax</A>.
      </P>

      <H2>4. Factor in cost of living</H2>
      <P>
        A higher salary in an expensive metro can leave you worse off than a lower one somewhere
        cheaper. Take-home is step one; rent and lifestyle are step two.
      </P>

      <H2>Run the comparison</H2>
      <P>
        Put both offers through the <A href="/compare">comparison calculator</A> with your state,
        401(k) and benefits to see which one actually leaves you with more.
      </P>
    </Article>
  )
}
