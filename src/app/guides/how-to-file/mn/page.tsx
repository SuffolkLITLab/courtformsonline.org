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
            <Link href="/guides">How to use court forms</Link>
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

      <h2>Not all forms are court forms</h2>
      <p>
        Some forms you complete through Court Forms Online may not be official
        court forms. These could include letters, informational documents or
        forms for other agencies. Check the specific instructions for your form.
      </p>

      <h2>Electronic filing in Minnesota</h2>
      <p>
        Many Minnesota courts accept electronic filing through the state&apos;s
        e-filing system,{' '}
        <a href="https://mncourts.gov/file-a-case/file-in-a-district-trial-court">
          Tyler File &amp; Serve
        </a>{' '}
        (often called eFile and eServe).
      </p>
      <p>Benefits of e-filing in Minnesota:</p>
      <ul>
        <li>File 24/7 without visiting the courthouse</li>
        <li>Receive confirmation of filing electronically</li>
        <li>Pay filing fees online</li>
        <li>Track your case status electronically</li>
      </ul>

      <p>To use e-filing, you will need:</p>
      <ul>
        <li>
          An account with the state e-filing system (create one at the link
          above)
        </li>
        <li>Your completed court forms in PDF format</li>
        <li>A valid email address</li>
        <li>A valid phone number</li>
        <li>Payment method for filing fees (credit/debit card or e-check)</li>
      </ul>

      <p>
        When completing forms through Court Forms Online, some forms offer
        direct e-filing integration. This can be easier to use when available.
      </p>

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
      </ul>

      <h2>Filing fees</h2>
      <p>
        In most states, a filing fee is only needed when you are starting a new
        court case. If you are filing an answer, motion, or other document in an
        existing court case, no fee is required. If you cannot afford to pay the
        fee, you can ask the court for permission to not pay it. Filing fees in
        Minnesota vary by case type and court; you may apply for a fee waiver
        using the IFP (In Forma Pauperis) application.
      </p>

      <h2>Minnesota court resources</h2>
      <ul>
        <li>
          <a
            href="https://mncourts.gov/file-a-case/file-in-a-district-trial-court"
            target="_blank"
            rel="noopener noreferrer"
          >
            eFile / eServe (Tyler File &amp; Serve)
          </a>
        </li>
        <li>
          <a
            href="https://mncourts.gov/help-topics/court-fees/district-court-fees"
            target="_blank"
            rel="noopener noreferrer"
          >
            District court fees (Minnesota Judicial Branch)
          </a>
        </li>
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
