import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'uk-vs-us-salary-comparison'
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
        “Should I take the job in London or New York?” The salaries look similar once you convert the
        currency — but take-home pay, and what that pay has to cover, differ in ways the headline
        number hides.
      </P>

      <H2>Take-home percentage: the US edges it</H2>
      <P>
        Compare roughly equivalent salaries — say <strong>£60,000</strong> in the UK and{' '}
        <strong>$76,000</strong> in the US (similar at typical exchange rates):
      </P>
      <UL>
        <LI>
          <strong>UK £60,000:</strong> ~£11,432 income tax + ~£3,211 National Insurance → about{' '}
          <strong>£45,400 take-home (≈ 76%)</strong>.
        </LI>
        <LI>
          <strong>US $76,000</strong> (single, no state tax): ~$8,334 federal tax + $5,814 FICA → about{' '}
          <strong>$61,900 take-home (≈ 81%)</strong>.
        </LI>
      </UL>
      <P>
        So on paper, the US worker keeps a higher share of gross. But that’s only half the story.
      </P>

      <H2>What the take-home has to cover</H2>
      <Callout>
        The big asterisk is <strong>healthcare</strong>. UK National Insurance helps fund the NHS,
        free at the point of use. In the US, health insurance is usually separate — even with an
        employer plan, the employee’s share of premiums plus deductibles can run thousands of dollars
        a year, eating into that higher take-home.
      </Callout>
      <UL>
        <LI><strong>State tax:</strong> the US figure above assumes a no-tax state. In California or New York, the US advantage shrinks or disappears — see <A href="/take-home-by-state">take-home by state</A>.</LI>
        <LI><strong>Pensions:</strong> UK auto-enrolment and US 401(k)s both reduce take-home but build retirement savings.</LI>
        <LI><strong>Cost of living &amp; currency</strong> swing the real comparison further.</LI>
      </UL>

      <H2>The honest verdict</H2>
      <P>
        US take-home percentages tend to beat the UK’s, especially in no-income-tax states — but once
        you factor in healthcare costs and higher-tax states, the gap narrows and can reverse. There’s
        no single winner; it depends on the state, the city and the benefits package.
      </P>

      <H2>Run both sides</H2>
      <P>
        Compare your own numbers with the <A href="/uk">UK</A> and <A href="/us">US</A> calculators,
        and read the full breakdowns in our{' '}
        <A href="/guides/uk-take-home-pay-explained">UK take-home guide</A> and{' '}
        <A href="/guides/how-much-tax-on-paycheck">US paycheck guide</A>.
      </P>
    </Article>
  )
}
