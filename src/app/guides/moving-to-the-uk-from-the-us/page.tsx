import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import WiseCallout from '../../../components/sections/WiseCallout'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'moving-to-the-uk-from-the-us'
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
        Moving from the US to the UK, you’ll generally keep a smaller share of your salary — but a
        chunk of that difference buys something Americans pay for separately: healthcare. Here’s what
        changes about your pay.
      </P>

      <H2>The headline: a smaller take-home %</H2>
      <P>
        On a like-for-like 100k salary, UK take-home is around <strong>69%</strong> versus roughly
        <strong> 79%</strong> in a no-tax US state — see{' '}
        <A href="/guides/uk-vs-us-salary-comparison">UK vs US salary</A>. But there’s no health
        insurance bill and no state income tax.
      </P>

      <H2>What changes in your pay</H2>
      <UL>
        <LI><strong>National Insurance replaces FICA.</strong> 8% on earnings £12,570–£50,270, then 2% above — see <A href="/guides/uk-national-insurance-explained">NI explained</A>.</LI>
        <LI><strong>Personal allowance instead of the standard deduction.</strong> The first £12,570 is tax-free; then 20% / 40% / 45% bands.</LI>
        <LI><strong>No state tax.</strong> One income tax, applied UK-wide (Scotland has its own bands).</LI>
        <LI><strong>Workplace pension</strong> via auto-enrolment replaces your 401(k).</LI>
      </UL>

      <Callout>
        <strong>Watch the £100k trap.</strong> Between £100,000 and £125,140 the personal allowance is
        withdrawn, creating a 60% effective marginal rate — see our{' '}
        <A href="/guides/uk-take-home-pay-explained">UK take-home guide</A>. A pension contribution is
        the usual way to soften it.
      </Callout>

      <H2>The big one for US citizens: you still file US taxes</H2>
      <P>
        The US taxes its citizens on worldwide income <em>wherever</em> they live. You’ll keep filing a
        US return alongside your UK taxes — though the Foreign Earned Income Exclusion and foreign tax
        credits usually prevent double taxation. This is the single most important thing to get advice
        on before you move.
      </P>

      <WiseCallout context="Moving money between US and UK accounts — or getting paid in dollars while living in pounds —" />

      <H2>Run your numbers</H2>
      <P>
        Model your UK offer with the <A href="/uk">UK calculator</A>, compare it to your US pay with
        the <A href="/us">US calculator</A>, or see the full{' '}
        <A href="/take-home-by-country">take-home by country</A> picture.
      </P>
    </Article>
  )
}
