import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'married-vs-single-tax'
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
        Your <strong>filing status</strong> is one of the biggest levers on your federal tax bill. It
        sets both your standard deduction and the width of your tax brackets — so the same salary can
        produce very different take-home pay depending on whether you file single or married.
      </P>

      <H2>The marriage bonus (one main earner)</H2>
      <P>
        Married-filing-jointly brackets are roughly double the single brackets, and the standard
        deduction is $30,000 vs $15,000 (2025). For a couple where one person earns most of the
        income, that’s a real saving.
      </P>
      <Callout>
        <strong>Example — $100,000, one earner:</strong> filing single, federal income tax is about
        $13,600. Filing jointly (spouse with no income), it drops to roughly <strong>$7,900</strong> —
        a marriage bonus of around $5,700, because the income now spreads across the wider joint
        brackets and a bigger deduction.
      </Callout>

      <H2>The marriage penalty (two high earners)</H2>
      <P>
        The brackets stop being exactly double at the very top. Two high earners who each would sit in
        a lower bracket alone can be pushed higher when their incomes combine — a “marriage penalty.”
        It mainly bites dual high-income couples, not most households.
      </P>

      <H2>Head of household</H2>
      <P>
        If you’re unmarried but support a dependent, <strong>head of household</strong> gives you a
        larger standard deduction ($22,500) and wider brackets than single — worth checking if you
        qualify.
      </P>

      <H2>What it doesn’t change</H2>
      <UL>
        <LI><strong>FICA</strong> is per-person and flat (7.65%) regardless of filing status.</LI>
        <LI><strong>State tax</strong> rules vary — some mirror federal status, some don’t.</LI>
      </UL>

      <H2>Compare your own situation</H2>
      <P>
        Our calculator lets you switch filing status (single, married, head of household) for any
        salary — toggle it to see exactly how your take-home changes. For more on how the bands work,
        see <A href="/guides/tax-brackets-explained">how tax brackets actually work</A>.
      </P>
    </Article>
  )
}
