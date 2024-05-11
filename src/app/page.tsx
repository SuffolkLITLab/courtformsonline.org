import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import { fetchInterviews } from '../data/fetchInterviewData';
import TopicCard from './components/TopicCard';
import { legalTopics } from '../config/topics.config';
import ShowAllToggle from './components/ShowAllToggle';
import { formSources } from '../config/formSources.config';

export default async function TopicsPage() {
  const interviewsResult = await fetchInterviews();
  const { interviewsByTopic } = interviewsResult;

  // Modify this to account for various jurisdictions
  const serverKey = 'suffolkListLab';
  const server = formSources.docassembleServers.find(
    (server) => server.key === serverKey
  );
  const url = server ? server.url : 'https://apps.suffolklitlab.org';

  const filteredTopics = legalTopics
    .sort((a, b) => b.priority - a.priority)
    .filter(
      (topic, index) =>
        topic.always_visible ||
        (interviewsByTopic[topic.name] &&
          interviewsByTopic[topic.name].length > 0)
    );

  return (
    <div>
      <HeroSection />
      <HowItWorksSection />
      <section id="topics">
        <div className="container">
          <h2>Browse court forms by category</h2>
          <div className="row row-cols-1 row-cols-md-3 g-5 card-container">
            {filteredTopics.slice(0, 9).map((topic, index) => (
              <TopicCard
                key={topic.codes[0]}
                topic={topic}
                interviews={interviewsByTopic[topic.name] || []}
                index={index}
                serverUrl={url}
              />
            ))}
          </div>
          {filteredTopics.length > 9 && <ShowAllToggle />}
        </div>
      </section>
    </div>
  );
}
