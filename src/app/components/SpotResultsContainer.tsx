import React from 'react';
import Button from 'react-bootstrap/Button';
import { legalTopics } from '../../config/topics.config';
import { formSources } from '../../config/formSources.config';
import TopicCard from './TopicCard';

const SpotResultsContainer = ({
  data,
  interviews,
  path,
  searchQuery,
  onCancel,
}) => {
  if (!data || !data.labels) {
    return <p>No matching topics found.</p>;
  }

  // Find the server URL based on the path
  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const serverUrl = server.url;

  // Sort and filter topics based on the SPOT labels
  const sortedTopics = data.labels
    .map((label) => ({
      ...label,
      topic: legalTopics.find((t) => t.codes.includes(label.id)),
    }))
    .filter(
      ({ topic }) =>
        topic && interviews[topic.name] && interviews[topic.name].length > 0
    ) // Ensure the topic exists and has available interviews
    .sort((a, b) => b.pred - a.pred) // Sort by confidence score
    .map(({ topic }) => topic); // Extract sorted topics

  return (
    <section id="topics">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>It looks like you may be looking for help with...</h2>
          {onCancel && (
            <Button
              variant="outline-secondary"
              onClick={onCancel}
              aria-label="Cancel search and return to all categories"
            >
              Cancel
            </Button>
          )}
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-5 card-container">
          {sortedTopics.map((topic, index) => (
            <TopicCard
              key={topic.codes[0]}
              topic={topic}
              interviews={interviews[topic.name] || []}
              path={'ma'}
              serverUrl={serverUrl}
              index={index}
              isSpot={true}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpotResultsContainer;
