import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'What Information Court Forms Need - Court Forms Online',
  description:
    'Prepare for your court form interview by gathering the right documents and information. Learn what details courts typically require.',
};

export default function WhatInformationYouNeed() {
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
            What information you need
          </li>
        </ol>
      </nav>

      <h1>What information court forms need</h1>

      <p className="lead">
        Having the right information ready before you start makes completing
        your court forms faster and easier.
      </p>

      <h2>Common information all court forms need</h2>
      <p>Most court forms will ask for some or all of the following:</p>

      <h3>Your personal information</h3>
      <ul>
        <li>Full legal name</li>
        <li>Current address</li>
        <li>Phone number and email address</li>
        <li>Date of birth</li>
      </ul>

      <h3>Other party&apos;s information</h3>
      <p>
        If your form involves another person (like a landlord, spouse, or
        creditor):
      </p>
      <ul>
        <li>Their full legal name</li>
        <li>Their address (if known)</li>
        <li>Any relevant identification numbers or account numbers</li>
      </ul>

      <h3>Court and case information</h3>
      <ul>
        <li>
          <strong>Case number:</strong>
          If you have an existing case, you&apos;ll need the docket or case
          number.
        </li>
        <li>
          <strong>Court name:</strong> The specific court handling your matter.{' '}
          <Link href="/guides/find-your-court">
            Not sure which court? Learn how to find your courthouse
          </Link>
          .
        </li>
        <li>
          <strong>Judge&apos;s name:</strong> If a judge has been assigned to
          your case.
        </li>
      </ul>

      <h2>Form-specific information</h2>
      <p>
        Depending on your form type, you may need additional documents or
        details:
      </p>

      <h3>Housing and eviction forms</h3>
      <ul>
        <li>Lease agreement or rental contract</li>
        <li>Notices received from your landlord</li>
        <li>Rent payment records</li>
        <li>Photos documenting any issues</li>
      </ul>

      <h3>Family law forms</h3>
      <ul>
        <li>Marriage certificate</li>
        <li>Children&apos;s birth certificates</li>
        <li>Financial records (income, assets, debts)</li>
        <li>Existing court orders</li>
      </ul>

      <h3>Small claims forms</h3>
      <ul>
        <li>Contracts or written agreements</li>
        <li>Receipts and invoices</li>
        <li>Photos of damaged property</li>
        <li>Communication records (emails, texts)</li>
      </ul>

      <h2>Tips for gathering information</h2>
      <ol>
        <li>
          <strong>
            Check the form&apos;s &quot;Before you start&quot; section:
          </strong>{' '}
          Each form page on our site lists specific items you&apos;ll need.
        </li>
        <li>
          <strong>Gather documents first:</strong> Having paperwork in front of
          you prevents delays during the interview.
        </li>
        <li>
          <strong>It&apos;s okay not to know everything:</strong> Some
          information is optional, and you can often save your progress and
          return later.
        </li>
      </ol>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Next steps</h3>
        <p>
          Once you have your information ready, you&apos;re prepared to complete
          your form.
        </p>
        <Link
          href="/guides/how-interviews-work"
          className="btn btn-outline-primary me-2"
        >
          How interactive interviews work
        </Link>
        <Link href="/guides" className="btn btn-outline-secondary">
          Back to how to use court forms
        </Link>
      </div>
    </div>
  );
}
