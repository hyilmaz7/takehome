// Server component that injects a JSON-LD <script> for structured data.
// Rendering it from the page body is the pattern recommended by the Next.js docs.

export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from trusted, static server data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
