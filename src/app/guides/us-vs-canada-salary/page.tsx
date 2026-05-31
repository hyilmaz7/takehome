import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'us-vs-canada-salary'
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
        The US and Canada share a border and a lot of culture, but the way they tax your salary is
        quite different. If you’re weighing a move — or just an offer on either side of the border —
        here’s how your take-home pay compares.
      </P>

      <H2>Same 100k salary, side by side</H2>
      <UL>
        <LI>
          <strong>United States ($100,000, no state tax):</strong> roughly $78,700 take-home — about{' '}
          <strong>79%</strong>. Federal income tax (~$13,600) plus FICA ($7,650).
        </LI>
        <LI>
          <strong>Canada (CA$100,000, Ontario):</strong> roughly CA$74,400 take-home — about{' '}
          <strong>74%</strong>. Federal + Ontario tax, plus CPP and EI.
        </LI>
      </UL>
      <P>
        On the same nominal number, the American keeps more — and the gap widens in a no-income-tax
        US state like Texas or Florida.

      </P>

      <Callout>
        But the comparison isn’t that simple. Two big factors close the gap: (1) Canada’s taxes help
        fund <strong>universal healthcare</strong>, while a US worker typically pays separately for
        health insurance (often $2,000–$8,000+ a year out of pocket); and (2) a high-tax US state
        like California can erase the US advantage entirely.
      </Callout>

      <H2>What else to weigh</H2>
      <UL>
        <LI><strong>The exchange rate.</strong> $100,000 USD is worth far more than CA$100,000 — so a like-for-like role usually pays a higher number in Canada, narrowing the real difference.</LI>
        <LI><strong>State vs province.</strong> US state tax ranges 0%–13%+; Canadian provincial tax also varies a lot (Alberta is low, Quebec is high).</LI>
        <LI><strong>Cost of living &amp; benefits.</strong> Healthcare, childcare, parental leave and retirement systems differ in ways a paycheck comparison can’t capture.</LI>
      </UL>

      <H2>The honest verdict</H2>
      <P>
        Headline take-home favours the US, especially in low-tax states — but once you account for
        health insurance and the exchange rate, many roles come out broadly similar. Canada trades a
        bit more tax for universal healthcare and a stronger safety net.
      </P>

      <H2>Run your own numbers</H2>
      <P>
        Compare with the <A href="/us">US</A> and <A href="/ca">Canada</A> calculators, see the full{' '}
        <A href="/take-home-by-country">take-home by country</A> table, or put two offers side by side
        in the <A href="/compare">job offer comparison calculator</A>.
      </P>
    </Article>
  )
}
