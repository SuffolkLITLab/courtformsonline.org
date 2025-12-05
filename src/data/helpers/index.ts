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

/**
 * Calculate the similarity between two LIST codes based on shared prefix length.
 * LIST codes are hierarchical, so the more characters they share from left to right,
 * the closer they are in the hierarchy.
 */
function getListCodeSimilarity(code1: string, code2: string): number {
  // Clean codes by removing trailing -00 segments
  const clean1 = code1.replace(/(-00)+$/, '');
  const clean2 = code2.replace(/(-00)+$/, '');

  // Find the length of the common prefix
  let commonLength = 0;
  const minLength = Math.min(clean1.length, clean2.length);
  for (let i = 0; i < minLength; i++) {
    if (clean1[i] === clean2[i]) {
      commonLength++;
    } else {
      break;
    }
  }

  return commonLength;
}

/**
 * Calculate the maximum similarity between two sets of LIST codes.
 * Returns the highest similarity score found between any pair of codes.
 */
function getMaxListCodeSimilarity(codes1: string[], codes2: string[]): number {
  let maxSimilarity = 0;

  for (const c1 of codes1) {
    for (const c2 of codes2) {
      const similarity = getListCodeSimilarity(c1, c2);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
      }
    }
  }

  return maxSimilarity;
}

export { getTopicNames, getListCodeSimilarity, getMaxListCodeSimilarity };
