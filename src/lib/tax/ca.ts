import type { TaxInput, TaxBreakdown, TaxItem } from '../../types'

// ─── Chart colors ──────────────────────────────────────────────────────────
const C = {
  takeHome: '#22C55E',
  federalTax: '#EF4444',
  provincialTax: '#F97316',
  cpp: '#8B5CF6',
  ei: '#A78BFA',
} as const

// ─── Federal brackets 2025 — [upper_limit, rate] ──────────────────────────
const FEDERAL_BRACKETS: [number, number][] = [
  [57375, 0.15],
  [114750, 0.205],
  [177882, 0.26],
  [253414, 0.29],
  [Infinity, 0.33],
]

const FEDERAL_BPA = 16129          // Basic Personal Amount 2025
const FEDERAL_BPA_CREDIT = FEDERAL_BPA * 0.15  // $2,419.35

// ─── CPP / EI 2025 ────────────────────────────────────────────────────────
const CPP_EXEMPTION = 3500
const CPP_YMPE = 71300             // Year's Maximum Pensionable Earnings (2025)
const CPP_RATE = 0.0595
const CPP2_UPPER = 81200           // Second earnings ceiling (YAMPE) for CPP2 (2025)
const CPP2_RATE = 0.04
const EI_MAX_INSURABLE = 65700
const EI_RATE = 0.0164

// ─── Provincial data ───────────────────────────────────────────────────────
interface ProvinceData {
  name: string
  brackets: [number, number][]
  bpa: number         // Basic Personal Amount
  lowestRate: number  // Rate used to calculate BPA/CPP/EI credits
}

const PROVINCES: Record<string, ProvinceData> = {
  AB: {
    name: 'Alberta',
    brackets: [[148269, 0.10],[177922, 0.12],[237230, 0.13],[355845, 0.14],[Infinity, 0.15]],
    bpa: 21003, lowestRate: 0.10,
  },
  BC: {
    name: 'British Columbia',
    brackets: [[47937, 0.0506],[95875, 0.077],[110076, 0.105],[133664, 0.1229],[181232, 0.147],[252752, 0.168],[Infinity, 0.205]],
    bpa: 11981, lowestRate: 0.0506,
  },
  MB: {
    name: 'Manitoba',
    brackets: [[47000, 0.108],[100000, 0.1275],[Infinity, 0.174]],
    bpa: 15780, lowestRate: 0.108,
  },
  NB: {
    name: 'New Brunswick',
    brackets: [[49958, 0.094],[99916, 0.1482],[185064, 0.1652],[Infinity, 0.195]],
    bpa: 12458, lowestRate: 0.094,
  },
  NL: {
    name: 'Newfoundland & Labrador',
    brackets: [[43198, 0.087],[86395, 0.145],[154244, 0.158],[215943, 0.178],[275870, 0.198],[551739, 0.208],[Infinity, 0.213]],
    bpa: 10818, lowestRate: 0.087,
  },
  NS: {
    name: 'Nova Scotia',
    brackets: [[29590, 0.0879],[59180, 0.1495],[93000, 0.1667],[150000, 0.175],[Infinity, 0.21]],
    bpa: 8481, lowestRate: 0.0879,
  },
  ON: {
    name: 'Ontario',
    brackets: [[51446, 0.0505],[102894, 0.0915],[150000, 0.1116],[220000, 0.1216],[Infinity, 0.1316]],
    bpa: 11865, lowestRate: 0.0505,
  },
  PE: {
    name: 'Prince Edward Island',
    brackets: [[32656, 0.0965],[64313, 0.1363],[105000, 0.1665],[140000, 0.18],[Infinity, 0.1875]],
    bpa: 12000, lowestRate: 0.0965,
  },
  QC: {
    name: 'Quebec',
    brackets: [[51780, 0.14],[103545, 0.19],[126000, 0.24],[Infinity, 0.2575]],
    bpa: 17183, lowestRate: 0.14,
  },
  SK: {
    name: 'Saskatchewan',
    brackets: [[49720, 0.105],[142058, 0.125],[Infinity, 0.145]],
    bpa: 17661, lowestRate: 0.105,
  },
  NT: {
    name: 'Northwest Territories',
    brackets: [[50597, 0.059],[101198, 0.086],[164525, 0.122],[Infinity, 0.1405]],
    bpa: 16593, lowestRate: 0.059,
  },
  NU: {
    name: 'Nunavut',
    brackets: [[53268, 0.04],[106537, 0.07],[173205, 0.09],[Infinity, 0.115]],
    bpa: 17925, lowestRate: 0.04,
  },
  YT: {
    name: 'Yukon',
    brackets: [[57375, 0.064],[114750, 0.09],[177882, 0.109],[500000, 0.128],[Infinity, 0.15]],
    bpa: 15705, lowestRate: 0.064,
  },
}

// Default province if not found
const DEFAULT_PROVINCE = PROVINCES.ON

