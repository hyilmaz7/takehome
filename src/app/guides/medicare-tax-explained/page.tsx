import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'medicare-tax-explained'
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
        Medicare tax is the smaller half of <A href="/guides/fica-tax-explained">FICA</A>. It’s a{' '}
        <strong>1.45%</strong> payroll tax that funds Medicare — the federal hospital insurance
        program for people aged 65 and over. Its defining feature: there’s <strong>no income cap</strong>.
      </P>

      <H2>1.45% on every dollar</H2>
      <P>
        Unlike Social Security, which stops at a wage base, Medicare applies to <em>all</em> your
        wages — the first dollar and the millionth. Your employer matches it, so 2.9% in total goes
        to Medicare.
      </P>

      <H2>The Additional Medicare Tax</H2>
      <Callout>
        High earners pay an extra <strong>0.9%</strong> on wages above <strong>$200,000</strong>{' '}
        (single) or <strong>$250,000</strong> (married filing jointly). Employers don’t match this
        surtax — it’s entirely on the employee. Above the threshold your Medicare rate effectively
        becomes 2.35% on the excess.
      </Callout>

      <H2>Who pays it</H2>
      <UL>
        <LI><strong>Employees</strong> — 1.45% withheld automatically (plus 0.9% if you’re a high earner).</LI>
        <LI><strong>Employers</strong> — match the 1.45% (but not the surtax).</LI>
        <LI><strong>Self-employed</strong> — pay the full 2.9% themselves as part of self-employment tax.</LI>
      </UL>

      <H2>Does anything reduce it?</H2>
      <P>
        Pre-tax health premiums and HSA contributions can reduce the wages Medicare is charged on,
        but a traditional 401(k) does <strong>not</strong> — it lowers income tax only. See{' '}
        <A href="/guides/how-much-tax-on-paycheck">how much tax comes out of your paycheck</A> for the
        full picture.
      </P>

      <H2>See it on your salary</H2>
      <P>
        Our calculator lists Medicare separately, including the additional surtax once your income
        crosses the threshold — drop in any salary to see your exact amount.
      </P>
    </Article>
  )
}
