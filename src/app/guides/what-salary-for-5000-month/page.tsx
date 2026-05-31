import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'what-salary-for-5000-month'
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
        Budgeting backwards from a take-home target is one of the smartest ways to think about
        salary. If you want <strong>$5,000 a month</strong> in your account — that’s $60,000 a year
        <em> after</em> tax — what gross salary do you actually need? The answer depends heavily on
        where you live.
      </P>

      <H2>The short answer</H2>
      <UL>
        <LI>
          In a <strong>no-income-tax state</strong> (Texas, Florida, Washington…), you’d need a gross
          salary of roughly <strong>$74,000</strong>.
        </LI>
        <LI>
          In <strong>California</strong>, with state income tax on top, you’d need closer to{' '}
          <strong>$80,000</strong> for the same $5,000/month.
        </LI>
      </UL>
      <P>
        Both assume a single filer taking the standard deduction, with no 401(k) or other pre-tax
        deductions.
      </P>

      <H2>Why the gap?</H2>
      <P>
        To net $60,000, you have to earn enough to cover federal income tax (~$8,000–$9,500 in this
        range), FICA at 7.65% (~$5,600–$6,100), and any state income tax. The more your state takes,
        the higher your gross needs to be to land at the same take-home — see{' '}
        <A href="/guides/how-much-tax-on-paycheck">how much tax comes out of your paycheck</A>.
      </P>

      <Callout>
        <strong>Pre-tax contributions move the target.</strong> If you’re also putting money into a
        traditional 401(k), you’ll need a higher gross to hit the same take-home — but you’re saving
        the difference, not losing it. See{' '}
        <A href="/guides/401k-and-take-home-pay">how a 401(k) affects take-home pay</A>.
      </Callout>

      <H2>Other monthly targets (no-tax state, rough gross)</H2>
      <UL>
        <LI><strong>$3,000/month</strong> → about $42,000 gross.</LI>
        <LI><strong>$4,000/month</strong> → about $57,000 gross.</LI>
        <LI><strong>$6,000/month</strong> → about $91,000 gross.</LI>
      </UL>

      <H2>Find your exact number</H2>
      <P>
        These are estimates — your state, filing status and deductions all shift the figure. Our{' '}
        <A href="/reverse">reverse salary calculator</A> does this precisely: enter the take-home you
        want and it works out the exact gross salary you need.
      </P>
    </Article>
  )
}
