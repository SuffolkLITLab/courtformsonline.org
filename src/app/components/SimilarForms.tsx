import Link from 'next/link';
import React from 'react';
import styles from '../css/SimilarForms.module.css';

interface RelatedForm {
  title: string;
  slug: string;
  similarity: number;
}

interface TopicLink {
  name: string;
  long_name: string;
}

interface SimilarFormsProps {
  forms?: RelatedForm[];
  basePath: string; // e.g., "/ma/forms"
  topics?: TopicLink[]; // top-level topics matching the form
  jurisdictionPath?: string; // e.g., "ma", used to build topic landing links
  legalHelpLink?: string; // URL to jurisdiction's legal help resource
  legalHelpDisclaimerComponent?: React.ComponentType; // Disclaimer component for legal help
  jurisdictionName?: string; // Full name of jurisdiction for display
}

const SimilarForms = ({
  forms = [],
  basePath,
  topics = [],
  jurisdictionPath,
  legalHelpLink,
  legalHelpDisclaimerComponent,
  jurisdictionName,
}: SimilarFormsProps) => {
  if ((!forms || forms.length === 0) && topics.length === 0 && !legalHelpLink) {
    return null;
  }

  // Deduplicate topics just in case and preserve order
  const dedupedTopics = [] as TopicLink[];
  const seen = new Set<string>();
  for (const t of topics) {
    if (!seen.has(t.name)) {
      seen.add(t.name);
      dedupedTopics.push(t);
    }
  }

  return (
    <div className={styles.SimilarFormsCard}>
      {forms && forms.length > 0 && (
        <>
          <h3 className={styles.Title}>Similar forms</h3>
          <ul className={styles.FormList}>
            {forms.map((form) => (
              <li key={form.slug} className={styles.FormItem}>
                <Link
                  href={`${basePath}/${form.slug}`}
                  className={styles.FormLink}
                >
                  {form.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {dedupedTopics.length > 0 && (
        <div className={styles.CategoryContainer}>
          {dedupedTopics.map((topic, idx) => (
            <div key={`${topic.name}-${idx}`} className={styles.CategoryItem}>
              <Link
                href={
                  jurisdictionPath
                    ? `/${jurisdictionPath}/${topic.name}`
                    : `/${topic.name}`
                }
                className={styles.CategoryLink}
              >
                View all {topic.long_name.toLowerCase()} forms
              </Link>
            </div>
          ))}
        </div>
      )}
      {legalHelpLink && (
        <div className={styles.LegalHelpContainer}>
          <a
            href={legalHelpLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.LegalHelpLink}
          >
            {jurisdictionName
              ? `Get legal help in ${jurisdictionName}`
              : 'Get legal help'}
          </a>
          {legalHelpDisclaimerComponent && (
            <div className={styles.DisclaimerText}>
              <legalHelpDisclaimerComponent />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimilarForms;
