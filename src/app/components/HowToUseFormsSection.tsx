import Link from 'next/link';
import styles from '../css/HowToUseFormsSection.module.css';

export default function HowToUseFormsSection() {
  return (
    <section
      id="how-to-use-forms-section"
      className={styles.HowToUseFormsSection + ' py-4'}
    >
      <div className="container">
        <h2 className="mb-4">How to use court forms</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">How interactive forms work</h3>
                <p className="card-text text-muted">
                  Learn how our guided interviews help you complete court forms
                  step-by-step with confidence.
                </p>
                <Link
                  href="/guides/how-interviews-work"
                  className="btn btn-outline-primary"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">Finding your courthouse</h3>
                <p className="card-text text-muted">
                  Find the right courthouse in your jurisdiction where you need
                  to file your completed forms.
                </p>
                <Link
                  href="/guides/find-your-court"
                  className="btn btn-outline-primary"
                >
                  Find your court
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <Link href="/guides" className="btn btn-link">
            More information about how court forms work
          </Link>
        </div>
      </div>
    </section>
  );
}
