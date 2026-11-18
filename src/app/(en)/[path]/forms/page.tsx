import FormsIndex from '../../../components/FormsIndex';
import { formsPath, localizedMetadata } from '../../../../i18n/routes';
import { message } from '../../../../i18n/messages';
import {
  getAvailableJurisdictions,
  getJurisdictionFromPath,
} from '../../../../utils/jurisdiction';

type Props = { params: { path: string } };

export function generateMetadata({ params: { path } }: Props) {
  return {
    title: message('en', 'forms.heading', {
      state: getJurisdictionFromPath(path),
    }),
    alternates: localizedMetadata(formsPath('en', path), 'en'),
  };
}

export default function FormsPage({ params: { path } }: Props) {
  return <FormsIndex locale="en" path={path} />;
}
