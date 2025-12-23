import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Legal Help in Massachusetts - Court Forms Online',
  description:
    'Connect with legal aid organizations, court resources, and lawyers in Massachusetts when you need professional legal assistance.',
};

export default function FindLegalHelpMA() {
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
            Massachusetts
          </li>
        </ol>
      </nav>

      <h1>Find legal help in Massachusetts</h1>

      <p className="lead">
        Massachusetts offers many legal resources and organizations to help you
        with your legal matters.
      </p>

      <h2>Legal aid organizations</h2>

      <h3>Greater Boston Legal Services</h3>
      <p>
        Provides free legal assistance to low-income residents in the Boston
        area.
      </p>
      <ul>
        <li>
          <a
            href="https://www.gbls.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Greater Boston Legal Services
          </a>
        </li>
      </ul>

      <h3>Northeast Legal Aid</h3>
      <p>
        Serves low-income individuals in northeastern Massachusetts with free
        legal services.
      </p>
      <ul>
        <li>
          <a
            href="https://www.northeastlegalaid.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Northeast Legal Aid
          </a>
        </li>
      </ul>

      <h3>Community Legal Aid</h3>
      <p>
        Provides legal assistance to low-income residents of central
        Massachusetts.
      </p>
      <ul>
        <li>
          <a
            href="https://communitylegal.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Community Legal Aid
          </a>
        </li>
      </ul>

      <h3>Massachusetts Law Reform Institute</h3>
      <p>
        Advocates for low-income individuals and families through systemic legal
        reform.
      </p>
      <ul>
        <li>
          <a
            href="https://www.mlri.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Law Reform Institute
          </a>
        </li>
      </ul>

      <h2>Court resources</h2>

      <h3>Massachusetts Court Service Centers</h3>
      <p>
        The Massachusetts Trial Court operates court service centers in many
        locations. These centers provide free assistance to people representing
        themselves, including help with forms, court procedures, and information
        about legal resources.
      </p>
      <ul>
        <li>
          <a
            href="https://www.mass.gov/orgs/court-service-centers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find a Court Service Center
          </a>
        </li>
      </ul>

      <h2>Information and referral services</h2>

      <h3>Massachusetts Legal Resource Finder</h3>
      <p>
        A comprehensive resource to help you find legal information, self-help
        tools, and referrals to legal aid and private attorneys.
      </p>
      <ul>
        <li>
          <a
            href="https://masslrf.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Legal Resource Finder
          </a>
        </li>
      </ul>

      <h3>Massachusetts Bar Association Lawyer Referral Service</h3>
      <p>
        The Massachusetts Bar Association can help you find a private attorney
        for your legal matter.
      </p>
      <ul>
        <li>
          <a
            href="https://www.massbar.org/public-services/find-legal-help/lawyer-referral-service"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lawyer Referral Service
          </a>
        </li>
      </ul>

      <h2>Specific issues</h2>

      <h3>Domestic violence and abuse</h3>
      <p>
        If you&apos;re experiencing domestic violence, call 911 for immediate
        help. For support and legal assistance:
      </p>
      <ul>
        <li>
          <a
            href="https://www.mass.gov/service-details/domestic-violence-resources"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Domestic Violence Resources
          </a>
        </li>
      </ul>

      <h3>Housing and eviction</h3>
      <p>
        If you&apos;re facing an eviction or housing issue, legal aid can often
        help. Contact one of the legal aid organizations listed above or reach
        out to your local court service center.
      </p>

      <h3>Family matters</h3>
      <p>
        For divorce, custody, and family law issues, many legal aid
        organizations provide free or low-cost services to qualifying clients.
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Court Forms Online provides guided interviews for many Massachusetts
          court forms. Use them in combination with legal help when needed.
        </p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse all Massachusetts forms
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
