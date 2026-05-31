import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'us-vs-australia-salary'
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
        The US and Australia look almost identical on the headline take-home percentage — but the
        similarity is misleading. What you get for your tax, and what you have to pay for separately,
        sets them apart.
      </P>

      <H2>Same 100k salary, side by side</H2>
      <UL>
        <LI>
          <strong>United States ($100,000, no state tax):</strong> ~$78,700 take-home, about{' '}
          <strong>79%</strong>.
        </LI>
        <LI>
          <strong>Australia (A$100,000, with private cover):</strong> ~A$77,200 take-home, about{' '}
          <strong>77%</strong> — plus 12% superannuation paid on top.
        </LI>
      </UL>

      <Callout>
        The percentages are close, but Australia quietly wins on what’s <em>around</em> the salary:
        (1) <strong>12% super</strong> is added on top of your pay, not taken from it; and (2)
        <strong> Medicare</strong> gives universal healthcare, whereas a US worker typically pays
        thousands a year for health insurance out of pocket.
      </Callout>

      <H2>Where the US pulls ahead</H2>
      <UL>
        <LI><strong>Top-end pay.</strong> US salaries in tech, finance and medicine often dwarf Australian equivalents — the bigger gross outweighs the tax difference.</LI>
        <LI><strong>Low-tax states.</strong> In Texas or Florida the US take-home rises further above Australia’s.</LI>
        <LI><strong>The flip side:</strong> in a high-tax US state like California, Australia comes out ahead once super and healthcare are counted.</LI>
      </UL>

      <H2>The honest verdict</H2>
      <P>
        On take-home percentage it’s a near-tie. Australia is better for security and benefits (super,
        Medicare, leave); the US is better for raw earning potential at the top end — if you can
        absorb the healthcare and state-tax variables.
      </P>

      <H2>Run your own numbers</H2>
      <P>
        Compare with the <A href="/us">US</A> and <A href="/au">Australia</A> calculators, the full{' '}
        <A href="/take-home-by-country">take-home by country</A> table, or the{' '}
        <A href="/compare">job offer comparison calculator</A>.
      </P>
    </Article>
  )
}
