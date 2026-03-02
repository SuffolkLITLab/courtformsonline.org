'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../../css/FamilyEmergency.module.css';

export default function FamilyEmergencyDesign3() {
  return (
    <div>
      {/* Gradient Hero Section */}
      <section className={styles.heroSectionGradient}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-light text-primary mb-3 px-3 py-2 rounded-pill fw-bold">Family Emergency Planning</span>
              <h1 className="display-4 fw-bold mb-4">Secure Your Family's Future</h1>
              <p className="lead mb-5">
                Access free legal tools and national resources to protect your children in case of an emergency, medical crisis, or sudden separation.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#forms" className="btn btn-light btn-lg text-primary fw-bold px-4 shadow-sm">Find Legal Forms</a>
                <a href="#resources" className="btn btn-outline-light btn-lg px-4">View National Resources</a>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <div className="bg-white p-4 rounded-4 shadow-lg text-dark">
                <h3 className="h5 fw-bold mb-3 border-bottom pb-2">Quick State Search</h3>
                <p className="small text-muted mb-3">Find forms specific to your state's laws.</p>
                <select className="form-select mb-3">
                  <option>Select your state...</option>
                  <option>Massachusetts</option>
                  <option>New York</option>
                  <option>Texas</option>
                </select>
                <button className="btn btn-primary w-100 fw-bold">Search Forms</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-5">
            
            {/* Left Column: Forms */}
            <div className="col-lg-8" id="forms">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0">Legal Forms & Tools</h2>
                <Link href="/" className="text-decoration-none text-primary fw-bold">
                  <i className="fa-solid fa-arrow-left me-2"></i>Back to Main Site
                </Link>
              </div>
              
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 d-flex gap-4 align-items-start">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-3 text-primary">
                    <i className="fa-solid fa-user-shield fa-2x"></i>
                  </div>
                  <div>
                    <h3 className="h5 fw-bold">Temporary Guardianship</h3>
                    <p className="text-muted mb-3">Legally appoint a trusted adult to care for your minor children if you are detained, hospitalized, or unavailable.</p>
                    <Link href="/family/guardianship" className="btn btn-sm btn-primary">Start Interview</Link>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body p-4 d-flex gap-4 align-items-start">
                  <div className="bg-success bg-opacity-10 p-3 rounded-3 text-success">
                    <i className="fa-solid fa-heart-pulse fa-2x"></i>
                  </div>
                  <div>
                    <h3 className="h5 fw-bold">Family Care Plan</h3>
                    <p className="text-muted mb-3">Create a comprehensive document outlining medical, educational, and daily care instructions for your children.</p>
                    <Link href="/family/care-plan" className="btn btn-sm btn-success">Create Plan</Link>
                  </div>
                </div>
              </div>

              <div className="card border-0 shadow-sm mb-4 bg-light border border-secondary">
                <div className="card-body p-4 d-flex gap-4 align-items-start">
                  <div className="bg-secondary bg-opacity-10 p-3 rounded-3 text-secondary">
                    <i className="fa-solid fa-gavel fa-2x"></i>
                  </div>
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <h3 className="h5 fw-bold m-0 text-secondary">Habeas Corpus Petition</h3>
                      <span className="badge bg-secondary">Coming Soon</span>
                    </div>
                    <p className="text-muted mb-3">A national tool to challenge unlawful detention. Currently in development for nationwide use.</p>
                  </div>
                </div>
              </div>

              {/* PDF Fallback Notice */}
              <div className="alert alert-warning d-flex align-items-center gap-3 border-warning border-2">
                <i className="fa-solid fa-file-pdf fa-2x text-warning"></i>
                <div>
                  <h4 className="h6 fw-bold mb-1">Don't see your state?</h4>
                  <p className="mb-0 small">If an interactive interview is not yet available for your state, you can <Link href="/family/pdf-forms" className="fw-bold text-dark text-decoration-underline">download blank PDF forms</Link> to fill out manually.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Resources */}
            <div className="col-lg-4" id="resources">
              <h2 className="fw-bold mb-4">National Resources</h2>
              
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                  <h3 className="h6 fw-bold text-uppercase text-muted">Know Your Rights</h3>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled mb-0">
                    <li className="mb-3">
                      <a href="#" className={styles.resourceLink}>
                        <i className="fa-solid fa-book-open"></i> Emergency Planning Guide
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="#" className={styles.resourceLink}>
                        <i className="fa-solid fa-scale-balanced"></i> What to do if approached by ICE
                      </a>
                    </li>
                    <li>
                      <a href="#" className={styles.resourceLink}>
                        <i className="fa-solid fa-passport"></i> Protecting your documents
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0">
                  <h3 className="h6 fw-bold text-uppercase text-muted">Find Legal Help</h3>
                </div>
                <div className="card-body">
                  <p className="small text-muted mb-3">Need to speak with an attorney? Find free or low-cost legal aid in your area.</p>
                  <a href="#" className="btn btn-outline-primary w-100 fw-bold">Search Legal Directory</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
