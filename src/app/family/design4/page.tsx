'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../css/FamilyEmergency.module.css';

// Mock data to demonstrate the dynamic button behavior
const availabilityData: Record<string, { name: string; guardianship: 'interview' | 'pdf'; carePlan: 'interview' | 'pdf' }> = {
  'MA': { name: 'Massachusetts', guardianship: 'interview', carePlan: 'interview' },
  'NY': { name: 'New York', guardianship: 'pdf', carePlan: 'interview' },
  'TX': { name: 'Texas', guardianship: 'pdf', carePlan: 'pdf' },
  'CA': { name: 'California', guardianship: 'interview', carePlan: 'pdf' },
};

export default function FamilyEmergencyDesign4() {
  const [selectedState, setSelectedState] = useState('');

  const currentStateData = selectedState ? availabilityData[selectedState] : null;

  return (
    <div>
      {/* Hero Section with Integrated State Selector */}
      <section className={styles.heroSection}>
        <div className="container text-center py-4">
          <span className="badge bg-primary mb-3 px-3 py-2 rounded-pill">Family Emergency Planning</span>
          <h1 className="display-4 fw-bold mb-4">Protect Your Family's Future</h1>
          <p className="lead mb-5 mx-auto" style={{ maxWidth: '700px' }}>
            Create legally binding plans to ensure your children and loved ones are cared for in an emergency. 
            Select your state below to find the right forms for your jurisdiction.
          </p>
          
          <div className="mx-auto bg-white p-4 rounded-4 shadow-sm border" style={{ maxWidth: '500px' }}>
            <label htmlFor="stateSelect" className="form-label fw-bold text-muted mb-2">
              Where do you live?
            </label>
            <select 
              id="stateSelect"
              className="form-select form-select-lg border-primary" 
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select your state...</option>
              <option value="CA">California (Mixed)</option>
              <option value="MA">Massachusetts (All Interviews)</option>
              <option value="NY">New York (Mixed)</option>
              <option value="TX">Texas (All PDFs)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Dynamic Tools Grid */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Essential Planning Tools</h2>
              <p className="text-muted mb-0">
                {selectedState 
                  ? `Showing available resources for ${currentStateData?.name}` 
                  : 'Select a state above to see available resources'}
              </p>
            </div>
            <Link href="/" className="text-decoration-none text-primary fw-bold d-none d-md-block">
              <i className="fa-solid fa-arrow-left me-2"></i>Back to Main Site
            </Link>
          </div>

          <div className="row g-4">
            {/* Tool 1: Temporary Guardianship */}
            <div className="col-md-4">
              <div className={`card h-100 p-4 border-0 shadow-sm ${styles.cardHover}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <h3 className="h5 fw-bold">Temporary Guardianship</h3>
                <p className="text-muted mb-4">
                  Legally appoint someone you trust to care for your minor children if you are detained, hospitalized, or unavailable.
                </p>
                <div className="mt-auto">
                  {!selectedState ? (
                    <button className="btn btn-secondary w-100" disabled>
                      Select a state to begin
                    </button>
                  ) : currentStateData?.guardianship === 'interview' ? (
                    <Link href="/family/guardianship" className="btn btn-primary w-100 fw-bold">
                      <i className="fa-solid fa-desktop me-2"></i> Start Interview
                    </Link>
                  ) : (
                    <a href="/pdfs/guardianship-blank.pdf" className="btn btn-outline-primary w-100 fw-bold">
                      <i className="fa-solid fa-file-pdf me-2"></i> Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tool 2: Family Care Plan */}
            <div className="col-md-4">
              <div className={`card h-100 p-4 border-0 shadow-sm ${styles.cardHover}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <h3 className="h5 fw-bold">Family Care Plan</h3>
                <p className="text-muted mb-4">
                  Create a comprehensive document outlining medical, educational, and daily care instructions for your children.
                </p>
                <div className="mt-auto">
                  {!selectedState ? (
                    <button className="btn btn-secondary w-100" disabled>
                      Select a state to begin
                    </button>
                  ) : currentStateData?.carePlan === 'interview' ? (
                    <Link href="/family/care-plan" className="btn btn-primary w-100 fw-bold">
                      <i className="fa-solid fa-desktop me-2"></i> Start Interview
                    </Link>
                  ) : (
                    <a href="/pdfs/care-plan-blank.pdf" className="btn btn-outline-primary w-100 fw-bold">
                      <i className="fa-solid fa-file-pdf me-2"></i> Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tool 3: Habeas Corpus */}
            <div className="col-md-4">
              <div className={`card h-100 p-4 border-0 shadow-sm ${styles.cardHover}`}>
                <div className={styles.iconCircle}>
                  <i className="fa-solid fa-scale-balanced"></i>
                </div>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h3 className="h5 fw-bold mb-0">Habeas Corpus</h3>
                  <span className="badge bg-warning text-dark">Coming Soon</span>
                </div>
                <p className="text-muted mb-4">
                  A national tool to challenge unlawful detention. Currently in development for nationwide use.
                </p>
                <div className="mt-auto">
                  <button className="btn btn-outline-secondary w-100" disabled>
                    In Development
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Resources Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-4">National Support Resources</h2>
              <p className="text-muted mb-5">
                While our forms help you create legal documents, you may need additional support or advice. 
                These national resources provide critical information for families facing emergencies.
              </p>
              
              <div className="row g-4 text-start">
                <div className="col-md-6">
                  <a href="#" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm bg-primary bg-opacity-10">
                      <div className="card-body p-4">
                        <h4 className="h6 fw-bold text-primary mb-2">
                          <i className="fa-solid fa-book-open me-2"></i> Know Your Rights
                        </h4>
                        <p className="text-dark mb-0 small">Comprehensive guide on what to do if you are approached by law enforcement or immigration officials.</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6">
                  <a href="#" className="text-decoration-none">
                    <div className="card h-100 border-0 shadow-sm bg-primary bg-opacity-10">
                      <div className="card-body p-4">
                        <h4 className="h6 fw-bold text-primary mb-2">
                          <i className="fa-solid fa-location-dot me-2"></i> Find Legal Help
                        </h4>
                        <p className="text-dark mb-0 small">Search for free or low-cost legal aid organizations in your specific state or county.</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
