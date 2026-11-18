import Link from 'next/link';
import Image from 'next/image';
import { message, type Locale } from '../../i18n/messages';
import { blogPath } from '../../i18n/routes';
import { getAllBlogPosts } from '../../data/getBlogPosts';
import { getWordPressFeed, WordPressPost } from '../../data/getWordPressFeed';
import { SYNDICATED_FEEDS } from '../../config/constants';
import styles from '../css/Blog.module.css';

interface SyndicatedFeedData {
  name: string;
  posts: WordPressPost[];
}

export default async function BlogIndex({ locale }: { locale: Locale }) {
  const posts = getAllBlogPosts(locale);

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
          {message(locale, 'blog.subtitle')}
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted">
          {message(locale, 'blog.empty')}
        </p>
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
                    {new Date(post.date).toLocaleDateString(locale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h2 className="h5 card-title" lang={post.locale}>
                    <Link
                      href={blogPath(post.locale, post.slug)}
                      hrefLang={post.locale}
                      className="text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p
                    className={styles.blogSummary + ' card-text'}
                    lang={post.locale}
                  >
                    {post.summary}
                  </p>
                  {post.author && (
                    <p className={styles.blogAuthor}>
                      {message(locale, 'blog.author', { author: post.author })}
                    </p>
                  )}
                </div>
                <div className="card-footer bg-transparent border-0">
                  <Link
                    href={blogPath(post.locale, post.slug)}
                    hrefLang={post.locale}
                    className="btn btn-outline-primary btn-sm"
                  >
                    {message(
                      locale,
                      post.locale === locale ? 'blog.read' : 'blog.readEnglish'
                    )}
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
              <h2 className={styles.syndicatedTitle}>
                {message(locale, 'home.moreNewsFrom', { name: feed.name })}
              </h2>
              <ul className={styles.syndicatedList}>
                {feed.posts.map((post, index) => (
                  <li key={index} className={styles.syndicatedItem}>
                    <Link
                      href={post.link}
                      hrefLang="en"
                      lang="en"
                      className={styles.syndicatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </Link>
                    {post.date && (
                      <span className={styles.syndicatedDate}>
                        {new Date(post.date).toLocaleDateString(locale, {
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
