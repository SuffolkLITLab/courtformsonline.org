import FormsIndex from '../../components/FormsIndex';
import { formsPath, localizedMetadata } from '../../../i18n/routes';
import { message } from '../../../i18n/messages';

export const metadata = {
  title: message('es', 'forms.title'),
  alternates: localizedMetadata(formsPath('es'), 'es'),
};

export default function FormsPage() {
  return <FormsIndex locale="es" />;
}
