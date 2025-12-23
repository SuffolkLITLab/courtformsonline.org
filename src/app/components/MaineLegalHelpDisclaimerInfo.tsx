'use client';

import React from 'react';
import styles from '../css/LegalResourceLink.module.css';

/**
 * Maine Legal Help disclaimer and information
 * Provides information about contacting Pine Tree Legal Assistance
 */
const MaineLegalHelpDisclaimerInfo = () => {
  return (
    <div className={styles.DisclaimerInfo}>
      <p className={styles.DisclaimerText}>
        Pine Tree Legal Assistance provides free legal services to eligible
        low-income individuals in Maine. Contact them to learn if you qualify
        and how they can help with your legal issue.
      </p>
    </div>
  );
};

export default MaineLegalHelpDisclaimerInfo;
