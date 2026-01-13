import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Your Missouri Courthouse - Court Forms Online',
  description:
    'Find the right Missouri courthouse for your case. Locate courts by circuit and case type.',
};

export default function FindYourCourtMO() {
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
            <Link href="/guides/find-your-court">Find your court</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Missouri
          </li>
        </ol>
      </nav>

      <h1>Find your Missouri courthouse</h1>

      <p className="lead">
        Missouri has a unified court system with courts organized into 46
        circuits across the state. Find the right court for your case.
      </p>

      <h2>Missouri court structure</h2>

      <h3>Supreme Court of Missouri</h3>
      <p>
        The Supreme Court is the highest court in Missouri and handles appeals
        from the Court of Appeals and select cases of statewide significance.
      </p>

      <h3>Missouri Court of Appeals</h3>
      <p>
        Missouri has a Court of Appeals divided into 3 districts that hear
        appeals from circuit courts. The districts cover different regions of
        the state.
      </p>

      <h3>Circuit Courts (Trial Courts)</h3>
      <p>
        Circuit Courts are Missouri&apos;s trial courts, organized into 46
        circuits. All civil and criminal cases begin in circuit court. Each
        circuit court may have multiple divisions depending on the county size.
      </p>

      <h3>Divisions within Circuit Court</h3>
      <ul>
        <li>
          <strong>Civil Division:</strong> Handles civil lawsuits, contract
          disputes, property matters, and small claims.
        </li>
        <li>
          <strong>Criminal Division:</strong> Handles criminal prosecutions and
          felony charges.
        </li>
        <li>
          <strong>Family Court:</strong> Handles divorce, custody, child
          support, domestic violence, and family matters. Family Court exists in
          most counties.
        </li>
        <li>
          <strong>Probate Division:</strong> Handles wills, estates, and
          guardianships.
        </li>
      </ul>

      <h2>Finding your Missouri court</h2>
      <p>To find your local court:</p>
      <ol>
        <li>Identify the county where you live or where the matter occurred</li>
        <li>Determine which circuit serves that county</li>
        <li>
          Identify the division within that circuit court that handles your type
          of case
        </li>
        <li>Find the courthouse address and contact information</li>
      </ol>

      <h2>Missouri court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.courts.mo.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Missouri Courts
          </a>
        </li>
        <li>
          <a
            href="https://www.courts.mo.gov/page.jsp?id=321"
            target="_blank"
            rel="noopener noreferrer"
          >
            Missouri Circuit Courts
          </a>
        </li>
        <li>
          <a
            href="https://www.lsmo.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Legal Services of Missouri
          </a>
        </li>
        <li>
          <a
            href="https://apps.molawhelp.org/list"
            target="_blank"
            rel="noopener noreferrer"
          >
            Missouri LawHelp
          </a>
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, start your guided interview.
        </p>
        <Link href="/mo/forms" className="btn btn-primary me-2">
          Browse all Missouri forms
        </Link>
        <Link
          href="/guides/find-your-court"
          className="btn btn-outline-secondary"
        >
          Find courts in other jurisdictions
        </Link>
      </div>
    </div>
  );
}
