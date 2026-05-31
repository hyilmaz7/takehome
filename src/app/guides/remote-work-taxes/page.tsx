import type { Metadata } from 'next'
import { getGuide } from '../../../lib/guides'
import Article from '../../../components/sections/Article'
import { H2, P, UL, LI, A, Callout } from '../../../components/sections/Prose'

const SLUG = 'remote-work-taxes'
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
        If you work remotely for a company in another state, a natural question follows: which
        state’s income tax do you actually pay? For most people the answer is simpler than feared —
        but a few well-known exceptions can catch you out.
      </P>

      <H2>The general rule: where you work</H2>
      <P>
        State income tax usually follows <strong>where you physically perform the work</strong> —
        which, for a remote worker, is where you live. Your employer’s location generally doesn’t
        determine your state tax. So if you live in <A href="/us/texas">Texas</A> (no income tax) and
        work remotely for a New York company, you typically owe no state income tax.
      </P>

      <Callout>
        <strong>Federal tax and FICA don’t change</strong> wherever you live in the US — only state
        (and sometimes local) income tax varies with your location.
      </Callout>

      <H2>The big exception: “convenience of the employer”</H2>
      <P>
        A handful of states — most notably <strong>New York</strong>, plus Connecticut, Delaware,
        Nebraska and Pennsylvania — apply a “convenience of the employer” rule. If your employer is
        based there and you work remotely <em>by choice</em> (not because the job requires it
        elsewhere), they may still tax your income. This can even lead to being taxed by two states.
      </P>

      <H2>Reciprocity agreements</H2>
      <P>
        Many neighbouring states have <strong>reciprocity agreements</strong> so you only pay tax to
        your home state — common across the Midwest and Mid-Atlantic. If you live and work across
        such a border, you usually file in just one.
      </P>

      <H2>If you moved mid-year</H2>
      <P>
        Relocating during the year often means filing <strong>part-year resident</strong> returns in
        both states, splitting your income by the time spent in each.
      </P>

      <Callout>
        Multi-state taxation gets complicated fast, and the rules change. This is a general overview,
        not tax advice — if you work across state lines, confirm with a tax professional.
      </Callout>

      <H2>Compare states</H2>
      <P>
        Thinking about where to base yourself? See our{' '}
        <A href="/take-home-by-state">take-home pay by US state</A> ranking to see how much your
        location changes what you keep.
      </P>
    </Article>
  )
}
