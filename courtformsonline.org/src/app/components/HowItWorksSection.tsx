import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function HowItWorksSection() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">How It Works</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="d-flex align-items-start">
              <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <FontAwesomeIcon icon={faHandPointer} size="2x" className="text-white" />
              </div>
              <div className="ms-3">
                <h3>Step 1</h3>
                <p>
                  Choose a category above and select the form you need to fill out.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-start">
              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <FontAwesomeIcon icon={faEnvelope} size="2x" className="text-white" />
              </div>
              <div className="ms-3">
                <h3>Step 2</h3>
                <p>
                  Fill out and submit your form online. It will be delivered to the court.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex align-items-start">
              <div className="rounded-circle bg-info d-flex align-items-center justify-content-center"  style={{ width: '80px', height: '80px' }}>
                <FontAwesomeIcon icon={faPhone} size="2x" className="text-white" />
              </div>
              <div className="ms-3">
                <h3>Step 3</h3>
                <p>
                  The court will contact you about next steps. Sign in to view your forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
