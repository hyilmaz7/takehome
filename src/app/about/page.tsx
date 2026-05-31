import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'SalaryCalc is a free, no-signup salary and tax calculator for the US, UK, Australia and Canada, built for accuracy and transparency.',
  alternates: { canonical: '/about' },
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-medium mt-8 mb-3" style={{ color: 'var(--navy)' }}>{children}</h2>
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--slate-600)' }}>{children}</p>
}

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>About SalaryCalc</h1>
      <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        SalaryCalc helps you understand your real, after-tax income in seconds — no signup, no
        paywall, just instant results for the United States, United Kingdom, Australia and Canada.
      </p>

      <H2>Why we built it</H2>
      <P>
        Payslips are confusing. Between federal and state taxes, National Insurance, Medicare, CPP,
        EI and pension contributions, it’s hard to know what actually lands in your account. We built
        a fast, transparent calculator that shows not just the number, but exactly how it’s reached —
        every deduction, line by line.
      </P>

      <H2>Our commitment to accuracy</H2>
      <P>
        We use official, published tax rates and thresholds for the current tax year, and our
        calculation engine is covered by an automated test suite that checks results against known
        reference figures. You can read exactly how every number is produced — including our sources,
        assumptions and limitations — on our{' '}
        <Link href="/methodology" className="underline" style={{ color: 'var(--sky)' }}>methodology page</Link>.
        That said, every situation is unique, so results are estimates, not financial advice.
      </P>

      <H2>How it stays free</H2>
      <P>
        The site is supported by unobtrusive advertising. That’s what lets us keep every calculator
        free, with no accounts and no data selling. Your salary inputs are never stored on our
        servers.
      </P>

      <H2>Get in touch</H2>
      <P>
        Spotted something that looks off, or have a feature request? We’d genuinely like to hear it —
        head to our <Link href="/contact" className="underline" style={{ color: 'var(--sky)' }}>contact page</Link>.
      </P>
    </article>
  )
}
