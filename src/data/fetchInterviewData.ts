import { formSources, pathToServerConfig } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { excludedForms } from '../config/formSources.config';
import { findClosestTopic } from './helpers';

export const fetchInterviews = async (path) => {
  const config = pathToServerConfig[path];
  const serverNames = config
    ? config.servers
    : [formSources.docassembleServers[0].name];
  const servers = formSources.docassembleServers.filter((server) =>
    serverNames.includes(server.name)
  );

  let allInterviews = [];
  for (const server of servers) {
    const url = new URL(`${server.url}/list`);
    url.search = 'json=1';

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      if (data && data.interviews) {
        const taggedInterviews = data.interviews
          .filter((interview) => !interview.metadata.unlisted) // exclude unlisted interviews
          // exclude interviews with titles that are in the excludedForms list relative to this server
          .filter((interview) => {
            // Check if an exclusion list exists for the server, and use it if available
            const exclusions = excludedForms[server.key];
            if (exclusions) {
              return !exclusions.includes(interview.filename);
            } else {
              return true;
            }
          })
          .map((interview) => ({
            ...interview,
            serverUrl: server.url,
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

  const interviewsByTopic = {};
  const titlesInTopics = {};
  legalTopics.forEach((topic) => {
    interviewsByTopic[topic.name.toLowerCase()] = [];
    titlesInTopics[topic.name.toLowerCase()] = new Set();
  });

  allInterviews.forEach((interview) => {
    const uniqueTopics = new Set();

    // Match topics by metadata.LIST_topics and tags
    (interview.metadata.LIST_topics || [])
      .concat(interview.tags || [])
      .forEach((code) => {
        const topic = findClosestTopic(code, legalTopics);
        if (topic && !uniqueTopics.has(topic.name.toLowerCase())) {
          uniqueTopics.add(topic.name.toLowerCase());
          if (!titlesInTopics[topic.name.toLowerCase()].has(interview.title)) {
            interviewsByTopic[topic.name.toLowerCase()].push(interview);
            titlesInTopics[topic.name.toLowerCase()].add(interview.title);
          }
        }
      });

    if (
      uniqueTopics.size === 0 &&
      !titlesInTopics['other'].has(interview.title)
    ) {
      interviewsByTopic['other'] = interviewsByTopic['other'] || [];
      interviewsByTopic['other'].push(interview);
      titlesInTopics['other'].add(interview.title);
    }
  });

  return { interviewsByTopic, isError: false };
};
