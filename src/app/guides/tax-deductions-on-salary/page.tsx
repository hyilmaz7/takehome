import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'tax-deductions-on-salary'
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
        “Tax deductions on your salary” can mean two different things, and mixing them up is where a
        lot of confusion starts. The first is the deductions you see come <strong>out of your
        paycheck</strong> — federal tax, FICA, state tax. The second, and the one that actually saves
        you money, is the deductions that <strong>reduce the salary you’re taxed on</strong> in the
        first place. This guide is about the second kind: what lowers your taxable income, and what
        doesn’t.
      </P>

      <H2>Pre-tax deductions: the ones that lower your tax</H2>
      <P>
        Pre-tax (or “above-the-line”) deductions come out of your gross salary <em>before</em> income
        tax is calculated, so every dollar you contribute is a dollar the IRS doesn’t tax. The common
        ones for salaried employees are:
      </P>
      <UL>
        <LI>
          <strong>Traditional 401(k) or 403(b).</strong> Up to $23,500 in 2025 ($31,000 if you’re
          50+). Lowers your income tax, but <strong>not</strong> Social Security and Medicare — see{' '}
          <A href="/guides/401k-and-take-home-pay">how a 401(k) affects your take-home pay</A>.
        </LI>
        <LI>
          <strong>Health Savings Account (HSA).</strong> Up to $4,300 (self) or $8,550 (family) in
          2025. When contributed through payroll, it reduces <strong>both</strong> income tax and
          FICA — one of the most tax-efficient deductions available.
        </LI>
        <LI>
          <strong>Flexible Spending Account (FSA).</strong> Up to $3,300 in 2025 for healthcare;
          also reduces income tax and FICA, but it’s “use it or lose it.”
        </LI>
        <LI>
          <strong>Employer health, dental and vision premiums.</strong> Usually deducted pre-tax
          under a Section 125 “cafeteria” plan, lowering both income tax and FICA.
        </LI>
        <LI>
          <strong>Traditional IRA contributions.</strong> Up to $7,000 in 2025 and potentially
          deductible on your return (income limits apply if you also have a workplace plan).
        </LI>
        <LI>
          <strong>Commuter / transit benefits.</strong> Up to $325/month in 2025, pre-tax.
        </LI>
      </UL>

      <H2>The standard deduction does the heavy lifting</H2>
      <P>
        On top of any contributions, every taxpayer gets the <A href="/guides/standard-deduction-explained">standard
        deduction</A> — $15,000 for single filers and $30,000 for married couples filing jointly in
        2025. It’s subtracted from your income automatically, so the first slice of your salary is
        never taxed at all. Most employees take it rather than itemizing.
      </P>

      <Callout>
        <strong>Key distinction:</strong> a traditional 401(k) lowers your <strong>income tax</strong>{' '}
        but not your FICA tax, because Social Security and Medicare are charged on your full salary.
        An HSA or FSA contributed through payroll lowers <strong>both</strong>. That’s why an HSA is
        often the most tax-efficient dollar you can shelter.
      </Callout>

      <H2>After-tax deductions: they don’t cut your tax bill</H2>
      <P>
        Some things also come out of your paycheck but <em>after</em> tax is calculated, so they
        don’t reduce your taxable income:
      </P>
      <UL>
        <LI><strong>Roth 401(k) and Roth IRA contributions</strong> — taxed now, tax-free later.</LI>
        <LI><strong>After-tax insurance</strong> such as some disability or life cover.</LI>
        <LI><strong>Wage garnishments and union dues</strong> in most cases.</LI>
      </UL>
      <P>
        These shrink your take-home pay, but they don’t lower the salary the IRS taxes — the trade-off
        for Roth accounts being tax-free growth and withdrawals.
      </P>

      <H2>A quick example</H2>
      <P>
        Say you earn $80,000 and contribute 10% ($8,000) to a traditional 401(k) and $2,000 to an
        HSA. Your taxable income for income-tax purposes drops to about $70,000 before the standard
        deduction — saving roughly $2,200 at the 22% marginal bracket. The HSA portion also saves
        about $153 in FICA. The 401(k) portion doesn’t reduce FICA, so Social Security and Medicare
        are still charged on the full $80,000.
      </P>

      <H2>See your own deductions</H2>
      <P>
        Our calculator lets you add a 401(k) percentage and your state to see exactly how pre-tax
        deductions change your take-home pay. For the full picture of every line that comes out, read{' '}
        <A href="/guides/how-much-tax-on-paycheck">how much tax comes out of your paycheck</A> and{' '}
        <A href="/guides/how-to-read-your-pay-stub">how to read your pay stub</A>.
      </P>
    </Article>
  )
}
