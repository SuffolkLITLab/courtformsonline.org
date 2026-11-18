import { notFound } from 'next/navigation';
import JurisdictionLanding from '../../components/JurisdictionLanding';
import { localizedMetadata, spanishLandingPath } from '../../../i18n/routes';
import {
  DEFAULT_PATH,
  getAvailableJurisdictions,
} from '../../../utils/jurisdiction';

const states = getAvailableJurisdictions().filter(
  ({ path }) => path !== DEFAULT_PATH
);

type Props = { params: { path: string } };

export function generateStaticParams() {
  return states.map(({ path }) => ({ path }));
}

export function generateMetadata({ params: { path } }: Props) {
  const state = states.find((state) => state.path === path);
  if (!state) return {};
  return {
    title: `${state.name} | Court Forms Online`,
    description: `Encuentre formularios judiciales gratuitos y entrevistas guiadas para ${state.name}.`,
    alternates: localizedMetadata(spanishLandingPath(path), 'es'),
  };
}

export default function SpanishState({ params: { path } }: Props) {
  if (!states.some((state) => state.path === path)) notFound();
  return <JurisdictionLanding path={path} locale="es" />;
}
