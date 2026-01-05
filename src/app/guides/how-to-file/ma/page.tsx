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
            <Link href="/guides">How to use court forms</Link>
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

      <h2>Not all forms are court forms</h2>
      <p>
        Some forms you complete through Court Forms Online may not be official
        court forms. These could include letters, informational documents or
        forms for other agencies. Check the specific instructions for your form.
      </p>

      <h2>Electronic filing in Massachusetts</h2>
      <p>
        Many Massachusetts courts accept electronic filing through the Trial
        Court&apos;s e-filing system,{' '}
        <Link href="https://www.mass.gov/info-details/learn-about-efiling-in-the-trial-court">
          Tyler File and Serve
        </Link>
        .
      </p>
      <p>Benefits of e-filing in Massachusetts:</p>
      <ul>
        <li>File 24/7 without visiting the courthouse</li>
        <li>Receive instant confirmation of filing</li>
        <li>Pay filing fees online</li>
        <li>Track your case status electronically</li>
      </ul>

      <p>To use e-filing, you will need:</p>
      <ul>
        <li>A Tyler File and Serve account (create one at the link above)</li>
        <li>Your completed court forms in PDF format</li>
        <li>A valid email address</li>
        <li>A valid phone number</li>
        <li>Payment method for filing fees (credit/debit card or e-check)</li>
      </ul>

      <p>
        If you do not have an email, phone number, and credit card, you can
        still file your forms in person at the courthouse.
      </p>

      <p>
        If you do not use it often, it can be hard to use the state's e-filing
        system. But it can still be the best option for your case to save you
        postage and from having to visit a courthouse.
      </p>

      <p>
        When completing forms through Court Forms Online, some forms offer
        direct e-filing integration. This can be easier to use when it is
        available.
      </p>

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
      </ul>

      <h2>Filing fees</h2>
      <p>
        In Massachusetts, a filing fee is only needed when you are starting a
        new court case. If you are filing an answer, motion, or other document
        in an existing court case, no fee is required. If you cannot afford to
        pay the fee, you can ask the court for permission to not pay it. The
        Affidavit of Indigency form can be completed through Court Forms Online.
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
        <li>
          <a
            href="https://www.mass.gov/court-filing-fees-payment-information"
            target="_blank"
            rel="noopener noreferrer"
          >
            Court filing fees and payment information (Mass.gov)
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
