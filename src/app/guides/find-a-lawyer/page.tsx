import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';
import { pathToServerConfig } from '../../../config/formSources.config';

export const metadata: Metadata = {
  title: 'Find Legal Help - Court Forms Online',
  description:
    'Get connected with lawyers, legal aid organizations, and other legal resources in your jurisdiction when you need professional help.',
};

interface JurisdictionInfo {
  path: string;
  name: string;
  lawyerFindUrl: string;
  description: string;
}

// Jurisdiction information including their lawyer finder/triage tool URLs
const jurisdictions: JurisdictionInfo[] = [
  {
    path: 'ma',
    name: 'Massachusetts',
    lawyerFindUrl: 'https://masslrf.org/en/triage/start',
    description:
      'Access the Massachusetts Legal Resource Finder to find legal aid, legal services, and lawyer referrals.',
  },
  {
    path: 'mi',
    name: 'Michigan',
    lawyerFindUrl: 'https://michiganlegalhelp.org/guide-to-legal-help',
    description:
      'Use the Michigan Legal Help guide to find legal aid organizations and resources in your area.',
  },
  {
    path: 'me',
    name: 'Maine',
    lawyerFindUrl: 'https://www.ptla.org/contact-us',
    description:
      'Contact Pine Tree Legal Assistance to connect with legal aid services in Maine.',
  },
  {
    path: 'mn',
    name: 'Minnesota',
    lawyerFindUrl: 'https://www.lawhelpmn.org/',
    description:
      'Visit LawHelpMN to find legal aid organizations and resources in Minnesota.',
  },
  {
    path: 'vt',
    name: 'Vermont',
    lawyerFindUrl: 'https://www.vtlawhelp.org/',
    description:
      'Access Vermont Law Help to find legal aid and lawyer referral services.',
  },
];

export default function FindALawyer() {
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
          <li className="breadcrumb-item active" aria-current="page">
            Find legal help
          </li>
        </ol>
      </nav>

      <h1>Find legal help</h1>

      <p className="lead">
        When guided interviews aren&apos;t enough, connect with lawyers, legal
        aid organizations, and other resources in your jurisdiction.
      </p>

      <h2>When you need legal help</h2>

      <p>
        Guided interviews work best for straightforward situations. Seek
        professional legal help when:
      </p>

      <ul>
        <li>
          <strong>Your case is complex:</strong> Multiple legal issues, unusual
          circumstances, or situations you don&apos;t fully understand
        </li>
        <li>
          <strong>The other party has a lawyer:</strong> If you&apos;re facing
          an opponent represented by an attorney, you may need professional help
          to protect your rights
        </li>
        <li>
          <strong>Significant stakes are involved:</strong> Your home, custody
          of children, substantial money, or your freedom are at risk
        </li>
        <li>
          <strong>You need advice:</strong> You&apos;re unsure about the right
          course of action, which court to use, or what forms you need
        </li>
        <li>
          <strong>You&apos;re facing an emergency:</strong> Domestic violence,
          threats, or other immediate dangers require urgent legal action
        </li>
        <li>
          <strong>You need ongoing representation:</strong> Multiple filings,
          hearings, or ongoing court involvement
        </li>
      </ul>

      <h2>Types of legal help available</h2>

      <h3>Legal aid organizations</h3>
      <p>
        Legal aid organizations provide free or low-cost legal services to
        people who cannot afford a private attorney. They often handle family
        law matters (divorce, custody, abuse), housing and eviction disputes,
        consumer and debt issues, benefits and public assistance, and
        immigration matters.
      </p>
      <p>
        To get help from legal aid, you usually cannot earn more than a certain
        income limit. The most common limit is 125-200% of the federal poverty
        level. Be prepared to explain your situation, provide financial
        information, share relevant documents, and ask about their specific
        services.
      </p>

      <h3>Court self-help centers</h3>
      <p>
        Many courts have self-help centers that provide free information about
        court procedures, forms, deadlines, and basic legal information to
        people representing themselves. They often offer tips on completing
        forms and referrals to legal aid and other resources.
      </p>

      <h3>Private attorneys</h3>
      <p>
        Private lawyers can provide comprehensive representation and legal
        advice for any legal matter. Some offer free initial consultations to
        discuss your case.
      </p>

      <h3>Bar associations and lawyer referral services</h3>
      <p>
        Most state bar associations provide lawyer referral services to help you
        find an attorney in your area with experience in your type of case.
      </p>
      <p>
        When you use a bar referral service, you will be assigned to the "next"
        attorney who can help with your kind of case. Most states have a small
        fee for the first hour or half hour that you meet with them. You will
        pay a regular fee if you decide to hire the attorney to represent you.
      </p>

      <h2>Find legal help in your jurisdiction</h2>

      <p>
        Select your location to access legal aid resources, legal help triage
        tools, and other support:
      </p>

      <div className="row">
        {jurisdictions.map((jurisdiction) => (
          <div key={jurisdiction.path} className="col-md-6 lg:col-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">{jurisdiction.name}</h3>
                <p className="card-text text-muted">
                  {jurisdiction.description}
                </p>
                <a
                  href={jurisdiction.lawyerFindUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Find legal help in {jurisdiction.name}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>For emergencies</h2>

      <p>
        <Link href="/guides/is-it-safe">
          If your physical safety is at risk, call 911 immediately
        </Link>
        . After ensuring your safety, you can work with law enforcement, victim
        advocates, and legal aid to pursue legal protections and longer-term
        solutions.
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Still want to try a guided interview?</h3>
        <p>
          Guided interviews are a great first step for straightforward legal
          matters, and you can combine them with legal help.
        </p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse all forms
        </Link>
        <Link href="/guides/is-it-safe" className="btn btn-outline-secondary">
          Learn about safety and privacy
        </Link>
      </div>
    </div>
  );
}
