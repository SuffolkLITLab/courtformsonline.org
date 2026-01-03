import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to File a Court Form in Maine - Court Forms Online',
  description:
    'Learn how to file your completed court forms in Maine, including e-filing options and courthouse locations.',
};

export default function HowToFileME() {
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
            <Link href="/guides/how-to-file">How to file</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Maine
          </li>
        </ol>
      </nav>

      <h1>How to file a court form in Maine</h1>

      <p className="lead">
        Learn about filing options in Maine courts, including electronic filing
        and in-person submission.
      </p>

      <h2>Electronic filing in Maine</h2>
      <p>
        Maine courts are expanding electronic filing options. Check with your
        specific court to see if e-filing is available for your case type.
      </p>

      <h2>In-person filing</h2>
      <p>
        You can file documents in person at the appropriate Maine courthouse.
      </p>
      <p>
        <Link href="/guides/find-your-court/me">
          Find your Maine courthouse
        </Link>
      </p>

      <h3>What to bring</h3>
      <ul>
        <li>Your completed, signed forms</li>
        <li>Copies for yourself and any other parties</li>
        <li>Filing fee payment</li>
        <li>Photo ID</li>
      </ul>

      <h2>Filing fees</h2>
      <p>
        Filing fees vary by case type. If you cannot afford the filing fee, you
        may request a fee waiver.
      </p>

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
            href="https://www.courts.maine.gov/maine_courts/forms/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maine Court Forms
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
        <h3>Browse Maine forms</h3>
        <p>Find guided interviews for Maine court forms.</p>
        <Link href="/me/forms" className="btn btn-primary me-2">
          Browse all Maine forms
        </Link>
        <Link href="/guides/how-to-file" className="btn btn-outline-secondary">
          Back to how to file court forms
        </Link>
      </div>
    </div>
  );
}
