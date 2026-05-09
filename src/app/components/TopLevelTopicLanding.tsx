import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { legalTopics } from '../../config/topics.config';
import { pathToServerConfig } from '../../config/formSources.config';
import { fetchInterviews } from '../../data/fetchInterviewData';

interface TopLevelTopicLandingProps {
  topic: string;
}

const getJurisdictionsWithTopic = cache(async (topic: string) => {
  const results = await Promise.all(
    Object.entries(pathToServerConfig).map(async ([path, config]) => {
      const { interviewsByTopic, isError } = await fetchInterviews(path);
      const interviews = interviewsByTopic[topic] || [];
      return {
        path,
        name: (config as { name: string }).name,
        hasTopicMatches: interviews.length > 0,
        isError,
      };
    })
  );

  const hasAnyFetchErrors = results.some((entry) => entry.isError);

  const filteredResults = hasAnyFetchErrors
    ? results
    : results.filter((entry) => entry.hasTopicMatches);

  const options = filteredResults
    .map(({ path, name }) => ({ path, name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return {
    options,
    hasAnyFetchErrors,
  };
});

export default async function TopLevelTopicLanding({
  topic,
}: TopLevelTopicLandingProps) {
  const normalizedTopic = topic.toLowerCase();
  const topicDetails = legalTopics.find((t) => t.name === normalizedTopic);

  if (!topicDetails) {
    notFound();
  }

  const { options: jurisdictionOptions, hasAnyFetchErrors } =
    await getJurisdictionsWithTopic(normalizedTopic);

  if (jurisdictionOptions.length === 0) {
    notFound();
  }

  return (
    <div className="container py-5">
      <h1 className="mb-3">{topicDetails.long_name}</h1>
      <p className="text-muted mb-4">
        {hasAnyFetchErrors
          ? 'We could not verify all topic counts right now. Choose your state to continue.'
          : jurisdictionOptions.length === 1
            ? 'This topic currently has forms in one state. Continue below.'
            : 'This topic has forms in multiple states. Pick your state to continue.'}
      </p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {jurisdictionOptions.map((option) => (
          <Link
            key={option.path}
            href={`/${option.path}/${normalizedTopic}`}
            className="btn btn-outline-primary"
          >
            {option.name}
          </Link>
        ))}
      </div>
      <p className="text-muted small mb-0">
        Looking for all forms instead?{' '}
        <Link href="/ma/forms">Start with Massachusetts</Link> or choose a
        jurisdiction from the site menu.
      </p>
    </div>
  );
}
