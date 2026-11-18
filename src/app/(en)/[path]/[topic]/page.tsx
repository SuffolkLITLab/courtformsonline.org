import TopicLanding from '../../../components/TopicLanding';
import { languageAlternates, topicPath } from '../../../../i18n/routes';
import { legalTopics } from '../../../../config/topics.config';

type Props = { params: { path: string; topic: string } };

export function generateStaticParams({
  params: { path },
}: {
  params: { path: string };
}) {
  return legalTopics.map(({ name }) => ({ path, topic: name }));
}

export function generateMetadata({ params: { path, topic } }: Props) {
  return {
    alternates: languageAlternates(
      topicPath('en', path, topic),
      topicPath('es', path, topic),
      'en'
    ),
  };
}

export default function TopicPage({ params: { path, topic } }: Props) {
  return <TopicLanding path={path} topic={topic} locale="en" />;
}
