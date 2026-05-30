import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'uk-take-home-pay-explained'
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
        In the UK, the gap between your gross salary and what actually hits your bank account comes
        down to two deductions: <strong>income tax</strong> and <strong>National Insurance</strong>.
        Add an optional pension or student loan and you have the full picture of your take-home pay
        for the 2025/26 tax year.
      </P>

      <H2>Income tax and the personal allowance</H2>
      <P>
        Everyone gets a tax-free <strong>personal allowance</strong> of £12,570. Above that, income
        tax is charged in bands:
      </P>
      <UL>
        <LI>Basic rate — <strong>20%</strong> on income from £12,571 to £50,270.</LI>
        <LI>Higher rate — <strong>40%</strong> from £50,271 to £125,140.</LI>
        <LI>Additional rate — <strong>45%</strong> above £125,140.</LI>
      </UL>
      <P>
        Like the US, only the income within each band is taxed at that band’s rate — so reaching the
        40% band doesn’t mean your whole salary is taxed at 40%.
      </P>

      <H2>National Insurance</H2>
      <P>
        National Insurance (NI) is a separate contribution that funds the State Pension and certain
        benefits. Employees pay Class 1 NI at <strong>8%</strong> on earnings between £12,570 and
        £50,270, then <strong>2%</strong> on anything above. It’s deducted automatically through PAYE
        alongside income tax.
      </P>

      <H2>The £100,000 trap</H2>
      <Callout>
        Between £100,000 and £125,140 your personal allowance is withdrawn by £1 for every £2 you
        earn. Combined with 40% income tax, this creates an effective <strong>60% marginal rate</strong>{' '}
        on that band — one of the quirks that makes a pension contribution especially valuable for
        higher earners.
      </Callout>

      <H2>Pension and student loans</H2>
      <P>
        A salary-sacrifice <strong>pension</strong> comes out of gross pay before both income tax and
        NI, making it highly tax-efficient. <strong>Student loan</strong> repayments, by contrast, are
        a percentage of income above a plan threshold (for example 9% above £28,470 on Plan 2) — not a
        tax, but collected the same way.
      </P>

      <H2>A worked example</H2>
      <P>
        On a £40,000 salary you’d pay roughly £5,486 income tax and £2,194 National Insurance, leaving
        about £32,320 take-home before any pension. Want the exact figure for your salary, including
        Scottish rates, pension and student loan? Use our{' '}
        <A href="/uk">UK salary calculator</A> for a full breakdown.
      </P>
    </Article>
  )
}
