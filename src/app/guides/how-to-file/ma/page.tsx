import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to File a Court Form in Massachusetts - Court Forms Online',
  description:
    'Learn how to file your completed court forms in Massachusetts, including e-filing options and courthouse locations.',
};

export default function HowToFileMA() {
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
            Massachusetts
          </li>
        </ol>
      </nav>

      <h1>How to file a court form in Massachusetts</h1>

      <p className="lead">
        Learn about filing options in Massachusetts courts, including electronic
        filing and in-person submission.
      </p>

      <h2>Electronic filing in Massachusetts</h2>
      <p>
        Many Massachusetts courts accept electronic filing through the Trial
        Court&apos;s e-filing system. When completing forms through Court Forms
        Online, some forms offer direct e-filing integration.
      </p>
      <p>Benefits of e-filing in Massachusetts:</p>
      <ul>
        <li>File 24/7 without visiting the courthouse</li>
        <li>Receive instant confirmation of filing</li>
        <li>Pay filing fees online</li>
        <li>Track your case status electronically</li>
      </ul>

      <h2>In-person filing</h2>
      <p>
        If e-filing isn&apos;t available for your form, you&apos;ll need to file
        in person at the appropriate courthouse.
      </p>
      <p>
        <Link href="/guides/find-your-court/ma">
          Find your Massachusetts courthouse
        </Link>
      </p>

      <h3>What to bring</h3>
      <ul>
        <li>Your completed, signed forms</li>
        <li>
          At least two copies of all documents (one for the court, one for
          yourself)
        </li>
        <li>Filing fee payment (check accepted methods for your court)</li>
        <li>Photo ID</li>
      </ul>

      <h2>Filing fees</h2>
      <p>
        Filing fees vary depending on the type of case and court. If you have a
        low income, you may qualify for a fee waiver. The Affidavit of Indigency
        form can be completed through Court Forms Online.
      </p>

      <h2>Massachusetts court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.mass.gov/topics/court-forms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Court Forms (mass.gov)
          </a>
        </li>
        <li>
          <a
            href="https://www.mass.gov/orgs/court-service-centers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Court Service Centers
          </a>
        </li>
        <li>
          <a
            href="https://www.mass.gov/orgs/massachusetts-court-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Court System
          </a>
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Browse Massachusetts forms</h3>
        <p>Find guided interviews for Massachusetts court forms.</p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse all Massachusetts forms
        </Link>
        <Link href="/guides/how-to-file" className="btn btn-outline-secondary">
          Back to how to file court forms
        </Link>
      </div>
    </div>
  );
}
