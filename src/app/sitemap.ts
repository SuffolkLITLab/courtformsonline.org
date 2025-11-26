import { MetadataRoute } from 'next';
import { pathToServerConfig } from '../config/formSources.config';
import { legalTopics } from '../config/topics.config';
import { fetchInterviews } from '../data/fetchInterviewData';
import { toUrlFriendlyString } from './utils/helpers';
import { prefix } from '../../prefix';

const defaultSiteUrl = 'https://courtformsonline.org';

const joinWithPrefix = (route: string) => {
  // prefix may be '', or '/somepath'
  const p = prefix || '';
  if (!p) return route;
  // ensure prefix starts with '/'
  const normalized = p.startsWith('/') ? p : `/${p}`;
  return `${normalized}${route}`;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl;
  const urls = new Set<string>();

  // Static top-level pages
  const staticRoutes = ['/', '/about', '/forms', '/privacy'];
  for (const r of staticRoutes) {
    urls.add(`${siteUrl}${joinWithPrefix(r)}`);
  }

  // For all paths defined in config, create path-level pages and fetch interviews
  const paths = Object.keys(pathToServerConfig);

  await Promise.all(
    paths.map(async (p) => {
      const pathBase = `/${p}`;
      urls.add(`${siteUrl}${joinWithPrefix(pathBase)}`);
      urls.add(`${siteUrl}${joinWithPrefix(`${pathBase}/forms`)}`);

      try {
        const { interviewsByTopic } = await fetchInterviews(p);

        // Topics
        for (const topic of legalTopics) {
          urls.add(
            `${siteUrl}${joinWithPrefix(
              `${pathBase}/${topic.name.toLowerCase()}`
            )}`
          );
        }

        // Forms - iterate interviewsByTopic
        Object.keys(interviewsByTopic).forEach((topic) => {
          const interviews = interviewsByTopic[topic] || [];
          interviews.forEach((interview) => {
            const slug = toUrlFriendlyString(interview.title);
            urls.add(
              `${siteUrl}${joinWithPrefix(`${pathBase}/forms/${slug}`)}`
            );
          });
        });
      } catch (e) {
        console.error('Failed to fetch interviews for sitemap path', p, e);
      }
    })
  );

  const urlList = Array.from(urls).sort();

  return urlList.map((url) => ({
    url,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}
