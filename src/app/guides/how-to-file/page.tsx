import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';
import { pathToServerConfig } from '../../../config/formSources.config';

export const metadata: Metadata = {
  title: 'How to File a Court Form - Court Forms Online',
  description:
    'Learn the different ways to submit your completed court forms, including e-filing, in-person filing, and mailing.',
};

// Get available jurisdictions for localized links
const jurisdictions = Object.entries(pathToServerConfig).map(
  ([path, config]) => ({
    path,
    name: (config as { name: string }).name,
  })
);

export default function HowToFile() {
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
          <li className="breadcrumb-item active" aria-current="page">
            How to file
          </li>
        </ol>
      </nav>

      <h1>How to file a court form</h1>

      <p className="lead">
        After completing your guided interview, you&apos;ll need to submit your
        forms to the court. Here are the different ways to file.
      </p>

      <h2>Filing options</h2>

      <h3>Electronic filing (e-filing)</h3>
      <p>
        Some forms on Court Forms Online can be submitted directly to the court
        electronically. When e-filing is available:
      </p>
      <ul>
        <li>
          You&apos;ll see an option to e-file at the end of your interview
        </li>
        <li>Your forms are delivered instantly to the court</li>
        <li>You&apos;ll receive confirmation that your filing was accepted</li>
        <li>Filing fees can usually be paid online</li>
      </ul>
      <p>
        E-filing is convenient because you don&apos;t need to travel to the
        courthouse, and you can file outside of business hours.
      </p>

      <h3>In-person filing</h3>
      <p>To file your forms in person:</p>
      <ol>
        <li>
          <strong>Print your completed forms:</strong> Make sure all pages
          printed correctly and are legible.
        </li>
        <li>
          <strong>Make copies:</strong> Bring at least one extra copy for
          yourself and one for each other party.
        </li>
        <li>
          <strong>Bring your filing fee:</strong> Check what payment methods the
          court accepts (check, money order, credit card).
        </li>
        <li>
          <strong>Go to the clerk&apos;s office:</strong>{' '}
          <Link href="/guides/find-your-court">Find your courthouse</Link> and
          locate the filing window.
        </li>
        <li>
          <strong>Submit your forms:</strong> The clerk will stamp your copies
          as &quot;filed&quot; and return one to you.
        </li>
      </ol>

      <h3>Filing by mail</h3>
      <p>Many courts accept filings by mail. If mailing your forms:</p>
      <ul>
        <li>
          Include a self-addressed, stamped envelope for your filed copies
        </li>
        <li>Include your filing fee as a check or money order</li>
        <li>Consider using certified mail with return receipt</li>
        <li>Allow extra time for mail delivery and processing</li>
      </ul>

      <h2>After you file</h2>
      <p>Once your forms are filed:</p>
      <ul>
        <li>Keep your stamped copies in a safe place</li>
        <li>Note any hearing dates you receive</li>
        <li>
          You may need to &quot;serve&quot; (deliver) copies to other parties
        </li>
        <li>Watch for mail from the court about next steps</li>
      </ul>

      <h2>Jurisdiction-specific filing information</h2>
      <p>
        Filing procedures vary by state. Select your location for specific
        information:
      </p>
      <ul>
        {jurisdictions.map((j) => (
          <li key={j.path}>
            <Link href={`/guides/how-to-file/${j.path}`}>{j.name}</Link>
          </li>
        ))}
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Need more help?</h3>
        <p>Make sure your forms are ready before filing.</p>
        <Link
          href="/guides/prevent-rejected-forms"
          className="btn btn-outline-primary me-2"
        >
          How to prevent rejected forms
        </Link>
        <Link href="/guides" className="btn btn-outline-secondary">
          Back to how to use court forms
        </Link>
      </div>
    </div>
  );
}
