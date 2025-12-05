// Application-wide constants

// Maximum number of interviews to show in an expanded card
export const MAX_VISIBLE_PER_CARD = 10;
// Number of categories visible by default (e.g., with 3 columns, 9 items = 3 rows)
export const MAX_VISIBLE_CATEGORIES = 12;
// Maximum number of related forms to show on form landing page
export const MAX_RELATED_FORMS = 5;

// MassLegalResource Finder deep links mapping
// Maps topic names to their corresponding MassLRF URLs
export const MASSLRF_LINKS: Record<string, string[]> = {
  housing: ['https://masslrf.org/en/triage/start/housing'],
  family: [
    'https://masslrf.org/en/triage/start/family',
    'https://masslrf.org/en/triage/start/abuse_crime',
  ],
  consumer: ['https://masslrf.org/en/triage/start/debt_consumer'],
  benefits: ['https://masslrf.org/en/triage/start/benefits'],
  criminal: ['https://masslrf.org/en/triage/start/criminal'],
  education: ['https://masslrf.org/en/triage/start/education'],
  health: ['https://masslrf.org/en/triage/start/health'],
  immigration: ['https://masslrf.org/en/triage/start/immigration'],
  employment: ['https://masslrf.org/en/triage/start/employment'],
  wills: ['https://masslrf.org/en/triage/start/wills'],
};