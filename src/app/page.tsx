import HowItWorksSection from './components/HowItWorksSection';
import TopicsSection from './components/TopicsSection';
import HeroSection from './components/HeroSection';

export default async function Page() {
  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <TopicsSection jurisdiction={'ma'} />
    </div>
  );
}
