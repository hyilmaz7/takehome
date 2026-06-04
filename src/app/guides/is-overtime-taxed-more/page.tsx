import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'is-overtime-taxed-more'
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
        It’s one of the most common payroll myths: that overtime gets taxed at a higher rate, so it’s
        “not worth it.” The short answer is <strong>no — overtime is not taxed at a special rate.</strong>{' '}
        A dollar earned in overtime is taxed exactly like a dollar of regular pay. What confuses
        people is the difference between how much is <em>withheld</em> from that bigger check and how
        much tax you actually <em>owe</em>.
      </P>

      <H2>How overtime pay works</H2>
      <P>
        Under federal law, non-exempt employees earn at least <strong>time-and-a-half</strong> (1.5×
        their regular rate) for hours worked beyond 40 in a week. So if you earn $20 an hour, overtime
        hours pay $30. That’s a pay <em>rate</em> bump — it has nothing to do with the tax rate.
      </P>

      <H2>Why your overtime check looks over-taxed</H2>
      <P>
        Payroll systems calculate withholding by <strong>annualizing</strong> each paycheck — they
        assume you’ll earn that amount every pay period for the whole year. A week with lots of
        overtime makes that paycheck bigger, so the system briefly assumes a much higher annual salary
        and withholds at a higher rate for that check. You haven’t been taxed more; the system has
        simply over-estimated your withholding for that one period.
      </P>

      <Callout>
        <strong>The key difference:</strong> <em>withholding</em> is an estimate taken out of each
        paycheck. <em>Tax</em> is what you actually owe for the year. If overtime pushes a single
        paycheck’s withholding too high, you get the excess back as a refund when you file.
      </Callout>

      <H2>What overtime actually costs in tax</H2>
      <P>
        Overtime is taxed at your <strong>marginal rate</strong> — the rate on your next dollar of
        income. If you’re in the 22% bracket, overtime is taxed at 22% (plus FICA and any state tax),
        the same as a raise. The only time the rate changes is if the extra income pushes part of your
        earnings into a higher bracket — and even then, only the portion <em>inside</em> the new
        bracket is taxed at the higher rate. See{' '}
        <A href="/guides/tax-brackets-explained">how tax brackets actually work</A> for why a raise
        (or overtime) can never leave you worse off overall.
      </P>

      <H2>So is overtime worth it?</H2>
      <P>
        Almost always, yes. You keep the same percentage of overtime pay as you keep of your regular
        pay — usually 65–80% after tax. The bigger withholding on a heavy-overtime check is temporary
        and reconciles at tax time. The real considerations are personal: your time and energy, not a
        phantom tax penalty.
      </P>

      <H2>See it on your rate</H2>
      <P>
        Our <A href="/hourly">hourly wage calculator</A> lets you set your hours per week — bump them
        above 40 to see how extra hours flow into your annual and monthly take-home pay. For the tax
        side, read <A href="/guides/effective-vs-marginal-tax-rate">effective vs marginal tax rate</A>.
      </P>
    </Article>
  )
}
