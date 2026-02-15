import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';
import { pathToServerConfig } from '../../../config/formSources.config';
import {
  defaultSharedNotarySectionOrder,
  sharedNotarySections,
} from './notaryContent';

export const metadata: Metadata = {
  title: 'Finding and Using a Notary - Court Forms Online',
  description:
    'Learn what a notary does, how to find one, what to bring, when to sign notarized documents, and who can notarize.',
};

const jurisdictions = Object.entries(pathToServerConfig).map(
  ([path, config]) => ({
    path,
    name: (config as { name: string }).name,
  })
);

export default function FindingAndUsingANotary() {
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
          <li className="breadcrumb-item active" aria-current="page">
            Finding and using a notary
          </li>
        </ol>
      </nav>

      <h1>Finding and using a notary</h1>

      <p className="lead">
        Some formal documents must be notarized. This page explains what
        notarization is, how to prepare, and how to avoid common mistakes.
      </p>

      {defaultSharedNotarySectionOrder.map((sectionKey) => {
        const Section = sharedNotarySections[sectionKey];
        return <Section key={sectionKey} />;
      })}

      <h2>State-specific notarization information</h2>
      <p>
        Notarization details can vary by state. Use your jurisdiction page for
        local notes and resources:
      </p>
      <div className="row">
        {jurisdictions.map((j) => (
          <div key={j.path} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h3 className="h5 card-title">{j.name}</h3>
                <Link
                  href={`/guides/finding-and-using-a-notary/${j.path}`}
                  className="btn btn-outline-primary"
                >
                  View {j.name} notarization guide
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Next step</h3>
        <p>
          After notarization, review how to submit your completed forms to the
          court.
        </p>
        <Link href="/guides/how-to-file" className="btn btn-outline-primary">
          How to file a court form
        </Link>
      </div>
    </div>
  );
}
