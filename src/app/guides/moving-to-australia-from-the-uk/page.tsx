import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import WiseCallout from '../../../components/sections/WiseCallout'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'moving-to-australia-from-the-uk'
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
        Tens of thousands of Brits move to Australia every year, and the pay packet is a big part of
        the draw. Here’s exactly what changes about your take-home pay, tax and pension when you swap
        the UK system for the Australian one.
      </P>

      <H2>The headline: you keep more</H2>
      <P>
        On a like-for-like 100k salary, Australian take-home is around <strong>77%</strong> versus
        roughly <strong>69%</strong> in the UK — and that’s before superannuation. We break the numbers
        down in <A href="/guides/uk-vs-australia-salary">UK vs Australia salary</A>.
      </P>

      <H2>What changes in your pay</H2>
      <UL>
        <LI><strong>Tax-free threshold instead of personal allowance.</strong> You stop paying tax on the first A$18,200, then face 16% / 30% / 37% / 45% bands.</LI>
        <LI><strong>Medicare Levy replaces National Insurance.</strong> A flat 2% of taxable income (plus a 1–1.5% surcharge above ~A$93k without private hospital cover) instead of NI’s 8%/2%.</LI>
        <LI><strong>Superannuation replaces your pension.</strong> Your employer pays 12% of your salary into super <em>on top</em> of your pay — you don’t fund it from your salary like a UK pension.</LI>
        <LI><strong>No £100k trap.</strong> Australia has no equivalent of the UK’s 60% personal-allowance-withdrawal band, so higher earners keep noticeably more.</LI>
      </UL>

      <Callout>
        <strong>Tax residency.</strong> You’ll generally become an Australian tax resident once you
        move and settle, taxed on worldwide income. The UK may apply “split-year” treatment for the
        year you leave. Get advice if you have UK income, property or investments.
      </Callout>

      <H2>Healthcare and pensions</H2>
      <UL>
        <LI><strong>Medicare:</strong> a UK–Australia reciprocal agreement gives visitors some cover, but permanent residents get full access. Many take private hospital cover to avoid the Medicare Levy Surcharge.</LI>
        <LI><strong>Your UK pension:</strong> you generally can’t transfer it into Australian super easily anymore — most people leave it in the UK. Take regulated advice before moving any pension.</LI>
      </UL>

      <WiseCallout context="Shifting savings from a UK bank to an Australian one — or getting paid in two currencies during the move —" />

      <H2>Before you go: a checklist</H2>
      <UL>
        <LI>Confirm your visa and work rights.</LI>
        <LI>Open an Australian bank account (many let you do this before arrival).</LI>
        <LI>Nominate a super fund once you start work.</LI>
        <LI>Decide on private hospital cover if you’ll earn over ~A$93k.</LI>
        <LI>Tell HMRC you’re leaving (form P85) and check your UK pension and ISA position.</LI>
      </UL>

      <H2>Run your numbers</H2>
      <P>
        Model your new salary with the <A href="/au">Australian calculator</A>, compare it to your UK
        pay with the <A href="/uk">UK calculator</A>, or see the full{' '}
        <A href="/take-home-by-country">take-home by country</A> picture.
      </P>
    </Article>
  )
}
