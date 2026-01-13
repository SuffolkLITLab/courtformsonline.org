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
  triageToolUrl: string;
  description: string;
}

// Get available jurisdictions with their triage tool URLs
const jurisdictions: JurisdictionInfo[] = [
  {
    path: 'ma',
    name: 'Massachusetts',
    triageToolUrl: 'https://masslrf.org/en/triage/start',
    description:
      'Access the Massachusetts Legal Resource Finder to get connected with legal aid and resources.',
  },
  {
    path: 'mi',
    name: 'Michigan',
    triageToolUrl: 'https://michiganlegalhelp.org/guide-to-legal-help',
    description:
      'Use the Michigan Legal Help guide to find legal aid organizations and resources in your area.',
  },
  {
    path: 'me',
    name: 'Maine',
    triageToolUrl: 'https://www.ptla.org/contact-us',
    description:
      'Contact Pine Tree Legal Assistance to connect with legal aid services in Maine.',
  },
  {
    path: 'mn',
    name: 'Minnesota',
    triageToolUrl: 'https://www.lawhelpmn.org/',
    description:
      'Visit LawHelpMN to find legal aid organizations and resources in Minnesota.',
  },
  {
    path: 'vt',
    name: 'Vermont',
    triageToolUrl: 'https://www.vtlawhelp.org/',
    description: 'Access Vermont Law Help to find legal aid and resources.',
  },
  {
    path: 'mo',
    name: 'Missouri',
    triageToolUrl: 'https://apps.molawhelp.org/list',
    description:
      'Visit Missouri LawHelp to access legal aid programs and self-help resources.',
  },
];

export default function FindLegalHelp() {
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
            Find Legal Help
          </li>
        </ol>
      </nav>

      <h1>Find legal help</h1>

      <p className="lead">
        When completing court forms on your own isn&apos;t enough, professional
        legal help is available. Connect with lawyers, legal aid organizations,
        and other resources in your jurisdiction.
      </p>

      <h2>When you need legal help</h2>

      <p>
        Guided interviews are powerful tools, but they&apos;re designed for
        straightforward situations. You should seek professional legal help
        when:
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
        people who cannot afford a private attorney. They often handle:
      </p>
      <ul>
        <li>Family law matters (divorce, custody, abuse)</li>
        <li>Housing and eviction disputes</li>
        <li>Consumer and debt issues</li>
        <li>Benefits and public assistance</li>
        <li>Immigration matters</li>
      </ul>
      <p>
        For most legal aid organizations, the income limit is a percentage of
        the federal poverty level. Be prepared to provide financial information
        when you contact them. For example, in Massachusetts most people can get
        help from legal aid if they earn less than 200% of the federal poverty
        level.
      </p>

      <h3>Court self-help centers</h3>
      <p>
        Many courts have self-help or legal resource centers that provide free
        information about court procedures, forms, and basic legal information
        to people representing themselves.
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
        {jurisdictions.map((j) => (
          <div key={j.path} className="col-md-6 lg:col-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">{j.name}</h3>
                <p className="card-text text-muted">{j.description}</p>
                <a
                  href={j.triageToolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Find help in {j.name}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Getting help from a legal aid organization</h2>

      <p>If you contact a legal aid organization, be prepared to:</p>

      <ul>
        <li>
          <strong>Explain your situation:</strong> Briefly describe your legal
          problem and what outcome you&apos;re seeking
        </li>
        <li>
          <strong>Provide financial information:</strong> Legal aid serves
          low-income individuals; they may ask about your income to determine
          eligibility
        </li>
        <li>
          <strong>Share documentation:</strong> Have any relevant documents
          ready (lease agreements, court papers, identification, etc.)
        </li>
        <li>
          <strong>Ask about their services:</strong> Different organizations
          handle different types of cases—ask if they can help with yours
        </li>
      </ul>

      <h2>Court self-help resources</h2>

      <p>
        Even if you can&apos;t qualify for legal aid, court self-help centers
        often provide:
      </p>

      <ul>
        <li>Information about how the court system works</li>
        <li>Explanations of court procedures and deadlines</li>
        <li>Tips on completing court forms</li>
        <li>Referrals to legal aid and other resources</li>
      </ul>

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
