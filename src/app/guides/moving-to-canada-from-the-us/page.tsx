import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import WiseCallout from '../../../components/sections/WiseCallout'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'moving-to-canada-from-the-us'
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
        The US and Canada feel similar, but the move changes your pay in a few specific ways. You’ll
        generally trade a little more tax for universal healthcare — and swap a single state tax for
        two layers of income tax.
      </P>

      <H2>The headline: a bit less take-home, no insurance bill</H2>
      <P>
        On a like-for-like 100k salary, Canadian take-home is around <strong>74%</strong> (Ontario)
        versus roughly <strong>79%</strong> in a no-tax US state — see{' '}
        <A href="/guides/us-vs-canada-salary">US vs Canada salary</A>. But Canada’s taxes fund public
        healthcare, so there’s no separate insurance premium.
      </P>

      <H2>What changes in your pay</H2>
      <UL>
        <LI><strong>Two layers of income tax.</strong> Federal (15%–33%) plus a provincial tax that varies a lot — Alberta is light, Quebec heavy.</LI>
        <LI><strong>CPP and EI replace FICA.</strong> CPP (5.95% up to C$71,300) and EI (1.64% up to C$65,700) instead of Social Security + Medicare.</LI>
        <LI><strong>Basic personal amount</strong> (~C$16,129) works like the US standard deduction.</LI>
        <LI><strong>RRSP</strong> instead of a 401(k) for tax-advantaged retirement saving.</LI>
      </UL>

      <Callout>
        <strong>Province is a big lever.</strong> Your take-home can swing by thousands depending on
        where you land — compare with the <A href="/ca">Canadian calculator</A> before you choose.
      </Callout>

      <H2>The big one for US citizens: you still file US taxes</H2>
      <P>
        Like anywhere, US citizens keep filing a US return on worldwide income even while living in
        Canada — though the US–Canada tax treaty and foreign tax credits generally prevent double
        taxation. Also note some provinces have a short healthcare waiting period after you arrive.
      </P>

      <WiseCallout context="Moving savings from a US bank to a Canadian one — or getting paid across the border —" />

      <H2>Run your numbers</H2>
      <P>
        Model your Canadian offer with the <A href="/ca">Canadian calculator</A>, compare it to your US
        pay with the <A href="/us">US calculator</A>, or see the full{' '}
        <A href="/take-home-by-country">take-home by country</A> picture.
      </P>
    </Article>
  )
}
