import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Your Vermont Courthouse - Court Forms Online',
  description:
    'Find the right Vermont courthouse for your case. Learn about Vermont court divisions and how to locate your local court.',
};

export default function FindYourCourtVT() {
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
            <Link href="/guides/find-your-court">Find your court</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Vermont
          </li>
        </ol>
      </nav>

      <h1>Find your Vermont courthouse</h1>

      <p className="lead">
        The Vermont Judiciary includes an appellate court (the Supreme Court)
        and a trial court called the Vermont Superior Court, which is organized
        into 14 units (one per county) and five divisions: civil, criminal,
        environmental, family, and probate. The Superior Court also includes the
        statewide Judicial Bureau.
      </p>

      <h2>Types of Vermont courts</h2>

      <ul>
        <li>
          <strong>Supreme Court (Appellate):</strong> Reviews appeals from lower
          courts and administrative agencies.
        </li>
        <li>
          <strong>Superior Court (Trial):</strong> Handles most trials;
          organized by county with divisions for civil, criminal, environmental,
          family, and probate matters.
        </li>
        <li>
          <strong>Judicial Bureau:</strong> A statewide court that handles civil
          violations and certain administrative matters.
        </li>
      </ul>

      <h2>Finding your Vermont court</h2>
      <p>To find the right Vermont court:</p>
      <ol>
        <li>
          Identify the type of case (family, civil, criminal, probate, etc.).
        </li>
        <li>Determine the correct county where the case should be filed.</li>
        <li>
          Use the Vermont Judiciary directory to find contact details and
          courthouse locations.
        </li>
      </ol>

      <h2>Vermont court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.vermontjudiciary.org/court-divisions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vermont Judiciary — Court Divisions
          </a>
        </li>
        <li>
          <a
            href="https://www.vermontjudiciary.org/court-locations"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vermont Judiciary — Court Locations
          </a>
        </li>
        <li>
          <a
            href="https://vtlawhelp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vermont Law Help
          </a>
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, start your guided interview.
        </p>
        <Link href="/vt/forms" className="btn btn-primary me-2">
          Browse all Vermont forms
        </Link>
        <Link
          href="/guides/find-your-court"
          className="btn btn-outline-secondary"
        >
          Find courts in other jurisdictions
        </Link>
      </div>
    </div>
  );
}
