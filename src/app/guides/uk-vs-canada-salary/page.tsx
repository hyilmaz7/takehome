import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'uk-vs-canada-salary'
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
        The UK and Canada have a lot in common — parliamentary systems, public healthcare, similar
        social values — but Canadians keep a bit more of the same nominal salary, and avoid one of the
        UK’s nastiest tax quirks.
      </P>

      <H2>Same 100k salary, side by side</H2>
      <UL>
        <LI>
          <strong>United Kingdom (£100,000):</strong> ~£68,600 take-home, about <strong>69%</strong>.
          Income tax (~£27,400) plus National Insurance (~£4,000).
        </LI>
        <LI>
          <strong>Canada (CA$100,000, Ontario):</strong> ~CA$74,400 take-home, about{' '}
          <strong>74%</strong>. Federal + Ontario tax, plus CPP and EI.
        </LI>
      </UL>

      <Callout>
        Canada’s edge grows above £100,000. In the UK, the personal allowance is withdrawn between
        £100,000 and £125,140, creating a punishing <strong>60% effective marginal rate</strong> —
        see our <A href="/guides/uk-take-home-pay-explained">UK take-home guide</A>. Canada has no
        equivalent trap.
      </Callout>

      <H2>The things a percentage hides</H2>
      <UL>
        <LI><strong>Province matters.</strong> Ontario is mid-pack; Quebec taxes more, Alberta less — pick Alberta and Canada’s lead widens.</LI>
        <LI><strong>Currency.</strong> £100,000 is worth far more than CA$100,000, so a like-for-like role usually pays a bigger number in Canada anyway.</LI>
        <LI><strong>Healthcare.</strong> Both are public (NHS / provincial health), so that’s a wash.</LI>
      </UL>

      <H2>The honest verdict</H2>
      <P>
        Canada keeps more of the same salary and dodges the £100k trap, making it especially
        attractive to higher earners. The UK’s advantage is proximity to Europe and, often, a higher
        gross in finance and professional roles.
      </P>

      <H2>Run your own numbers</H2>
      <P>
        Compare with the <A href="/uk">UK</A> and <A href="/ca">Canada</A> calculators, the full{' '}
        <A href="/take-home-by-country">take-home by country</A> table, or the{' '}
        <A href="/compare">comparison calculator</A>.
      </P>
    </Article>
  )
}
