import type { Metadata } from 'next';
import FamilyEmergencyLanding from '../../components/FamilyEmergencyLanding';
import { message } from '../../../i18n/messages';
import { localizedMetadata } from '../../../i18n/routes';

export const metadata: Metadata = {
  title: message('en', 'family.title'),
  description: message('en', 'family.description'),
  alternates: localizedMetadata('/family', 'en'),
};

export default function FamilyPage() {
  return <FamilyEmergencyLanding locale="en" />;
}
