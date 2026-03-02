'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../css/FamiliaEmergencia.module.css';

// Mock data for Spanish version
const availabilityData: Record<string, { name: string; guardianship: 'interview' | 'pdf'; carePlan: 'interview' | 'pdf' }> = {
  'MA': { name: 'Massachusetts', guardianship: 'interview', carePlan: 'interview' },
  'NY': { name: 'Nueva York', guardianship: 'pdf', carePlan: 'interview' },
  'TX': { name: 'Texas', guardianship: 'pdf', carePlan: 'pdf' },
  'CA': { name: 'California', guardianship: 'interview', carePlan: 'pdf' },
};

export default function FamiliaEmergenciaDesign() {
  const [selectedState, setSelectedState] = useState('');

  const currentStateData = selectedState ? availabilityData[selectedState] : null;

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Section - Warm, inviting, distinct from main site */}
      <section className={styles.heroSectionSpanish}>
        <div className={`container ${styles.heroContent}`}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="badge bg-danger mb-3 px-3 py-2 rounded-pill text-uppercase tracking-wide" style={{ letterSpacing: '1px' }}>
                Planificación Familiar
              </span>
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#1d3557' }}>
                Proteja el Futuro de su Familia
              </h1>
              <p className="lead mb-5 text-muted" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
                Cree planes legales para asegurar que sus hijos y seres queridos estén cuidados en caso de una emergencia, separación repentina o crisis médica. Herramientas gratuitas para los 50 estados.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a href="#herramientas" className={styles.btnPrimarySpanish}>
                  Encontrar Formularios
                </a>
                <a href="#recursos" className={styles.btnOutlineSpanish}>
                  Ver Recursos Nacionales
                </a>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div className="position-relative">
                <div className="bg-white p-4 rounded-circle shadow-lg d-flex align-items-center justify-content-center" style={{ width: '300px', height: '300px', border: '8px solid #f1faee' }}>
                  <i className="fa-solid fa-hands-holding-child" style={{ fontSize: '8rem', color: '#e63946' }}></i>
                </div>
                {/* Decorative elements */}
                <div className="position-absolute top-0 start-0 bg-warning rounded-circle" style={{ width: '40px', height: '40px', transform: 'translate(-20px, 20px)' }}></div>
                <div className="position-absolute bottom-0 end-0 bg-info rounded-circle" style={{ width: '60px', height: '60px', transform: 'translate(20px, -20px)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Selector - Dark, high contrast band */}
      <section className={styles.stateSelectorSpanish}>
        <div className="container text-center">
          <h2 className="h3 fw-bold mb-4">¿En qué estado vive?</h2>
          <p className="mb-4 text-light opacity-75">Las leyes varían según la ubicación. Seleccione su estado para encontrar los formularios correctos.</p>
          
          <div className="mx-auto" style={{ maxWidth: '500px' }}>
            <select 
              className="form-select form-select-lg shadow-sm" 
              style={{ borderRadius: '0.5rem', border: 'none', padding: '1rem' }}
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Seleccione su estado...</option>
              <option value="CA">California</option>
              <option value="MA">Massachusetts</option>
              <option value="NY">Nueva York</option>
              <option value="TX">Texas</option>
            </select>
          </div>
        </div>
      </section>

      {/* Dynamic Tools Grid */}
      <section id="herramientas" className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2" style={{ color: '#1d3557' }}>Herramientas Legales Esenciales</h2>
            <p className="text-muted fs-5">
              {selectedState 
                ? `Mostrando recursos disponibles para ${currentStateData?.name}` 
                : 'Seleccione un estado arriba para ver los recursos disponibles'}
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Tool 1: Tutela Temporal */}
            <div className="col-lg-4 col-md-6">
              <div className={`card h-100 p-4 ${styles.cardSpanish}`}>
                <div className={styles.iconContainer}>
                  <i className="fa-solid fa-user-shield"></i>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: '#1d3557' }}>Tutela Temporal</h3>
                <p className="text-muted mb-4 flex-grow-1">
                  Designe legalmente a alguien de confianza para cuidar a sus hijos menores si usted es detenido, hospitalizado o no está disponible.
                </p>
                <div className="mt-auto pt-3 border-top">
                  {!selectedState ? (
                    <button className="btn btn-light w-100 text-muted" disabled>
                      Seleccione un estado
                    </button>
                  ) : currentStateData?.guardianship === 'interview' ? (
                    <Link href="/familia/tutela" className={`${styles.btnPrimarySpanish} w-100 d-block text-center text-decoration-none`}>
                      <i className="fa-solid fa-desktop me-2"></i> Iniciar Entrevista
                    </Link>
                  ) : (
                    <a href="/pdfs/tutela-blanco.pdf" className={`${styles.btnOutlineSpanish} w-100 d-block text-center text-decoration-none`}>
                      <i className="fa-solid fa-file-pdf me-2"></i> Descargar PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tool 2: Plan de Cuidado Familiar */}
            <div className="col-lg-4 col-md-6">
              <div className={`card h-100 p-4 ${styles.cardSpanish}`}>
                <div className={styles.iconContainer}>
                  <i className="fa-solid fa-heart-pulse"></i>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: '#1d3557' }}>Plan de Cuidado Familiar</h3>
                <p className="text-muted mb-4 flex-grow-1">
                  Cree un documento completo que detalle instrucciones médicas, educativas y de cuidado diario para sus hijos.
                </p>
                <div className="mt-auto pt-3 border-top">
                  {!selectedState ? (
                    <button className="btn btn-light w-100 text-muted" disabled>
                      Seleccione un estado
                    </button>
                  ) : currentStateData?.carePlan === 'interview' ? (
                    <Link href="/familia/plan-cuidado" className={`${styles.btnPrimarySpanish} w-100 d-block text-center text-decoration-none`}>
                      <i className="fa-solid fa-desktop me-2"></i> Crear Plan
                    </Link>
                  ) : (
                    <a href="/pdfs/plan-cuidado-blanco.pdf" className={`${styles.btnOutlineSpanish} w-100 d-block text-center text-decoration-none`}>
                      <i className="fa-solid fa-file-pdf me-2"></i> Descargar PDF
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Tool 3: Habeas Corpus */}
            <div className="col-lg-4 col-md-6">
              <div className={`card h-100 p-4 ${styles.cardSpanish}`} style={{ backgroundColor: '#fdfbf7' }}>
                <div className={styles.iconContainer} style={{ backgroundColor: '#e9ecef', color: '#6c757d' }}>
                  <i className="fa-solid fa-scale-balanced"></i>
                </div>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h4 fw-bold mb-0 text-muted">Habeas Corpus</h3>
                  <span className="badge bg-secondary">Próximamente</span>
                </div>
                <p className="text-muted mb-4 flex-grow-1">
                  Una herramienta nacional para impugnar la detención ilegal. Actualmente en desarrollo para uso en todo el país.
                </p>
                <div className="mt-auto pt-3 border-top">
                  <button className="btn btn-light w-100 text-muted" disabled>
                    En Desarrollo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Resources Section - List style */}
      <section id="recursos" className="py-5 bg-white">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <h2 className="fw-bold mb-4" style={{ color: '#1d3557' }}>Recursos y Apoyo Nacional</h2>
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem' }}>
                Aunque nuestros formularios le ayudan a crear documentos legales, es posible que necesite apoyo o asesoramiento adicional. 
                Estos recursos nacionales proporcionan información crítica para familias que enfrentan emergencias.
              </p>
              <Link href="/" className="text-decoration-none fw-bold" style={{ color: '#e63946' }}>
                <i className="fa-solid fa-arrow-left me-2"></i> Volver al sitio principal (Inglés)
              </Link>
            </div>
            
            <div className="col-lg-6 offset-lg-1">
              <div className={styles.resourceCard}>
                <h4 className="h5 fw-bold mb-2" style={{ color: '#1d3557' }}>Conozca sus Derechos</h4>
                <p className="text-muted mb-2 small">Guía completa sobre qué hacer si es abordado por las fuerzas del orden o funcionarios de inmigración.</p>
                <a href="#" className={styles.resourceLink}>Leer guía <i className="fa-solid fa-arrow-right ms-1"></i></a>
              </div>
              
              <div className={styles.resourceCard}>
                <h4 className="h5 fw-bold mb-2" style={{ color: '#1d3557' }}>Directorio de Ayuda Legal</h4>
                <p className="text-muted mb-2 small">Busque organizaciones de asistencia legal gratuitas o de bajo costo en su estado o condado específico.</p>
                <a href="#" className={styles.resourceLink}>Buscar ayuda <i className="fa-solid fa-arrow-right ms-1"></i></a>
              </div>

              <div className={styles.resourceCard}>
                <h4 className="h5 fw-bold mb-2" style={{ color: '#1d3557' }}>Preparación para Emergencias</h4>
                <p className="text-muted mb-2 small">Pasos prácticos para organizar sus documentos importantes y preparar a su familia.</p>
                <a href="#" className={styles.resourceLink}>Ver lista de verificación <i className="fa-solid fa-arrow-right ms-1"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
