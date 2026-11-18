import { fetchInterviews } from '../../data/fetchInterviewData';
import type { Locale } from '../../i18n/messages';
import AffiliatesSection from './AffiliatesSection';
import BlogPreview from './BlogPreview';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import HowToUseFormsSection from './HowToUseFormsSection';
import TopicsSection from './TopicsSection';

export default async function JurisdictionLanding({
  path,
  locale,
}: {
  path: string;
  locale: Locale;
}) {
  const { interviewsByTopic, isError, hasFetchErrors } = await fetchInterviews(
    path,
    { locale }
  );

  return (
    <div>
      <HeroSection
        path={path}
        interviews={interviewsByTopic}
        isError={isError}
        locale={locale}
      />
      <HowItWorksSection locale={locale} />
      <TopicsSection
        path={path}
        interviews={interviewsByTopic}
        isError={isError}
        hasFetchErrors={hasFetchErrors}
        locale={locale}
      />
      <HowToUseFormsSection locale={locale} />
      <BlogPreview locale={locale} />
      <AffiliatesSection locale={locale} />
    </div>
  );
}
