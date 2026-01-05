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
            <Link href="/guides">How to use court forms</Link>
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

      <h2>Not all forms are court forms</h2>
      <p>
        Some forms you complete through Court Forms Online may not be official
        court forms. These could include letters, informational documents or
        forms for other agencies. Check the specific instructions for your form.
      </p>

      <h2>Electronic filing in Maine</h2>
      <p>
        Many Maine courts accept electronic filing through the state&apos;s
        e-filing system,{' '}
        <a href="https://www.courts.maine.gov/ecourts/efile.html">eFileMaine</a>{' '}
        (Tyler File &amp; Serve).
      </p>
      <p>Benefits of e-filing in Maine:</p>
      <ul>
        <li>File 24/7 without visiting the courthouse</li>
        <li>Receive confirmation of filing electronically</li>
        <li>Pay filing fees online</li>
        <li>Track your case status electronically</li>
      </ul>

      <p>To use e-filing, you will need:</p>
      <ul>
        <li>An account with eFileMaine (create one at the link above)</li>
        <li>Your completed court forms in PDF format</li>
        <li>A valid email address</li>
        <li>A valid phone number</li>
        <li>Payment method for filing fees (credit/debit card or e-check)</li>
      </ul>

      <p>
        When completing forms through Court Forms Online, some forms offer
        direct e-filing integration. This can be easier to use when it is
        available.
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
      </ul>

      <h2>Filing fees</h2>
      <p>
        In most states, a filing fee is only needed when you are starting a new
        court case. If you are filing an answer, motion, or other document in an
        existing court case, no fee is required. If you cannot afford to pay the
        fee, you can ask the court for permission to not pay it. Filing fees in
        Maine vary by case type, and you may request a fee waiver.
      </p>

      <h2>Maine court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.courts.maine.gov/forms/fees.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Court filing fees (Maine Judicial Branch)
          </a>
        </li>
        <li>
          <a
            href="https://www.courts.maine.gov/ecourts/efile.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            eFileMaine (Tyler File &amp; Serve)
          </a>
        </li>
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
            href="https://www.courts.maine.gov/forms/index.html"
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
