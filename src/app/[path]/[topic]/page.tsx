import { legalTopics } from '../../../config/topics.config';
import { fetchInterviews } from '../../../data/fetchInterviewData';
import { formSources } from '../../../config/formSources.config';
import Button from 'react-bootstrap/Button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import InteractiveForm from '../../components/InteractiveForm';

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
    <div className="container">
      <h1 className="form-heading">{topicDetails?.long_name || 'Topic'}</h1>
      {interviews.length > 0 ? (
        interviews.map((interview, index) => (
          <InteractiveForm
            key={index}
            title={interview.title}
            metadata={interview.metadata}
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

export async function generateStaticParams({ params }) {
  const { path } = params;
  return legalTopics.map((topic) => ({
    topic: topic.name.toLowerCase(),
  }));
}
