// Example: courtformsonline.org/ma/forms
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Form } from '../../interfaces/Form';
import InteractiveForm from '../../components/InteractiveForm';
import LegalResourceLink from '../../components/LegalResourceLink';
import { pathToServerConfig } from '../../../config/formSources.config';
import { toUrlFriendlyString } from '../../utils/helpers';
import styles from '../../css/AllFormsContainer.module.css';
import {
  getJurisdictionFromPath,
  getAvailableJurisdictions,
} from '../../../utils/jurisdiction';
import { getLegalHelpInfo } from '../../../utils/legalHelpService';
import { fetchInterviews } from '../../../data/fetchInterviewData';

const SearchSection = dynamic(() => import('../../components/SearchSection'), {
  ssr: false,
});

async function getData(path: string) {
  const { interviewsByTopic } = await fetchInterviews(path);
  const formsByTitle = new Map<string, Form>();

  Object.values(interviewsByTopic).forEach((interviews) => {
    interviews.forEach((interview: any) => {
      if (!formsByTitle.has(interview.title)) {
        formsByTitle.set(interview.title, interview);
      }
    });
  });

  return Array.from(formsByTitle.values());
}

interface PageProps {
  params: {
    path: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { path } = params;
  const forms = await getData(path);
  const jurisdictionName = getJurisdictionFromPath(path);
  const moreFormsUrl = pathToServerConfig[path]?.moreFormsUrl;
  const availableJurisdictions = getAvailableJurisdictions();

  // Get legal help info for this jurisdiction
  const { deepLink, DisclaimerComponent } = await getLegalHelpInfo({
    jurisdiction: path,
  });

  return (
    <div className={styles.AllFormsContainer + ' container'}>
      <h1 className="form-heading text-center mb-3">
        All {jurisdictionName} forms
      </h1>
      <p className="text-center text-muted mb-3">
        New to guided interviews?{' '}
        <Link href="/guides/how-interviews-work">Learn how they work</Link>
        {' · '}
        <Link href="/guides/what-information-you-need">
          What information you&apos;ll need
        </Link>
        {' · '}
        <Link href="/guides/choosing-right-form">
          How to select the right court form
        </Link>
      </p>
      {availableJurisdictions.length > 1 && (
        <p className="text-center mb-3">
          Looking for a different state?{' '}
          {availableJurisdictions
            .filter((j) => j.path !== path)
            .map((j, index, arr) => (
              <span key={j.path}>
                <a href={`/${j.path}/forms`}>{j.name}</a>
                {index < arr.length - 1 ? ', ' : ''}
              </span>
            ))}
        </p>
      )}
      {moreFormsUrl && (
        <p className="text-muted small mb-2">
          Don't see your form? It may not be automated yet.{' '}
          <a href={moreFormsUrl} target="_blank" rel="noopener noreferrer">
            Find more {jurisdictionName} court forms.
          </a>
        </p>
      )}
      <SearchSection serverName={jurisdictionName} currentPath={path} />
      {forms.map((form, index) => (
        <InteractiveForm
          key={index}
          title={form.title}
          metadata={form.metadata}
          landingPageURL={
            '/' + path + '/forms/' + toUrlFriendlyString(form.title)
          }
          link={form.link}
          serverUrl={form.serverUrl}
        />
      ))}
      {deepLink && DisclaimerComponent && (
        <LegalResourceLink
          topic="legal assistance"
          jurisdiction={jurisdictionName}
          deepLink={deepLink}
          disclaimerInfo={<DisclaimerComponent />}
        />
      )}
    </div>
  );
}
