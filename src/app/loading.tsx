// Route-level loading skeleton. Mirrors the hero + two-column calculator layout
// so there is no cumulative layout shift when the real page streams in.

function Block({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-lg ${className ?? ''}`}
      style={{ backgroundColor: 'var(--slate-100)', ...style }}
    />
  )
}

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading calculator">
      {/* Hero band */}
      <section style={{ backgroundColor: 'var(--sky-pale)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-10 flex flex-col items-center gap-4">
          <Block className="h-5 w-56" />
          <Block className="h-9 w-full max-w-md" />
          <Block className="h-4 w-full max-w-sm" />
        </div>
      </section>

      {/* Calculator skeleton */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Inputs card */}
          <div className="card flex flex-col gap-6">
            <Block className="h-12 w-48 mx-auto" />
            <Block className="h-1.5 w-full" />
            <div className="flex flex-col gap-4">
              <Block className="h-11 w-full" />
              <Block className="h-11 w-full" />
              <Block className="h-11 w-2/3" />
            </div>
          </div>
          {/* Results card */}
          <div className="card flex flex-col gap-5">
            <Block className="h-4 w-32" />
            <Block className="h-12 w-44" />
            <Block className="h-2.5 w-full" />
            <div className="flex flex-col gap-3">
              <Block className="h-5 w-full" />
              <Block className="h-5 w-full" />
              <Block className="h-5 w-full" />
              <Block className="h-5 w-5/6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
