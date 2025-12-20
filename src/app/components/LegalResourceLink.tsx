'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../css/LegalResourceLink.module.css';

interface LegalResourceLinkProps {
  topic: string;
  jurisdiction: string;
  deepLink: string | null;
}

const LegalResourceLink = ({
  topic,
  jurisdiction,
  deepLink,
}: LegalResourceLinkProps) => {
  // Don't render if no link found
  if (!deepLink) {
    return null;
  }

  return (
    <div className={styles.LegalResourceLink}>
      <div className={styles.Card}>
        <h3 className={styles.Heading}>
          Find a lawyer or other free legal help
        </h3>
        <p className={styles.Description}>
          Get connected to legal aid organizations and other resources in{' '}
          {jurisdiction}
        </p>
        <Link href={deepLink} target="_blank" rel="noopener noreferrer">
          <button className={styles.Button}>Get legal help for {topic}</button>
        </Link>
      </div>
    </div>
  );
};

export default LegalResourceLink;