// ─── Helpers ───────────────────────────────────────────────────────────────
function progressiveTax(income: number, brackets: [number, number][]): number {
  if (income <= 0) return 0
  let tax = 0
  let prev = 0
  for (const [limit, rate] of brackets) {
    if (income <= prev) break
    tax += (Math.min(income, limit) - prev) * rate
    prev = limit
  }
  return tax
}

function getMarginalRate(income: number, brackets: [number, number][]): number {
  for (const [limit, rate] of brackets) {
    if (income <= limit) return rate
  }
  return brackets[brackets.length - 1][1]
}

// Ontario surtax applied on top of basic provincial tax (after credits)
function ontarioSurtax(basicTax: number): number {
  let surtax = 0
  if (basicTax > 5315) surtax += (basicTax - 5315) * 0.20
  if (basicTax > 6802) surtax += (basicTax - 6802) * 0.36
  return surtax
}

function item(
  label: string,
  amount: number,
  gross: number,
  color: string,
  isDeduction = true,
): TaxItem {
  return { label, amount, percent: gross > 0 ? (amount / gross) * 100 : 0, color, isDeduction }
}

// ─── Main calculation ──────────────────────────────────────────────────────
export function calculateCA(input: TaxInput): TaxBreakdown {
  const { grossAnnual, province: provinceCode = 'ON', cpp2 = false } = input

  const gross = Math.max(0, grossAnnual)
  const prov = PROVINCES[provinceCode.toUpperCase()] ?? DEFAULT_PROVINCE

  // ── CPP ────────────────────────────────────────────────────────────────
  const cppEarnings = Math.max(0, Math.min(gross, CPP_YMPE) - CPP_EXEMPTION)
  const cpp = cppEarnings * CPP_RATE

  const cpp2Amount = cpp2
    ? Math.max(0, Math.min(gross, CPP2_UPPER) - CPP_YMPE) * CPP2_RATE
    : 0

  const totalCPP = cpp + cpp2Amount

  // ── EI ─────────────────────────────────────────────────────────────────
  const ei = Math.min(gross, EI_MAX_INSURABLE) * EI_RATE

  // ── Federal income tax ─────────────────────────────────────────────────
  const grossFedTax = progressiveTax(gross, FEDERAL_BRACKETS)
  const fedCPPCredit = totalCPP * 0.15
  const fedEICredit = ei * 0.15
  const fedTaxBeforeAbatement = Math.max(
    0,
    grossFedTax - FEDERAL_BPA_CREDIT - fedCPPCredit - fedEICredit,
  )
  // Quebec abatement: 16.5% reduction of federal tax for QC residents
  const quebecAbatement = provinceCode.toUpperCase() === 'QC' ? 0.165 : 0
  const federalTax = fedTaxBeforeAbatement * (1 - quebecAbatement)

  // ── Provincial tax ─────────────────────────────────────────────────────
  const grossProvTax = progressiveTax(gross, prov.brackets)
  const provBPACredit = prov.bpa * prov.lowestRate
  const provCPPCredit = totalCPP * prov.lowestRate
  const provEICredit = ei * prov.lowestRate
  const basicProvTax = Math.max(0, grossProvTax - provBPACredit - provCPPCredit - provEICredit)

  // Ontario surtax
  const provincialTax =
    provinceCode.toUpperCase() === 'ON'
      ? basicProvTax + ontarioSurtax(basicProvTax)
      : basicProvTax

  // ── Net ────────────────────────────────────────────────────────────────
  const netAnnual = gross - federalTax - provincialTax - totalCPP - ei

  const totalTax = federalTax + provincialTax + totalCPP + ei
  const effectiveTaxRate = gross > 0 ? (totalTax / gross) * 100 : 0

  // Marginal rate (federal + provincial income tax rates at gross income level)
  const marginalFed = getMarginalRate(gross, FEDERAL_BRACKETS) * (1 - quebecAbatement)
  const marginalProv = getMarginalRate(gross, prov.brackets)
  const marginalTaxRate = (marginalFed + marginalProv) * 100

  // ── Items ──────────────────────────────────────────────────────────────
  const items: TaxItem[] = []

  items.push(item('Federal Income Tax', federalTax, gross, C.federalTax))
  items.push(item(`${prov.name} Tax`, provincialTax, gross, C.provincialTax))
  if (totalCPP > 0.5) {
    const cppLabel = cpp2Amount > 0.5 ? 'CPP + CPP2' : 'CPP'
    items.push(item(cppLabel, totalCPP, gross, C.cpp))
  }
  items.push(item('EI Premiums', ei, gross, C.ei))
  items.push(item('Take-Home Pay', netAnnual, gross, C.takeHome, false))

  return {
    grossAnnual: gross,
    federalTax,
    stateTax: provincialTax,
    socialSecurity: totalCPP,
    medicare: ei,
    k401: 0,
    otherDeductions: 0,
    netAnnual,
    effectiveTaxRate,
    marginalTaxRate,
    items,
  }
}
