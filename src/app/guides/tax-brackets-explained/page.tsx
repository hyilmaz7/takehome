import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'tax-brackets-explained'
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
        “I don’t want a raise — it’ll push me into a higher tax bracket.” It’s one of the most common
        money myths, and it’s wrong. Because the US uses a <strong>progressive</strong> system, moving
        into a higher bracket never lowers your take-home pay. Here’s why.
      </P>

      <H2>Brackets tax slices, not your whole income</H2>
      <P>
        Each tax rate applies only to the income that falls <em>within</em> its band. For a single
        filer in 2025:
      </P>
      <UL>
        <LI>10% on the first $11,925</LI>
        <LI>12% from $11,925 to $48,475</LI>
        <LI>22% from $48,475 to $103,350</LI>
        <LI>24% from $103,350 to $197,300</LI>
        <LI>32%, 35%, 37% on higher bands</LI>
      </UL>

      <Callout>
        So a $60,000 taxable income isn’t taxed at 22%. The first $11,925 is taxed at 10%, the next
        slice at 12%, and only the part above $48,475 at 22%. Your <strong>marginal</strong> rate is
        22%, but your <strong>effective</strong> rate is far lower — around 11%.
      </Callout>

      <H2>Why a raise always helps</H2>
      <P>
        If a raise pushes part of your income into the 24% band, only the dollars above the threshold
        are taxed at 24% — everything below stays exactly as it was. You always keep the majority of a
        raise. There’s no cliff where earning more leaves you with less.
      </P>

      <H2>Marginal vs effective</H2>
      <P>
        Your <strong>marginal rate</strong> is the tax on your next dollar (useful for deciding on a
        raise or a 401(k) contribution); your <strong>effective rate</strong> is your average across
        all income. We dig into both in{' '}
        <A href="/guides/effective-vs-marginal-tax-rate">effective vs marginal tax rate</A>.
      </P>

      <H2>See your brackets in action</H2>
      <P>
        The calculator shows both your effective and marginal rates for any salary, plus the exact
        federal tax across the brackets — enter a number and a raise to see how little the extra is
        actually taxed.
      </P>
    </Article>
  )
}
