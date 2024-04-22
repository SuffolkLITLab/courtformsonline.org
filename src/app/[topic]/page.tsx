import { GetStaticPathsResult } from 'next';
import { legalTopics, Topic } from '../../../topics.config';

interface PageProps {
  params: {
    topic: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { topic } = params;
  return <div>Topic: {topic}</div>;
};

export default Page;

export async function generateStaticParams() {
  return legalTopics.map((topic) => ({
    topic: topic.name.toLowerCase(),
  }));
}
