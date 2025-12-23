// Example: courtformsonline.org/ma/housing
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { fetchInterviews } from '../../../data/fetchInterviewData';
import {
  formSources,
  pathToServerConfig,
} from '../../../config/formSources.config';
import InteractiveForm from '../../components/InteractiveForm';
import LegalResourceLink from '../../components/LegalResourceLink';
import { getLegalHelpInfo } from '../../../utils/legalHelpService';
import { legalTopics } from '../../../config/topics.config';
import { toUrlFriendlyString } from '../../utils/helpers';
import styles from '../../css/TopicPage.module.css';
import Breadcrumbs, { BreadcrumbItem } from '../../components/Breadcrumbs';

interface PageProps {
  params: {
    topic: string;
    path: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { topic, path } = params;
  const { interviewsByTopic, isError } = await fetchInterviews(path);

  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const serverUrl = server.url;

  // Get jurisdiction name from path config
  const jurisdictionName = pathToServerConfig[path]?.name || path.toUpperCase();

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  const topicDetails = legalTopics.find((t) => t.name.toLowerCase() === topic);
  const topicDisplayName = topicDetails?.long_name || topic;

  const interviews = interviewsByTopic[topic] || [];

  // Get legal help info using centralized service
  const { deepLink, DisclaimerComponent } = await getLegalHelpInfo({
    jurisdiction: path,
    topic,
    isTopicPage: true,
  });

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: jurisdictionName, href: `/${path}` },
    { label: topicDetails?.long_name || topic },
  ];

  return (
    <div className={styles.TopicPage + ' container'}>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="form-heading text-center mb-3">
        {jurisdictionName}: {topicDetails?.long_name || 'Topic'}
      </h1>
      <p className="text-center text-muted mb-4">
        Our{' '}
        <Link href="/guides/how-interviews-work">interactive interviews</Link> help
        you complete court forms step-by-step.
      </p>
      {interviews.length > 0 ? (
        interviews.map((interview, index) => (
          <InteractiveForm
            key={index}
            title={interview.title}
            metadata={interview.metadata}
            landingPageURL={
              '/' + path + '/forms/' + toUrlFriendlyString(interview.title)
            }
            link={interview.link}
            serverUrl={interview.serverUrl}
          />
        ))
      ) : (
        <p>No interviews found for this topic.</p>
      )}
      {deepLink && DisclaimerComponent && (
        <LegalResourceLink
          topic={topicDisplayName}
          jurisdiction={jurisdictionName}
          deepLink={deepLink}
          disclaimerInfo={<DisclaimerComponent />}
        />
      )}
    </div>
  );
};

export default Page;

export async function generateStaticParams({
  params,
}: {
  params: { path: string };
}) {
  const { path } = params;
  return legalTopics.map((topic) => ({
    path,
    topic: topic.name.toLowerCase(),
  }));
}
