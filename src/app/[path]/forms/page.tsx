// Example: courtformsonline.org/ma/forms
import dynamic from 'next/dynamic';
import { Form } from '../../interfaces/Form';
import InteractiveForm from '../../components/InteractiveForm';
import {
  pathToServerConfig,
  formSources,
} from '../../../config/formSources.config';
import { toUrlFriendlyString } from '../../utils/helpers';
import styles from '../../css/AllFormsContainer.module.css';
import {
  getJurisdictionFromPath,
  jurisdictionMatches,
  getAvailableJurisdictions,
} from '../../../utils/jurisdiction';

const SearchSection = dynamic(() => import('../../components/SearchSection'), {
  ssr: false,
});

async function getData() {
  let allData: Form[] = [];
  // Import fee extraction logic
  // @ts-ignore
  const { extractLocalizedFees } = await import(
    '../../../data/fetchInterviewData'
  );
  const locale = 'en';

  for (const server of formSources.docassembleServers) {
    const url = new URL(server.url);
    url.pathname = '/list';
    url.search = 'json=1';

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`Failed to fetch data from ${server.url}`);
      continue;
    }
    const data = await res.json();
    if (!data.hasOwnProperty('interviews')) {
      console.error(
        `Data from ${server.url} does not contain "interviews" key`
      );
      continue;
    }
    // Normalize fees in metadata
    const interviews = data['interviews'].map((interview: any) => {
      let fees = [];
      if (interview.metadata && interview.metadata.fees) {
        fees = extractLocalizedFees(interview.metadata.fees, locale);
      }
      return {
        ...interview,
        serverName: server.name,
        serverUrl: server.url,
        metadata: {
          ...interview.metadata,
          fees,
        },
      };
    });
    allData = allData.concat(interviews);
  }
  return allData;
}

interface PageProps {
  params: {
    path: string;
  };
}

export default async function Page({ params }: PageProps) {
  const allForms = await getData();
  const { path } = params;
  const jurisdictionName = getJurisdictionFromPath(path);
  const moreFormsUrl = pathToServerConfig[path]?.moreFormsUrl;
  const availableJurisdictions = getAvailableJurisdictions();

  // Filter forms by jurisdiction
  const forms = allForms.filter((form) =>
    jurisdictionMatches(form.metadata?.jurisdiction, jurisdictionName)
  );

  return (
    <div className={styles.AllFormsContainer + ' container'}>
      <h1 className="form-heading text-center mb-3">
        All {jurisdictionName} forms
      </h1>
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
    </div>
  );
}
