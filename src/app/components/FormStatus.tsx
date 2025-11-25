import React from 'react';
import styles from '../css/FormStatus.module.css';

interface FormStatusProps {
  maturity?: string | null;
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

const FormStatus = ({ maturity, reviewDate }: FormStatusProps) => {
  const mat = (maturity || '').toLowerCase();

  const badgeInfo = (() => {
    switch (mat) {
      case 'preview':
        return { label: 'Preview', className: 'text-bg-info text-dark' };
      case 'testing':
        return { label: 'Testing', className: 'text-bg-info text-dark' };
      case 'development':
        return { label: 'Development', className: 'text-bg-warning text-white' };
      default:
        return null;
    }
  })();

  return (
    <div className={styles.FormStatus}>
      {badgeInfo ? (
        <div className={styles.StatusBox} aria-hidden>
          <span className={`badge ${badgeInfo.className} ${styles.statusBadge}`}>
            {badgeInfo.label}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default FormStatus;
