import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMagnifyingGlass,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../css/HowItWorksSection.module.css';

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works-section"
      className={styles.HowItWorksSection + ' py-5'}
    >
      <div className="container">
        <h2 className="mb-3">How it Works</h2>
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
                <h3 className="how-it-works-title">Step 1</h3>
                <p className="mb-0">
                  Describe your problem or choose a category to find the form
                  you need.
                </p>
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
                <h3 className="how-it-works-title">Step 2</h3>
                <p className="mb-0">
                  Fill out your form online. We walk you through it step by
                  step.
                </p>
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
                  icon={faEnvelope}
                  size="2x"
                  className="text-white"
                />
              </div>
              <div className="ms-3">
                <h3 className="how-it-works-title">Step 3</h3>
                <p className="mb-0">
                  Deliver your form to the court. You may need to print and mail
                  some forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
