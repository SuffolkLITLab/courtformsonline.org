// Example: courtformsonline.org
import AffiliatesSection from './components/AffiliatesSection';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import TopicsSection from './components/TopicsSection';
import { fetchInterviews } from '../data/fetchInterviewData';

export default async function Page() {
  const { interviewsByTopic, isError } = await fetchInterviews('ma');

  return (
    <>
      <HeroSection
        path={'ma'}
        interviews={interviewsByTopic}
        isError={isError}
      />
      <HowItWorksSection />
      <TopicsSection
        path={'ma'}
        interviews={interviewsByTopic}
        isError={isError}
      />
      <AffiliatesSection />
    </>
  );
}
