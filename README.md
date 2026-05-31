# SalaryCalc

A free, real-time salary & tax calculator for the **US, UK, Australia and Canada**. Built with Next.js 16 (App Router, Turbopack), React 19 and Tailwind CSS v4. No signup, instant results, and a programmatic-SEO layer of ~300 pre-rendered salary/hourly landing pages.

---

## Table of contents

- [Run locally](#run-locally)
- [Updating tax rates each year](#updating-tax-rates-each-year)
- [Deploying to Vercel](#deploying-to-vercel)
- [AdSense & Google Analytics IDs](#adsense--google-analytics-ids)
- [Adding a new country](#adding-a-new-country)
- [Architecture overview](#architecture-overview)
- [Revenue model](#revenue-model)

---

## Run locally

Requirements: **Node.js 20+** and npm.

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (also runs TypeScript + ESLint)
npm run start        # serve the production build
npm run lint         # ESLint only
```

Create a `.env.local` (see [IDs](#adsense--google-analytics-ids)):

```bash
NEXT_PUBLIC_SITE_URL=https://salarycalcnet.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXX
```

All three are optional in dev — analytics and ads simply no-op when unset, and the calculators work fully offline.

---

## Updating tax rates each year

All tax logic lives in **`src/lib/tax/`** — one pure function per country. Each takes a `TaxInput` and returns a `TaxBreakdown` (see `src/types/index.ts`). To roll the rates for a new tax year, edit the constants at the top of the relevant file:

| Country | File | What to update |
| --- | --- | --- |
| 🇺🇸 US | `src/lib/tax/us.ts` | `US_FEDERAL_BRACKETS`, `STANDARD_DEDUCTION`, `SS_WAGE_BASE`, `MEDICARE_RATE`, `ADDITIONAL_MEDICARE_THRESHOLD`, `K401_LIMIT`, and `US_STATE_RATES` (per-state flat rate or `brackets`) |
| 🇬🇧 UK | `src/lib/tax/uk.ts` | `PERSONAL_ALLOWANCE`, `BASIC_RATE_LIMIT`, `HIGHER_RATE_LIMIT`, the NI thresholds/rates, and `STUDENT_LOAN_PLANS` |
| 🇦🇺 AU | `src/lib/tax/au.ts` | `AU_BRACKETS`, `calculateLITO`, `calculateMedicareLevy`, `calculateMLS`, default `superPercent` |
| 🇨🇦 CA | `src/lib/tax/ca.ts` | Federal brackets, provincial brackets, CPP/EI ceilings and rates, basic personal amount |

After editing rates, also refresh the **human-facing copy** so the marketing/SEO text stays consistent:

- `src/lib/faq.ts` — the FAQ answers quote exact figures (e.g. standard deduction, NI thresholds).
- `src/lib/salaryPage.ts` — `TAX_YEAR` map controls the "(2026)" / "(2025/26)" labels in titles.
- `src/components/calculators/SalaryCalculator.tsx` — the `DEDUCTION_EXPLANATIONS` block.

> Tip: the FAQ numbers and the engine are intentionally kept in sync. If you change `STANDARD_DEDUCTION` in `us.ts`, update the matching sentence in `faq.ts`.

The programmatic landing pages recalculate automatically from the engine, so once the rates are updated every `/salary/*` and `/hourly/*` page reflects them on the next build.

---

## Deploying to Vercel

This is a standard Next.js app — deploy with zero config.

1. Push the repo to GitHub/GitLab/Bitbucket.
2. In the [Vercel dashboard](https://vercel.com/new), **Import Project** and pick the repo. The framework preset (Next.js) is detected automatically.
3. Add the environment variables (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_ADSENSE_ID`) under **Settings → Environment Variables** for Production (and Preview if desired).
4. Deploy. Vercel runs `next build`, which pre-renders the static pages (`/`, country pages, ~280 `/salary/*` and 17 `/hourly/*` pages) and the `sitemap.xml`, `robots.txt`, `manifest.webmanifest` and OG/icon images.

Or via the CLI:

```bash
npm i -g vercel
vercel            # preview deploy
vercel --prod     # production deploy
```

Security headers and the Content-Security-Policy are configured in **`next.config.ts`** and applied on every route by Vercel's edge.

---

## AdSense & Google Analytics IDs

Both are wired through environment variables and load only in production when set.

- **Google Analytics 4** — set `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`). The `<GoogleAnalytics>` component from `@next/third-parties` is mounted in `src/app/layout.tsx` and injects `gtag`. Custom events are sent through the typed helper in `src/lib/analytics.ts` (`calculator_used`, `result_copied`, `country_switched`, `period_changed`).
- **Google AdSense** — set `NEXT_PUBLIC_ADSENSE_ID` (e.g. `ca-pub-XXXXXXXXXX`). The loader script is added in `layout.tsx`; individual ad units render via `src/components/AdBanner.tsx`. In development a labelled placeholder is shown instead of a real ad. Ad/analytics domains are already allow-listed in the CSP in `next.config.ts`.

To place a new ad unit:

```tsx
import AdBanner from '@/components/AdBanner'

<AdBanner slot="1234567890" format="leaderboard" />   // or "rectangle" | "auto"
```

---

## Adding a new country

1. **Types** — add the country code to the `Country` union in `src/types/index.ts`.
2. **Tax engine** — create `src/lib/tax/<code>.ts` exporting `calculate<Code>(input: TaxInput): TaxBreakdown`, then register it in the `switch` in `src/lib/tax/index.ts`.
3. **Defaults & constants** — add an entry to `DEFAULT_INPUTS` in `src/lib/constants.ts` (and any region list, e.g. provinces/states).
4. **Formatting** — add the currency symbol in `formatCurrency()` in `src/lib/formatters.ts`.
5. **UI** — add the flag/label to `src/components/ui/CountryTabs.tsx`, a country-specific inputs panel in `SalaryCalculator.tsx`, and `DEDUCTION_EXPLANATIONS`.
6. **Pages** — add `src/app/<code>/page.tsx` (copy an existing country page), and extend `src/lib/faq.ts`.
7. **SEO** — add the country's amount list + slug handling in `src/lib/salaryPage.ts` so `/salary/<amount>-<code>` pages generate, and add them to `src/app/sitemap.ts`.

---

## Architecture overview

```
src/
├─ app/                          # Next.js App Router
│  ├─ layout.tsx                 # Header/Footer, fonts, GA + AdSense loaders, metadata
│  ├─ page.tsx                   # Homepage (US default)
│  ├─ us|uk|au|ca/page.tsx       # Country landing pages (calculator locked per country)
│  ├─ hourly|reverse|compare/    # Standalone calculator pages
│  ├─ salary/[amount]/page.tsx   # ~280 programmatic SEO pages (generateStaticParams)
│  ├─ hourly/[rate]/page.tsx     # 17 programmatic hourly pages
│  ├─ sitemap.ts / robots.ts     # Generated SEO files
│  ├─ manifest.ts                # PWA manifest
│  ├─ opengraph-image.tsx        # 1200×630 social image
│  ├─ icon-192/ icon-512/        # Generated PWA icons (ImageResponse)
│  ├─ loading.tsx                # Layout-matched skeleton (no CLS)
│  └─ not-found.tsx              # Custom 404 with popular-page links
├─ components/
│  ├─ calculators/               # SalaryCalculator, HourlyCalculator, Reverse, Compare ('use client')
│  ├─ charts/                    # BreakdownBar (lazy-loaded), BreakdownPie
│  ├─ sections/                  # Server components: Hero, Faq, BreakdownTable, etc.
│  └─ ui/                        # ResultCard, SliderField, PeriodToggle, ShareButtons…
└─ lib/
   ├─ tax/                       # Pure tax engines (us, uk, au, ca) + dispatcher
   ├─ analytics.ts               # Typed GA4 trackEvent()
   ├─ salaryPage.ts              # Slug parsing, static params, answer/meta builders
   ├─ faq.ts / seo.ts            # FAQ content + JSON-LD helpers
   ├─ constants.ts               # States/provinces, defaults, chart colors
   └─ formatters.ts              # Currency, period and percent formatting
```

**Key ideas**

- The **tax engines are pure functions** — easy to unit test and reused identically by both the interactive (client) calculators and the static (server) SEO pages, guaranteeing the numbers always match.
- Calculations run in `useMemo`, so results recompute only when inputs change. The heavy/interactive chart is lazy-loaded via `next/dynamic` with a same-height skeleton (no layout shift).
- **Programmatic SEO** is the growth engine: `generateStaticParams` pre-renders one page per `salary × region`, each with a unique title, meta description, H1, and a featured-snippet answer paragraph built from the real calculated figures, plus heavy internal linking between them.

---

## Revenue model

The site is **free and ad-supported**, optimised for high-intent organic search traffic:

1. **Programmatic SEO at scale.** Hundreds of long-tail pages (`$85,000 salary after tax in California`, `$25 an hour after tax`, `£50,000 salary after tax UK`) each target a specific high-intent query. This is the same playbook that took comparable single-calculator sites to ~150k monthly visits from a handful of templates.
2. **Display advertising (Google AdSense).** Leaderboard and in-content units (`AdBanner`) monetise that traffic. Salary/finance keywords carry strong ad CPMs, and the calculator's "result reveal" moment is a natural, non-intrusive ad placement.
3. **Low cost to serve.** Almost everything is statically pre-rendered and edge-cached on Vercel, so traffic scales cheaply.

Future options: affiliate placements (pension/ISA/brokerage/tax-software), a "Pro" ad-free tier, and lead-gen for financial advisers.

> **Disclaimer:** results are estimates for guidance only and are not financial advice.
