import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Legal Help in Minnesota - Court Forms Online',
  description:
    'Connect with legal aid organizations, court resources, and lawyers in Minnesota when you need professional legal assistance.',
};

export default function FindLegalHelpMN() {
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
            Minnesota
          </li>
        </ol>
      </nav>

      <h1>Find legal help in Minnesota</h1>

      <p className="lead">
        Minnesota has legal aid organizations and court resources to help you
        when you need professional legal assistance.
      </p>

      <h2>Legal aid organizations</h2>

      <h3>LawHelp Minnesota</h3>
      <p>
        LawHelp Minnesota connects you with legal information, self-help tools,
        and legal aid organizations serving your area.
      </p>
      <ul>
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

      <h3>Minnesota Legal Aid</h3>
      <p>
        Provides free legal services to low-income Minnesotans in various areas
        of law including housing, family matters, and more.
      </p>

      <h2>Court resources</h2>

      <h3>Minnesota Courts Self-Help Centers</h3>
      <p>
        Minnesota courts provide self-help centers and resources for people
        representing themselves, including information about forms, procedures,
        and filing requirements.
      </p>
      <ul>
        <li>
          <a
            href="https://www.mncourts.gov/Help-Topics/Self-Help-Centers.aspx"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minnesota Courts Self-Help Centers
          </a>
        </li>
      </ul>

      <h2>Information and referral services</h2>

      <h3>Minnesota State Bar Association Lawyer Referral Service</h3>
      <p>
        The Minnesota State Bar can help you find a private attorney for your
        legal matter.
      </p>
      <ul>
        <li>
          <a
            href="https://www.mnbar.org/public-services/find-legal-help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Minnesota State Bar - Find Legal Help
          </a>
        </li>
      </ul>

      <h2>Specific issues</h2>

      <h3>Domestic violence and abuse</h3>
      <p>
        If you&apos;re experiencing domestic violence, call 911 for immediate
        help. Minnesota also has specific resources and legal aid for domestic
        violence survivors.
      </p>

      <h3>Housing and eviction</h3>
      <p>
        Minnesota legal aid organizations and court self-help centers can assist
        with housing disputes and eviction defense.
      </p>

      <h3>Family matters</h3>
      <p>
        For divorce, custody, and family law issues, LawHelp Minnesota can help
        you find appropriate legal aid resources in your county.
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Court Forms Online provides guided interviews for Minnesota court
          forms.
        </p>
        <Link href="/mn/forms" className="btn btn-primary me-2">
          Browse all Minnesota forms
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
