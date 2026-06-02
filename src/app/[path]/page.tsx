// Example: courtformsonline.org/ma
import { notFound } from 'next/navigation';
import AffiliatesSection from '../components/AffiliatesSection';
import BlogPreview from '../components/BlogPreview';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import HowToUseFormsSection from '../components/HowToUseFormsSection';
import TopLevelTopicLanding from '../components/TopLevelTopicLanding';
import TopicsSection from '../components/TopicsSection';
import { pathToServerConfig } from '../../config/formSources.config';
import { legalTopics } from '../../config/topics.config';
import { fetchInterviews } from '../../data/fetchInterviewData';

interface PageProps {
  params: {
    path: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const normalizedPath = params.path.toLowerCase().replace(/\/$/, '');
  const isJurisdiction = Boolean(pathToServerConfig[normalizedPath]);
  const isTopLevelTopic = legalTopics.some(
    (topic) => topic.name.toLowerCase() === normalizedPath
  );

  if (isTopLevelTopic && !isJurisdiction) {
    return <TopLevelTopicLanding topic={normalizedPath} />;
  }

  if (!isJurisdiction) {
    notFound();
  }

  const { interviewsByTopic, isError, hasFetchErrors } =
    await fetchInterviews(normalizedPath);

  return (
    <div>
      <HeroSection
        path={normalizedPath}
        interviews={interviewsByTopic}
        isError={isError}
      />
      <HowItWorksSection />
      <TopicsSection
        path={normalizedPath}
        interviews={interviewsByTopic}
        isError={isError}
        hasFetchErrors={hasFetchErrors}
      />
      <HowToUseFormsSection />
      <BlogPreview />
      <AffiliatesSection />
    </div>
  );
};

export default Page;

export async function generateStaticParams() {
  return [
    ...Object.keys(pathToServerConfig).map((path) => ({
      path: path.toLowerCase(),
    })),
    ...legalTopics.map((topic) => ({ path: topic.name.toLowerCase() })),
  ];
}
