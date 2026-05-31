import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'ny-vs-ca-vs-tx-salary'
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
        New York, California and Texas are three of the biggest US job markets — and three very
        different tax outcomes. Federal tax and FICA are identical in all three; state income tax is
        where they split.
      </P>

      <H2>$100,000 salary, side by side</H2>
      <UL>
        <LI><strong><A href="/us/texas">Texas</A>:</strong> no state income tax → about <strong>$6,560/month</strong> take-home.</LI>
        <LI><strong><A href="/us/new-york">New York</A>:</strong> ~$5,400 state tax → about <strong>$6,100/month</strong> (state only — NYC residents pay city tax on top).</LI>
        <LI><strong><A href="/us/california">California</A>:</strong> ~$6,000 state tax → about <strong>$6,060/month</strong>.</LI>
      </UL>

      <Callout>
        On the same $100,000 salary, a Texan keeps roughly <strong>$500 a month more</strong> than a
        Californian or New Yorker — about $6,000 a year — purely from state income tax. New York City
        residents pay an extra ~3–4% local tax, widening the gap further.
      </Callout>

      <H2>But the paycheck isn’t the whole story</H2>
      <UL>
        <LI><strong>Cost of living.</strong> Manhattan and the Bay Area are among the priciest places in the country; much of Texas is far cheaper — often more than offsetting the tax saving.</LI>
        <LI><strong>Salaries differ.</strong> The same role frequently pays more in NYC or SF, narrowing the after-tax gap.</LI>
        <LI><strong>Property &amp; sales tax.</strong> Texas has no income tax but relatively high property taxes.</LI>
      </UL>

      <H2>The verdict</H2>
      <P>
        On take-home pay alone, Texas wins clearly, with California and New York close to each other
        (before NYC’s city tax). Whether that translates into a better deal depends entirely on your
        salary and the city’s cost of living.
      </P>

      <H2>Run your own numbers</H2>
      <P>
        Compare with the <A href="/us/texas">Texas</A>, <A href="/us/new-york">New York</A> and{' '}
        <A href="/us/california">California</A> calculators, or see all 50 states ranked in{' '}
        <A href="/take-home-by-state">take-home pay by state</A>.
      </P>
    </Article>
  )
}
