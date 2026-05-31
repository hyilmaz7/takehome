import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'social-security-tax-explained'
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
        Social Security tax is the larger half of <A href="/guides/fica-tax-explained">FICA</A>. It’s
        a <strong>6.2%</strong> payroll tax taken from your wages that funds retirement, disability and
        survivor benefits for millions of Americans. Unlike Medicare, it has a hard ceiling.
      </P>

      <H2>The 6.2% rate and the wage base</H2>
      <P>
        You pay 6.2% on your earnings up to an annual <strong>wage base of $176,100 (2025)</strong>.
        Earn more than that and the extra isn’t taxed for Social Security — so the most any single
        worker pays in 2025 is about <strong>$10,918</strong>. The cap rises most years with average
        wages.
      </P>

      <Callout>
        Your employer also pays 6.2% on your behalf, so a total of <strong>12.4%</strong> goes into
        Social Security. You only see your half on your paystub.
      </Callout>

      <H2>What it funds</H2>
      <UL>
        <LI><strong>Retirement benefits</strong> — based on your highest 35 years of earnings.</LI>
        <LI><strong>Disability insurance</strong> — if you can no longer work.</LI>
        <LI><strong>Survivor benefits</strong> — for your spouse and dependents.</LI>
      </UL>

      <H2>Self-employed? You pay both halves</H2>
      <P>
        If you work for yourself, there’s no employer to split the bill, so you pay the full 12.4%
        Social Security portion as part of self-employment tax — see our{' '}
        <A href="/guides/self-employed-tax-guide">self-employed taxes guide</A>.
      </P>

      <H2>Does a 401(k) reduce it?</H2>
      <P>
        No. Like all of FICA, Social Security tax applies to your gross wages — traditional 401(k)
        contributions lower your income tax but not this. See{' '}
        <A href="/guides/401k-and-take-home-pay">how a 401(k) affects your take-home pay</A>.
      </P>

      <H2>See your contribution</H2>
      <P>
        The calculator shows Social Security as its own line for any salary, so you can see exactly
        how much you contribute — and where you hit the wage-base cap.
      </P>
    </Article>
  )
}
