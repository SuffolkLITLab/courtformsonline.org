import { formSources, pathToServerConfig } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { findClosestTopic } from './helpers';

export const fetchInterviews = async (path) => {
  const config = pathToServerConfig[path];
  const serverNames = config ? config.servers : [formSources.docassembleServers[0].name];
  const servers = formSources.docassembleServers.filter(server => serverNames.includes(server.name));

  let allInterviews = [];
  for (const server of servers) {
    const url = new URL(`${server.url}/list`);
    url.search = 'json=1';

    try {
      const response = await fetch(url.toString());
      const data = await response.json();
      if (data && data.interviews) {
        const taggedInterviews = data.interviews.map(interview => ({
          ...interview,
          serverUrl: server.url
        }));
        allInterviews = allInterviews.concat(taggedInterviews);
      }
    } catch (error) {
      console.error('Failed to fetch interviews from server:', server.name, error);
    }
  }

  const interviewsByTopic = {};
  const titlesInTopics = {};
  legalTopics.forEach((topic) => {
    interviewsByTopic[topic.name] = [];
    titlesInTopics[topic.name] = new Set();
  });

  allInterviews.forEach((interview) => {
    const uniqueTopics = new Set();

    // Match topics by metadata.LIST_topics and tags
    (interview.metadata.LIST_topics || [])
      .concat(interview.tags || [])
      .forEach((code) => {
        const topic = findClosestTopic(code, legalTopics);
        if (topic && !uniqueTopics.has(topic.name)) {
          uniqueTopics.add(topic.name);
          if (!titlesInTopics[topic.name].has(interview.title)) {
            interviewsByTopic[topic.name].push(interview);
            titlesInTopics[topic.name].add(interview.title);
          }
        }
      });

    if (uniqueTopics.size === 0 && !titlesInTopics['Other'].has(interview.title)) {
      interviewsByTopic['Other'] = interviewsByTopic['Other'] || [];
      interviewsByTopic['Other'].push(interview);
      titlesInTopics['Other'].add(interview.title);
    }
  });

  return { interviewsByTopic, isError: false };
};
