import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'How to use court forms - Court Forms Online',
  description:
    'Learn how to use guided court form interviews, what information you need, common mistakes to avoid, and how to file your completed forms.',
};

interface GuideLink {
  href: string;
  title: string;
  description: string;
}

const guides: GuideLink[] = [
  {
    href: '/guides/how-interviews-work',
    title: 'How interactive forms (guided interviews) work',
    description:
      'Understand the step-by-step interview process that helps you complete court forms accurately and efficiently.',
  },
  {
    href: '/guides/what-information-you-need',
    title: 'What information court forms need',
    description:
      'Learn what documents and details to gather before starting your court form interview.',
  },
  {
    href: '/guides/choosing-right-form',
    title: 'How to select the right court form',
    description:
      "Follow these steps to confirm you're using the correct court form for your situation and avoid delays or rejected filings.",
  },
  {
    href: '/guides/common-mistakes-prevented',
    title: 'Common mistakes guided interviews prevent',
    description:
      'See how automated interviews help you avoid errors that could delay your case.',
  },
  {
    href: '/guides/prevent-rejected-forms',
    title: 'How to prevent a rejected court form',
    description:
      'Tips and best practices to ensure your court forms are accepted the first time.',
  },
  {
    href: '/guides/how-to-file',
    title: 'How to file a court form',
    description:
      'Step-by-step guidance on submitting your completed forms to the court.',
  },
  {
    href: '/guides/find-your-court',
    title: 'Finding your courthouse',
    description:
      'Locate the right courthouse for your case in your jurisdiction.',
  },
  {
    href: '/guides/finding-and-using-a-notary',
    title: 'Finding and using a notary',
    description:
      'Learn what notarization means, how to find a notary, and how to prepare if your form must be notarized.',
  },
  {
    href: '/guides/find-a-lawyer',
    title: 'Find legal help',
    description:
      'Connect with legal aid organizations, lawyers, and other legal resources when you need professional help.',
  },
  {
    href: '/guides/is-it-safe',
    title: 'Are guided interviews safe to use?',
    description:
      'Learn about the security measures and privacy protections we use to keep your information safe.',
  },
];

export default function GuidesIndex() {
  return (
    <div className={styles.AboutPageContainer + ' container'}>
      <h1 className="text-center mb-4">How to use court forms</h1>
      <p className="lead text-center mb-5">
        Court Forms Online makes it easier to complete legal documents through
        guided interviews. These guides will help you understand the process and
        prepare for success.
      </p>

      <div className="row">
        {guides.map((guide) => (
          <div key={guide.href} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5 card-title">
                  <Link href={guide.href} className="text-decoration-none">
                    {guide.title}
                  </Link>
                </h2>
                <p className="card-text text-muted">{guide.description}</p>
                <Link href={guide.href} className="btn btn-outline-primary">
                  {guide.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <h2 className="h4">Ready to get started?</h2>
        <p>Browse our collection of court forms and find the one you need.</p>
        <Link href="/ma/forms" className="btn btn-primary btn-lg">
          Browse all forms
        </Link>
      </div>
    </div>
  );
}
