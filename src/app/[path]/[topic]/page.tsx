// Example: courtformsonline.org/ma/housing
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';
import remarkGfm from 'remark-gfm';
import { fetchInterviews } from '../../../data/fetchInterviewData';
import {
  formSources,
  pathToServerConfig,
} from '../../../config/formSources.config';
import InteractiveForm from '../../components/InteractiveForm';
import LegalResourceLink from '../../components/LegalResourceLink';
import MassLRFDisclaimerInfo from '../../components/MassLRFDisclaimerInfo';
import MichiganLegalHelpDisclaimerInfo from '../../components/MichiganLegalHelpDisclaimerInfo';
import MaineLegalHelpDisclaimerInfo from '../../components/MaineLegalHelpDisclaimerInfo';
import MinnesotaLegalHelpDisclaimerInfo from '../../components/MinnesotaLegalHelpDisclaimerInfo';
import { getMassLRFDeepLink, getMassLRFRootUrl } from '../../../utils/masslrf';
import {
  getMichiganLegalHelpDeepLink,
  getMichiganLegalHelpRootUrl,
} from '../../../utils/michiganlegalhelp';
import { getMaineLegalHelpLink } from '../../../utils/mainelegalhelp';
import { getMinnesotaLegalHelpLink } from '../../../utils/minnesotalegalhelp';
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

  // Compute deep link server-side using NSMI code from topic
  // Falls back to root URL if no topic-specific deep link is available
  let deepLink: string | null = null;
  let disclaimerInfo: React.ReactNode = undefined;

  if (path === 'ma') {
    if (topicDetails && topicDetails.codes.length > 0) {
      try {
        // Use the first LIST code from the topic configuration for top-level category link
        deepLink = await getMassLRFDeepLink(topicDetails.codes[0], true);
      } catch (err) {
        console.error('Error fetching MassLRF deep link:', err);
      }
    }
    // Fall back to root URL if no deep link was found (e.g., for "other" topic)
    if (!deepLink) {
      deepLink = getMassLRFRootUrl(path);
    }
    disclaimerInfo = <MassLRFDisclaimerInfo />;
  } else if (path === 'mi') {
    // Try to get a topic-specific deep link for Michigan
    if (topic) {
      deepLink = getMichiganLegalHelpDeepLink(topic);
    }
    // Fall back to root URL if no deep link was found
    if (!deepLink) {
      deepLink = getMichiganLegalHelpRootUrl();
    }
    disclaimerInfo = <MichiganLegalHelpDisclaimerInfo />;
  } else if (path === 'me') {
    // Maine Legal Help - link to Pine Tree Legal Assistance contact page
    deepLink = getMaineLegalHelpLink(topic);
    disclaimerInfo = <MaineLegalHelpDisclaimerInfo />;
  } else if (path === 'mn') {
    // Minnesota Legal Help - link to LawHelpMN
    deepLink = getMinnesotaLegalHelpLink(topic);
    disclaimerInfo = <MinnesotaLegalHelpDisclaimerInfo />;
  }

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
      {deepLink && (
        <LegalResourceLink
          topic={topicDisplayName}
          jurisdiction={jurisdictionName}
          deepLink={deepLink}
          disclaimerInfo={disclaimerInfo}
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
