import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'first-job-take-home-pay'
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
        Your first real paycheck almost always comes as a shock: it’s noticeably less than your salary
        divided by the number of pay periods. That’s normal — several deductions come out before you’re
        paid. Here’s exactly where the money goes.
      </P>

      <H2>Why your paycheck is smaller than your salary</H2>
      <UL>
        <LI><strong>Federal income tax</strong> — withheld based on your <A href="/guides/w4-explained">W-4</A>.</LI>
        <LI><strong>FICA (7.65%)</strong> — Social Security + Medicare; see <A href="/guides/fica-tax-explained">FICA explained</A>.</LI>
        <LI><strong>State income tax</strong> — 0% in nine states, up to 10%+ elsewhere.</LI>
        <LI><strong>Benefits</strong> — health insurance premiums, and any 401(k) you opt into.</LI>
      </UL>

      <Callout>
        <strong>Example:</strong> a $50,000 first salary in a no-income-tax state nets roughly
        <strong> $42,000 a year</strong> — about $3,500 a month — after federal tax and FICA. In a
        higher-tax state, expect a bit less.
      </Callout>

      <H2>Three things to do early</H2>
      <UL>
        <LI><strong>Budget on net, not gross.</strong> Plan around your actual take-home, not the headline salary.</LI>
        <LI><strong>Grab the 401(k) match.</strong> If your employer matches contributions, that’s free money — contribute at least enough to get all of it. See <A href="/guides/401k-and-take-home-pay">how a 401(k) affects take-home</A>.</LI>
        <LI><strong>Check your withholding.</strong> A giant refund means you over-withheld all year; aim to land close to even.</LI>
      </UL>

      <H2>Know your number</H2>
      <P>
        Enter your starting salary and state in the calculator to see your exact take-home per month
        and per paycheck — the figure to actually build your budget around.
      </P>
    </Article>
  )
}
