import Link from 'next/link';
import type { Metadata } from 'next';
import { message, type Locale } from '../../i18n/messages';
import { blogPath, languageAlternates } from '../../i18n/routes';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '../../data/getBlogPosts';
import MarkdownContent from './MarkdownContent';
import styles from '../css/Blog.module.css';

export function blogPostMetadata(slug: string, locale: Locale): Metadata {
  const post = getBlogPostBySlug(slug, locale);
  if (!post) {
    return {
      title: message(locale, 'blog.postMissing'),
    };
  }
  return {
    title: message(locale, 'blog.postTitle', { title: post.title }),
    alternates:
      getBlogPostBySlug(slug, 'es')?.locale === 'es'
        ? languageAlternates(blogPath('en', slug), blogPath('es', slug), locale)
        : undefined,
    description: post.summary,
  };
}

export default function BlogArticle({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const post = getBlogPostBySlug(slug, locale);

  if (!post || post.locale !== locale) {
    notFound();
  }

  return (
    <div className={styles.blogPost + ' container'}>
      <Link
        href={blogPath(locale)}
        className={styles.backLink + ' btn btn-link'}
      >
        {message(locale, 'blog.back')}
      </Link>

      <article>
        <header className={styles.blogPostHeader}>
          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              className={styles.blogHeroImage}
            />
          )}
          <h1 className={styles.blogPostTitle}>{post.title}</h1>
          <p className={styles.blogPostMeta}>
            {new Date(post.date).toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {post.author && (
              <> · {message(locale, 'blog.author', { author: post.author })}</>
            )}
          </p>
        </header>

        <div className={styles.blogPostContent}>
          <MarkdownContent>{post.content}</MarkdownContent>
        </div>
      </article>
    </div>
  );
}
