import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Your Minnesota Courthouse - Court Forms Online',
  description:
    'Find the right Minnesota courthouse for your case. Locate courts by county and case type.',
};

export default function FindYourCourtMN() {
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
            Minnesota
          </li>
        </ol>
      </nav>

      <h1>Find your Minnesota courthouse</h1>

      <p className="lead">
        Minnesota has a unified court system with courts in each of the
        state&apos;s 87 counties. Find the right court for your case.
      </p>

      <h2>Minnesota court structure</h2>

      <h3>District Courts</h3>
      <p>
        Minnesota&apos;s trial courts are called District Courts. All trial
        cases—civil, criminal, family, and juvenile—are handled by District
        Courts. Minnesota is divided into 10 judicial districts.
      </p>

      <h3>Divisions within District Court</h3>
      <ul>
        <li>
          <strong>Civil Division:</strong> Handles lawsuits, contract disputes,
          and property matters.
        </li>
        <li>
          <strong>Criminal Division:</strong> Handles criminal prosecutions.
        </li>
        <li>
          <strong>Family Division:</strong> Handles divorce, custody, child
          support, and domestic matters.
        </li>
        <li>
          <strong>Probate Division:</strong> Handles wills, estates, and
          guardianships.
        </li>
        <li>
          <strong>Juvenile Division:</strong> Handles cases involving minors.
        </li>
      </ul>

      <h2>Finding your Minnesota court</h2>
      <p>To find your local court:</p>
      <ol>
        <li>Identify the county where you live or where the matter occurred</li>
        <li>Use the Minnesota Judicial Branch directory to find your courthouse</li>
        <li>Check for specific divisions or locations for your case type</li>
      </ol>

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
            href="https://mncourts.gov/Find-Courts.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Minnesota Courts
          </a>
        </li>
        <li>
          <a
            href="https://www.mncourts.gov/Help-Topics/Self-Help-Centers.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minnesota Self-Help Centers
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
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, start your guided interview.
        </p>
        <Link href="/mn/forms" className="btn btn-primary me-2">
          Browse all Minnesota forms
        </Link>
        <Link href="/guides/find-your-court" className="btn btn-outline-secondary">
          Find courts in other jurisdictions
        </Link>
      </div>
    </div>
  );
}
