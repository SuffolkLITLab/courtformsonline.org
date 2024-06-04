import React from 'react';
import { legalTopics } from '../../config/topics.config';

const SpotResultsCard = ({ data }) => {
  if (!data || !data.labels) {
    return <p>No matching topics found.</p>;
  }

  const sortedLabels = data.labels
    .sort((a, b) => b.pred - a.pred)
    .map((label) => {
      const topic = legalTopics.find((t) => t.codes.includes(label.id));
      return topic ? topic.long_name : null;
    })
    .filter(Boolean);

  return (
    <div>
      <h2>It looks like you may be looking for help with...</h2>
      {sortedLabels.length > 0 ? (
        <ul>
          {sortedLabels.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No relevant topics found based on your query.</p>
      )}
    </div>
  );
};

export default SpotResultsCard;
