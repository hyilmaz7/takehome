import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = '100k-after-tax-by-state'
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
        A $100,000 salary sounds the same everywhere — but your take-home pay is not. The federal
        tax and FICA you owe are identical across the country, yet state income tax swings the result
        by thousands of dollars a year. Live in Texas or Florida and you keep noticeably more than
        someone earning the exact same salary in California or New York.
      </P>

      <H2>The fixed part: federal tax and FICA</H2>
      <P>
        On a $100,000 salary (single filer, 2025), everyone pays the same two federal pieces:
      </P>
      <UL>
        <LI>
          <strong>Federal income tax: about $13,614.</strong> Calculated on your income after the
          $15,000 standard deduction, across the 10%–24% brackets.
        </LI>
        <LI>
          <strong>FICA: $7,650.</strong> Social Security (6.2%) plus Medicare (1.45%) — a flat 7.65%
          on the whole salary.
        </LI>
      </UL>
      <P>
        That’s roughly $21,264 gone before any state gets involved, leaving about{' '}
        <A href="/salary/100000">$78,700 in a no-income-tax state</A> (≈ $6,561/month).
      </P>

      <H2>The variable part: state income tax</H2>
      <P>
        This is where the gap opens up. Nine states levy no income tax on wages at all — including{' '}
        <A href="/salary/100000-texas">Texas</A>, <A href="/salary/100000-florida">Florida</A> and
        Washington — so residents there keep the full $78,700. Others apply progressive brackets that
        meaningfully reduce it:
      </P>
      <UL>
        <LI>
          <A href="/salary/100000-california">California</A> takes roughly $5,000+ in state tax on
          $100k, dropping take-home below $74,000.
        </LI>
        <LI>
          <A href="/salary/100000-new-york">New York</A> lands in a similar range once state tax
          applies.
        </LI>
        <LI>
          Flat-tax states like Illinois (4.95%) and Pennsylvania (3.07%) sit in between.
        </LI>
      </UL>

      <Callout>
        Want the full picture? Our{' '}
        <A href="/take-home-by-state">Take-Home Pay by US State</A> page ranks all 50 states by what
        you actually keep on a $100,000 salary.
      </Callout>

      <H2>How to keep more of it</H2>
      <P>
        Beyond where you live, the biggest lever you control is pre-tax contributions. Putting money
        into a traditional 401(k) lowers your taxable income, so you’re taxed on less — see{' '}
        <A href="/guides/401k-and-take-home-pay">how a 401(k) affects your take-home pay</A>. It’s
        also worth knowing the difference between your{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">effective and marginal tax rates</A> before
        you assume a raise will be “taxed at 24%.”
      </P>

      <H2>Check your exact number</H2>
      <P>
        These figures are estimates for a single filer taking the standard deduction. Your real
        take-home depends on your state, filing status and deductions — run your own with the
        calculator above for an exact, itemised breakdown.
      </P>
    </Article>
  )
}
