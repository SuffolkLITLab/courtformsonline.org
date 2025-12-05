import Link from 'next/link';
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

  return (
    <div className={styles.SimilarFormsCard}>
      <h3 className={styles.Title}>Similar forms</h3>
      <ul className={styles.FormList}>
        {forms.map((form) => (
          <li key={form.slug} className={styles.FormItem}>
            <Link href={`${basePath}/${form.slug}`} className={styles.FormLink}>
              {form.title}
            </Link>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default SimilarForms;
