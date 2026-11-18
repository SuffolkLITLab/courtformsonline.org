import type { Metadata } from 'next';
import JurisdictionLanding from '../components/JurisdictionLanding';
import { localizedMetadata } from '../../i18n/routes';
import { DEFAULT_PATH } from '../../utils/jurisdiction';

export const metadata: Metadata = {
  title: 'Formularios judiciales en línea | Court Forms Online',
  description:
    'Encuentre formularios judiciales gratuitos y entrevistas guiadas para Massachusetts.',
  alternates: localizedMetadata('/es', 'es'),
};

export default function SpanishHome() {
  return <JurisdictionLanding path={DEFAULT_PATH} locale="es" />;
}
