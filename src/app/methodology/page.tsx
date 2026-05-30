import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Methodology & Sources',
  description:
    'How TakeHomePay.io calculates take-home pay: the tax years, official sources (IRS, HMRC, ATO, CRA), assumptions and limitations behind every result.',
  alternates: { canonical: '/methodology' },
}

const LAST_UPDATED = 'May 31, 2026'

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-medium mt-8 mb-3" style={{ color: 'var(--navy)' }}>{children}</h2>
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--slate-600)' }}>{children}</p>
}
function Li({ children }: { children: React.ReactNode }) {
  return <li className="text-sm leading-relaxed mb-1.5" style={{ color: 'var(--slate-600)' }}>{children}</li>
}
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline" style={{ color: 'var(--sky)' }} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default function MethodologyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>Methodology &amp; Sources</h1>
      <p className="text-xs mt-2 mb-6" style={{ color: 'var(--slate-400)' }}>Last updated: {LAST_UPDATED}</p>

      <P>
        We believe a tax calculator should show its work. This page explains the tax years we use,
        where our rates come from, what we include, and — just as importantly — what we don’t.
      </P>

      <H2>Tax years</H2>
      <P>We apply the latest enacted rates for each country:</P>
      <ul className="list-disc pl-5 mb-3">
        <Li><strong>United States</strong> — 2025 federal brackets, $15,000 single standard deduction, FICA with the $176,100 Social Security wage base, plus state income tax for all 50 states.</Li>
        <Li><strong>United Kingdom</strong> — 2025/26 income tax (£12,570 personal allowance; 20%/40%/45% bands; plus Scottish bands), Class 1 National Insurance (8%/2%), and student loan plans.</Li>
        <Li><strong>Australia</strong> — 2025/26 resident rates (tax-free to $18,200; 16%/30%/37%/45%), the 2% Medicare Levy and surcharge, with 12% employer super shown separately.</Li>
        <Li><strong>Canada</strong> — 2025 federal brackets, provincial/territorial tax for every province, plus CPP (and CPP2) and EI.</Li>
      </ul>

      <H2>Sources</H2>
      <ul className="list-disc pl-5 mb-3">
        <Li>US — <A href="https://www.irs.gov">IRS</A> and the <A href="https://www.ssa.gov">Social Security Administration</A>; state revenue departments.</Li>
        <Li>UK — <A href="https://www.gov.uk/income-tax-rates">HMRC / GOV.UK</A>.</Li>
        <Li>Australia — <A href="https://www.ato.gov.au">Australian Taxation Office (ATO)</A>.</Li>
        <Li>Canada — <A href="https://www.canada.ca/en/revenue-agency.html">Canada Revenue Agency (CRA)</A>.</Li>
      </ul>

      <H2>What’s included</H2>
      <P>
        Federal/national income tax (progressive brackets), state/provincial income tax, payroll
        contributions (US FICA; UK National Insurance; Canada CPP/CPP2 and EI), and your optional
        pre-tax contributions — 401(k), HSA and health premiums (US), salary-sacrifice pension (UK).
        We apply the standard deduction / personal allowance / basic personal amount, and relevant
        offsets such as the UK personal-allowance taper and Australia’s Low Income Tax Offset.
      </P>

      <H2>What’s not included</H2>
      <P>
        To keep results fast and general, we don’t model: tax credits (e.g. the US Child Tax Credit
        or Canadian credits beyond the basic personal amount); city or local income taxes (e.g. New
        York City); itemised deductions; capital gains, self-employment or investment income; or
        one-off bonuses taxed via supplemental withholding. US and Canadian state/provincial rules
        are applied as simplified rates and brackets, which can differ slightly from a full filing.
      </P>

      <H2>How we verify it</H2>
      <P>
        The calculation engine is covered by an automated test suite that enforces structural
        invariants (take-home never exceeds gross, rises with income, payroll caps apply) and checks
        specific salaries against independently computed reference values for each country. We re-run
        these checks on every change.
      </P>

      <H2>Updates</H2>
      <P>
        Tax rates change yearly. We update the engine and this page when new rates are enacted; the
        “last updated” date above reflects the most recent revision. Results remain estimates and are
        not financial, tax or legal advice — see our{' '}
        <Link href="/terms" className="underline" style={{ color: 'var(--sky)' }}>Terms of Use</Link>.
      </P>
    </article>
  )
}
