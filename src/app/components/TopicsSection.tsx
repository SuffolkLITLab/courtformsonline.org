import { legalTopics } from '../../config/topics.config';
import { formSources } from '../../config/formSources.config';
import TopicCard from './TopicCard';
import ShowAllToggle from './ShowAllToggle';

const TopicsSection = async ({ path, interviews, isError }) => {
  if (isError) {
    return <div>Error fetching data.</div>;
  }

  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const serverUrl = server.url;

  const filteredTopics = legalTopics
    .sort((a, b) => b.priority - a.priority)
    .filter(
      (topic) => topic.always_visible || interviews[topic.name].length > 0
    );

  return (
    <section id="topics">
      <div className="container">
        <h2>Browse court forms by category</h2>
        {filteredTopics.length > 9 && <ShowAllToggle />}
        <div className="row row-cols-1 row-cols-md-3 g-5 card-container">
          {filteredTopics.map((topic, index) => (
            <TopicCard
              key={topic.codes[0]}
              topic={topic}
              interviews={interviews[topic.name] || []}
              path={path}
              serverUrl={serverUrl}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
