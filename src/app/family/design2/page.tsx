'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../../css/FamilyEmergency.module.css';

export default function FamilyEmergencyDesign2() {
  return (
    <div>
      {/* Dark Hero Section */}
      <section className={styles.heroSectionDark}>
        <div className="container text-center py-5">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill">Family Emergency Planning</span>
          <h1 className="display-3 fw-bold mb-4">Prepare for the Unexpected</h1>
          <p className="lead mb-5 mx-auto" style={{ maxWidth: '800px' }}>
            Whether you are facing a medical emergency, sudden travel, or immigration concerns, 
            having a plan ensures your children are safe. We provide free legal tools for all 50 states.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-warning btn-lg px-5 fw-bold">Start Your Plan</button>
            <Link href="/" className="btn btn-outline-light btn-lg px-4">Return to Court Forms Online</Link>
          </div>
        </div>
      </section>

      {/* Step-by-Step Journey */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">How to Protect Your Family</h2>
          
          <div className="row g-5 position-relative">
            {/* Connecting Line */}
            <div className="position-absolute top-50 start-0 w-100 border-top border-3 border-primary d-none d-md-block" style={{ zIndex: 0 }}></div>
            
            {/* Step 1 */}
            <div className="col-md-4 text-center position-relative" style={{ zIndex: 1 }}>
              <div className={`${styles.iconCircleDark} mx-auto mb-3 bg-primary text-white`} style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                1
              </div>
              <h3 className="h4 fw-bold">Choose Your State</h3>
              <p className="text-muted">Laws vary by location. Select where you live to find the right forms.</p>
              <select className="form-select mx-auto" style={{ maxWidth: '200px' }}>
                <option>Select State...</option>
                <option>Massachusetts</option>
                <option>New York</option>
              </select>
            </div>

            {/* Step 2 */}
            <div className="col-md-4 text-center position-relative" style={{ zIndex: 1 }}>
              <div className={`${styles.iconCircleDark} mx-auto mb-3 bg-primary text-white`} style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                2
              </div>
              <h3 className="h4 fw-bold">Select a Tool</h3>
              <p className="text-muted">Pick Temporary Guardianship, a Care Plan, or Habeas Corpus (coming soon).</p>
            </div>

            {/* Step 3 */}
            <div className="col-md-4 text-center position-relative" style={{ zIndex: 1 }}>
              <div className={`${styles.iconCircleDark} mx-auto mb-3 bg-primary text-white`} style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                3
              </div>
              <h3 className="h4 fw-bold">Answer Questions</h3>
              <p className="text-muted">Our secure interview will generate your legal documents for free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Tools Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row mb-4 align-items-center">
            <div className="col-md-8">
              <h2 className="fw-bold">Available Forms & Resources</h2>
            </div>
            <div className="col-md-4 text-md-end">
              <div className="form-check form-switch d-inline-block">
                <input className="form-check-input" type="checkbox" id="showPdf" />
                <label className="form-check-label ms-2" htmlFor="showPdf">Show PDF-only forms</label>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="h4 fw-bold text-primary">Temporary Guardianship</h3>
                    <span className="badge bg-success">Interactive</span>
                  </div>
                  <p className="text-muted mb-4">
                    Give a trusted adult the legal authority to make medical and educational decisions for your child if you are unable to do so.
                  </p>
                  <Link href="/family/guardianship" className="btn btn-primary">Start Interview <i className="fa-solid fa-arrow-right ms-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="h4 fw-bold text-primary">Family Care Plan</h3>
                    <span className="badge bg-success">Interactive</span>
                  </div>
                  <p className="text-muted mb-4">
                    A comprehensive guide for your child's caregiver, including medical history, school contacts, and daily routines.
                  </p>
                  <Link href="/family/care-plan" className="btn btn-primary">Start Interview <i className="fa-solid fa-arrow-right ms-2"></i></Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-0 shadow-sm bg-light">
                <div className="card-body p-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="h4 fw-bold text-secondary">Habeas Corpus Petition</h3>
                    <span className="badge bg-secondary">In Development</span>
                  </div>
                  <p className="text-muted mb-4">
                    A national tool to challenge unlawful detention. This tool is currently being built for nationwide use.
                  </p>
                  <button className="btn btn-outline-secondary" disabled>Coming Soon</button>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card h-100 border-warning border-2 shadow-sm" style={{ backgroundColor: '#fffdf5' }}>
                <div className="card-body p-5">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="h4 fw-bold text-dark">State-Specific PDFs</h3>
                    <span className="badge bg-warning text-dark">PDF Only</span>
                  </div>
                  <p className="text-muted mb-4">
                    If an interactive interview isn't available for your state yet, download the blank PDF forms to fill out by hand.
                  </p>
                  <Link href="/family/pdf-forms" className="btn btn-warning fw-bold">Browse PDFs <i className="fa-solid fa-file-pdf ms-2"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
