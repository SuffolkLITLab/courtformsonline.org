import { message, type Locale } from '../../i18n/messages';
import Link from 'next/link';
import styles from '../css/HowToUseFormsSection.module.css';

export default function HowToUseFormsSection({
  locale = 'en',
}: { locale?: Locale } = {}) {
  return (
    <section
      id="how-to-use-forms-section"
      className={styles.HowToUseFormsSection + ' py-4'}
    >
      <div className="container">
        <h2 className="mb-4">{message(locale, 'home.guidesHeading')}</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">
                  {message(locale, 'home.guideInterviews')}
                </h3>
                <p className="card-text text-muted">
                  {message(locale, 'home.guideInterviewsDescription')}
                </p>
                <Link
                  hrefLang="en"
                  href="/guides/how-interviews-work"
                  className="btn btn-outline-primary"
                >
                  {message(locale, 'home.learnMore')}
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">
                  {message(locale, 'home.guideCourt')}
                </h3>
                <p className="card-text text-muted">
                  {message(locale, 'home.guideCourtDescription')}
                </p>
                <Link
                  hrefLang="en"
                  href="/guides/find-your-court"
                  className="btn btn-outline-primary"
                >
                  {message(locale, 'home.guideCourtLink')}
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">
                  {message(locale, 'home.guideChoose')}
                </h3>
                <p className="card-text text-muted">
                  {message(locale, 'home.guideChooseDescription')}
                </p>
                <Link
                  hrefLang="en"
                  href="/guides/choosing-right-form"
                  className="btn btn-outline-primary"
                >
                  {message(locale, 'home.learnMore')}
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="h5 card-title">
                  {message(locale, 'home.guideLawyer')}
                </h3>
                <p className="card-text text-muted">
                  {message(locale, 'home.guideLawyerDescription')}
                </p>
                <Link
                  hrefLang="en"
                  href="/guides/find-a-lawyer"
                  className="btn btn-outline-primary"
                >
                  {message(locale, 'home.guideLawyerLink')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <Link hrefLang="en" href="/guides" className="btn btn-link">
            {message(locale, 'home.moreGuides')}
          </Link>
        </div>
      </div>
    </section>
  );
}
