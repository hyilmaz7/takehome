import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'salary-to-hourly'
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
        Converting between an annual salary and an hourly rate is useful for comparing a salaried job
        to contract work, checking whether a raise keeps pace with longer hours, or just
        understanding what your time is worth. The math is simple once you fix how many hours you work
        in a year.
      </P>

      <H2>The formula</H2>
      <P>
        To convert <strong>salary to hourly</strong>, divide your annual salary by the number of hours
        you work per year:
      </P>
      <UL>
        <LI><strong>Hourly rate = annual salary ÷ (hours per week × 52)</strong></LI>
      </UL>
      <P>
        A standard full-time schedule is 40 hours a week × 52 weeks = <strong>2,080 hours</strong> a
        year. So the quick version for full-time work is simply <strong>salary ÷ 2,080</strong>.
      </P>

      <Callout>
        <strong>Shortcut:</strong> divide your salary by 2,000 for a rough hourly figure in your head.
        A $50,000 salary is about $25/hour; $60,000 is about $30/hour. Divide by the exact 2,080 for a
        precise number.
      </Callout>

      <H2>Examples</H2>
      <UL>
        <LI><strong>$40,000</strong> ÷ 2,080 = <strong>$19.23/hour</strong></LI>
        <LI><strong>$50,000</strong> ÷ 2,080 = <strong>$24.04/hour</strong></LI>
        <LI><strong>$60,000</strong> ÷ 2,080 = <strong>$28.85/hour</strong></LI>
        <LI><strong>$75,000</strong> ÷ 2,080 = <strong>$36.06/hour</strong></LI>
        <LI><strong>$100,000</strong> ÷ 2,080 = <strong>$48.08/hour</strong></LI>
      </UL>

      <H2>Going the other way: hourly to salary</H2>
      <P>
        To convert <strong>hourly to salary</strong>, reverse it: multiply your hourly rate by the
        hours you work per year. For full-time, that’s <strong>hourly rate × 2,080</strong>. So $25 an
        hour is $52,000 a year, and $30 an hour is $62,400. If you work part-time, swap 2,080 for your
        actual yearly hours.
      </P>

      <H2>Don’t forget tax — and unpaid time</H2>
      <P>
        These conversions use <em>gross</em> pay. Your actual take-home per hour is lower once income
        tax and FICA come out — see <A href="/guides/gross-vs-net-pay">gross vs net pay</A>. Two other
        things to watch: salaried roles often include paid time off (so you’re paid for more than the
        hours you work), while many hourly and contract roles aren’t — which is part of why
        contractors charge more. A 1099 contractor also pays{' '}
        <A href="/guides/w2-vs-1099-take-home">both halves of FICA</A>, so the equivalent hourly rate
        needs to be higher to match a salaried job.
      </P>

      <H2>Convert it instantly</H2>
      <P>
        Our <A href="/hourly">hourly wage calculator</A> converts any rate into annual, monthly,
        weekly and daily take-home pay after tax — and you can browse ready-made breakdowns for
        common rates like <A href="/hourly/25">$25</A>, <A href="/hourly/30">$30</A> and{' '}
        <A href="/hourly/50">$50</A> an hour.
      </P>
    </Article>
  )
}
