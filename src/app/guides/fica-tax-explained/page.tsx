import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'fica-tax-explained'
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
        Look at any US paystub and you’ll see a deduction labelled “FICA” — or sometimes split into
        “Social Security” and “Medicare.” FICA stands for the <strong>Federal Insurance
        Contributions Act</strong>, and it’s the payroll tax that funds two of the country’s biggest
        social programs. For most workers it’s a flat <strong>7.65%</strong> of every dollar earned.
      </P>

      <H2>The two parts of FICA</H2>
      <UL>
        <LI>
          <strong>Social Security: 6.2%.</strong> Funds retirement, disability and survivor benefits.
          It only applies up to an annual <strong>wage base of $176,100 (2025)</strong> — earnings
          above that aren’t subject to Social Security tax.
        </LI>
        <LI>
          <strong>Medicare: 1.45%.</strong> Funds hospital insurance for people 65+. Unlike Social
          Security, there’s <strong>no cap</strong> — it applies to all your wages.
        </LI>
      </UL>
      <P>
        Add them together and the standard FICA rate is <strong>7.65%</strong>. On a $60,000 salary
        that’s about $4,590 a year; on $100,000 it’s $7,650.
      </P>

      <H2>The Additional Medicare Tax</H2>
      <P>
        High earners pay a little more. An extra <strong>0.9% Medicare surtax</strong> applies to
        wages above $200,000 (single) or $250,000 (married filing jointly). So above those
        thresholds, your Medicare rate effectively becomes 2.35% on the excess.
      </P>

      <H2>Employer match</H2>
      <P>
        Here’s something many people miss: your employer pays FICA too. They match your 6.2% +
        1.45%, so a total of 15.3% is going to Social Security and Medicare on your behalf — you just
        only see your half on the paystub. (If you’re self-employed, you pay both halves yourself.)
      </P>

      <Callout>
        <strong>Key point:</strong> 401(k) contributions reduce your income tax, but{' '}
        <strong>not FICA</strong>. Social Security and Medicare are charged on your full salary,
        including the portion you put into a traditional 401(k) — see{' '}
        <A href="/guides/401k-and-take-home-pay">how a 401(k) affects your take-home pay</A>.
      </Callout>

      <H2>FICA vs income tax</H2>
      <P>
        FICA is separate from federal income tax. Income tax is progressive (different brackets) and
        depends on deductions and filing status; FICA is a flat rate from the very first dollar with
        no standard deduction. Both come out of your paycheck — together they’re the bulk of{' '}
        <A href="/guides/how-much-tax-on-paycheck">what comes out of your paycheck</A>.
      </P>

      <H2>See it on your salary</H2>
      <P>
        Our calculator breaks out Social Security and Medicare as separate line items for any salary,
        so you can see your exact FICA contribution alongside federal and state tax.
      </P>
    </Article>
  )
}
