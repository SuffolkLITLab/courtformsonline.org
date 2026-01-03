import Link from 'next/link';
import type { Metadata } from 'next';
import styles from '../../css/AboutPage.module.css';

export const metadata: Metadata = {
  title: 'Are Guided Interviews Safe to Use? - Court Forms Online',
  description:
    'Learn about the security measures and privacy protections we use to keep your information safe while using our guided court form interviews.',
};

export default function IsItSafe() {
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
            Is It Safe to Use?
          </li>
        </ol>
      </nav>

      <h1>Are guided interviews safe to use?</h1>

      <p className="lead">
        Yes. We take multiple steps to protect your privacy and keep your
        information secure while you complete your court forms.
      </p>

      <h2>Security measures we use</h2>

      <h3>Encryption</h3>
      <p>
        All information you enter into our guided interviews is encrypted using
        standard HTTPS SSL encryption. This protects your data from being
        intercepted by other users on your network or seen while traveling
        between your computer and our servers.
      </p>

      <h3>Access controls</h3>
      <p>
        Access to your information is strictly limited to authorized employees
        of the LIT Lab who work to maintain and improve the system. We only
        access your responses when necessary to make improvements or at your
        specific request.
      </p>

      <h3>System protection</h3>
      <p>
        We use multiple layers of security, including software controls and
        firewalls, continuous monitoring to detect unauthorized access, and
        secure (encrypted) storage of saved answers on protected servers.
      </p>

      <h2>Your information and accounts</h2>

      <h3>Save your progress</h3>
      <p>
        When you use a guided interview, you can create an account and save your
        progress. This allows you to return later and pick up where you left off
        without losing your work. Your saved answers are stored securely on our
        servers.
      </p>

      <h3>Delete your information anytime</h3>
      <p>
        You have full control over your information. At any time, you can delete
        all your saved answers from the system. To do this:
      </p>
      <ol>
        <li>
          Look for the <strong>Menu</strong> dropdown button in the interview
        </li>
        <li>
          Select <strong>&quot;Exit and delete my answers&quot;</strong>
        </li>
        <li>Confirm that you want to delete your information</li>
      </ol>
      <p>
        Once deleted, your information is permanently removed from our servers
        and cannot be recovered.
      </p>

      <h3>Escape button</h3>
      <p>
        Some guided interviews include an <strong>Escape</strong> button. This
        button immediately takes you to a neutral website (like Google) if you
        need to quickly leave the interview for safety or privacy reasons. You
        should still return later to delete your saved answers if needed.
      </p>

      <h2>Data privacy</h2>

      <p>
        For detailed information about how we collect, use, and protect your
        data, please see our{' '}
        <Link href="/privacy">complete privacy policy and terms of use</Link>.
        Key points include:
      </p>

      <ul>
        <li>
          <strong>We never sell your data.</strong> Your personal information is
          never shared with third parties for commercial purposes.
        </li>
        <li>
          <strong>E-filing with courts:</strong> When you e-file your forms, we
          deliver the completed documents to the appropriate court on your
          behalf.
        </li>
        <li>
          <strong>Analytics:</strong> We use third-party analytics (like Google
          Analytics) to understand how people use our site and improve it. This
          information is anonymous and does not identify you personally.
        </li>
        <li>
          <strong>Research:</strong> We may use anonymized data (with all
          identifying information removed) for research purposes to help improve
          legal services in Massachusetts.
        </li>
      </ul>

      <h2>When guided interviews are not enough</h2>

      <h3>When to get legal help</h3>
      <p>
        Guided interviews are a great tool, but they&apos;re not a substitute
        for legal advice. You should consider getting help from a lawyer or
        legal aid organization if:
      </p>
      <ul>
        <li>Your case is complex or involves multiple legal issues</li>
        <li>You&apos;re facing an opponent with a lawyer</li>
        <li>Your case involves significant money or important assets</li>
        <li>You need help understanding court procedures or deadlines</li>
        <li>
          You&apos;re not sure which form or court is right for your situation
        </li>
      </ul>

      <p>
        <Link href="/guides/find-legal-help">
          Find legal help in your jurisdiction
        </Link>{' '}
        to connect with lawyers, legal aid organizations, and other resources.
      </p>

      <h2>When your physical safety is at risk</h2>

      <div className="alert alert-danger" role="alert">
        <h3 className="alert-heading">Emergency situations</h3>
        <p>
          If your physical safety is at risk,{' '}
          <strong>do not rely on court forms alone</strong>.
        </p>
        <p>
          <strong>Call 911 immediately</strong> if you are in danger or believe
          you are in immediate danger.
        </p>
      </div>

      <p>
        Guided interviews are not designed for emergency situations. If you are
        experiencing:
      </p>
      <ul>
        <li>Domestic violence or abuse</li>
        <li>Threats or harassment</li>
        <li>Physical assault</li>
        <li>Any other immediate danger</li>
      </ul>

      <p>
        <strong>Call 911 or your local emergency number first.</strong> Once you
        are safe, you can work on legal remedies like restraining orders or
        protective orders. Law enforcement and emergency responders can often
        help you access emergency legal protections and connect you with safety
        resources and legal help.
      </p>

      <h2>Questions about safety or privacy?</h2>

      <p>
        If you have questions about how we protect your information or concerns
        about data privacy, please contact the Suffolk LIT Lab at:
      </p>
      <p>
        Suffolk LIT Lab
        <br />
        120 Tremont St
        <br />
        Boston, MA
      </p>

      <div className="mt-5 p-4 bg-light rounded">
        <h3>More information</h3>
        <p>
          Learn more about using guided interviews and preparing your court
          forms.
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
