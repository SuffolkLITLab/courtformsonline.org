import type { Metadata } from 'next';
import FamilyEmergencyLanding from '../../components/FamilyEmergencyLanding';
import { message } from '../../../i18n/messages';
import { localizedMetadata } from '../../../i18n/routes';

export const metadata: Metadata = {
  title: message('es', 'family.title'),
  description: message('es', 'family.description'),
  alternates: localizedMetadata('/es/family', 'es'),
};

export default function FamilyPage() {
  return <FamilyEmergencyLanding locale="es" />;
}
