import TopicLanding from '../../../components/TopicLanding';
import { languageAlternates, topicPath } from '../../../../i18n/routes';
import { legalTopics } from '../../../../config/topics.config';
import { getAvailableJurisdictions } from '../../../../utils/jurisdiction';

type Props = { params: { path: string; topic: string } };

export function generateStaticParams() {
  return getAvailableJurisdictions().flatMap(({ path }) =>
    legalTopics.map(({ name }) => ({ path, topic: name }))
  );
}

export function generateMetadata({ params: { path, topic } }: Props) {
  return {
    alternates: languageAlternates(
      topicPath('en', path, topic),
      topicPath('es', path, topic),
      'es'
    ),
  };
}

export default function TopicPage({ params: { path, topic } }: Props) {
  return <TopicLanding path={path} topic={topic} locale="es" />;
}
