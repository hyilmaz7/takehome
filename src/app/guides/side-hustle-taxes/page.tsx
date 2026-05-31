import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'side-hustle-taxes'
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
        Made some money on the side — freelancing, reselling, driving, a bit of consulting? It’s
        taxable, and it’s taxed less gently than you might hope. Knowing the rules upfront keeps April
        from becoming a nasty surprise.
      </P>

      <H2>How side income is taxed</H2>
      <P>
        Side-hustle profit stacks <em>on top</em> of your regular income, so it’s taxed at your{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">marginal rate</A> — the highest rate you
        already reach. On top of that, self-employment income over $400 a year owes{' '}
        <strong>15.3% self-employment tax</strong> (both halves of Social Security and Medicare) — see
        the <A href="/guides/self-employed-tax-guide">self-employed taxes guide</A>.
      </P>

      <Callout>
        <strong>Rule of thumb:</strong> set aside <strong>25–35%</strong> of your side-hustle profit
        for taxes — more if you’re a higher earner. That covers income tax plus self-employment tax so
        the money’s there when it’s due.
      </Callout>

      <H2>Quarterly estimated taxes</H2>
      <P>
        There’s no employer withholding on side income, so if you’ll owe more than about $1,000, the
        IRS expects <strong>quarterly estimated payments</strong> (roughly April, June, September and
        January). Skipping them can mean an underpayment penalty.
      </P>

      <H2>Deduct your expenses</H2>
      <P>
        You’re taxed on <em>profit</em>, not revenue — so legitimate costs (equipment, software,
        mileage, a home-office share, platform fees) reduce what you owe. Keep records and a separate
        account if you can.
      </P>

      <H2>The forms</H2>
      <UL>
        <LI><strong>1099-NEC / 1099-K</strong> — platforms and clients report what they paid you.</LI>
        <LI><strong>Schedule C</strong> — where you report profit and expenses.</LI>
        <LI><strong>Schedule SE</strong> — calculates your self-employment tax.</LI>
      </UL>

      <H2>Estimate the bite</H2>
      <P>
        To get a feel for the income-tax portion, add your expected side profit to your salary in the
        calculator and watch your marginal rate — then remember to add the 15.3% self-employment tax
        on the side income.
      </P>
    </Article>
  )
}
