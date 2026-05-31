import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'standard-deduction-explained'
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
        Before any tax bracket touches your income, the <strong>standard deduction</strong> takes a
        chunk off the top tax-free. It’s the simplest, most valuable tax break most Americans get —
        and it’s why your taxable income is lower than your salary.
      </P>

      <H2>2025 standard deduction amounts</H2>
      <UL>
        <LI><strong>Single:</strong> $15,000</LI>
        <LI><strong>Married filing jointly:</strong> $30,000</LI>
        <LI><strong>Head of household:</strong> $22,500</LI>
        <LI><strong>Married filing separately:</strong> $15,000</LI>
      </UL>

      <Callout>
        On an $80,000 salary, a single filer is only taxed on <strong>$65,000</strong> — the first
        $15,000 is shielded by the standard deduction. That’s before any 401(k) or other pre-tax
        contributions, which lower it further.
      </Callout>

      <H2>Standard vs itemised</H2>
      <P>
        You can either take the standard deduction or <strong>itemise</strong> (add up specific
        deductions like mortgage interest, state/local taxes up to the cap, and charitable gifts) —
        whichever is larger. Since the standard deduction nearly doubled in 2018, the large majority
        of filers now take it because their itemised total wouldn’t beat it.
      </P>

      <H2>How it fits the calculation</H2>
      <P>
        Your federal tax is worked out on <em>taxable income</em> = salary − pre-tax contributions −
        standard deduction. Only that remaining amount runs through the{' '}
        <A href="/guides/tax-brackets-explained">tax brackets</A>. It’s a big reason your{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">effective tax rate</A> is lower than your
        bracket.
      </P>

      <H2>See it applied</H2>
      <P>
        Our US calculator applies the standard deduction automatically — enter your salary to see
        your taxable income and the resulting federal tax.
      </P>
    </Article>
  )
}
