import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Your Michigan Courthouse - Court Forms Online',
  description:
    'Find the right Michigan courthouse for your case. Locate courts by county and case type.',
};

export default function FindYourCourtMI() {
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
            Michigan
          </li>
        </ol>
      </nav>

      <h1>Find your Michigan courthouse</h1>

      <p className="lead">
        Michigan has a unified court system with different divisions handling
        various case types. Find the right court for your needs.
      </p>

      <h2>Types of Michigan courts</h2>

      <h3>Trial Courts</h3>
      <ul>
        <li>
          <strong>Circuit Court:</strong> Handles felonies, civil cases over
          $25,000, family matters (divorce, custody), and appeals from lower
          courts.
        </li>
        <li>
          <strong>District Court:</strong> Handles misdemeanors, small claims,
          landlord-tenant disputes, and civil cases under $25,000.
        </li>
        <li>
          <strong>Probate Court:</strong> Handles wills, estates, guardianships,
          and mental health matters.
        </li>
        <li>
          <strong>Family Division:</strong> Part of Circuit Court, handling
          divorce, child custody, support, and juvenile matters.
        </li>
      </ul>

      <h2>Finding your Michigan court</h2>
      <p>Michigan courts are organized by county. To find your local court:</p>
      <ol>
        <li>Determine the type of case you have</li>
        <li>
          Identify the correct county based on where you live or where the
          dispute occurred
        </li>
        <li>Use the Michigan Courts directory to find contact information</li>
      </ol>

      <h2>Michigan court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.michigan.gov/courts"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michigan Courts
          </a>
        </li>
        <li>
          <a
            href="https://www.courts.michigan.gov/courts/trial-courts/district-court/directory/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michigan District Court Directory
          </a>
        </li>
        <li>
          <a
            href="https://michiganlegalhelp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michigan Legal Help
          </a>
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, start your guided interview.
        </p>
        <Link href="/mi/forms" className="btn btn-primary me-2">
          Browse all Michigan forms
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
