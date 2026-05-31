import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'canada-income-tax-guide'
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
        Canadian take-home pay is reduced by tax in two layers — federal and provincial — plus two
        payroll contributions, CPP and EI. Because the provincial layer varies so much, where you
        live makes a real difference to what you keep.
      </P>

      <H2>Federal income tax (2025)</H2>
      <UL>
        <LI><strong>15%</strong> on the first $57,375.</LI>
        <LI><strong>20.5%</strong> on $57,375–$114,750.</LI>
        <LI><strong>26%</strong> on $114,750–$177,882.</LI>
        <LI><strong>29%</strong> on $177,882–$253,414.</LI>
        <LI><strong>33%</strong> above $253,414.</LI>
      </UL>
      <P>
        A <strong>basic personal amount</strong> of about $16,129 is delivered as a 15% credit, so the
        first slice of income is effectively tax-free.
      </P>

      <H2>Provincial tax</H2>
      <P>
        Each province and territory adds its own income tax with its own brackets — and some, like
        Ontario, add a surtax for higher earners. This is why two Canadians on the same salary can
        take home noticeably different amounts. Quebec residents receive a federal abatement because
        the province funds more of its own programs.
      </P>

      <H2>CPP and EI</H2>
      <UL>
        <LI>
          <strong>CPP:</strong> 5.95% on earnings between the $3,500 exemption and the $71,300 ceiling
          (2025). <strong>CPP2</strong> adds 4% on earnings up to $81,200.
        </LI>
        <LI>
          <strong>EI:</strong> 1.64% on insurable earnings up to $65,700.
        </LI>
      </UL>
      <Callout>
        Both CPP and EI qualify for federal tax credits, and both are capped — so as a percentage of
        income, they shrink as you earn more.
      </Callout>

      <H2>Putting it together</H2>
      <P>
        On an $80,000 salary in Ontario, you’d pay roughly $10,000 federal tax, $4,400 Ontario tax,
        $4,000 CPP and $1,100 EI — leaving about <strong>$60,500</strong> take-home. Check any salary
        and province with our <A href="/ca">Canadian salary calculator</A>.
      </P>
    </Article>
  )
}
