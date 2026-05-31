import type { Metadata } from 'next'
import EmbedCodeGenerator from '../../components/EmbedCodeGenerator'

export const metadata: Metadata = {
  title: 'Embed the Salary Calculator on Your Site (Free)',
  description:
    'Add the free SalaryCalc take-home pay calculator to your website with one line of code. Works for the US, UK, Australia and Canada.',
  alternates: { canonical: '/widget' },
}

export default function WidgetPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>
        Embed the calculator on your site
      </h1>
      <p className="text-base mt-3 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        Running a personal-finance blog, HR site or careers page? Add the free SalaryCalc take-home
        pay calculator with a single line of code — no signup, and it stays up to date automatically.
        Pick your default country, copy the snippet, and paste it wherever you’d like it to appear.
      </p>

      <div className="mt-8">
        <EmbedCodeGenerator />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-medium mb-3" style={{ color: 'var(--navy)' }}>
          Terms of use
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--slate-600)' }}>
          The widget is free to embed on any site, personal or commercial. Please keep the
          “Powered by SalaryCalc” attribution link intact — it’s how we keep the calculator free.
          The widget loads from our servers, so tax-rate updates apply to your embed automatically.
        </p>
      </section>
    </div>
  )
}
