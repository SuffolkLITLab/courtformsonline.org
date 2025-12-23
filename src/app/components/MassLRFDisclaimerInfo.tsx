'use client';

import React from 'react';
import styles from '../css/LegalResourceLink.module.css';

/**
 * MassLRF (Massachusetts Legal Resource Finder) disclaimer and information
 * Explains that results are from free, income-qualified resources in Massachusetts
 */
const MassLRFDisclaimerInfo = () => {
  return (
    <div className={styles.DisclaimerInfo}>
      <p className={styles.DisclaimerText}>
        Legal help results from the Massachusetts Legal Resource Finder include
        referrals to legal aid organizations, pro bono programs, and other
        community resources that may be able to help you, including by
        representing you in court. All resources are free and may have income
        limits or other special eligibility requirements.
      </p>
    </div>
  );
};

export default MassLRFDisclaimerInfo;
