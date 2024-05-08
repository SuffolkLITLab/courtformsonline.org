export function findClosestTopic(topicCode, legalTopics) {
  const prefix = topicCode.slice(0, 2);
  const numericCode = parseInt(topicCode.slice(3).replace(/-/g, ''), 10);
  let closestTopic;
  let smallestDiff = Infinity;

  // Find topics by closest, smaller topic code with matching prefix
  legalTopics.forEach((topic) => {
    topic.codes.forEach((code) => {
      if (code.startsWith(prefix)) {
        const topicNumeric = parseInt(code.slice(3).replace(/-/g, ''), 10);
        const diff = numericCode - topicNumeric;
        if (diff >= 0 && diff < smallestDiff) {
          smallestDiff = diff;
          closestTopic = topic;
        }
      }
    });
  });
  return closestTopic;
}
