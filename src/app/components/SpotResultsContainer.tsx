import React from 'react';
import Link from 'next/link';
import { formSources } from '../../config/formSources.config';
import {
  keywordMatches,
  matchingTopics,
  rankFormsByTopics,
  InterviewsByTopic,
  SearchResults,
  SearchForm,
} from '../../data/formSearch';
import { toUrlFriendlyString } from '../utils/helpers';
import TopicCard from './TopicCard';

interface Props {
  data: SearchResults;
  interviews: InterviewsByTopic;
  path: string;
  searchQuery: string;
  loading?: boolean;
}

export default function SpotResultsContainer({
  data,
  interviews,
  path,
  searchQuery,
  loading,
}: Props) {
  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const { titles, descriptions } = keywordMatches(interviews, searchQuery);
  const topics = matchingTopics(data.labels, interviews);
  const forms = (matches: SearchForm[]) => (
    <ul className="list-unstyled d-flex flex-column gap-2">
      {matches.map((form) => {
        const title = form.metadata?.title || form.title || '';
        return (
          <li key={`${form.serverUrl}:${form.filename || title}`}>
            <Link
              className="btn btn-outline-primary text-start"
              href={`/${path}/forms/${toUrlFriendlyString(title)}`}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
  return (
    <section
      id="form-search-results"
      className="container mt-4"
      aria-label="Search results"
      aria-busy={loading}
    >
      {(titles.length > 0 || descriptions.length > 0) && (
        <>
          <h2>Forms matching your keywords</h2>
          {forms([...titles, ...descriptions])}
        </>
      )}
      {topics.length > 0 && (
        <>
          <h2 className="mb-4">Topics that may help</h2>
          <div className="row row-cols-1 row-cols-md-3 g-5 card-container">
            {topics.map((topic, index) => (
              <TopicCard
                key={topic.name}
                topic={topic}
                interviews={rankFormsByTopics(
                  interviews[topic.name] || [],
                  data.labels
                )}
                path={path}
                serverUrl={server.url}
                index={index}
                isSpot={true}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        </>
      )}
      {!loading && !titles.length && !topics.length && !descriptions.length && (
        <p>
          No matching forms or topics found. Try different words or browse the
          categories.
        </p>
      )}
      {data.degraded && (
        <p role="status">
          Some topic matching services were unavailable. These results may be
          incomplete.
        </p>
      )}
    </section>
  );
}
