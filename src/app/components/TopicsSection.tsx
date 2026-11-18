import { formSources } from '../../config/formSources.config';
import { legalTopics } from '../../config/topics.config';
import ShowAllToggle from './ShowAllToggle';
import { MAX_VISIBLE_CATEGORIES } from '../../config/constants';
import TopicCard from './TopicCard';
import styles from '../css/TopicsSection.module.css';
import { message, type Locale } from '../../i18n/messages';

const TopicsSection = async ({
  path,
  interviews,
  isError,
  hasFetchErrors,
  locale = 'en' as Locale,
}) => {
  if (isError) {
    return <div>{message(locale, 'home.dataError')}</div>;
  }

  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const serverUrl = server.url;

  const filteredTopics = [...legalTopics]
    .sort((a, b) => b.priority - a.priority)
    .filter(
      (topic) =>
        topic.always_visible ||
        hasFetchErrors ||
        interviews[topic.name.toLowerCase()]?.length > 0
    );

  return (
    <section id="topics" className={styles.TopicsSection + ' py-5'}>
      <div className="container">
        <h2 className="mb-3">{message(locale, 'home.browseCategories')}</h2>
        {/* Only show the toggle if there are more topics than the configured visible max */}
        {filteredTopics.length > MAX_VISIBLE_CATEGORIES && (
          <ShowAllToggle locale={locale} />
        )}
        <div className="row row-cols-1 row-cols-md-3 g-4 card-container">
          {filteredTopics.map((topic, index) => (
            <TopicCard
              key={topic.codes[0]}
              topic={topic}
              interviews={interviews[topic.name.toLowerCase()] || []}
              path={path}
              serverUrl={serverUrl}
              index={index}
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
