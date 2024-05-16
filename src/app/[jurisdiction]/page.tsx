import HowItWorksSection from '../components/HowItWorksSection';
import TopicsSection from '../components/TopicsSection';
import HeroSection from '../components/HeroSection';

interface PageProps {
  params: {
    jurisdiction: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { jurisdiction } = params;

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <TopicsSection jurisdiction={jurisdiction} />
    </div>
  );
};

export default Page;
