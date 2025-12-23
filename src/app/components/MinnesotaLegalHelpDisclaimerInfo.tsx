'use client';

import React from 'react';
import styles from '../css/LegalResourceLink.module.css';

/**
 * Minnesota Legal Help disclaimer and information
 * Provides information about LawHelpMN legal resources
 */
const MinnesotaLegalHelpDisclaimerInfo = () => {
  return (
    <div className={styles.DisclaimerInfo}>
      <p className={styles.DisclaimerText}>
        LawHelpMN connects you with free or reduced-cost legal services,
        including legal aid organizations and self-help resources, based on your
        location and legal issue in Minnesota.
      </p>
    </div>
  );
};

export default MinnesotaLegalHelpDisclaimerInfo;
