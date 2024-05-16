import { formSources } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { findClosestTopic } from './helpers';

export const fetchInterviews = async (jurisdiction) => {
  const server =
    formSources.docassembleServers.find(
      (server) => server.path === jurisdiction
    ) || formSources.docassembleServers[0];
  const serverUrl = server.url;
  const url = new URL(`${serverUrl}/list`);
  url.search = 'json=1';

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    const interviewsByTopic = {};
    const titlesInTopics = {};

    legalTopics.forEach((topic) => {
      interviewsByTopic[topic.name] = [];
      titlesInTopics[topic.name] = new Set();
    });

    if (data && data.interviews) {
      data.interviews.forEach((interview) => {
        const uniqueTopics = new Set();

        // Match topics to config by metadata.LIST_topics and tags values
        (interview.metadata.LIST_topics || [])
          .concat(interview.tags || [])
          .forEach((code) => {
            const topic = findClosestTopic(code, legalTopics);
            if (topic && !uniqueTopics.has(topic.name)) {
              uniqueTopics.add(topic.name);
              // Avoid duplicated titles within the same topic
              if (!titlesInTopics[topic.name].has(interview.title)) {
                interviewsByTopic[topic.name].push(interview);
                titlesInTopics[topic.name].add(interview.title);
              }
            }
          });

        // Add to 'Other' if no matching topic found
        if (uniqueTopics.size === 0) {
          interviewsByTopic['Other'] = interviewsByTopic['Other'] || [];
          if (!titlesInTopics['Other'].has(interview.title)) {
            interviewsByTopic['Other'].push(interview);
            titlesInTopics['Other'].add(interview.title);
          }
        }
      });
    }

    return { interviewsByTopic, isError: false };
  } catch (error) {
    console.error('Failed to fetch interviews:', error);
    return { interviewsByTopic: {}, isError: true };
  }
};
