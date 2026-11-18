import { message, type Locale } from '../../i18n/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInbox,
  faMagnifyingGlass,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../css/HowItWorksSection.module.css';

export default function HowItWorksSection({
  locale = 'en',
}: { locale?: Locale } = {}) {
  return (
    <section
      id="how-it-works-section"
      className={styles.HowItWorksSection + ' py-5'}
    >
      <div className="container">
        <h2 className="mb-3">{message(locale, 'home.howItWorks')}</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex align-items-start justify-content-center how-it-works-step">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center how-it-works-icon"
                style={{
                  minWidth: '80px',
                  minHeight: '80px',
                  padding: '15px',
                  backgroundColor: '#002e60',
                }}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="2x"
                  className="text-white"
                />
              </div>
              <div className="ms-3">
                <h3 className="how-it-works-title">
                  {message(locale, 'home.step', { number: 1 })}
                </h3>
                <p className="mb-0">{message(locale, 'home.stepOne')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-start justify-content-center how-it-works-step">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center how-it-works-icon"
                style={{
                  minWidth: '80px',
                  minHeight: '80px',
                  padding: '15px',
                  backgroundColor: '#3e7d9a',
                }}
              >
                <FontAwesomeIcon
                  icon={faList}
                  size="2x"
                  className="text-white"
                />
              </div>
              <div className="ms-3">
                <h3 className="how-it-works-title">
                  {message(locale, 'home.step', { number: 2 })}
                </h3>
                <p className="mb-0">{message(locale, 'home.stepTwo')}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-start justify-content-center how-it-works-step">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center how-it-works-icon"
                style={{
                  minWidth: '80px',
                  minHeight: '80px',
                  padding: '15px',
                  backgroundColor: '#c69931',
                }}
              >
                <FontAwesomeIcon
                  icon={faInbox}
                  size="2x"
                  className="text-white"
                />
              </div>
              <div className="ms-3">
                <h3 className="how-it-works-title">
                  {message(locale, 'home.step', { number: 3 })}
                </h3>
                <p className="mb-0">{message(locale, 'home.stepThree')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
