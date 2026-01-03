import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to File a Court Form in Michigan - Court Forms Online',
  description:
    'Learn how to file your completed court forms in Michigan, including e-filing options and courthouse locations.',
};

export default function HowToFileMI() {
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
            Michigan
          </li>
        </ol>
      </nav>

      <h1>How to file a court form in Michigan</h1>

      <p className="lead">
        Learn about filing options in Michigan courts, including electronic
        filing and in-person submission.
      </p>

      <h2>Electronic filing in Michigan</h2>
      <p>
        Michigan courts use the MiFILE system for electronic filing. Many case
        types can be filed electronically, though availability varies by court.
      </p>
      <p>
        To use MiFILE, you&apos;ll need to create an account and follow the
        court&apos;s e-filing procedures.
      </p>

      <h2>In-person filing</h2>
      <p>
        If e-filing isn&apos;t available for your case, you can file in person
        at your local courthouse.
      </p>
      <p>
        <Link href="/guides/find-your-court/mi">
          Find your Michigan courthouse
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
        Filing fees vary by court and case type. If you cannot afford the filing
        fee, you may request a fee waiver by filing an Affidavit and Order for
        Fee Waiver.
      </p>

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
            href="https://mifile.courts.michigan.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MiFILE e-filing system
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
        <h3>Browse Michigan forms</h3>
        <p>Find guided interviews for Michigan court forms.</p>
        <Link href="/mi/forms" className="btn btn-primary me-2">
          Browse all Michigan forms
        </Link>
        <Link href="/guides/how-to-file" className="btn btn-outline-secondary">
          Back to how to file court forms
        </Link>
      </div>
    </div>
  );
}
