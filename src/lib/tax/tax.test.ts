import { describe, it, expect } from 'vitest'
import { calculate } from './index'
import type { TaxInput, Country } from '../../types'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const close = (actual: number, expected: number, tol: number) =>
  expect(Math.abs(actual - expected), `expected ~${expected}, got ${Math.round(actual)}`).toBeLessThanOrEqual(tol)

const base: Record<Country, TaxInput> = {
  us: { country: 'us', grossAnnual: 0, filingStatus: 'single', state: '' },
  uk: { country: 'uk', grossAnnual: 0 },
  au: { country: 'au', grossAnnual: 0 },
  ca: { country: 'ca', grossAnnual: 0, province: 'ON' },
}

// ─── Invariants (structural correctness, no external data) ───────────────────
describe('invariants', () => {
  const countries: Country[] = ['us', 'uk', 'au', 'ca']

  for (const c of countries) {
    it(`${c}: net is 0..gross, no NaN, never keeps more than the extra dollar`, () => {
      for (let g = 20000; g <= 400000; g += 5000) {
        const b = calculate({ ...base[c], grossAnnual: g })
        // no NaN anywhere
        for (const v of [b.netAnnual, b.federalTax, b.stateTax, b.socialSecurity, b.medicare, b.effectiveTaxRate, b.marginalTaxRate]) {
          expect(Number.isNaN(v), `${c} NaN at ${g}`).toBe(false)
        }
        expect(b.netAnnual, `${c} net<0 at ${g}`).toBeGreaterThanOrEqual(0)
        expect(b.netAnnual, `${c} net>gross at ${g}`).toBeLessThanOrEqual(g + 0.01)
        expect(b.effectiveTaxRate).toBeGreaterThanOrEqual(0)
        expect(b.effectiveTaxRate).toBeLessThanOrEqual(60)
        expect(b.marginalTaxRate).toBeGreaterThanOrEqual(0)
        expect(b.marginalTaxRate).toBeLessThanOrEqual(70)
      }
    })

    it(`${c}: take-home rises monotonically with gross (no bracket discontinuity)`, () => {
      // AU's Medicare Levy Surcharge is a genuine income "cliff" (see test below),
      // so test monotonicity with private cover, which removes the surcharge.
      const inv = c === 'au' ? { ...base[c], hasPrivateHealth: true } : base[c]
      let prev = -1
      for (let g = 20000; g <= 400000; g += 1000) {
        const net = calculate({ ...inv, grossAnnual: g }).netAnnual
        expect(net, `${c} net decreased at ${g}`).toBeGreaterThanOrEqual(prev - 0.01)
        // earning $1,000 more never nets you more than $1,000 extra take-home
        if (prev >= 0) expect(net - prev, `${c} net jumped >Δgross at ${g}`).toBeLessThanOrEqual(1000.01)
        prev = net
      }
    })
  }

  it('au: Medicare Levy Surcharge is a real income cliff above $93k (expected, not a bug)', () => {
    const under = calculate({ ...base.au, grossAnnual: 93000 }).netAnnual
    const over = calculate({ ...base.au, grossAnnual: 94000 }).netAnnual
    // Without private hospital cover, crossing $93k triggers a ~1% surcharge on
    // the whole income, so net can fall — the well-known "MLS trap".
    expect(over).toBeLessThan(under)
    // …and private hospital cover removes it (net rises again).
    const overInsured = calculate({ ...base.au, grossAnnual: 94000, hasPrivateHealth: true }).netAnnual
    expect(overInsured).toBeGreaterThan(over)
  })

  it('us: Social Security contribution caps at the wage base', () => {
    const b = calculate({ ...base.us, grossAnnual: 500000 })
    close(b.socialSecurity, 176100 * 0.062, 1) // $10,918.20
  })

  it('uk: personal allowance fully withdrawn by £125,140 (60% marginal band)', () => {
    const b = calculate({ ...base.uk, grossAnnual: 120000 })
    expect(b.marginalTaxRate).toBeGreaterThanOrEqual(60) // 40% tax + 20% PA taper
  })
})

// ─── Golden values (hand-computed from official 2025 / 2025-26 rules) ────────
describe('golden values — US (single, no state)', () => {
  it('$50,000 → net ~$42,214', () => close(calculate({ ...base.us, grossAnnual: 50000 }).netAnnual, 42213.5, 50))
  it('$100,000 → net ~$78,736', () => close(calculate({ ...base.us, grossAnnual: 100000 }).netAnnual, 78736, 50))
  it('$100,000 in TX (no state tax) equals no-state', () =>
    close(calculate({ ...base.us, grossAnnual: 100000, state: 'TX' }).netAnnual, 78736, 50))
})

describe('golden values — UK (2025/26)', () => {
  it('£40,000 → net ~£32,320', () => close(calculate({ ...base.uk, grossAnnual: 40000 }).netAnnual, 32319.6, 50))
  it('£50,000 → net ~£39,520', () => close(calculate({ ...base.uk, grossAnnual: 50000 }).netAnnual, 39519.6, 50))
  it('£100,000 → net ~£68,557', () => close(calculate({ ...base.uk, grossAnnual: 100000 }).netAnnual, 68557.4, 50))
  it('£60,000 Scottish → net ~£43,576', () =>
    close(calculate({ ...base.uk, grossAnnual: 60000, scottish: true }).netAnnual, 43575.6, 50))
})

describe('golden values — AU (2025/26)', () => {
  it('$60,000 → net ~$50,112', () => close(calculate({ ...base.au, grossAnnual: 60000 }).netAnnual, 50112, 50))
  it('$80,000 → net ~$63,612', () => close(calculate({ ...base.au, grossAnnual: 80000 }).netAnnual, 63612, 50))
})

describe('golden values — CA (Ontario, 2025)', () => {
  it('$60,000 → net ~$47,019', () => close(calculate({ ...base.ca, grossAnnual: 60000 }).netAnnual, 47019, 300))
  it('$80,000 → net ~$60,477', () => close(calculate({ ...base.ca, grossAnnual: 80000 }).netAnnual, 60477, 300))
})
