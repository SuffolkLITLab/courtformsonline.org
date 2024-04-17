import { NextPage } from 'next';
const {
  legalTopics,
  Topic,
  findParentTopic,
} = require('../../../topics.config.ts');

interface PageProps {
  params: {
    topic: string;
  };
}

const Page: NextPage<PageProps> = ({ params }) => {
  return <div>Topic: {params.topic} </div>;
};

export async function generateStaticParams() {
  return legalTopics.map((topic: typeof Topic) => {
    topic: topic.name;
  });
}

export const dynamicParams = false; // true | false,

export default Page;
