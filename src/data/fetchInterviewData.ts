import { formSources, pathToServerConfig } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { excludedForms } from '../config/formSources.config';
import { getTopicNames } from './helpers';

interface LocalizedString {
  [key: string]: string;
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
    before_you_start?: string | LocalizedString;
    form_titles?: string[] | LocalizedString;
    form_numbers?: string[] | LocalizedString;
    jurisdiction?: string | LocalizedString;
    maturity?: string | LocalizedString;
    footer?: string | LocalizedString;
    'short title'?: string | LocalizedString;
    title?: string | LocalizedString;
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
    estimated_completion_minutes: number;
    estimated_completion_delta: number;
    languages: string[];
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
                ...interview.metadata,
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
                estimated_completion_minutes:
                  interview.metadata?.estimated_completion_minutes ?? 0,
                estimated_completion_delta:
                  interview.metadata?.estimated_completion_delta ?? 0,
                languages: interview.metadata?.languages ?? [],
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
