import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs } from '../../../data/getBlogPosts';
import styles from '../../css/Blog.module.css';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  // Split each slug by '/' to create array segments for catch-all route
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slugPath = params.slug.join('/');
  const post = getBlogPostBySlug(slugPath);
  if (!post) {
    return {
      title: 'Post Not Found - Court Forms Online',
    };
  }
  return {
    title: `${post.title} - Court Forms Online Blog`,
    description: post.summary,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const slugPath = params.slug.join('/');
  const post = getBlogPostBySlug(slugPath);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.blogPost + ' container'}>
      <Link href="/blog" className={styles.backLink + ' btn btn-link'}>
        ← Back to Blog
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
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {post.author && <> · By {post.author}</>}
          </p>
        </header>

        <div className={styles.blogPostContent}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
