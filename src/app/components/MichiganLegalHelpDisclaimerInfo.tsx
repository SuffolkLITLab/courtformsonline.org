'use client';

import React from 'react';
import styles from '../css/LegalResourceLink.module.css';

/**
 * Michigan Legal Help disclaimer and information
 * Explains what the Guide to Legal Help provides for Michigan residents
 */
const MichiganLegalHelpDisclaimerInfo = () => {
  return (
    <div className={styles.DisclaimerInfo}>
      <p className={styles.DisclaimerText}>
        Michigan Legal Help&apos;s Guide to Legal Help connects you with free or
        low-cost legal resources, including legal aid organizations and
        self-help tools, based on your situation and location in Michigan.
      </p>
    </div>
  );
};

export default MichiganLegalHelpDisclaimerInfo;
