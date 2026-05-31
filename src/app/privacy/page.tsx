import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How SalaryCalc handles data, cookies, analytics and advertising. We do not store your salary inputs on our servers.',
  alternates: { canonical: '/privacy' },
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

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-medium" style={{ color: 'var(--navy)' }}>
        Privacy Policy
      </h1>
      <p className="text-xs mt-2 mb-6" style={{ color: 'var(--slate-400)' }}>
        Last updated: {LAST_UPDATED}
      </p>

      <P>
        SalaryCalc (“we”, “us”) provides free salary and tax calculators. This policy explains
        what data we collect and how we use it. We aim to collect as little as possible.
      </P>

      <H2>Your calculator inputs</H2>
      <P>
        All tax calculations run locally in your browser. We do <strong>not</strong> store your
        salary, deductions or other inputs on our servers, and we do not require an account. To make
        results shareable, your inputs may be encoded into the page URL (for example
        <span className="font-mono"> ?gross=85000</span>); that URL is only saved if you choose to
        copy or bookmark it.
      </P>

      <H2>Cookies &amp; analytics</H2>
      <P>
        We use Google Analytics 4 to understand aggregate, anonymised usage (such as which
        calculators are popular). This uses cookies and may collect your IP address, device and
        browser information. We do not use it to identify you personally.
      </P>

      <H2>Advertising</H2>
      <P>
        We display ads through Google AdSense. Google and its partner vendors use cookies to serve
        ads based on your prior visits to this and other websites. Where required (for example in the
        UK, EEA and Switzerland), you will be asked for consent before personalised ads or
        non-essential cookies are used. You can review or change ad personalisation at{' '}
        <a
          href="https://adssettings.google.com"
          className="underline"
          style={{ color: 'var(--sky)' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Settings
        </a>
        , and learn more in Google’s{' '}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          className="underline"
          style={{ color: 'var(--sky)' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          privacy &amp; terms
        </a>
        .
      </P>

      <H2>Managing your consent</H2>
      <P>
        You can withdraw or change your cookie consent at any time using the consent controls on this
        site, or by clearing cookies in your browser. Blocking cookies will not affect the
        calculators, which work without them.
      </P>

      <H2>Service providers</H2>
      <P>
        The site is hosted on Vercel, which may process standard server logs (such as IP addresses)
        to deliver and secure the site. We use Google for analytics and advertising as described
        above. We do not sell your personal data.
      </P>

      <H2>Children</H2>
      <P>
        This site is intended for a general adult audience and is not directed at children under 16.
      </P>

      <H2>Your rights</H2>
      <P>
        Depending on your location (for example under the UK GDPR, EU GDPR or CCPA), you may have
        rights to access, correct or delete personal data, or to object to certain processing.
        Because we don’t hold accounts or store your inputs, most requests relate to the third-party
        cookies described above, which you control through your browser and the consent tools.
      </P>

      <H2>Changes</H2>
      <P>
        We may update this policy as the site evolves. Material changes will be reflected by the
        “last updated” date above.
      </P>

      <H2>Contact</H2>
      <P>
        Questions about this policy? Email{' '}
        <a href="mailto:hello@salarycalcnet.com" className="underline" style={{ color: 'var(--sky)' }}>
          hello@salarycalcnet.com
        </a>
        .
      </P>
    </article>
  )
}
