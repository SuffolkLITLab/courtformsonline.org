import { fetchInterviews } from './fetchInterviewData';
import { normalizeJurisdiction } from '../utils/jurisdiction';

export interface FamilyEmergencyForm {
  id: string;
  title: string;
  jurisdiction: string;
  href: string;
}

export const CHILD_GUARDIANSHIP_TOPIC = 'ES-03-03-00-00';

// FOLIO uses US state subdivisions; Intl.DisplayNames region codes are countries.
const US_STATE_NAMES: Record<string, string> = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District of Columbia',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  PR: 'Puerto Rico',
  VI: 'U.S. Virgin Islands',
  GU: 'Guam',
  AS: 'American Samoa',
  MP: 'Northern Mariana Islands',
};

export function familyFormJurisdiction(value?: string | null): string {
  const code = (value ?? '').trim();
  if (!code) return 'State not specified';
  if (['NAM-US', 'NAM-US-US'].includes(code)) return 'United States';
  const region = code.match(/^NAM-US-US\+([A-Z]{2})$/)?.[1] || code;
  if (US_STATE_NAMES[region]) return US_STATE_NAMES[region];
  return normalizeJurisdiction(code) || 'State not specified';
}

export async function fetchFamilyEmergencyForms(): Promise<
  FamilyEmergencyForm[]
> {
  // Reuse the existing providers without limiting the collection to Massachusetts.
  // Membership comes from topics, not an interview or state allowlist.
  const result = await fetchInterviews('ma', { allJurisdictions: true });
  if (result.isError || result.hasFetchErrors) {
    throw new Error(
      'Could not load the complete family emergency form catalog'
    );
  }
  const seen = new Set<string>();
  return (result.interviewsByTopic.family || [])
    .filter((form) =>
      [...(form.metadata.LIST_topics ?? []), ...(form.tags ?? [])].some(
        (code) => code.trim().toUpperCase().startsWith('ES-03-03-')
      )
    )
    .filter((form) => Boolean(form.filename))
    .map((form) => {
      const server = form.serverUrl.replace(/\/$/, '');
      return {
        id: `${server}|${form.filename.replace(':data/questions/', ':')}`,
        title: form.title,
        jurisdiction: familyFormJurisdiction(form.metadata.jurisdiction),
        href: `${server}/interview?i=${encodeURIComponent(form.filename)}`,
      };
    })
    .filter((form) => {
      if (seen.has(form.id)) return false;
      seen.add(form.id);
      return true;
    })
    .sort(
      (a, b) =>
        a.jurisdiction.localeCompare(b.jurisdiction) ||
        a.title.localeCompare(b.title)
    );
}
