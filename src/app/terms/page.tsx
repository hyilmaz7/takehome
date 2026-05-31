import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms governing use of SalaryCalc. Results are estimates for informational purposes only and are not financial, tax or legal advice.',
  alternates: { canonical: '/terms' },
}

const LAST_UPDATED = 'May 31, 2026'

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-medium mt-8 mb-3" style={{ color: 'var(--navy)' }}>
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--slate-600)' }}>
      {children}
    </p>
  )
}

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>
        Terms of Use
      </h1>
      <p className="text-xs mt-2 mb-6" style={{ color: 'var(--slate-400)' }}>
        Last updated: {LAST_UPDATED}
      </p>

      <P>
        By using SalaryCalc (the “site”) you agree to these terms. If you do not agree, please do
        not use the site.
      </P>

      <H2>What the site does</H2>
      <P>
        The site provides free calculators that estimate take-home pay after tax for the United
        States, United Kingdom, Australia and Canada, using published tax rates and thresholds.
      </P>

      <H2>Not financial, tax or legal advice</H2>
      <P>
        All results are <strong>estimates for general informational purposes only</strong> and do not
        constitute financial, tax, accounting or legal advice. Calculations are based on standard
        published rates for the stated tax year and a set of simplifying assumptions (for example the
        standard deduction, and simplified state/provincial rates). They do not account for every
        credit, local tax, allowance or individual circumstance. Your actual pay and tax may differ.
        Always verify important decisions with a qualified professional or the relevant tax authority
        (IRS, HMRC, ATO or CRA).
      </P>

      <H2>No warranty</H2>
      <P>
        The site is provided “as is” and “as available”, without warranties of any kind, express or
        implied, including accuracy, completeness, or fitness for a particular purpose. We do not
        warrant that results are error-free or current.
      </P>

      <H2>Limitation of liability</H2>
      <P>
        To the fullest extent permitted by law, we are not liable for any loss or damage arising from
        your use of, or reliance on, the site or its results, including financial decisions made on
        the basis of an estimate.
      </P>

      <H2>Acceptable use</H2>
      <P>
        You agree not to misuse the site, attempt to disrupt it, scrape it at scale, or use it
        unlawfully. We may limit or suspend access to protect the service.
      </P>

      <H2>Advertising &amp; third-party links</H2>
      <P>
        The site is supported by advertising and may contain links to third-party sites. We are not
        responsible for the content, products or privacy practices of third parties.
      </P>

      <H2>Intellectual property</H2>
      <P>
        The site’s design, text and code are owned by us or our licensors. You may use the
        calculators for personal, non-commercial purposes.
      </P>

      <H2>Changes</H2>
      <P>
        We may update these terms from time to time; continued use after changes constitutes
        acceptance. Material changes will be reflected by the “last updated” date above.
      </P>

      <H2>Contact</H2>
      <P>
        Questions? Email{' '}
        <a href="mailto:hello@salarycalcnet.com" className="underline" style={{ color: 'var(--sky)' }}>
          hello@salarycalcnet.com
        </a>
        .
      </P>
    </article>
  )
}
