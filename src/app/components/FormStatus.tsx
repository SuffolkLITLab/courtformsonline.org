import React from 'react';
import styles from '../css/FormStatus.module.css';

interface FormStatusProps {
  maturity?: string | null;
  efilingEnabled?: boolean | 'email' | null;
  integratedEfiling?: boolean | null;
  integratedEmailFiling?: boolean | null;
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

function resolveEfilingStatus({
  efilingEnabled,
  integratedEfiling,
  integratedEmailFiling,
}: Pick<
  FormStatusProps,
  'efilingEnabled' | 'integratedEfiling' | 'integratedEmailFiling'
>): boolean | 'email' | null | undefined {
  if (integratedEmailFiling === true) return 'email';
  if (integratedEfiling === true) return true;
  if (integratedEmailFiling === false) return false;
  if (integratedEfiling === false) return false;
  return efilingEnabled;
}

const FormStatus = ({
  maturity,
  efilingEnabled,
  integratedEfiling,
  integratedEmailFiling,
}: FormStatusProps) => {
  const mat = (maturity || '').toLowerCase();
  const effectiveEfilingStatus = resolveEfilingStatus({
    efilingEnabled,
    integratedEfiling,
    integratedEmailFiling,
  });

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
    if (effectiveEfilingStatus === 'email') {
      return {
        label: 'Email filing available',
        className: 'text-bg-success text-white',
      };
    } else if (effectiveEfilingStatus === true) {
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
