import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import WiseCallout from '../../../components/sections/WiseCallout'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'moving-to-canada-from-the-uk'
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
        Canada is one of the most popular destinations for UK movers, and the tax system, while
        familiar in spirit, works differently in the details. Here’s what changes about your pay when
        you cross the Atlantic.
      </P>

      <H2>The headline: a little more in your pocket</H2>
      <P>
        On a like-for-like 100k salary, Canadian take-home is around <strong>74%</strong> versus
        roughly <strong>69%</strong> in the UK — and you escape the £100k allowance trap. Full numbers
        in <A href="/guides/uk-vs-canada-salary">UK vs Canada salary</A>.
      </P>

      <H2>What changes in your pay</H2>
      <UL>
        <LI><strong>Two layers of income tax.</strong> Instead of one UK income tax, you pay federal tax (15%–33%) <em>and</em> a provincial tax that varies a lot by province.</LI>
        <LI><strong>CPP and EI replace National Insurance.</strong> The Canada Pension Plan (5.95% up to C$71,300) and Employment Insurance (1.64% up to C$65,700) come off your pay instead of NI.</LI>
        <LI><strong>Basic personal amount.</strong> Like the UK personal allowance, roughly C$16,129 of income is effectively tax-free via a federal credit (plus a provincial amount).</LI>
        <LI><strong>Province is a big lever.</strong> Alberta is light on tax; Quebec is heavy. Your take-home can swing thousands depending on where you land.</LI>
      </UL>

      <Callout>
        <strong>Tax residency.</strong> You’ll generally become a Canadian tax resident when you
        establish residential ties, taxed on worldwide income. The UK may apply split-year treatment
        for your departure year. Get advice if you keep UK income, property or pensions.
      </Callout>

      <H2>Healthcare and pensions</H2>
      <UL>
        <LI><strong>Healthcare</strong> is public and provincial — but some provinces have a waiting period of up to three months after you arrive, so short-term private cover is worth considering.</LI>
        <LI><strong>Retirement:</strong> alongside CPP, many employers offer an RRSP (similar to a workplace pension). Your UK pension usually stays in the UK — take regulated advice before moving it.</LI>
      </UL>

      <WiseCallout context="Moving savings from a UK account to a Canadian one — or getting paid across both during the transition —" />

      <H2>Before you go: a checklist</H2>
      <UL>
        <LI>Confirm your visa / PR status and work rights.</LI>
        <LI>Apply for a Social Insurance Number (SIN) on arrival — you can’t be paid without it.</LI>
        <LI>Choose a province (it materially affects your take-home and healthcare wait).</LI>
        <LI>Open a Canadian bank account and set up short-term health cover if needed.</LI>
        <LI>Tell HMRC you’re leaving (form P85) and review your UK pension and ISA position.</LI>
      </UL>

      <H2>Run your numbers</H2>
      <P>
        Model your new salary with the <A href="/ca">Canadian calculator</A>, compare it to your UK
        pay with the <A href="/uk">UK calculator</A>, or see the full{' '}
        <A href="/take-home-by-country">take-home by country</A> picture.
      </P>
    </Article>
  )
}
