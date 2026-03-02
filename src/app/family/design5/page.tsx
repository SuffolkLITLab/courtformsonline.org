'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../css/ManyForms.module.css';

// Mock data for 6 national forms
const formsData = [
  {
    id: 'guardianship',
    title: 'Temporary Guardianship',
    description: 'Legally appoint someone you trust to care for your minor children if you are detained, hospitalized, or unavailable.',
    category: 'children',
    icon: 'fa-user-shield',
    color: 'primary',
    status: 'available'
  },
  {
    id: 'care-plan',
    title: 'Family Care Plan',
    description: 'Create a comprehensive document outlining medical, educational, and daily care instructions for your children.',
    category: 'children',
    icon: 'fa-heart-pulse',
    color: 'success',
    status: 'available'
  },
  {
    id: 'habeas',
    title: 'Habeas Corpus Petition',
    description: 'A national tool to challenge unlawful detention. Currently in development for nationwide use.',
    category: 'immigration',
    icon: 'fa-scale-balanced',
    color: 'secondary',
    status: 'coming-soon'
  },
  {
    id: 'poa',
    title: 'Power of Attorney (Financial)',
    description: 'Authorize a trusted person to manage your finances, pay bills, and handle property if you cannot.',
    category: 'financial',
    icon: 'fa-file-invoice-dollar',
    color: 'warning',
    status: 'available'
  },
  {
    id: 'medical-proxy',
    title: 'Health Care Proxy',
    description: 'Name someone to make medical decisions on your behalf if you become incapacitated.',
    category: 'medical',
    icon: 'fa-notes-medical',
    color: 'info',
    status: 'available'
  },
  {
    id: 'travel-consent',
    title: 'Child Travel Consent',
    description: 'Provide legal permission for your child to travel domestically or internationally with another adult.',
    category: 'children',
    icon: 'fa-plane-departure',
    color: 'danger',
    status: 'available'
  }
];

export default function ManyFormsDesign() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredForms = activeFilter === 'all' 
    ? formsData 
    : formsData.filter(form => form.category === activeFilter);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Minimal Header just for context */}
      <div className="bg-white border-bottom py-4 mb-5">
        <div className="container text-center">
          <h1 className="h3 fw-bold mb-2">National Forms Library</h1>
          <p className="text-muted mb-0">Showing how 5-6 forms would look in two different layouts.</p>
        </div>
      </div>

      <div className="container">
        
        {/* ==========================================
            OPTION 1: FILTERABLE GRID (Best for visual browsing)
            ========================================== */}
        <div className="mb-5 pb-5 border-bottom">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="badge bg-primary mb-2">Option 1</span>
              <h2 className="fw-bold mb-1">Filterable Grid Layout</h2>
              <p className="text-muted mb-0">Best when you have 5-8 forms. Uses categories to help users find what they need quickly.</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="d-flex gap-2 flex-wrap mb-4">
            <button 
              className={`${styles.filterButton} ${activeFilter === 'all' ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Forms
            </button>
            <button 
              className={`${styles.filterButton} ${activeFilter === 'children' ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter('children')}
            >
              Child Care & Custody
            </button>
            <button 
              className={`${styles.filterButton} ${activeFilter === 'financial' ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter('financial')}
            >
              Financial
            </button>
            <button 
              className={`${styles.filterButton} ${activeFilter === 'medical' ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter('medical')}
            >
              Medical
            </button>
          </div>

          {/* Grid */}
          <div className="row g-4">
            {filteredForms.map((form) => (
              <div key={`grid-${form.id}`} className="col-md-6 col-lg-4">
                <div className={`card border-0 shadow-sm p-4 ${styles.gridCard}`}>
                  <div className="d-flex justify-content-between align-items-start">
                    <div className={`${styles.iconBoxGrid} bg-${form.color} bg-opacity-10 text-${form.color}`}>
                      <i className={`fa-solid ${form.icon}`}></i>
                    </div>
                    {form.status === 'coming-soon' && (
                      <span className="badge bg-secondary">Coming Soon</span>
                    )}
                  </div>
                  
                  <h3 className="h5 fw-bold mb-2">{form.title}</h3>
                  <p className="text-muted small mb-4 flex-grow-1">{form.description}</p>
                  
                  <div className="mt-auto">
                    <button 
                      className={`btn btn-${form.status === 'coming-soon' ? 'outline-secondary' : 'outline-primary'} w-100 fw-bold`}
                      disabled={form.status === 'coming-soon'}
                    >
                      {form.status === 'coming-soon' ? 'In Development' : 'Start Form'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            OPTION 2: COMPACT LIST (Best for scanning)
            ========================================== */}
        <div className="pt-4">
          <div className="mb-4">
            <span className="badge bg-success mb-2">Option 2</span>
            <h2 className="fw-bold mb-1">Compact List Layout</h2>
            <p className="text-muted mb-0">Best when you have 6+ forms and want users to scan titles and descriptions rapidly without scrolling too much.</p>
          </div>

          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="list-group list-group-flush">
              {formsData.map((form) => (
                <div key={`list-${form.id}`} className={`list-group-item p-4 ${styles.listCard}`}>
                  <div className="row align-items-center">
                    
                    {/* Icon & Text */}
                    <div className="col-md-8 col-lg-9 d-flex gap-4 align-items-start">
                      <div className={`${styles.iconBox} bg-${form.color} bg-opacity-10 text-${form.color} flex-shrink-0`}>
                        <i className={`fa-solid ${form.icon}`}></i>
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h3 className="h5 fw-bold mb-0">{form.title}</h3>
                          {form.status === 'coming-soon' && (
                            <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>Coming Soon</span>
                          )}
                        </div>
                        <p className="text-muted mb-0">{form.description}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="col-md-4 col-lg-3 text-md-end mt-3 mt-md-0">
                      <button 
                        className={`btn btn-${form.status === 'coming-soon' ? 'light text-muted' : 'primary'} fw-bold px-4`}
                        disabled={form.status === 'coming-soon'}
                      >
                        {form.status === 'coming-soon' ? 'In Development' : 'Start Form'}
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
