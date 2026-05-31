import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'uk-national-insurance-explained'
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
        National Insurance (NI) is the UK’s second payroll deduction, sitting alongside income tax on
        your payslip. It’s easy to overlook, but for many workers it’s a significant chunk of pay —
        and unlike income tax, it works on its own set of thresholds.
      </P>

      <H2>What employees pay (Class 1)</H2>
      <P>
        For the 2025/26 tax year, employees pay Class 1 NI on their earnings:
      </P>
      <UL>
        <LI><strong>8%</strong> on earnings between £12,570 and £50,270 a year.</LI>
        <LI><strong>2%</strong> on everything above £50,270.</LI>
        <LI>Nothing on earnings below £12,570 (the primary threshold).</LI>
      </UL>
      <P>
        It’s deducted automatically through PAYE, the same way income tax is — see our full{' '}
        <A href="/guides/uk-take-home-pay-explained">UK take-home pay guide</A>.
      </P>

      <H2>What it funds</H2>
      <P>
        NI contributions build your entitlement to the <strong>State Pension</strong> and certain
        benefits. You generally need around 35 qualifying years of contributions for the full new
        State Pension, and at least 10 to get anything.
      </P>

      <Callout>
        Employers pay NI too — at 15% on earnings above a lower threshold from April 2025 — but that’s
        on top of your salary and doesn’t appear as a deduction on your payslip.
      </Callout>

      <H2>NI vs income tax</H2>
      <P>
        They’re separate systems with separate thresholds. Notably, NI is only charged on earned
        income (not pensions or savings), and its rate <em>falls</em> to 2% above £50,270, whereas
        income tax <em>rises</em> to 40% there. That’s why your marginal deduction rate jumps at that
        point.
      </P>

      <H2>Reducing your NI</H2>
      <P>
        A <strong>salary-sacrifice pension</strong> is the main lever: contributions come out of gross
        pay before NI is calculated, so you save both income tax and National Insurance on them.
      </P>

      <H2>See your NI</H2>
      <P>
        Our <A href="/uk">UK salary calculator</A> shows National Insurance as a separate line for any
        salary, including the effect of pension contributions and student loans.
      </P>
    </Article>
  )
}
