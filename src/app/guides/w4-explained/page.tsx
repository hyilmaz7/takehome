import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'w4-explained'
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
        The W-4 is the form you hand your employer when you start a job — and it quietly decides how
        much federal tax comes out of every paycheck for the rest of the year. Fill it in carelessly
        and you’ll either lend the IRS too much or owe a surprise bill in April.
      </P>

      <H2>What the W-4 controls</H2>
      <P>
        The W-4 sets your <A href="/guides/federal-withholding-explained">federal withholding</A> —
        the income tax your employer prepays for you. It doesn’t affect FICA (fixed at 7.65%) or, in
        most cases, state tax (which often has its own form).
      </P>

      <H2>The five steps</H2>
      <UL>
        <LI><strong>Step 1 — Personal info &amp; filing status.</strong> Single, married filing jointly, or head of household. This sets your bracket and standard deduction.</LI>
        <LI><strong>Step 2 — Multiple jobs.</strong> Crucial if you (or you and a spouse) have more than one job — skip it and you’ll badly under-withhold.</LI>
        <LI><strong>Step 3 — Dependents.</strong> Claim the Child Tax Credit and other dependent credits here to reduce withholding.</LI>
        <LI><strong>Step 4 — Other adjustments (optional).</strong> Extra income, deductions, or an extra dollar amount to withhold each pay period.</LI>
        <LI><strong>Step 5 — Sign.</strong> That’s it — most people only touch Steps 1 and 5.</LI>
      </UL>

      <Callout>
        <strong>The most common mistake:</strong> a two-income household leaving Step 2 blank. Each
        job withholds as if it’s your only income, so together you under-withhold and owe at tax time.
        Step 2 fixes it.
      </Callout>

      <H2>When to update it</H2>
      <P>
        Redo your W-4 after a raise, a second job, marriage or divorce, or a new child — anything that
        changes your tax picture. Aim to withhold close to what you’ll owe rather than chasing a big
        refund (which is just an interest-free loan to the government).
      </P>

      <H2>Sanity-check it</H2>
      <P>
        Run your salary through the calculator to see your expected federal tax for the year, then
        compare it to what your paychecks are actually withholding.
      </P>
    </Article>
  )
}
