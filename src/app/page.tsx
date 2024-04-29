import Link from 'next/link';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import { fetchInterviews } from '../data/fetchInterviewData';
import TopicCard from './components/TopicCard';
import { legalTopics } from '../config/topics.config';

export default async function TopicsPage() {
  const interviewsResult = await fetchInterviews();
  const { interviewsByTopic } = interviewsResult;

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <section id="topics">
        <div className="container">
          <h2>Browse court forms by category</h2>
          <div className="row row-cols-1 row-cols-md-3 g-5">
            {legalTopics
              .sort((a, b) => b.priority - a.priority)
              .filter(
                (topic) =>
                  topic.always_visible ||
                  (interviewsByTopic[topic.name] &&
                    interviewsByTopic[topic.name].length > 0)
              )
              .map((topic) => (
                <TopicCard
                  key={topic.codes[0]}
                  topic={topic}
                  interviews={interviewsByTopic[topic.name] || []}
                />
              ))}
          </div>
          <Link href="#">Show all categories</Link>
        </div>
      </section>
    </div>
  );
}
