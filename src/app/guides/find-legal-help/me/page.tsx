import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Legal Help in Maine - Court Forms Online',
  description:
    'Connect with legal aid organizations, court resources, and lawyers in Maine when you need professional legal assistance.',
};

export default function FindLegalHelpME() {
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
            <Link href="/guides/find-legal-help">Find Legal Help</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Maine
          </li>
        </ol>
      </nav>

      <h1>Find legal help in Maine</h1>

      <p className="lead">
        Maine offers legal aid and court resources to help low-income residents
        and those representing themselves.
      </p>

      <h2>Legal aid organizations</h2>

      <h3>Pine Tree Legal Assistance</h3>
      <p>
        Pine Tree Legal Assistance provides free legal services to eligible
        low-income Maine residents in various areas of law.
      </p>
      <ul>
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

      <h2>Court resources</h2>

      <h3>Maine Judicial Branch - Self-Help Resources</h3>
      <p>
        The Maine Judicial Branch provides information and resources for people
        representing themselves in court, including information about forms,
        procedures, and legal concepts.
      </p>
      <ul>
        <li>
          <a
            href="https://www.courts.maine.gov/self-help/self-help-resources"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maine Courts Self-Help Resources
          </a>
        </li>
      </ul>

      <h2>Information and referral services</h2>

      <h3>Maine State Bar Association Lawyer Referral Service</h3>
      <p>
        The Maine State Bar can help you find a private attorney for your legal
        matter.
      </p>
      <ul>
        <li>
          <a
            href="https://www.mainebar.org/public-services/find-legal-help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Maine State Bar - Find Legal Help
          </a>
        </li>
      </ul>

      <h2>Specific issues</h2>

      <h3>Domestic violence and abuse</h3>
      <p>
        If you&apos;re experiencing domestic violence, call 911 for immediate
        help. Pine Tree Legal Assistance also provides legal help for abuse and
        protection order cases.
      </p>

      <h3>Housing and eviction</h3>
      <p>
        Pine Tree Legal Assistance can help with housing and eviction issues in
        Maine. Contact them through their website or call their office.
      </p>

      <h3>Family matters</h3>
      <p>
        For divorce, custody, and family law issues, Pine Tree Legal Assistance
        may be able to help if you meet their eligibility requirements.
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Court Forms Online provides guided interviews for Maine court forms.
        </p>
        <Link href="/me/forms" className="btn btn-primary me-2">
          Browse all Maine forms
        </Link>
        <Link
          href="/guides/find-legal-help"
          className="btn btn-outline-secondary"
        >
          Find legal help in other jurisdictions
        </Link>
      </div>
    </div>
  );
}
