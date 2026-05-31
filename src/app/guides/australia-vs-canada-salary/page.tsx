import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'australia-vs-canada-salary'
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
        Australia and Canada compete for the same skilled migrants, and they’re strikingly similar:
        both have public healthcare, progressive tax, and compulsory retirement contributions. On
        take-home pay they’re close — but Australia comes out slightly ahead.
      </P>

      <H2>Same 100k salary, side by side</H2>
      <UL>
        <LI>
          <strong>Australia (A$100,000, with private cover):</strong> roughly A$77,200 take-home —
          about <strong>77%</strong>. Income tax plus the 2% Medicare Levy.
        </LI>
        <LI>
          <strong>Canada (CA$100,000, Ontario):</strong> roughly CA$74,400 take-home — about{' '}
          <strong>74%</strong>. Federal + Ontario tax, plus CPP and EI.
        </LI>
      </UL>

      <Callout>
        The tie-breaker is <strong>superannuation</strong>. Australian employers pay 12% of your
        salary into super <em>on top</em> of your pay. Canada’s CPP is a smaller, mandatory deduction
        <em> from</em> your pay. So Australia both taxes a little less and adds more retirement saving
        on the side.
      </Callout>

      <H2>The nuances</H2>
      <UL>
        <LI><strong>Province vs state.</strong> Canada’s provincial tax varies widely — Alberta is much lighter than Ontario or Quebec, which can flip the comparison.</LI>
        <LI><strong>Currency.</strong> A$ and CA$ are reasonably close, so nominal comparisons here are more meaningful than, say, against the US dollar or pound.</LI>
        <LI><strong>Cost of living &amp; climate.</strong> Often the real deciders — Sydney/Melbourne vs Toronto/Vancouver are all expensive in their own ways.</LI>
      </UL>

      <H2>The honest verdict</H2>
      <P>
        It’s close, but Australia edges it on take-home pay and pulls further ahead once you count
        super. Canada’s advantage is flexibility — pick a low-tax province like Alberta and the gap
        can disappear.
      </P>

      <H2>Run your own numbers</H2>
      <P>
        Compare with the <A href="/au">Australia</A> and <A href="/ca">Canada</A> calculators, see the
        full <A href="/take-home-by-country">take-home by country</A> table, or compare two specific
        offers in the <A href="/compare">comparison calculator</A>.
      </P>
    </Article>
  )
}
