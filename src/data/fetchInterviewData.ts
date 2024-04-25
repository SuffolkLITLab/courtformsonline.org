'use client';

import useSWR from 'swr';
import { formSources } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';

export const fetcher = (url) => fetch(url).then((res) => res.json());

export const useInterviews = () => {
  // This can be modified to grab a different url from formsources based on subdomain or route.
  const serverUrl = formSources.docassembleServers[0].url;
  const url = new URL(`${serverUrl}/list`);
  url.search = 'json=1';

  const { data, error, isLoading } = useSWR(url.toString(), fetcher);

  const interviewsByTopic = { Other: [] };

  //  Match returned interview data to corresponding topic from topics.config.ts
  if (data && data.interviews) {
    data.interviews.forEach((interview) => {
      let assigned = false;
      const tags = interview.tags || [];
      if (tags.length === 0) {
        interviewsByTopic['Other'].push(interview);
      } else {
        tags.forEach((tag) => {
          const topic = legalTopics.find((t) => t.codes.includes(tag));
          if (topic) {
            if (!interviewsByTopic[topic.name]) {
              interviewsByTopic[topic.name] = [];
            }
            interviewsByTopic[topic.name].push(interview);
            assigned = true;
          }
        });
        if (!assigned) {
          interviewsByTopic['Other'].push(interview);
        }
      }
    });
  }

  return {
    interviewsByTopic,
    isLoading,
    isError: error,
  };
};
