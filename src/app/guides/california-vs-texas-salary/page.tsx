import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'california-vs-texas-salary'
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
        California and Texas are the two most-compared states for take-home pay — and for good
        reason. They sit at opposite ends of the spectrum: Texas levies <strong>no state income
        tax</strong>, while California’s top rate reaches <strong>13.3%</strong>. On the same salary,
        the difference in your paycheck is real money.
      </P>

      <H2>The same $100,000, two very different results</H2>
      <P>
        Federal income tax (~$13,600) and FICA ($7,650) are identical in both states. The gap is
        entirely state income tax:
      </P>
      <UL>
        <LI>
          In <A href="/salary/100000-texas">Texas</A>, there’s no state tax, so take-home is about
          <strong> $6,560/month</strong>.
        </LI>
        <LI>
          In <A href="/salary/100000-california">California</A>, roughly $6,000/year of state tax
          brings take-home down to about <strong>$6,060/month</strong>.
        </LI>
      </UL>

      <Callout>
        On a $100,000 salary, a single filer keeps roughly <strong>$6,000 more per year in Texas</strong>{' '}
        than in California — purely from state income tax.
      </Callout>

      <H2>But salary isn’t the whole story</H2>
      <P>
        Before you pack your bags, the comparison cuts both ways:
      </P>
      <UL>
        <LI><strong>Cost of living.</strong> Housing in coastal California is far higher than most of Texas — often more than offsetting the tax saving.</LI>
        <LI><strong>Property &amp; sales tax.</strong> Texas has no income tax but relatively high property taxes; California’s are comparatively moderate.</LI>
        <LI><strong>Salaries differ.</strong> The same role often pays more in California’s major metros, which can narrow the after-tax gap.</LI>
      </UL>

      <H2>Compare your own number</H2>
      <P>
        The right way to decide is with your actual salary. Try the{' '}
        <A href="/us/california">California salary calculator</A> and the{' '}
        <A href="/us/texas">Texas salary calculator</A> side by side, or see the full{' '}
        <A href="/take-home-by-state">take-home by state</A> ranking to place every state on the map.
      </P>
    </Article>
  )
}
