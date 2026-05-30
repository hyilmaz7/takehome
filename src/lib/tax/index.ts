import type { TaxInput, TaxBreakdown } from '../../types'
import { calculateUS } from './us'
import { calculateUK } from './uk'
import { calculateAU } from './au'
import { calculateCA } from './ca'

export { calculateUS, calculateUK, calculateAU, calculateCA }

export function calculate(input: TaxInput): TaxBreakdown {
  switch (input.country) {
    case 'us': return calculateUS(input)
    case 'uk': return calculateUK(input)
    case 'au': return calculateAU(input)
    case 'ca': return calculateCA(input)
  }
}
