import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Find Your Massachusetts Courthouse - Court Forms Online',
  description:
    'Find the right Massachusetts courthouse for your case. Use our court locator tool or browse by county and case type.',
};

export default function FindYourCourtMA() {
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
            Massachusetts
          </li>
        </ol>
      </nav>

      <h1>Find your Massachusetts courthouse</h1>

      <p className="lead">
        Massachusetts has different types of courts, each handling specific case
        types. Use our court locator to find the right one.
      </p>
      <p>
        Often you can choose between a District or Superior Court (general
        purpose court) and a specialty court (like Probate & Family Court or
        Housing Court) depending on your case type and the amount involved.
        Every city and town in Massachusetts is served by a both a
        general-purpose and specialty court, but you may have to travel to reach
        certain specialty courts.
      </p>

      <div className="card mb-4 border-primary">
        <div className="card-body">
          <h2 className="h4 card-title">Massachusetts Court Locator</h2>
          <p className="card-text">
            Use our guided interview to find the right Massachusetts court for
            your case. Answer a few questions about your location and case type
            to get directed to the appropriate courthouse.
          </p>
          <Link
            href="/ma/forms/massachusetts-court-locator"
            className="btn btn-primary"
          >
            Find my court
          </Link>
        </div>
      </div>

      <h2>Types of Massachusetts courts</h2>

      <h3>Trial Court Departments</h3>
      <ul>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/lists/district-court-administrative-office"
              target="_blank"
              rel="noopener noreferrer"
            >
              District Court
            </a>
            :
          </strong>{' '}
          Handles small claims, minor criminal cases, civil cases under $50,000,
          restraining orders, and more. For many, the District court is likely
          to be your "neighborhood" court, but with a judge who handles many
          different kinds of cases.
        </li>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/lists/contact-the-boston-municipal-court-administrative-office"
              target="_blank"
              rel="noopener noreferrer"
            >
              Boston Municipal Court
            </a>
            :
          </strong>{' '}
          Similar to District Court, serving the City of Boston, with the same
          dollar limit.
        </li>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/lists/contact-the-superior-court-administrative-office"
              target="_blank"
              rel="noopener noreferrer"
            >
              Superior Court
            </a>
            :
          </strong>{' '}
          Handles more serious criminal cases and civil cases over $25,000.
        </li>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/lists/housing-court-administrative-office"
              target="_blank"
              rel="noopener noreferrer"
            >
              Housing Court
            </a>
            :
          </strong>{' '}
          Specially trained judges in this court handle evictions, housing code
          violations, and other housing disputes. Housing Court can also hear
          small claims and other civil matters related to housing.
        </li>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/info-details/probate-and-family-court-contacts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Probate and Family Court
            </a>
            :
          </strong>{' '}
          Handles divorce, adoptions, child custody, guardianship, wills, and
          estates, restraining orders, and other family matters.
        </li>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/lists/juvenile-court-administrative-office"
              target="_blank"
              rel="noopener noreferrer"
            >
              Juvenile Court
            </a>
            :
          </strong>{' '}
          Handles cases involving children, including delinquency and child
          welfare. Can hear some family cases involving children as well.
        </li>
        <li>
          <strong>
            <a
              href="https://www.mass.gov/lists/land-court-contacts"
              target="_blank"
              rel="noopener noreferrer"
            >
              Land Court
            </a>
            :
          </strong>{' '}
          Handles disputes about real estate titles and property rights. There
          is only one Land Court in Massachusetts, located in Boston.
        </li>
      </ul>

      <h2>Massachusetts Court Service Centers</h2>
      <p>
        Massachusetts Court Service Centers provide free help to people
        representing themselves. Court Service Center staff can:
      </p>
      <ul>
        <li>Help you understand court forms</li>
        <li>Answer questions about court procedures</li>
        <li>Provide information about legal resources</li>
      </ul>
      <p>
        <a
          href="https://www.mass.gov/orgs/court-service-centers"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find a Court Service Center
        </a>
      </p>

      <h2>Massachusetts court resources</h2>
      <ul>
        <li>
          <a
            href="https://www.mass.gov/orgs/massachusetts-court-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            Massachusetts Court System
          </a>
        </li>
        <li>
          <a
            href="https://www.mass.gov/orgs/massachusetts-court-system/locations"
            target="_blank"
            rel="noopener noreferrer"
          >
            All Massachusetts Court Locations
          </a>
        </li>
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

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to complete your forms?</h3>
        <p>
          Once you know which court to file in, start your guided interview.
        </p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse all Massachusetts forms
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
