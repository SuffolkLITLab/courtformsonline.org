// Example: courtformsonline.org/ma/housing
import ReactMarkdown from 'react-markdown';
import Button from 'react-bootstrap/Button';
import remarkGfm from 'remark-gfm';
import { fetchInterviews } from '../../../data/fetchInterviewData';
import { formSources } from '../../../config/formSources.config';
import InteractiveForm from '../../components/InteractiveForm';
import { legalTopics } from '../../../config/topics.config';
import { toUrlFriendlyString } from '../../utils/helpers';
import styles from '../../css/TopicPage.module.css';

interface PageProps {
  params: {
    topic: string;
    path: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { topic, path } = params;
  const { interviewsByTopic, isError } = await fetchInterviews(path);

  const server =
    formSources.docassembleServers.find((server) => server.path === path) ||
    formSources.docassembleServers[0];
  const serverUrl = server.url;

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  const topicDetails = legalTopics.find((t) => t.name.toLowerCase() === topic);

  const interviews = interviewsByTopic[topic] || [];

  return (
    <div className={styles.TopicPage + ' container'}>
      <h1 className="form-heading text-center mb-3">
        {topicDetails?.long_name || 'Topic'}
      </h1>
      {interviews.length > 0 ? (
        interviews.map((interview, index) => (
          <InteractiveForm
            key={index}
            title={interview.title}
            metadata={interview.metadata}
            landingPageURL={
              '/' + path + '/forms/' + toUrlFriendlyString(interview.title)
            }
            link={interview.link}
            serverUrl={interview.serverUrl}
          />
        ))
      ) : (
        <p>No interviews found for this topic.</p>
      )}
    </div>
  );
};

export default Page;

export async function generateStaticParams({
  params,
}: {
  params: { path: string };
}) {
  const { path } = params;
  return legalTopics.map((topic) => ({
    path,
    topic: topic.name.toLowerCase(),
  }));
}
