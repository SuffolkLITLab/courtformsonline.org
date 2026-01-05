import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to Prevent a Rejected Court Form - Court Forms Online',
  description:
    'Learn why courts reject forms and how to ensure your court forms are accepted the first time you file them.',
};

export default function PreventRejectedForms() {
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
            Prevent rejected forms
          </li>
        </ol>
      </nav>

      <h1>How to prevent a rejected court form</h1>

      <p className="lead">
        A rejected court form can delay your case and cause frustration.
        Here&apos;s how to get your forms accepted the first time.
      </p>

      <h2>Why courts reject forms</h2>
      <p>Courts may reject your filing for various reasons:</p>
      <ul>
        <li>
          <strong>Incomplete information:</strong> Required fields left blank or
          partially filled
        </li>
        <li>
          <strong>Wrong form:</strong> Using a form that doesn&apos;t apply to
          your situation or court
        </li>
        <li>
          <strong>Outdated version:</strong> Filing an old version of a form
          that&apos;s been updated
        </li>
        <li>
          <strong>Missing signatures:</strong> Forgetting to sign where required
        </li>
        <li>
          <strong>Incorrect filing fee:</strong> Wrong payment amount or method
        </li>
        <li>
          <strong>Wrong court:</strong> Filing in a court that doesn&apos;t have
          jurisdiction over your case
        </li>
        <li>
          <strong>Missing attachments:</strong> Required supporting documents
          not included
        </li>
      </ul>

      <h2>How our guided interviews help</h2>
      <p>
        Court Forms Online is designed to prevent rejections by addressing each
        of these issues:
      </p>
      <ul>
        <li>
          <strong>Required field validation:</strong> The interview ensures all
          mandatory fields are completed.{' '}
          <Link href="/guides/common-mistakes-prevented">
            See all the mistakes we help prevent
          </Link>
          .
        </li>
        <li>
          <strong>Form selection guidance:</strong> We help you choose the right
          form for your situation.
        </li>
        <li>
          <strong>Current forms:</strong> We always use the latest official
          versions.
        </li>
        <li>
          <strong>Signature reminders:</strong> Clear prompts ensure you
          don&apos;t forget to sign.
        </li>
        <li>
          <strong>Fee information:</strong> We display applicable filing fees so
          you can prepare the correct amount.
        </li>
        <li>
          <strong>Court selection:</strong> We help you identify the right court
          for your case.
        </li>
      </ul>

      <h2>Tips for successful filing</h2>
      <ol>
        <li>
          <strong>Gather your information first:</strong>{' '}
          <Link href="/guides/what-information-you-need">
            Check what information you&apos;ll need
          </Link>{' '}
          before starting.
        </li>
        <li>
          <strong>Review before submitting:</strong> Take time to check all your
          answers in the review screen.
        </li>
        <li>
          <strong>Keep copies:</strong> Save or print copies of everything you
          file.
        </li>
        <li>
          <strong>Check deadlines:</strong> Make sure you&apos;re filing within
          any applicable time limits.
        </li>
        <li>
          <strong>Confirm court hours:</strong> If filing in person, verify the
          clerk&apos;s office is open.
        </li>
      </ol>

      <h2>What happens after you finish</h2>
      <p>
        After completing your interview, you&apos;ll have options for filing:
      </p>
      <ul>
        <li>
          <strong>E-filing:</strong> Some forms can be submitted directly to the
          court electronically through a special button in the interview. In
          other cases, you can use your own e-filing account with the court.
        </li>
        <li>
          <strong>Email delivery:</strong> Certain forms can be sent via email
          through a special button in the interview. This is option is only
          available in a few interviews where we have a special arrangement with
          the court. Most courts do not accept forms by email.
        </li>
        <li>
          <strong>Print and file:</strong> Download your completed forms to
          print and deliver, either by mailing it to the right court or
          delivering it in person.{' '}
          <Link href="/guides/how-to-file">Learn how to file your forms</Link>.
        </li>
      </ul>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Get started with confidence</h3>
        <p>
          Our guided interviews are designed to help you submit complete,
          accurate forms.
        </p>
        <Link
          href="/guides/common-mistakes-prevented"
          className="btn btn-outline-primary me-2"
        >
          Common mistakes guided interviews prevent
        </Link>
        <Link href="/guides" className="btn btn-outline-secondary">
          Back to how to use court forms
        </Link>
      </div>
    </div>
  );
}
