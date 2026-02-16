import { formSources, pathToServerConfig } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { excludedForms } from '../config/formSources.config';
import { getTopicNames } from './helpers';
import {
  getJurisdictionFromPath,
  jurisdictionMatches,
} from '../utils/jurisdiction';

interface LocalizedString {
  [key: string]: string;
}

interface Fee {
  name: string;
  amount?: number;
}

interface RawFee {
  [key: string]: number | string;
}

interface RawInterview {
  metadata?: {
    unlisted?: boolean;
    LIST_topics?: string[];
    description?: string | LocalizedString;
    can_I_use_this_form?: string | LocalizedString;
    help_page_url?: string | LocalizedString;
    help_page_title?: string | LocalizedString;
    original_form?: string | LocalizedString;
    original_form_published_on?: string | LocalizedString;
    review_date?: string | LocalizedString;
    before_you_start?: string | LocalizedString;
    form_titles?: string[] | LocalizedString;
    form_numbers?: string[] | LocalizedString;
    jurisdiction?: string | LocalizedString;
    maturity?: string | LocalizedString;
    footer?: string | LocalizedString;
    'short title'?: string | LocalizedString;
    title?: string | LocalizedString;
    estimated_completion_minutes?: number;
    estimated_completion_delta?: number;
    languages?: string[];
    fees?: RawFee[] | string[] | LocalizedString;
    update_notes?: string | LocalizedString;
    efiling_enabled?: boolean | 'email';
    integrated_efiling?: boolean;
    integrated_email_filing?: boolean;
    [key: string]: any;
  };
  tags?: string[];
  filename?: string;
  title?: string | LocalizedString;
  link?: string;
  [key: string]: any;
}

interface Interview {
  metadata: {
    unlisted: boolean;
    LIST_topics: string[];
    description: string;
    can_I_use_this_form: string;
    help_page_url: string;
    help_page_title: string;
    original_form: string;
    before_you_start: string;
    form_titles: string[];
    form_numbers: string[];
    jurisdiction: string;
    maturity: string;
    footer: string;
    'short title': string;
    title: string;
    original_form_published_on?: string;
    review_date?: string;
    estimated_completion_minutes: number;
    estimated_completion_delta: number;
    languages: string[];
    fees: Fee[];
    update_notes: string;
    efiling_enabled?: boolean | 'email';
    [key: string]: any;
  };
  tags: string[];
  filename: string;
  title: string;
  serverUrl: string;
  link?: string;
}

interface Data {
  interviews?: RawInterview[];
}

// Helper function to extract localized strings
function extractLocalizedString(
  value: string | LocalizedString | undefined,
  locale: string
): string {
  if (typeof value === 'string') {
    return value;
  } else if (value && typeof value === 'object') {
    return value[locale] ?? value['en'] ?? Object.values(value)[0] ?? '';
  } else {
    return '';
  }
}

// Helper function to extract localized arrays
function extractLocalizedArray(
  value: string[] | LocalizedString | undefined,
  locale: string
): string[] {
  if (Array.isArray(value)) {
    return value;
  } else if (value && typeof value === 'object') {
    const localizedValue =
      value[locale] ?? value['en'] ?? Object.values(value)[0];
    return Array.isArray(localizedValue)
      ? localizedValue
      : localizedValue
        ? [localizedValue]
        : [];
  } else {
    return [];
  }
}


export function normalizeEfilingEnabled(metadata: RawInterview['metadata']):
  | boolean
  | 'email'
  | undefined {
  if (!metadata) return undefined;

  // Prefer integrated_* keys when present, then fall back to efiling_enabled.
  if (metadata.integrated_email_filing === true) {
    return 'email';
  }

  if (metadata.integrated_efiling === true) {
    return true;
  }

  if (metadata.integrated_email_filing === false) {
    return false;
  }

  if (metadata.integrated_efiling === false) {
    return false;
  }

  const explicit = metadata.efiling_enabled;
  if (explicit === 'email' || typeof explicit === 'boolean') {
    return explicit;
  }

  return undefined;
}

