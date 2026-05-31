import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'australia-income-tax-guide'
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
        Australian take-home pay is shaped by three things: income tax, the Medicare Levy, and — sitting
        on top of your salary rather than coming out of it — superannuation. There’s no state income
        tax, so your marginal rate is the same wherever you live in Australia.
      </P>

      <H2>Income tax brackets (2025/26)</H2>
      <P>For Australian residents, the rates are:</P>
      <UL>
        <LI><strong>0%</strong> on the first $18,200 — the tax-free threshold.</LI>
        <LI><strong>16%</strong> on $18,201–$45,000.</LI>
        <LI><strong>30%</strong> on $45,001–$135,000.</LI>
        <LI><strong>37%</strong> on $135,001–$190,000.</LI>
        <LI><strong>45%</strong> above $190,000.</LI>
      </UL>
      <P>
        As elsewhere, only the income inside each band is taxed at that band’s rate. The Low Income
        Tax Offset (LITO) of up to $700 further reduces tax for lower earners.
      </P>

      <H2>The Medicare Levy</H2>
      <P>
        Most taxpayers pay a <strong>2% Medicare Levy</strong> on taxable income, funding Australia’s
        public health system. It’s phased in for low incomes.
      </P>

      <Callout>
        <strong>The Medicare Levy Surcharge (MLS)</strong> adds 1–1.5% if your income is above $93,000
        (singles) and you don’t hold private hospital cover. Because it applies to your whole income,
        crossing the threshold can actually <em>lower</em> your take-home — taking out a suitable
        policy removes it.
      </Callout>

      <H2>Superannuation</H2>
      <P>
        Your employer pays <strong>superannuation</strong> at 12% of your ordinary earnings (2025/26)
        <em> on top of</em> your salary — it goes to your super fund, not your bank account, so it
        doesn’t reduce take-home pay. It’s essentially compulsory retirement saving.
      </P>

      <H2>A worked example</H2>
      <P>
        On an $80,000 salary you’d pay about $14,788 income tax and $1,600 Medicare Levy, leaving
        roughly <strong>$63,600</strong> take-home — plus $9,600 of super paid separately into your
        fund. See the exact figure for any salary with our{' '}
        <A href="/au">Australian salary calculator</A>, or browse{' '}
        <A href="/salary/80000-au">$80,000 after tax</A> and other amounts.
      </P>
    </Article>
  )
}
