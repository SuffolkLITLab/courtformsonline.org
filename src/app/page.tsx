import HowItWorksSection from './components/HowItWorksSection';
import TopicsSection from './components/TopicsSection';
import HeroSection from './components/HeroSection';
import { fetchInterviews } from '../data/fetchInterviewData';

export default async function Page() {
  const { interviewsByTopic, isError } = await fetchInterviews('ma');

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <TopicsSection
        path={'ma'}
        interviews={interviewsByTopic}
        isError={isError}
      />
    </div>
  );
}
