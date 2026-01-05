import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';
import { pathToServerConfig } from '../../../config/formSources.config';

export const metadata: Metadata = {
  title: 'Finding Your Courthouse - Court Forms Online',
  description:
    'Learn how to find the right courthouse for your case. Locate courts by jurisdiction, case type, and location.',
};

// Get available jurisdictions for localized links
const jurisdictions = Object.entries(pathToServerConfig).map(
  ([path, config]) => ({
    path,
    name: (config as { name: string }).name,
  })
);

export default function FindYourCourt() {
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
            Find your court
          </li>
        </ol>
      </nav>

      <h1>Finding your courthouse</h1>

      <p className="lead">
        Filing in the wrong court can cause delays or require you to start over.
        Our guided interviews often help you identify the correct court based on
        your situation, but you can also use the information below to find your
        court.
      </p>

      <h2>Why the right court matters</h2>
      <p>
        Different courts handle different types of cases, and each court only
        has authority (called &quot;jurisdiction&quot;) over certain geographic
        areas and subject matters. There may also be other requirements, like a
        minimum or maximum dollar amount for certain courts.
      </p>
      <ul>
        <li>
          <strong>Geographic jurisdiction:</strong> Depends on where you live,
          where the other party lives, or where something happened.
        </li>
        <li>
          <strong>Subject matter jurisdiction:</strong> Different courts handle
          family matters, cases about someone who died, housing disagreements,
          criminal cases, small claims, criminal cases involving children, and
          cases about ownership of land.
        </li>
        <li>
          <strong>Monetary limits:</strong> Some courts only handle cases
          involving amounts below or above a certain dollar value.
        </li>
      </ul>

      <h2>How to determine which court</h2>
      <p>Consider these factors:</p>
      <ol>
        <li>
          <strong>Type of case:</strong> Is it a family matter, housing issue,
          small claim, or something else?
        </li>
        <li>
          <strong>Amount involved:</strong> Small claims courts have dollar
          limits; larger amounts may require a different court.
        </li>
        <li>
          <strong>Location:</strong> Courts are typically organized by county or
          district.
        </li>
        <li>
          <strong>Existing case:</strong> If you already have a case, you must
          file in the same court where it&apos;s pending.
        </li>
      </ol>

      <h2>Find courts in your state</h2>
      <p>
        Select your jurisdiction for specific court finder tools and
        information:
      </p>
      <div className="row">
        {jurisdictions.map((j) => (
          <div key={j.path} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h3 className="h5 card-title">{j.name}</h3>
                <Link
                  href={`/guides/find-your-court/${j.path}`}
                  className="btn btn-outline-primary"
                >
                  Find {j.name} courts
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Information you&apos;ll need</h2>
      <p>When looking for your court, you&apos;ll likely need to know:</p>
      <ul>
        <li>Your address or the location related to your case</li>
        <li>The type of legal issue you&apos;re dealing with</li>
        <li>Your case number (if you have an existing case)</li>
      </ul>
      <p>
        <Link href="/guides/what-information-you-need">
          Learn more about what information court forms need
        </Link>
        .
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, you&apos;re ready to start your
          guided interview.
        </p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse all forms
        </Link>
        <Link href="/guides" className="btn btn-outline-secondary">
          Back to how to use court forms
        </Link>
      </div>
    </div>
  );
}
