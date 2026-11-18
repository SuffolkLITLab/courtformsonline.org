import FormsIndex from '../../components/FormsIndex';
import { formsPath, localizedMetadata } from '../../../i18n/routes';
import { message } from '../../../i18n/messages';

export const metadata = {
  title: message('en', 'forms.title'),
  alternates: localizedMetadata(formsPath('en'), 'en'),
};

export default function FormsPage() {
  return <FormsIndex locale="en" />;
}
