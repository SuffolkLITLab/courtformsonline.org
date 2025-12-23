import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Legal Help in Michigan - Court Forms Online',
  description:
    'Connect with legal aid organizations, court resources, and lawyers in Michigan when you need professional legal assistance.',
};

export default function FindLegalHelpMI() {
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
            Michigan
          </li>
        </ol>
      </nav>

      <h1>Find legal help in Michigan</h1>

      <p className="lead">
        Michigan has legal aid organizations and court resources to help you
        when you need professional assistance.
      </p>

      <h2>Legal aid organizations</h2>

      <h3>Michigan Legal Help</h3>
      <p>
        Michigan Legal Help is a comprehensive guide to legal information and
        resources for low-income Michigan residents. It helps you find local
        legal aid organizations, court information, and self-help resources.
      </p>
      <ul>
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

      <h3>Michigan Statewide Legal Hotline</h3>
      <p>
        For information about legal aid services in Michigan, you can also call
        the statewide legal hotline for referrals.
      </p>

      <h2>Court resources</h2>

      <h3>Michigan Courts Self-Help Center</h3>
      <p>
        Michigan courts provide resources for people representing themselves,
        including information about forms, procedures, and legal rights.
      </p>
      <ul>
        <li>
          <a
            href="https://www.courts.michigan.gov/self-help/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Michigan Courts Self-Help Center
          </a>
        </li>
      </ul>

      <h2>Information and referral services</h2>

      <h3>State Bar of Michigan Lawyer Referral Service</h3>
      <p>
        The State Bar of Michigan can help you find a private attorney for your
        legal matter.
      </p>
      <ul>
        <li>
          <a
            href="https://www.michbar.org/public-services/find-legal-help"
            target="_blank"
            rel="noopener noreferrer"
          >
            State Bar of Michigan - Find Legal Help
          </a>
        </li>
      </ul>

      <h2>Specific issues</h2>

      <h3>Domestic violence and abuse</h3>
      <p>
        If you&apos;re experiencing domestic violence, call 911 for immediate
        help. Michigan also has specific resources for domestic violence
        survivors.
      </p>

      <h3>Housing and eviction</h3>
      <p>
        Michigan Legal Help can help you find assistance with housing issues and
        eviction defense through their issue-based search.
      </p>

      <h3>Family matters</h3>
      <p>
        For divorce, custody, and family law issues, Michigan Legal Help can
        connect you with legal aid organizations serving your area.
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Court Forms Online provides guided interviews for many Michigan court
          forms.
        </p>
        <Link href="/mi/forms" className="btn btn-primary me-2">
          Browse all Michigan forms
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
