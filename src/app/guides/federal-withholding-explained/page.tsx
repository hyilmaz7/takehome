import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'federal-withholding-explained'
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
        “Federal withholding” is usually the single biggest line on a US paycheck — but it’s widely
        misunderstood. It is <strong>not</strong> your final tax bill. It’s an <em>estimate</em> your
        employer pays to the IRS on your behalf throughout the year, settled up when you file.
      </P>

      <H2>How it works</H2>
      <P>
        Each payday, your employer estimates how much federal income tax you’ll owe for the year,
        divides it across your paychecks, and sends that amount to the IRS. The estimate is based on
        the <A href="/guides/w4-explained">W-4 form</A> you filled out — your filing status,
        dependents and any extra withholding you requested.
      </P>

      <Callout>
        Withholding is a running prepayment. At tax time, your <em>actual</em> tax is calculated. If
        you withheld more than you owed, you get a <strong>refund</strong>; if you withheld less, you
        <strong> owe</strong> the difference. A big refund isn’t free money — it means you lent the
        IRS too much, interest-free, all year.
      </Callout>

      <H2>Withholding vs the taxes that aren’t adjustable</H2>
      <UL>
        <LI><strong>Federal income tax</strong> — adjustable via your W-4 (this is “withholding”).</LI>
        <LI><strong>Social Security &amp; Medicare (FICA)</strong> — fixed at 7.65%, not adjustable. See <A href="/guides/fica-tax-explained">FICA explained</A>.</LI>
        <LI><strong>State income tax</strong> — withheld separately where it applies.</LI>
      </UL>

      <H2>Getting it right</H2>
      <P>
        The goal is to withhold close to what you’ll actually owe — neither a huge refund nor a
        surprise bill. Update your W-4 after a raise, a second job, marriage, or a new child. The IRS
        Tax Withholding Estimator can help, and our calculator shows your expected federal tax so you
        can sanity-check it.
      </P>

      <H2>See your numbers</H2>
      <P>
        Enter your salary in the calculator to see your estimated federal income tax alongside FICA
        and state tax — a good baseline for checking your withholding.
      </P>
    </Article>
  )
}
