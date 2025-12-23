import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Your Maine Courthouse - Court Forms Online',
  description:
    'Find the right Maine courthouse for your case. Locate courts by county and case type.',
};

export default function FindYourCourtME() {
  return (
    <div className={styles.AboutPageContainer + ' container'}>
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/guides">How to Use Court Forms</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/guides/find-your-court">Find your court</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Maine
          </li>
        </ol>
      </nav>

      <h1>Find your Maine courthouse</h1>

      <p className="lead">
        Maine&apos;s court system includes several types of courts. Find the
        right one for your legal matter.
      </p>

      <h2>Types of Maine courts</h2>

      <h3>Trial Courts</h3>
      <ul>
        <li>
          <strong>Superior Court:</strong> Handles major civil and criminal
          cases, including felonies and civil cases requesting jury trials.
        </li>
        <li>
          <strong>District Court:</strong> Handles family matters, small claims,
          protection orders, minor criminal matters, and landlord-tenant cases.
        </li>
        <li>
          <strong>Probate Court:</strong> Handles wills, estates, adoptions, and
          guardianships.
        </li>
      </ul>

      <h2>Finding your Maine court</h2>
      <p>
        Maine courts are organized by county. To find your local court:
      </p>
      <ol>
        <li>Determine the type of case you have</li>
        <li>Identify the county where you live or where the matter occurred</li>
        <li>Look up the courthouse address for that county</li>
      </ol>

      <h2>Maine court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.courts.maine.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maine Judicial Branch
          </a>
        </li>
        <li>
          <a
            href="https://www.courts.maine.gov/maine_courts/Locations/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maine Court Locations
          </a>
        </li>
        <li>
          <a
            href="https://www.ptla.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pine Tree Legal Assistance
          </a>
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, start your guided interview.
        </p>
        <Link href="/me/forms" className="btn btn-primary me-2">
          Browse all Maine forms
        </Link>
        <Link href="/guides/find-your-court" className="btn btn-outline-secondary">
          Find courts in other jurisdictions
        </Link>
      </div>
    </div>
  );
}
