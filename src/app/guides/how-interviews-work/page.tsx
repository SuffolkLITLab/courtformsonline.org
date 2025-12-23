import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How Interactive Court Form Interviews Work - Court Forms Online',
  description:
    'Learn how our guided interview process helps you complete court forms step-by-step, making legal documents easier and more accurate.',
};

export default function HowInterviewsWork() {
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
            How interviews work
          </li>
        </ol>
      </nav>

      <h1>How interactive court form interviews work</h1>

      <p className="lead">
        Our guided interviews transform complex court forms into simple,
        step-by-step questions that anyone can answer.
      </p>

      <h2>What is a guided interview?</h2>
      <p>
        Instead of filling out a blank court form on your own, a guided
        interview asks you one question at a time. Based on your answers, the
        interview:
      </p>
      <ul>
        <li>Shows you only the questions relevant to your situation</li>
        <li>Explains legal terms in plain language</li>
        <li>Validates your answers to prevent common errors</li>
        <li>Automatically fills in the official court forms</li>
      </ul>

      <h2>The interview process</h2>
      <ol>
        <li>
          <strong>Choose your form:</strong> Browse our collection or search for
          the form you need.
        </li>
        <li>
          <strong>Answer questions:</strong> The interview guides you through
          each section with clear prompts and help text.
        </li>
        <li>
          <strong>Review your answers:</strong> Before generating your forms,
          you can review and edit your responses.
        </li>
        <li>
          <strong>Download or file:</strong> Get your completed forms as PDFs,
          or e-file directly with the court where available.
        </li>
      </ol>

      <h2>Benefits of guided interviews</h2>
      <ul>
        <li>
          <strong>No legal jargon:</strong> Questions are written in plain
          language with explanations when needed.
        </li>
        <li>
          <strong>Smart logic:</strong> Skip questions that don&apos;t apply to
          your situation.
        </li>
        <li>
          <strong>Error prevention:</strong> Built-in validation catches
          mistakes before they cause problems.{' '}
          <Link href="/guides/common-mistakes-prevented">
            Learn about common mistakes we prevent
          </Link>
          .
        </li>
        <li>
          <strong>Save and resume:</strong> You can save your progress and
          return later.
        </li>
      </ul>

      <h2>What you&apos;ll need</h2>
      <p>
        Before starting an interview, it helps to have certain information
        ready.{' '}
        <Link href="/guides/what-information-you-need">
          See what information court forms typically need
        </Link>
        .
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>Ready to try it?</h3>
        <p>
          Browse our forms and start a guided interview to see how easy it can
          be.
        </p>
        <Link href="/ma/forms" className="btn btn-primary me-2">
          Browse forms
        </Link>
        <Link href="/guides" className="btn btn-outline-secondary">
          Back to how to use court forms
        </Link>
      </div>
    </div>
  );
}
