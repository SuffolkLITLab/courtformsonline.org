import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Common Mistakes Guided Interviews Prevent - Court Forms Online',
  description:
    'Learn how automated court form interviews help you avoid errors that could delay your case or cause your forms to be rejected.',
};

export default function CommonMistakesPrevented() {
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
            Common mistakes prevented
          </li>
        </ol>
      </nav>

      <h1>Common mistakes guided interviews prevent</h1>

      <p className="lead">
        Filling out court forms by hand can lead to errors that delay your case
        or cause rejections. Our guided interviews help you avoid these common
        pitfalls.
      </p>

      <h2>Errors our interviews catch automatically</h2>

      <h3>Missing required fields</h3>
      <p>
        Paper forms don&apos;t tell you which fields are mandatory until the
        clerk rejects your filing. Our interviews clearly mark required
        questions and won&apos;t let you proceed until essential information is
        provided.
      </p>

      <h3>Invalid date formats</h3>
      <p>
        Courts require dates in specific formats. Our date pickers ensure you
        enter valid dates in the correct format every time.
      </p>

      <h3>Calculation errors</h3>
      <p>
        When forms require adding up amounts or calculating totals, our system
        does the math for you—eliminating arithmetic mistakes.
      </p>

      <h3>Inconsistent information</h3>
      <p>
        Information you enter once is automatically used throughout the form. If
        you list your address on page one, it appears correctly everywhere else
        it&apos;s needed.
      </p>

      <h3>Choosing the wrong form</h3>
      <p>
        Our interviews ask screening questions to confirm you&apos;re using the
        right form for your situation before you invest time completing it.
      </p>

      <h2>Common mistakes people make on paper forms</h2>
      <ul>
        <li>
          <strong>Illegible handwriting:</strong> Court clerks can&apos;t
          process what they can&apos;t read. Our forms are typed.
        </li>
        <li>
          <strong>Using the wrong court:</strong> Interviews help you identify
          the correct court for your case.{' '}
          <Link href="/guides/find-your-court">
            Learn how to find your court
          </Link>
          .
        </li>
        <li>
          <strong>Forgetting to sign:</strong> We remind you about required
          signatures before you finish.
        </li>
        <li>
          <strong>Missing pages or attachments:</strong> The interview ensures
          all required documents are included.
        </li>
        <li>
          <strong>Using outdated forms:</strong> We always use the current
          version of official court forms.
        </li>
      </ul>

      <h2>Why avoiding mistakes matters</h2>
      <p>Even small errors can have significant consequences:</p>
      <ul>
        <li>Your filing may be rejected, requiring you to start over</li>
        <li>Your case could be delayed by weeks or months</li>
        <li>You may miss important deadlines</li>
        <li>The court may rule against you if key information is missing</li>
      </ul>
      <p>
        <Link href="/guides/prevent-rejected-forms">
          Learn more about preventing rejected forms
        </Link>
        .
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Start with confidence</h3>
        <p>
          Our guided interviews are designed to help you get it right the first
          time.
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
