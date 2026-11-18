'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { message, type Locale } from '../../i18n/messages';
import styles from '../css/LegalResourceLink.module.css';

interface LegalResourceLinkProps {
  locale?: Locale;
  topic: string;
  jurisdiction: string;
  deepLink: string | null;
  disclaimerInfo?: ReactNode;
}

const LegalResourceLink = ({
  locale = 'en',
  topic,
  jurisdiction,
  deepLink,
  disclaimerInfo,
}: LegalResourceLinkProps) => {
  // Don't render if no link found
  if (!deepLink) {
    return null;
  }

  return (
    <div className={styles.LegalResourceLink}>
      <div className={styles.Card}>
        <h3 className={styles.Heading}>
          {message(locale, 'forms.helpHeading')}
        </h3>
        <p className={styles.Description}>
          {message(locale, 'forms.helpDescription', { state: jurisdiction })}
        </p>
        <Link href={deepLink} target="_blank" rel="noopener noreferrer">
          <button className={styles.Button}>
            {message(locale, 'forms.getHelp', { topic })}
          </button>
        </Link>
        {disclaimerInfo && <div lang="en">{disclaimerInfo}</div>}
      </div>
    </div>
  );
};

export default LegalResourceLink;
