import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'uk-vs-australia-salary'
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
        The UK-to-Australia move is one of the most well-worn migration paths in the world — and the
        take-home maths is part of the appeal. On the same salary, Australians simply keep more of
        their pay, and that’s before you count superannuation.
      </P>

      <H2>Same 100k salary, side by side</H2>
      <UL>
        <LI>
          <strong>United Kingdom (£100,000):</strong> roughly £68,600 take-home — about{' '}
          <strong>69%</strong>. Income tax (~£27,400) plus National Insurance (~£4,000).
        </LI>
        <LI>
          <strong>Australia (A$100,000, with private cover):</strong> roughly A$77,200 take-home —
          about <strong>77%</strong>. Income tax plus the 2% Medicare Levy.
        </LI>
      </UL>

      <Callout>
        Two things make Australia look even better: (1) <strong>superannuation</strong> — your
        employer pays 12% of your salary into retirement <em>on top</em> of your pay, not out of it;
        and (2) Australia’s tax-free threshold ($18,200) and lack of a brutal £100k allowance taper
        mean higher earners keep more.
      </Callout>

      <H2>The £100k trap vs the tax-free threshold</H2>
      <P>
        In the UK, earnings between £100,000 and £125,140 are hit by a 60% effective marginal rate as
        the personal allowance is withdrawn — see our{' '}
        <A href="/guides/uk-take-home-pay-explained">UK take-home guide</A>. Australia has no
        equivalent cliff, so the gap widens at higher salaries.
      </P>

      <H2>But it’s not all one-sided</H2>
      <UL>
        <LI><strong>Currency &amp; salaries.</strong> £100,000 is worth far more than A$100,000, and many roles pay a higher number in the UK — so a true like-for-like move is closer than the percentages suggest.</LI>
        <LI><strong>Cost of living.</strong> Sydney and Melbourne rank among the world’s pricier cities.</LI>
        <LI><strong>Healthcare.</strong> Both have public systems (NHS / Medicare), so that’s broadly a wash.</LI>
      </UL>

      <H2>The honest verdict</H2>
      <P>
        On take-home percentage, Australia clearly wins — and super sweetens it further. Whether the
        move pays off depends on the actual salary offered and where you live, but the tax system is
        firmly in Australia’s favour.
      </P>

      <H2>Run your own numbers</H2>
      <P>
        Compare with the <A href="/uk">UK</A> and <A href="/au">Australia</A> calculators, see the
        full <A href="/take-home-by-country">take-home by country</A> table, or weigh two offers in
        the <A href="/compare">comparison calculator</A>.
      </P>
    </Article>
  )
}
