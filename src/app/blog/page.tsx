import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllBlogPosts } from '../../data/getBlogPosts';
import { getWordPressFeed, WordPressPost } from '../../data/getWordPressFeed';
import { SYNDICATED_FEEDS } from '../../config/constants';
import styles from '../css/Blog.module.css';

export const metadata: Metadata = {
  title: 'Blog - Court Forms Online',
  description:
    'News and updates from Court Forms Online, tips for completing legal forms, and access to justice resources.',
};

interface SyndicatedFeedData {
  name: string;
  posts: WordPressPost[];
}

export default async function BlogPage() {
  const posts = getAllBlogPosts();

  // Fetch all configured syndicated feeds
  const syndicatedFeeds: SyndicatedFeedData[] = await Promise.all(
    Object.values(SYNDICATED_FEEDS).map(async (feed) => ({
      name: feed.name,
      posts: await getWordPressFeed(feed.url, 5),
    }))
  );

  return (
    <div className={styles.blogContainer + ' container'}>
      <div className={styles.blogHeader}>
        <h1 className="text-center mb-3">Blog</h1>
        <p className="lead text-center text-muted">
          News, updates, and tips from Court Forms Online
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted">No blog posts yet.</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.slug} className="col-md-6 col-lg-4 mb-4">
              <div className={styles.blogCard + ' card h-100'}>
                {post.image && (
                  <div className={styles.blogImageContainer}>
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      className={styles.blogImage}
                      fill
                    />
                  </div>
                )}
                <div className="card-body">
                  <p className={styles.blogDate}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h2 className="h5 card-title">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className={styles.blogSummary + ' card-text'}>
                    {post.summary}
                  </p>
                  {post.author && (
                    <p className={styles.blogAuthor}>By {post.author}</p>
                  )}
                </div>
                <div className="card-footer bg-transparent border-0">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {syndicatedFeeds.map(
        (feed) =>
          feed.posts.length > 0 && (
            <div key={feed.name} className={styles.syndicatedSection}>
              <h2 className={styles.syndicatedTitle}>More from {feed.name}</h2>
              <ul className={styles.syndicatedList}>
                {feed.posts.map((post, index) => (
                  <li key={index} className={styles.syndicatedItem}>
                    <Link
                      href={post.link}
                      className={styles.syndicatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </Link>
                    {post.date && (
                      <span className={styles.syndicatedDate}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
}
