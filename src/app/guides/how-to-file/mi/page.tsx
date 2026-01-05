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
            <Link href="/guides">How to use court forms</Link>
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

      <h2>Not all forms are court forms</h2>
      <p>
        Some forms you complete through Court Forms Online may not be official
        court forms. These could include letters, informational documents or
        forms for other agencies. Check the specific instructions for your form.
      </p>

      <h2>Electronic filing in Michigan</h2>
      <p>
        Many Michigan courts accept electronic filing through the MiFILE system
        (
        <a href="https://mifile.courts.michigan.gov/login?ReturnUrl=%2Fcases&TimeOut=False">
          MiFILE login
        </a>
        ).
      </p>
      <p>Benefits of e-filing in Michigan:</p>
      <ul>
        <li>File 24/7 without visiting the courthouse</li>
        <li>Receive confirmation of filing electronically</li>
        <li>Pay filing fees online</li>
        <li>Track your case status electronically</li>
      </ul>

      <p>To use e-filing, you will need:</p>
      <ul>
        <li>A MiFILE account (create one at the link above)</li>
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
      </ul>

      <h2>Filing fees</h2>
      <p>
        In most states, a filing fee is only needed when you are starting a new
        court case. If you are filing an answer, motion, or other document in an
        existing court case, no fee is required. If you cannot afford to pay the
        fee, you can ask the court for permission to not pay it. Filing fees
        vary by court and case type in Michigan, and you may request a fee
        waiver by filing an Affidavit and Order for Fee Waiver.
      </p>

      <h2>Michigan court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.courts.michigan.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michigan Courts
          </a>
        </li>
        <li>
          <a
            href="https://mifile.courts.michigan.gov/login?ReturnUrl=%2Fcases&TimeOut=False"
            target="_blank"
            rel="noopener noreferrer"
          >
            MiFILE e-filing system
          </a>
        </li>
        <li>
          <a
            href="https://www.courts.michigan.gov/publications/fines,-fees,-costs,-and-rates/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michigan fines, fees, costs, and rates
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
