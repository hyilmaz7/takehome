import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import WiseCallout from '../../../components/sections/WiseCallout'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'moving-to-the-us-from-the-uk'
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
        Moving from the UK to the US usually means a bigger take-home percentage — but the headline
        number hides two things that can flip the maths: healthcare and your choice of state. Here’s
        what actually changes about your pay.
      </P>

      <H2>The headline: more in your pocket</H2>
      <P>
        On a like-for-like 100k salary, US take-home is around <strong>79%</strong> (in a no-income-tax
        state) versus roughly <strong>69%</strong> in the UK — see{' '}
        <A href="/guides/uk-vs-us-salary-comparison">UK vs US salary</A>.
      </P>

      <H2>What changes in your pay</H2>
      <UL>
        <LI><strong>FICA replaces National Insurance.</strong> A flat 7.65% (Social Security + Medicare) instead of NI’s 8%/2%.</LI>
        <LI><strong>Standard deduction instead of the personal allowance.</strong> $15,000 (single, 2025) comes off before federal tax.</LI>
        <LI><strong>State income tax.</strong> The big variable — 0% in Texas or Florida, 10%+ in California or New York. Choose carefully; see <A href="/take-home-by-state">take-home by state</A>.</LI>
        <LI><strong>401(k) instead of a workplace pension</strong> — often with an employer match.</LI>
      </UL>

      <Callout>
        <strong>The catch: healthcare.</strong> There’s no NHS. You’ll usually get insurance through
        your employer, but premiums, deductibles and co-pays can run several thousand dollars a year —
        eating into that higher take-home. Factor it in before comparing offers.
      </Callout>

      <H2>Tax residency &amp; admin</H2>
      <UL>
        <LI>You’ll generally become a US tax resident, taxed on worldwide income; the UK may apply split-year treatment.</LI>
        <LI>Get a Social Security Number (SSN) — you can’t really be paid without one.</LI>
        <LI>US reporting rules (FATCA/FBAR) can affect UK accounts and ISAs — take advice.</LI>
      </UL>

      <WiseCallout context="Moving savings from a UK account to a US one — or getting paid across both during the transition —" />

      <H2>Run your numbers</H2>
      <P>
        Model your US offer with the <A href="/us">US calculator</A> (pick your state), compare it to
        your UK pay with the <A href="/uk">UK calculator</A>, or see the full{' '}
        <A href="/take-home-by-country">take-home by country</A> picture.
      </P>
    </Article>
  )
}
