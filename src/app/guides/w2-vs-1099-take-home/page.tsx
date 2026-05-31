import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'w2-vs-1099-take-home'
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
        A $100,000 W-2 salary and a $100,000 1099 contract are <em>not</em> the same money. The
        contractor takes home meaningfully less — because they shoulder taxes and costs an employer
        would normally cover. If you’re comparing an employee offer to contract work, this is the gap
        that matters.
      </P>

      <H2>The big one: self-employment tax</H2>
      <P>
        As a W-2 employee you pay 7.65% FICA, and your employer quietly pays the other 7.65%. As a
        1099 contractor you’re both, so you pay the full <strong>15.3% self-employment tax</strong>
        (12.4% Social Security up to the wage base + 2.9% Medicare) — see our{' '}
        <A href="/guides/self-employed-tax-guide">self-employed taxes guide</A>.
      </P>

      <Callout>
        On $100,000, the W-2 employee’s payroll-tax share is about $7,650. The 1099 contractor pays
        roughly <strong>$14,100</strong> in self-employment tax — about $6,500 more — though they can
        deduct half of it against income tax.
      </Callout>

      <H2>The benefits you stop getting</H2>
      <UL>
        <LI><strong>Health insurance</strong> — no employer plan; you buy your own (often $5,000–$15,000+/yr).</LI>
        <LI><strong>401(k) match</strong> — gone (though you can open a Solo 401(k) or SEP-IRA).</LI>
        <LI><strong>Paid time off, sick leave, unemployment insurance</strong> — none.</LI>
        <LI><strong>Equipment, software, expenses</strong> — your cost (but often deductible).</LI>
      </UL>

      <H2>The upside of 1099</H2>
      <P>
        Contractors can deduct legitimate business expenses, shelter more in self-employed retirement
        plans, and often command higher rates. The freedom and tax-planning room can outweigh the
        downsides — if the rate is right.
      </P>

      <H2>The rule of thumb</H2>
      <P>
        To match a W-2 salary after tax and lost benefits, a 1099 contract usually needs to pay
        roughly <strong>25–40% more</strong>. A $100k salary ≈ a $125k–$140k contract, depending on the
        benefits you’re replacing.
      </P>

      <H2>Estimate it</H2>
      <P>
        Model the employee side with our calculator, then add back the employer’s half of FICA and the
        value of any benefits to get a fair contract-rate comparison.
      </P>
    </Article>
  )
}
