import { message, type Locale } from '../../i18n/messages';
import { blogPath } from '../../i18n/routes';
import Link from 'next/link';
import Image from 'next/image';
import { getLatestBlogPosts } from '../../data/getBlogPosts';
import { getWordPressFeed, WordPressPost } from '../../data/getWordPressFeed';
import { SYNDICATED_FEEDS } from '../../config/constants';
import styles from '../css/Blog.module.css';

interface BlogPreviewProps {
  count?: number;
  locale?: Locale;
}

interface SyndicatedFeedData {
  name: string;
  url: string;
  blogUrl?: string;
  posts: WordPressPost[];
}

export default async function BlogPreview({
  count = 3,
  locale = 'en',
}: BlogPreviewProps) {
  const posts = getLatestBlogPosts(count, locale);

  // Fetch syndicated feeds
  const syndicatedFeeds: SyndicatedFeedData[] = await Promise.all(
    Object.values(SYNDICATED_FEEDS).map(async (feed) => ({
      name: feed.name,
      url: feed.url,
      blogUrl: feed.blogUrl,
      posts: await getWordPressFeed(feed.url, 5),
    }))
  );

  if (
    posts.length === 0 &&
    syndicatedFeeds.every((f) => f.posts.length === 0)
  ) {
    return null;
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">
          {message(locale, 'home.latestNews')}
        </h2>
        <div className="row">
          {posts.map((post) => (
            <div key={post.slug} className="col-md-4 mb-4">
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
                    {new Date(post.date).toLocaleDateString(
                      locale === 'es' ? 'es-US' : 'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </p>
                  <h3 className="h6 card-title">
                    <Link
                      href={blogPath(post.locale, post.slug)}
                      lang={post.locale}
                      hrefLang={post.locale}
                      className="text-decoration-none"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p
                    lang={post.locale}
                    className={styles.blogSummary + ' card-text small'}
                  >
                    {post.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {syndicatedFeeds.map(
            (feed) =>
              feed.posts.length > 0 && (
                <div key={feed.name} className="col-md-4 mb-4">
                  <div className={styles.blogCard + ' card h-100'}>
                    <div className="card-header bg-white border-bottom-0 pt-4 pb-2">
                      <h3 className="h5 mb-0">
                        {message(locale, 'home.moreNewsFrom', {
                          name: feed.name,
                        })}
                      </h3>
                    </div>
                    <div className="list-group list-group-flush">
                      {feed.posts.slice(0, 5).map((post, index) => (
                        <Link
                          key={index}
                          href={post.link}
                          hrefLang="en"
                          className="list-group-item list-group-item-action border-0 px-3 py-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="d-flex flex-column">
                            <span className="text-primary" lang="en">
                              {post.title}
                            </span>
                            {post.date && (
                              <small className="text-muted">
                                {new Date(post.date).toLocaleDateString(
                                  locale === 'es' ? 'es-US' : 'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  }
                                )}
                              </small>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="card-footer bg-transparent border-0 text-center pb-3">
                      <Link
                        href={feed.blogUrl || feed.url}
                        hrefLang="en"
                        target="_blank"
                        className="btn btn-sm btn-outline-secondary"
                      >
                        {message(locale, 'home.viewAll')}
                      </Link>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>

        <div className="text-center mt-4">
          <Link href={blogPath(locale)} className="btn btn-outline-primary">
            {message(locale, 'blog.all')}
          </Link>
        </div>
      </div>
    </section>
  );
}
