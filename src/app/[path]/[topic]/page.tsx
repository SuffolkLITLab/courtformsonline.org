import { GetStaticPathsResult } from 'next';
import { legalTopics, Topic } from '../../../config/topics.config';

interface PageProps {
  params: {
    topic: string;
    path: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { topic, path } = params;
  return <div>Topic: {topic}</div>;
};

export default Page;

export async function generateStaticParams({ params }) {
  const { path } = params;
  return legalTopics.map((topic) => ({
    topic: topic.name.toLowerCase(),
  }));
}
