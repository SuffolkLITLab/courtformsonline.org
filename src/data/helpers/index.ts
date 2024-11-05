import { legalTopics } from '../../config/topics.config';

function getTopicNames(
  tags: string[],
  defaultName: string = 'other'
): string[] {
  const topicNames = new Set<string>();

  // Preprocess topics' codes by cleaning them
  const topicsWithCleanCodes = legalTopics.map((topic) => ({
    ...topic,
    cleanedCodes: topic.codes.map((code) => code.replace(/(-00)+$/, '')),
  }));

  if (tags.length === 0) {
    topicNames.add(defaultName);
  } else {
    tags.forEach((tag) => {
      const cleanedTag = tag.replace(/(-00)+$/, '');
      for (const topic of topicsWithCleanCodes) {
        for (const cleanedCode of topic.cleanedCodes) {
          if (cleanedTag.startsWith(cleanedCode)) {
            topicNames.add(topic.name);
            // We don't break here because multiple topics might match
          }
        }
      }
    });

    // If none of the tags matched any topic, add the default topic
    if (!(topicNames.size > 0)) {
      topicNames.add(defaultName);
    }
  }

  return Array.from(topicNames);
}

export { getTopicNames };
