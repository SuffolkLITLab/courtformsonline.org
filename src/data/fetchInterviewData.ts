'use client';

import useSWR from 'swr';
import { formSources } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const useInterviews = () => {
  const serverUrl = formSources.docassembleServers[0].url;
  const url = new URL(`${serverUrl}/list`);
  url.search = 'json=1';

  const { data, error, isLoading } = useSWR(url.toString(), fetcher);

  const interviewsByTopic = { Other: [] };

  if (data && data.interviews) {
    data.interviews.forEach(interview => {
      let assigned = false;

      // Prioritize 'LIST_topics' if it exists
      const listTopics = interview.metadata?.LIST_topics || [];
      if (listTopics.length > 0) {
        listTopics.forEach(topicCode => {
          const topic = legalTopics.find(t => t.codes.includes(topicCode));
          if (topic) {
            if (!interviewsByTopic[topic.name]) {
              interviewsByTopic[topic.name] = [];
            }
            interviewsByTopic[topic.name].push(interview);
            assigned = true;
          }
        });
      }

      // Use 'tags' if no 'LIST_topics' or if 'LIST_topics' didn't match any topic
      if (!assigned) {
        const tags = interview.tags || [];
        tags.forEach(tag => {
          const topic = legalTopics.find(t => t.codes.includes(tag));
          if (topic) {
            if (!interviewsByTopic[topic.name]) {
              interviewsByTopic[topic.name] = [];
            }
            interviewsByTopic[topic.name].push(interview);
            assigned = true;
          }
        });
      }

      // If no topics were assigned, place in 'Other'
      if (!assigned) {
        interviewsByTopic['Other'].push(interview);
      }
    });
  }

  return {
    interviewsByTopic,
    isLoading,
    isError: error,
  };
};
