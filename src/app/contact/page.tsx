import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with TakeHomePay.io — corrections, feedback, feature requests, press and partnerships.',
  alternates: { canonical: '/contact' },
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-medium mt-8 mb-3" style={{ color: 'var(--navy)' }}>{children}</h2>
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--slate-600)' }}>{children}</p>
}

export default function ContactPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>Contact</h1>
      <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        We read every message. The fastest way to reach us is by email:
      </p>

      <a
        href="mailto:hello@takehomepay.io"
        className="inline-flex items-center mt-4 px-5 py-3 rounded-xl text-sm font-semibold"
        style={{ backgroundColor: 'var(--navy)', color: '#fff' }}
      >
        hello@takehomepay.io
      </a>

      <H2>What to reach out about</H2>
      <P>
        <strong>Corrections.</strong> If a result looks wrong or a tax rate is out of date, tell us
        the country, salary and what you expected — we take accuracy seriously and will investigate.
      </P>
      <P>
        <strong>Feedback &amp; feature requests.</strong> Want another country, a new calculator, or
        a tweak? We’d love to hear it.
      </P>
      <P>
        <strong>Press &amp; partnerships.</strong> For media enquiries or business opportunities, use
        the same address and we’ll get back to you.
      </P>

      <P>
        Please note we can’t provide personalised financial, tax or legal advice — for that, speak to
        a qualified professional or your local tax authority.
      </P>
    </article>
  )
}
