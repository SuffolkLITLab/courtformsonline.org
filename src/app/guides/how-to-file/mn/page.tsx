import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to File a Court Form in Minnesota - Court Forms Online',
  description:
    'Learn how to file your completed court forms in Minnesota, including e-filing options and courthouse locations.',
};

export default function HowToFileMN() {
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
            Minnesota
          </li>
        </ol>
      </nav>

      <h1>How to file a court form in Minnesota</h1>

      <p className="lead">
        Learn about filing options in Minnesota courts, including electronic
        filing and in-person submission.
      </p>

      <h2>Electronic filing in Minnesota</h2>
      <p>
        Minnesota Judicial Branch offers eFS (electronic Filing System) for many
        case types. eFS is available for most district court case types.
      </p>
      <ul>
        <li>Create an account on the Minnesota eFS system</li>
        <li>Upload your completed documents</li>
        <li>Pay filing fees electronically</li>
        <li>Receive confirmation and track your filing</li>
      </ul>

      <h2>In-person filing</h2>
      <p>
        If e-filing isn&apos;t available for your case, you can file in person
        at your county courthouse.
      </p>
      <p>
        <Link href="/guides/find-your-court/mn">
          Find your Minnesota courthouse
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
        Filing fees vary by case type and court. If you cannot afford the filing
        fee, you may apply for a fee waiver using the IFP (In Forma Pauperis)
        application.
      </p>

      <h2>Minnesota court resources</h2>
      <ul>
        <li>
          <a
            href="https://mncourts.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minnesota Judicial Branch
          </a>
        </li>
        <li>
          <a
            href="https://mncourts.gov/getforms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minnesota Court Forms
          </a>
        </li>
        <li>
          <a
            href="https://www.lawhelpmn.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LawHelp Minnesota
          </a>
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Browse Minnesota forms</h3>
        <p>Find guided interviews for Minnesota court forms.</p>
        <Link href="/mn/forms" className="btn btn-primary me-2">
          Browse all Minnesota forms
        </Link>
        <Link href="/guides/how-to-file" className="btn btn-outline-secondary">
          Back to how to file court forms
        </Link>
      </div>
    </div>
  );
}
