// US profession salary data for the "{Profession} Salary After Tax" pages.
// Median annual wages are from the US Bureau of Labor Statistics, Occupational
// Employment and Wage Statistics (OEWS) — public-domain, the authoritative
// source. Figures are national medians; actual pay varies by state, employer,
// experience and (for physicians) specialty. Take-home is computed live from
// the tax engine, so it stays correct as rates update.

export interface Profession {
  slug: string
  name: string
  /** BLS median annual wage (USD). */
  median: number
  /** The exact BLS occupation title, when it differs from the page name. */
  blsLabel?: string
  /** Optional extra context shown in the answer. */
  note?: string
}

export const PROFESSIONS: Profession[] = [
  { slug: 'software-engineer', name: 'Software Engineer', median: 133080, blsLabel: 'Software developers' },
  { slug: 'registered-nurse', name: 'Registered Nurse', median: 101420, blsLabel: 'Registered nurses' },
  { slug: 'teacher', name: 'Teacher', median: 72650, blsLabel: 'Elementary school teachers', note: 'High-school teachers earn a similar median of about $76,000.' },
  { slug: 'doctor', name: 'Doctor (Physician)', median: 239200, blsLabel: 'Physicians', note: 'Physician pay varies enormously by specialty — many specialties earn well over $300,000.' },
  { slug: 'lawyer', name: 'Lawyer', median: 151160, blsLabel: 'Lawyers' },
  { slug: 'accountant', name: 'Accountant', median: 81680, blsLabel: 'Accountants and auditors' },
  { slug: 'electrician', name: 'Electrician', median: 62350, blsLabel: 'Electricians' },
  { slug: 'plumber', name: 'Plumber', median: 62970, blsLabel: 'Plumbers, pipefitters and steamfitters' },
  { slug: 'dentist', name: 'Dentist', median: 179210, blsLabel: 'Dentists, general' },
  { slug: 'pharmacist', name: 'Pharmacist', median: 140920, blsLabel: 'Pharmacists' },
  { slug: 'police-officer', name: 'Police Officer', median: 79280, blsLabel: 'Police and sheriff’s patrol officers' },
  { slug: 'firefighter', name: 'Firefighter', median: 63630, blsLabel: 'Firefighters' },
  { slug: 'truck-driver', name: 'Truck Driver', median: 57440, blsLabel: 'Heavy and tractor-trailer truck drivers' },
  { slug: 'architect', name: 'Architect', median: 96690, blsLabel: 'Architects' },
  { slug: 'graphic-designer', name: 'Graphic Designer', median: 61300, blsLabel: 'Graphic designers' },
  { slug: 'marketing-manager', name: 'Marketing Manager', median: 161030, blsLabel: 'Marketing managers' },
  { slug: 'project-manager', name: 'Project Manager', median: 100750, blsLabel: 'Project management specialists' },
  { slug: 'data-scientist', name: 'Data Scientist', median: 126800, blsLabel: 'Data scientists' },
  { slug: 'physical-therapist', name: 'Physical Therapist', median: 105280, blsLabel: 'Physical therapists' },
  { slug: 'social-worker', name: 'Social Worker', median: 61330, blsLabel: 'Social workers' },
  { slug: 'real-estate-agent', name: 'Real Estate Agent', median: 56320, blsLabel: 'Real estate sales agents', note: 'Real-estate pay is commission-based and highly variable.' },
  { slug: 'financial-advisor', name: 'Financial Advisor', median: 102140, blsLabel: 'Personal financial advisors' },
  { slug: 'chef', name: 'Chef', median: 60990, blsLabel: 'Chefs and head cooks' },
  { slug: 'mechanic', name: 'Mechanic', median: 49670, blsLabel: 'Automotive service technicians and mechanics' },
  { slug: 'construction-worker', name: 'Construction Worker', median: 46050, blsLabel: 'Construction laborers' },
  { slug: 'dental-hygienist', name: 'Dental Hygienist', median: 94260, blsLabel: 'Dental hygienists' },
  { slug: 'veterinarian', name: 'Veterinarian', median: 125510, blsLabel: 'Veterinarians' },
  { slug: 'psychologist', name: 'Psychologist', median: 94310, blsLabel: 'Clinical and counseling psychologists' },
]

export function getProfession(slug: string): Profession | undefined {
  return PROFESSIONS.find((p) => p.slug === slug)
}
