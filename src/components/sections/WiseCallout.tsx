// Reusable "move money internationally" slot for the relocation/international
// content. Currently a plain, genuinely-useful recommendation — swap WISE_URL
// for your affiliate link once approved (and add a "we may earn a commission"
// disclosure at that point; the rel="sponsored" is already in place).
const WISE_URL = 'https://wise.com'

export default function WiseCallout({ context }: { context?: string }) {
  return (
    <div
      className="rounded-2xl p-5 my-6"
      style={{ border: '1px solid var(--slate-300)', backgroundColor: '#fff' }}
    >
      <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
        💸 Moving money between countries?
      </p>
      <p className="text-sm mt-1.5 leading-relaxed" style={{ color: 'var(--slate-600)' }}>
        {context ??
          'When you relocate, you’ll usually need to move savings or get paid across borders.'}{' '}
        A service like{' '}
        <a
          href={WISE_URL}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="underline font-medium"
          style={{ color: 'var(--sky)' }}
        >
          Wise
        </a>{' '}
        gives you the real mid-market exchange rate with low, transparent fees — typically far cheaper
        than a high-street bank, and it works across the US, UK, Australia and Canada.
      </p>
    </div>
  )
}