function parseFeeAmount(value: any): number | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return undefined;
    const parsed = parseFloat(trimmed.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(parsed)) return parsed;
    const lowered = trimmed.toLowerCase();
    // Interpret common no-fee phrases as 0
    if (
      lowered.includes('no') ||
      lowered.includes('none') ||
      lowered.includes('no fee') ||
      lowered.includes('no filing fee') ||
      lowered.includes('free') ||
      lowered.includes('waived') ||
      lowered.includes('n/a')
    ) {
      return 0;
    }
    return undefined;
  }
  return undefined;
}

export function extractLocalizedFees(
  value: RawFee[] | string[] | string | LocalizedString | undefined,
  locale: string
): Fee[] {
  if (!value) return [];

  // Resolve localized wrapper if present
  if (typeof value === 'object' && !Array.isArray(value)) {
    const localizedVal =
      (value as LocalizedString)[locale] ??
      (value as LocalizedString)['en'] ??
      value;
    // If localizedVal is the same structure, recurse
    if (localizedVal === value) {
      // Could be an object mapping name->amount
      const obj = value as { [key: string]: any };
      // If it has 'name' or 'amount' keys, treat as single fee object
      if ('name' in obj || 'amount' in obj) {
        return [
          {
            name: obj['name'] ?? Object.keys(obj)[0],
            amount: parseFeeAmount(obj['amount'] ?? obj[Object.keys(obj)[0]]),
          },
        ];
      }
      // Otherwise, treat each key as name: amount
      return Object.keys(obj).map((k) => ({
        name: k,
        amount: parseFeeAmount(obj[k]),
      }));
    }
    return extractLocalizedFees(localizedVal as any, locale);
  }

  // Handle array of items
  if (Array.isArray(value)) {
    const arr: any[] = value as any[];
    return arr.flatMap((item) => {
      if (!item && item !== 0) return [];
      if (typeof item === 'string') {
        const [name, ...rest] = item.split(':');
        const amountStr = rest.join(':').trim();
        let amount: number | undefined = undefined;
        if (amountStr) {
          amount = parseFeeAmount(amountStr);
        } else {
          // Try parsing the whole string for patterns like 'No filing fee' or 'Filing fee $25'
          amount = parseFeeAmount(item);
        }
        return [{ name: name.trim(), amount }];
      } else if (typeof item === 'object') {
        if ('name' in item || 'amount' in item) {
          return [
            {
              name: item['name'] ?? Object.keys(item)[0],
              amount: parseFeeAmount(
                item['amount'] ?? item[Object.keys(item)[0]]
              ),
            },
          ];
        }
        const key = Object.keys(item)[0];
        return [
          {
            name: key,
            amount: parseFeeAmount(item[key]),
          },
        ];
      } else {
        return [];
      }
    });
  }

  // Handle string value
  if (typeof value === 'string') {
    const [name, ...rest] = value.split(':');
    const amountStr = rest.join(':').trim();
    const amount = parseFeeAmount(amountStr);
    return [
      {
        name: name.trim(),
        amount,
      },
    ];
  }

  return [];
}

