import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'effective-vs-marginal-tax-rate'
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
        “I’m in the 22% tax bracket.” It’s one of the most common — and most misunderstood —
        statements in personal finance. Being in the 22% bracket does <em>not</em> mean you pay 22%
        of your income in tax. Understanding why comes down to two different numbers: your marginal
        rate and your effective rate.
      </P>

      <H2>Marginal rate: the tax on your next dollar</H2>
      <P>
        Income tax is progressive, meaning it’s charged in layers. For a single US filer in 2025, the
        first slice of taxable income is taxed at 10%, the next at 12%, then 22%, and so on. Your{' '}
        <strong>marginal rate</strong> is simply the rate that applies to your <em>last</em> dollar
        earned — the top bracket your income reaches.
      </P>
      <P>
        This is the number that matters for decisions: how much of a raise you’ll keep, or how much
        tax a $1,000 pre-tax 401(k) contribution saves you. If your marginal rate is 22%, an extra
        $1,000 of salary nets you $780 (before state tax and FICA).
      </P>

      <H2>Effective rate: your average across everything</H2>
      <P>
        Your <strong>effective rate</strong> is your total tax divided by your gross income — the
        true average. Because the early layers of income are taxed at 10% and 12%, your effective
        rate is always lower than your marginal rate.
      </P>

      <Callout>
        <strong>Example:</strong> A single filer earning $75,000 reaches the 22% bracket, so their
        marginal rate is 22%. But their effective federal income tax rate is closer to{' '}
        <strong>11%</strong> — because only the income above $48,475 is taxed at 22%, while the rest
        is taxed at 10% and 12%.
      </Callout>

      <H2>Why both numbers matter</H2>
      <UL>
        <LI>
          Use your <strong>marginal rate</strong> to evaluate a decision at the edge — a raise, a
          bonus, an extra retirement contribution.
        </LI>
        <LI>
          Use your <strong>effective rate</strong> to understand your overall tax burden and budget.
        </LI>
      </UL>
      <P>
        A practical upshot: pre-tax contributions save you tax at your <em>marginal</em> rate (the
        high number), which is exactly why they’re so efficient — more on that in our guide to{' '}
        <A href="/guides/401k-and-take-home-pay">how a 401(k) affects your take-home pay</A>.
      </P>

      <H2>See your own rates</H2>
      <P>
        Our calculator shows both your effective and marginal rates side by side for any salary, so
        you can see exactly where your next dollar — and your average — actually land.
      </P>
    </Article>
  )
}
