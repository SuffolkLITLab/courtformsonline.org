'use client';

import React from 'react';
import styles from '../css/LegalResourceLink.module.css';

/**
 * Missouri Legal Help disclaimer and information
 * Provides information about Missouri LawHelp legal resources
 */
const MissouriLegalHelpDisclaimerInfo = () => {
  return (
    <div className={styles.DisclaimerInfo}>
      <p className={styles.DisclaimerText}>
        Missouri LawHelp, powered by Missouri Poverty Law Services, provides
        access to legal aid programs, self-help forms, and information to help
        you resolve legal issues. Visit their site to find free or reduced-cost
        legal services in your area.
      </p>
    </div>
  );
};

export default MissouriLegalHelpDisclaimerInfo;
