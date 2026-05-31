import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A } from '../../../components/sections/Prose'

const SLUG = 'how-to-read-your-pay-stub'
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
        A pay stub packs a lot of numbers into a small space, and the jargon doesn’t help. But every
        stub follows the same logic: start with gross pay, subtract a series of deductions, and
        what’s left is your net pay. Here’s what each section means.
      </P>

      <H2>Gross pay</H2>
      <P>
        Your earnings before any deductions — your salary for the period, plus any overtime, bonus or
        commission. Stubs usually show both the current period and the year-to-date (YTD) total.
      </P>

      <H2>Taxes withheld</H2>
      <UL>
        <LI><strong>Federal income tax</strong> — based on your W-4 and the IRS withholding tables.</LI>
        <LI>
          <strong>Social Security / “OASDI”</strong> — 6.2%, up to the $176,100 wage base (2025).
        </LI>
        <LI><strong>Medicare</strong> — 1.45% of all wages. Together with Social Security this is your{' '}
          <A href="/guides/fica-tax-explained">FICA</A> tax.</LI>
        <LI><strong>State (and sometimes local) income tax</strong> — varies by where you live.</LI>
      </UL>

      <H2>Pre-tax deductions</H2>
      <P>
        These come out <em>before</em> tax is calculated, lowering your taxable income:
      </P>
      <UL>
        <LI><strong>401(k) / 403(b)</strong> — traditional retirement contributions.</LI>
        <LI><strong>Health, dental and vision premiums</strong> — often via a Section 125 plan.</LI>
        <LI><strong>HSA / FSA</strong> — health savings or flexible spending accounts.</LI>
      </UL>
      <P>
        Because they’re pre-tax, a dollar here reduces your take-home by less than a dollar — that’s
        the appeal of <A href="/guides/401k-and-take-home-pay">contributing to a 401(k)</A>.
      </P>

      <H2>Post-tax deductions</H2>
      <P>
        Taken after tax — things like Roth 401(k) contributions, wage garnishments, union dues or
        some insurance. These don’t reduce your taxable income.
      </P>

      <H2>Net pay</H2>
      <P>
        The bottom line: gross pay minus all taxes and deductions — the amount actually deposited in
        your account. If your net pay looks lower than expected, it’s usually federal withholding or
        your state tax doing the work; see{' '}
        <A href="/guides/how-much-tax-on-paycheck">how much tax comes out of your paycheck</A>.
      </P>

      <H2>Check the math</H2>
      <P>
        Want to verify your stub or see what changing your 401(k) would do? Run your salary through
        the calculator for a clean, itemised breakdown you can compare against your paycheck.
      </P>
    </Article>
  )
}
