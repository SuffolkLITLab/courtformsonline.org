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
  // Note: legal help UI is rendered at the page-level (see `LegalResourceLink`) to avoid duplication.
}

const SimilarForms = ({
  forms = [],
  basePath,
  topics = [],
  jurisdictionPath,
}: SimilarFormsProps) => {
  if ((!forms || forms.length === 0) && topics.length === 0) {
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

  // Avoid showing any "Get legal help" entries in the similar-forms list
  // so legal help is only surfaced via the dedicated page-level component.
  const visibleForms = (forms || []).filter(
    (f) => !f.title.toLowerCase().startsWith('get legal help')
  );

  return (
    <div className={styles.SimilarFormsCard}>
      {visibleForms && visibleForms.length > 0 && (
        <>
          <h3 className={styles.Title}>Similar forms</h3>
          <ul className={styles.FormList}>
            {visibleForms.map((form) => (
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
      <div className={styles.GuideContainer}>
        <Link
          href={
            jurisdictionPath
              ? `/${jurisdictionPath}/guides/choosing-right-form`
              : `/guides/choosing-right-form`
          }
          className={styles.GuideLink}
        >
          How to select the right court form
        </Link>
      </div>
      {/* Legal help is intentionally rendered at the page level to avoid duplicate
          jurisdiction- and topic-level legal help blocks. */}
    </div>
  );
};

export default SimilarForms;
