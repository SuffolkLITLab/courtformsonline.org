// Example: courtformsonline.org/ma
import { notFound } from 'next/navigation';
import JurisdictionLanding from '../../components/JurisdictionLanding';
import TopLevelTopicLanding from '../../components/TopLevelTopicLanding';
import { pathToServerConfig } from '../../../config/formSources.config';
import { legalTopics } from '../../../config/topics.config';
import { localizedMetadata } from '../../../i18n/routes';

interface PageProps {
  params: {
    path: string;
  };
}

export function generateMetadata({ params }: PageProps) {
  return { alternates: localizedMetadata(`/${params.path}`, 'en') };
}

const Page = async ({ params }: PageProps) => {
  const normalizedPath = params.path.toLowerCase().replace(/\/$/, '');
  const isJurisdiction = Boolean(pathToServerConfig[normalizedPath]);
  const isTopLevelTopic = legalTopics.some(
    (topic) => topic.name.toLowerCase() === normalizedPath
  );

  if (isTopLevelTopic && !isJurisdiction) {
    return <TopLevelTopicLanding topic={normalizedPath} />;
  }

  if (!isJurisdiction) {
    notFound();
  }

  return <JurisdictionLanding path={normalizedPath} locale="en" />;
};

export default Page;

export async function generateStaticParams() {
  return [
    ...Object.keys(pathToServerConfig).map((path) => ({
      path: path.toLowerCase(),
    })),
    // /family has its own planning index. Exporting it here would overwrite it.
    ...legalTopics
      .filter((topic) => topic.name.toLowerCase() !== 'family')
      .map((topic) => ({ path: topic.name.toLowerCase() })),
  ];
}