export const fetchInterviews = async (path: string) => {
  const config = pathToServerConfig[path];
  const serverNames = config
    ? config.servers
    : [formSources.docassembleServers[0].name];
  const servers = formSources.docassembleServers.filter((server) =>
    serverNames.includes(server.name)
  );

  const locale = 'en'; // Todo: make this dynamic

  let allInterviews: Interview[] = [];
  for (const server of servers) {
    const url = new URL(`${server.url}/list`);
    url.search = 'json=1';

    try {
      const response = await fetch(url.toString());
      const data: Data = await response.json();

      if (data && data.interviews) {
        const taggedInterviews = data.interviews
          .filter((interview: RawInterview) => !interview.metadata?.unlisted)
          .filter((interview: RawInterview) => {
            const exclusions = excludedForms[server.key];
            const filename = interview.filename ?? '';
            if (exclusions) {
              return !exclusions.includes(filename);
            } else {
              return true;
            }
          })
          .map(
            (interview: RawInterview): Interview => ({
              ...interview,
              serverUrl: server.url,
              metadata: {
                ...(interview.metadata as any),
                unlisted: interview.metadata?.unlisted ?? false,
                LIST_topics: interview.metadata?.LIST_topics ?? [],
                description: extractLocalizedString(
                  interview.metadata?.description,
                  locale
                ),
                can_I_use_this_form: extractLocalizedString(
                  interview.metadata?.can_I_use_this_form,
                  locale
                ),
                help_page_url: extractLocalizedString(
                  interview.metadata?.help_page_url,
                  locale
                ),
                help_page_title: extractLocalizedString(
                  interview.metadata?.help_page_title,
                  locale
                ),
                original_form: extractLocalizedString(
                  interview.metadata?.original_form,
                  locale
                ),
                before_you_start: extractLocalizedString(
                  interview.metadata?.before_you_start,
                  locale
                ),
                form_titles: extractLocalizedArray(
                  interview.metadata?.form_titles,
                  locale
                ),
                form_numbers: extractLocalizedArray(
                  interview.metadata?.form_numbers,
                  locale
                ),
                jurisdiction: extractLocalizedString(
                  interview.metadata?.jurisdiction,
                  locale
                ),
                maturity: extractLocalizedString(
                  interview.metadata?.maturity,
                  locale
                ),
                footer: extractLocalizedString(
                  interview.metadata?.footer,
                  locale
                ),
                'short title': extractLocalizedString(
                  interview.metadata?.['short title'],
                  locale
                ),
                title: extractLocalizedString(
                  interview.metadata?.title,
                  locale
                ),
                original_form_published_on: extractLocalizedString(
                  interview.metadata?.original_form_published_on,
                  locale
                ),
                review_date: extractLocalizedString(
                  interview.metadata?.review_date,
                  locale
                ),
                estimated_completion_minutes:
                  interview.metadata?.estimated_completion_minutes ?? 0,
                estimated_completion_delta:
                  interview.metadata?.estimated_completion_delta ?? 0,
                languages: interview.metadata?.languages ?? [],
                fees: extractLocalizedFees(
                  interview.metadata?.fees as any,
                  locale
                ),
                update_notes: extractLocalizedString(
                  interview.metadata?.update_notes,
                  locale
                ),
                efiling_enabled: normalizeEfilingEnabled(interview.metadata),
              },
              tags: interview.tags ?? [],
              filename: interview.filename ?? '',
              title: extractLocalizedString(interview.title, locale),
            })
          );
        allInterviews = allInterviews.concat(taggedInterviews);
      }
    } catch (error) {
      console.error(
        'Failed to fetch interviews from server:',
        server.name,
        error
      );
    }
  }

  // Filter interviews by jurisdiction
  const expectedJurisdiction = getJurisdictionFromPath(path);
  allInterviews = allInterviews.filter((interview) =>
    jurisdictionMatches(
      interview.metadata?.jurisdiction,
      expectedJurisdiction,
      interview.serverUrl
    )
  );

  // Initialize interviewsByTopic and titlesInTopics with all topics
  const interviewsByTopic: { [key: string]: Interview[] } = {};
  const titlesInTopics: { [key: string]: Set<string> } = {};
  legalTopics.forEach((topic) => {
    const topicName = topic.name.toLowerCase();
    interviewsByTopic[topicName] = [];
    titlesInTopics[topicName] = new Set();
  });

  allInterviews.forEach((interview: Interview) => {
    const uniqueTopics = new Set<string>();
    const title = interview.title;

    // Collect all codes from metadata.LIST_topics and tags
    const codes = [...interview.metadata.LIST_topics, ...interview.tags];

    // Get matching topic names
    const topicNames = getTopicNames(codes);

    topicNames.forEach((topicName) => {
      topicName = topicName.toLowerCase();
      //if (!uniqueTopics.has(topicName)) {
      uniqueTopics.add(topicName);
      if (!titlesInTopics[topicName].has(title)) {
        interviewsByTopic[topicName].push(interview);
        titlesInTopics[topicName].add(title);
      }
      //}
    });

    // If no topics matched, add to 'other'
    if (uniqueTopics.size === 0) {
      const otherTopic = 'other';
      if (!titlesInTopics[otherTopic].has(title)) {
        interviewsByTopic[otherTopic].push(interview);
        titlesInTopics[otherTopic].add(title);
      }
    }
  });

  return { interviewsByTopic, isError: false };
};
