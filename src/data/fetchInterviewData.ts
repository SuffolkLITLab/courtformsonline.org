import { formSources } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';

export const fetchInterviews = async () => {
  const serverUrl = formSources.docassembleServers[0].url;
  const url = new URL(`${serverUrl}/list`);
  url.search = 'json=1';

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    const interviewsByTopic = { Other: [] };

    if (data && data.interviews) {
      data.interviews.forEach((interview) => {
        let assigned = false;

        // Prioritize 'LIST_topics' if it exists
        const listTopics = interview.metadata?.LIST_topics || [];
        if (listTopics.length > 0) {
          listTopics.forEach((topicCode) => {
            const topic = legalTopics.find((t) => t.codes.includes(topicCode));
            if (topic) {
              if (!interviewsByTopic[topic.name]) {
                interviewsByTopic[topic.name] = [];
              }
              interviewsByTopic[topic.name].push(interview);
              assigned = true;
            }
          });
        }

        // Use 'tags' only if LIST_topics doesnt exist or doesnt match any topics
        if (!assigned) {
          const tags = interview.tags || [];
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
        }

        // If no topics were assigned, place in Other
        if (!assigned) {
          interviewsByTopic['Other'].push(interview);
        }
      });
    }
    return { interviewsByTopic, isError: false };
  } catch (error) {
    return { interviewsByTopic: {}, isError: true };
  }
};
