// Example: courtformsonline.org/ma
import AffiliatesSection from '../components/AffiliatesSection';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TopicsSection from '../components/TopicsSection';
import { fetchInterviews } from '../../data/fetchInterviewData';

interface PageProps {
  params: {
    path: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { path } = params;
  const { interviewsByTopic, isError } = await fetchInterviews(path);

  return (
    <div>
      <HeroSection
        path={path}
        interviews={interviewsByTopic}
        isError={isError}
      />
      <HowItWorksSection />
      <TopicsSection
        path={path}
        interviews={interviewsByTopic}
        isError={isError}
      />
      <AffiliatesSection />
    </div>
  );
};

export default Page;
