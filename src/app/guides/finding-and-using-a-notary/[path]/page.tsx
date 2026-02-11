import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import styles from '../../../css/AboutPage.module.css';
import { pathToServerConfig } from '../../../../config/formSources.config';
import { getStateNotaryConfig, sharedNotarySections } from '../notaryContent';

interface StateNotaryPageProps {
  params: {
    path: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(pathToServerConfig).map((path) => ({ path }));
}

export async function generateMetadata({
  params,
}: StateNotaryPageProps): Promise<Metadata> {
  const config =
    pathToServerConfig[params.path as keyof typeof pathToServerConfig];
  if (!config) {
    return {};
  }

  return {
    title: `Finding and Using a Notary in ${config.name} - Court Forms Online`,
    description: `State-specific guidance for finding and using a notary in ${config.name}, plus common notarization rules.`,
  };
}

function renderSections(
  sectionKeys: ReturnType<typeof getStateNotaryConfig>['sharedSectionOrder']
) {
  return sectionKeys.map((sectionKey) => {
    const Section = sharedNotarySections[sectionKey];
    return <Section key={sectionKey} />;
  });
}

export default function StateNotaryPage({ params }: StateNotaryPageProps) {
  const path = params.path.toLowerCase();
  const jurisdiction =
    pathToServerConfig[path as keyof typeof pathToServerConfig];

  if (!jurisdiction) {
    notFound();
  }

  const config = getStateNotaryConfig(path, jurisdiction.name);
  const shouldRenderShared = config.sharedBlockPlacement !== 'omit';
  const sharedContent = shouldRenderShared
    ? renderSections(config.sharedSectionOrder)
    : null;

  return (
    <div className={styles.AboutPageContainer + ' container'}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/guides">How to use court forms</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/guides/finding-and-using-a-notary">
              Finding and using a notary
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {jurisdiction.name}
          </li>
        </ol>
      </nav>

      <h1>Finding and using a notary in {jurisdiction.name}</h1>

      {config.sharedBlockPlacement === 'before' && sharedContent}

      {config.stateSections.map((Section, index) => (
        <Section key={`${Section.name}-${index}`} />
      ))}

      {config.sharedBlockPlacement === 'after' && sharedContent}

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Need more help?</h3>
        <p>Continue to filing guidance after your forms are notarized.</p>
        <Link
          href="/guides/how-to-file"
          className="btn btn-outline-primary me-2"
        >
          How to file a court form
        </Link>
        <Link
          href="/guides/finding-and-using-a-notary"
          className="btn btn-outline-secondary"
        >
          Notary guide overview
        </Link>
      </div>
    </div>
  );
}
