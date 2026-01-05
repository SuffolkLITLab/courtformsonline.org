import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to Select the Right Court Form - Court Forms Online',
  description:
    "Follow these steps to confirm you're using the correct court form for your situation and avoid delays or rejected filings.",
};

export default function SelectRightCourtForm() {
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
            Pick the right court form
          </li>
        </ol>
      </nav>

      <h1>How to select the right court form</h1>

      <p className="lead">
        Choosing the correct form is one of the most important steps in any
        court filing. The right form helps the court understand what you're
        asking for, and it can reduce delays and rejections.
      </p>

      <h2>
        1. Make sure the form is for <strong>your state</strong>
      </h2>
      <p>
        Court forms vary by state and sometimes by county or court. Before
        filling out a form, confirm it is designed for use in the state that you
        live in or where you need legal help.
      </p>

      <h2>2. Read the description carefully</h2>
      <p>
        Start with the form's description. Look for details about what the form
        is used for and what it does (and doesn&apos;t) accomplish.
      </p>
      <ul>
        <li>
          Check what problem the form is designed to solve (for example, “file a
          complaint,” “respond,” “request a hearing,” or “ask to change an
          order”).
        </li>
        <li>
          Confirm the type of case and court the form applies to (for example,
          Probate and Family Court vs. District Court).
        </li>
        <li>
          Pay attention to keywords like <strong>petition</strong>,{' '}
          <strong>motion</strong>, <strong>complaint</strong>, or{' '}
          <strong>answer</strong>, since they often signal a specific step in a
          case.
        </li>
      </ul>

      <h2>3. Check whether you are allowed to use the form</h2>
      <p>
        Many forms have eligibility rules. Before you invest time filling
        anything out, read the instructions to see if the form is meant for your
        situation.
      </p>
      <ul>
        <li>
          Look for sections like <strong>“Who can use this form”</strong>,{' '}
          <strong>“Requirements”</strong>, or <strong>“Before you file”</strong>
          .
        </li>
        <li>
          Watch for limits based on where you live, what court you're filing in,
          the type of case, or whether you already have a case open.
        </li>
        <li>
          If the instructions say you <strong>cannot</strong> use the form, stop
          and look for the correct alternative—using the wrong form can waste
          time and delay your case.
        </li>
      </ul>

      <h2>4. Review help pages and extra guidance</h2>
      <p>
        Help pages can clarify what the form is for, what you'll need, and how
        the court usually handles that type of request. They can also explain
        situations where the form is not a good fit.
      </p>
      <ul>
        <li>
          Look for FAQs, checklists, and “learn more” sections linked from the
          form page.
        </li>
        <li>
          Make sure you understand what information and documents you'll need
          before filing (for example, service requirements or supporting
          attachments).
        </li>
        <li>
          If a help page describes your situation differently than you expected,
          it may be a sign you should choose a different form.
        </li>
      </ul>

      <h2>5. Confirm it's the right step—and consider alternatives</h2>
      <p>
        Even if a form seems related, it may not be the best next step in your
        case. Take a moment to confirm you're using the right approach and that
        you understand other options.
      </p>

      <h3>Ask yourself</h3>
      <ul>
        <li>
          Is this the right stage of the process for this form (starting a case,
          responding, requesting an order, enforcing an order)?
        </li>
        <li>Does the form ask for the outcome you actually want?</li>
        <li>
          Are there other ways to accomplish the same result that better fit
          your situation?
        </li>
      </ul>

      <h3>Example: name change</h3>
      <p>
        You may not need to file a name change petition if you can change your
        name as part of another legal process—like an adoption, divorce, or
        marriage. In those situations, the court or agency process may provide a
        different path that's simpler and more direct.
      </p>

      <div className="mt-4 p-4 bg-light rounded">
        <h3>If you're not sure</h3>
        <p className="mb-3">
          If you're stuck between forms, start with the form instructions and
          help pages, then consider getting legal help or contacting your local
          court's self-help resources.
        </p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse all forms
        </Link>
        <Link href="/guides" className="btn btn-outline-secondary">
          Back to how to use court forms
        </Link>
      </div>
    </div>
  );
}
