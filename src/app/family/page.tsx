'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../css/FamilyEmergency.module.css';

export default function FamilyEmergencyDesign1() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-primary mb-2">Family Emergency Planning</span>
              <h1 className="display-4 fw-bold mb-3">Protect Your Family's Future</h1>
              <p className="lead mb-4">
                Create legally binding plans to ensure your children and loved ones are cared for in an emergency. 
                Access free, step-by-step tools for temporary guardianship, care plans, and more across all 50 states.
              </p>
              <div className="d-flex gap-3">
                <a href="#tools" className="btn btn-primary btn-lg">Find Your Form</a>
                <Link href="/" className="btn btn-outline-secondary btn-lg">Back to Main Site</Link>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block text-center">
              <i className="fa-solid fa-shield-heart text-primary" style={{ fontSize: '8rem', opacity: 0.8 }}></i>
            </div>
          </div>
        </div>
      </section>

      {/* State Selector (Bold Element) */}
      <div className="container">
        <div className={styles.stateSelector}>
          <div className="row align-items-center">
            <div className="col-md-4">
              <h3 className="mb-0">Find forms for your state:</h3>
            </div>
            <div className="col-md-6">
              <select className="form-select form-select-lg" aria-label="Select State">
                <option defaultValue>Select a state...</option>
                <option value="MA">Massachusetts</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                {/* 50 states would go here */}
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-primary btn-lg w-100">Go</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tools Section */}
      <section id="tools" className="py-5 mt-4">
        <div className="container">
          <h2 className="mb-4 text-center">Essential Planning Tools</h2>
          <div className="row g-4">
            {/* Tool 1 */}
            <div className="col-md-4">
              <div className={`card p-4 ${styles.cardHover}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-child-reaching"></i>
                </div>
                <h3 className="h5 fw-bold">Temporary Guardianship</h3>
                <p className="text-muted">
                  Legally appoint someone you trust to care for your minor children if you are detained, hospitalized, or unavailable.
                </p>
                <div className="mt-auto">
                  <Link href="/family/guardianship" className="btn btn-outline-primary w-100">Start Interview</Link>
                </div>
              </div>
            </div>

            {/* Tool 2 */}
            <div className="col-md-4">
              <div className={`card p-4 ${styles.cardHover}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-file-medical"></i>
                </div>
                <h3 className="h5 fw-bold">Family Care Plan</h3>
                <p className="text-muted">
                  Create a comprehensive document outlining medical, educational, and daily care instructions for your children.
                </p>
                <div className="mt-auto">
                  <Link href="/family/care-plan" className="btn btn-outline-primary w-100">Create Plan</Link>
                </div>
              </div>
            </div>

            {/* Tool 3 */}
            <div className="col-md-4">
              <div className={`card p-4 ${styles.cardHover}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-scale-balanced"></i>
                </div>
                <h3 className="h5 fw-bold">Habeas Corpus Petition</h3>
                <span className="badge bg-warning text-dark mb-2 d-inline-block" style={{width: 'fit-content'}}>Coming Soon</span>
                <p className="text-muted">
                  A national tool to challenge unlawful detention. Currently in development for nationwide use.
                </p>
                <div className="mt-auto">
                  <button className="btn btn-outline-secondary w-100" disabled>Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Resources Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2 className="mb-4">National Resources & Support</h2>
              <p className="mb-4">
                While our interactive forms help you create legal documents, you may need additional support or advice. 
                These national resources provide critical information for families and immigrants facing emergencies.
              </p>
              
              <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action p-4">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 fw-bold text-primary">Know Your Rights: Emergency Planning</h5>
                  </div>
                  <p className="mb-1 text-muted">Comprehensive guide on what to do if you are approached by law enforcement or immigration officials.</p>
                </a>
                <a href="#" className="list-group-item list-group-item-action p-4">
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1 fw-bold text-primary">Find Legal Help Directory</h5>
                  </div>
                  <p className="mb-1 text-muted">Search for free or low-cost legal aid organizations in your specific state or county.</p>
                </a>
                <div className="list-group-item p-4 bg-white">
                  <div className={styles.pdfPlaceholder}>
                    <h5 className="mb-1 fw-bold"><i className="fa-regular fa-file-pdf me-2"></i> Standalone PDF Forms</h5>
                    <p className="mb-0 text-muted">If an interactive interview is not yet available for your state, you can download blank PDF forms to fill out manually.</p>
                    <Link href="/family/pdf-forms" className="btn btn-sm btn-warning mt-2">Browse PDF Library</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
