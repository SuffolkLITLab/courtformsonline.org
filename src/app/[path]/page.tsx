import HowItWorksSection from '../components/HowItWorksSection';
import TopicsSection from '../components/TopicsSection';
import HeroSection from '../components/HeroSection';
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
    </div>
  );
};

export default Page;
