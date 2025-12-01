import React from 'react';
import styles from '../css/FormStatus.module.css';

interface FormStatusProps {
  maturity?: string | null;
  efilingEnabled?: boolean | 'email' | null;
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    return dateStr;
  }
}

const FormStatus = ({ maturity, efilingEnabled }: FormStatusProps) => {
  const mat = (maturity || '').toLowerCase();

  const badgeInfo = (() => {
    switch (mat) {
      case 'preview':
        return { label: 'Preview', className: 'text-bg-info text-dark' };
      case 'testing':
        return { label: 'Testing', className: 'text-bg-info text-dark' };
      case 'development':
        return {
          label: 'Development',
          className: 'text-bg-warning text-white',
        };
      default:
        return null;
    }
  })();

  const efilingBadgeInfo = (() => {
    if (efilingEnabled === 'email') {
      return {
        label: 'Email filing available',
        className: 'text-bg-success text-white',
      };
    } else if (efilingEnabled === true) {
      return {
        label: 'E-filing available',
        className: 'text-bg-success text-white',
      };
    }
    return null;
  })();

  return (
    <div className={styles.FormStatus}>
      {badgeInfo ? (
        <div className={styles.StatusBox} aria-hidden>
          <span
            className={`badge ${badgeInfo.className} ${styles.statusBadge}`}
          >
            {badgeInfo.label}
          </span>
        </div>
      ) : null}
      {efilingBadgeInfo ? (
        <div className={styles.StatusBox}>
          <span
            className={`badge ${efilingBadgeInfo.className} ${styles.statusBadge}`}
          >
            {efilingBadgeInfo.label}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default FormStatus;
