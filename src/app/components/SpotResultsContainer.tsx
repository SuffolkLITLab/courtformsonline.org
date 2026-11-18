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
  formDisplayTitle,
} from '../../data/formSearch';
import TopicCard from './TopicCard';
import { message, type Locale } from '../../i18n/messages';
import { formDetailsPath } from '../../i18n/routes';

interface Props {
  data: SearchResults;
  interviews: InterviewsByTopic;
  path: string;
  searchQuery: string;
  loading?: boolean;
  locale?: Locale;
}

export default function SpotResultsContainer({
  data,
  interviews,
  path,
  searchQuery,
  loading,
  locale = 'en',
}: Props) {
  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const { titles, descriptions } = keywordMatches(
    interviews,
    searchQuery,
    locale
  );
  const topics = matchingTopics(data.labels, interviews);
  const forms = (matches: SearchForm[]) => (
    <ul className="list-unstyled d-flex flex-column gap-2">
      {matches.map((form) => {
        const title = formDisplayTitle(form, locale);
        return (
          <li key={`${form.serverUrl}:${form.filename || title}`}>
            <Link
              className="btn btn-outline-primary text-start"
              href={formDetailsPath(locale, path, form.canonicalTitle || title)}
              lang={locale === 'es' ? (form.titleLanguage ?? 'en') : undefined}
              hrefLang="en"
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
      aria-label={message(locale, 'home.searchResults')}
      aria-busy={loading}
    >
      {(titles.length > 0 || descriptions.length > 0) && (
        <>
          <h2>{message(locale, 'home.keywordMatches')}</h2>
          {forms([...titles, ...descriptions])}
        </>
      )}
      {topics.length > 0 && (
        <>
          <h2 className="mb-4">{message(locale, 'home.helpfulTopics')}</h2>
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
                locale={locale}
              />
            ))}
          </div>
        </>
      )}
      {!loading && !titles.length && !topics.length && !descriptions.length && (
        <p>{message(locale, 'home.searchNoMatches')}</p>
      )}
      {data.degraded && (
        <p role="status">{message(locale, 'home.topicSearchDegraded')}</p>
      )}
    </section>
  );
}
