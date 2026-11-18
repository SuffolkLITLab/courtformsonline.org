import Link from 'next/link';
import { fetchInterviews } from '../../data/fetchInterviewData';
import { legalTopics } from '../../config/topics.config';
import { getLegalHelpInfo } from '../../utils/legalHelpService';
import { getJurisdictionFromPath } from '../../utils/jurisdiction';
import { message, topicTitle, type Locale } from '../../i18n/messages';
import { formDetailsPath, spanishLandingPath } from '../../i18n/routes';
import styles from '../css/TopicPage.module.css';
import Breadcrumbs from './Breadcrumbs';
import InteractiveForm from './InteractiveForm';
import LegalResourceLink from './LegalResourceLink';

export default async function TopicLanding({
  topic,
  path,
  locale,
}: {
  topic: string;
  path: string;
  locale: Locale;
}) {
  const { interviewsByTopic, isError } = await fetchInterviews(path, {
    locale,
  });
  if (isError) return <div>{message(locale, 'home.dataError')}</div>;

  const normalizedTopic = topic.toLowerCase().replace(/\/$/, '');
  const topicDetails = legalTopics.find(
    (item) => item.name === normalizedTopic
  );
  const displayTopic = topicDetails
    ? topicTitle(locale, topicDetails)
    : normalizedTopic;
  const jurisdiction = getJurisdictionFromPath(path);
  const interviews = interviewsByTopic[normalizedTopic] || [];
  const { deepLink, DisclaimerComponent } = await getLegalHelpInfo({
    jurisdiction: path,
    topic: normalizedTopic,
    isTopicPage: true,
  });

  return (
    <div className={styles.TopicPage + ' container'}>
      <Breadcrumbs
        locale={locale}
        items={[
          {
            label: message(locale, 'topicPage.home'),
            href: locale === 'es' ? '/es' : '/',
          },
          {
            label: jurisdiction,
            href: locale === 'es' ? spanishLandingPath(path) : `/${path}`,
          },
          { label: displayTopic },
        ]}
      />
      <h1 className="form-heading text-center mb-3">
        {message(locale, 'topicPage.heading', {
          state: jurisdiction,
          topic: displayTopic,
        })}
      </h1>
      <p className="text-center text-muted mb-4">
        {message(locale, 'topicPage.guideIntro')}{' '}
        <Link href="/guides/how-interviews-work" hrefLang="en">
          {message(locale, 'topicPage.guideLink')}
        </Link>{' '}
        {message(locale, 'topicPage.guideEnding')}
      </p>
      {interviews.length > 0 ? (
        interviews.map((interview) => (
          <InteractiveForm
            key={interview.canonicalTitle}
            title={interview.title}
            canonicalTitle={interview.canonicalTitle}
            titleLanguage={interview.titleLanguage}
            descriptionLanguage={interview.descriptionLanguage}
            metadata={interview.metadata}
            landingPageURL={formDetailsPath(
              locale,
              path,
              interview.canonicalTitle
            )}
            filename={interview.filename}
            link={interview.link}
            serverUrl={interview.serverUrl}
            locale={locale}
          />
        ))
      ) : (
        <p>{message(locale, 'topicPage.empty')}</p>
      )}
      {deepLink && DisclaimerComponent && (
        <LegalResourceLink
          locale={locale}
          topic={displayTopic}
          jurisdiction={jurisdiction}
          deepLink={deepLink}
          disclaimerInfo={<DisclaimerComponent />}
        />
      )}
    </div>
  );
}
