import { formSources, pathToServerConfig } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { excludedForms } from '../config/formSources.config';
import { findClosestTopic } from './helpers';

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
    estimated_completion_minutes: number;
    estimated_completion_delta: number;
    languages: string[];
  };
  tags: string[];
  filename: string;
  title: string;
  serverUrl: string;
  link?: string;
}

interface Data {
  interviews?: Interview[];
}

export const fetchInterviews = async (path: string) => {
  const config = pathToServerConfig[path];
  const serverNames = config
    ? config.servers
    : [formSources.docassembleServers[0].name];
  const servers = formSources.docassembleServers.filter((server) =>
    serverNames.includes(server.name)
  );

  let allInterviews: Interview[] = [];
  for (const server of servers) {
    const url = new URL(`${server.url}/list`);
    url.search = 'json=1';

    try {
      const response = await fetch(url.toString());
      const data: Data = await response.json();

      if (data && data.interviews) {
        const taggedInterviews = data.interviews
          .filter((interview: Interview) => !interview.metadata?.unlisted) // exclude unlisted interviews safely
          // exclude interviews with filenames that are in the excludedForms list relative to this server
          .filter((interview: Interview) => {
            // Check if an exclusion list exists for the server, and use it if available
            const exclusions = excludedForms[server.key];
            const filename = interview.filename || ''; // safe fallback for filename
            if (exclusions) {
              return !exclusions.includes(filename);
            } else {
              return true;
            }
          })
          .map((interview: Interview) => ({
            ...interview,
            serverUrl: server.url,
            metadata: {
              unlisted: interview.metadata?.unlisted ?? false,
              LIST_topics: interview.metadata?.LIST_topics || [],
              description: interview.metadata?.description || '',
              can_I_use_this_form:
                interview.metadata?.can_I_use_this_form || '',
              help_page_url: interview.metadata?.help_page_url || '',
              help_page_title: interview.metadata?.help_page_title || '',
              original_form: interview.metadata?.original_form || '',
              before_you_start: interview.metadata?.before_you_start || '',
              form_titles: interview.metadata?.form_titles || [],
              form_numbers: interview.metadata?.form_numbers || [],
              jurisdiction: interview.metadata?.jurisdiction || '',
              maturity: interview.metadata?.maturity || '',
              estimated_completion_minutes:
                interview.metadata?.estimated_completion_minutes ?? 0,
              estimated_completion_delta:
                interview.metadata?.estimated_completion_delta ?? 0,
              languages: interview.metadata?.languages || [],
            },
            tags: interview.tags || [],
            filename: interview.filename || '',
            title: interview.title || '',
          }));
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

  const interviewsByTopic: { [key: string]: Interview[] } = {};
  const titlesInTopics: { [key: string]: Set<string> } = {};
  legalTopics.forEach((topic) => {
    const topicName = topic.name.toLowerCase();
    interviewsByTopic[topicName] = [];
    titlesInTopics[topicName] = new Set();
  });

  allInterviews.forEach((interview: Interview) => {
    const uniqueTopics = new Set<string>();
    const title = interview.title || ''; // safe fallback for title

    // Match topics by metadata.LIST_topics and tags
    (interview.metadata.LIST_topics || [])
      .concat(interview.tags || [])
      .forEach((code: string) => {
        const topic = findClosestTopic(code, legalTopics);
        if (topic) {
          const topicName = topic.name.toLowerCase();
          if (!uniqueTopics.has(topicName)) {
            uniqueTopics.add(topicName);
            if (!titlesInTopics[topicName].has(title)) {
              interviewsByTopic[topicName].push(interview);
              titlesInTopics[topicName].add(title);
            }
          }
        }
      });

    if (uniqueTopics.size === 0) {
      const otherTopic = 'other';
      interviewsByTopic[otherTopic] = interviewsByTopic[otherTopic] || [];
      titlesInTopics[otherTopic] = titlesInTopics[otherTopic] || new Set();
      if (!titlesInTopics[otherTopic].has(title)) {
        interviewsByTopic[otherTopic].push(interview);
        titlesInTopics[otherTopic].add(title);
      }
    }
  });

  return { interviewsByTopic, isError: false };
};
