import type { Metadata } from 'next';
import type { Locale } from './messages';
import { DEFAULT_PATH, getAvailableJurisdictions } from '../utils/jurisdiction';
import { legalTopics } from '../config/topics.config';
import { toUrlFriendlyString } from '../app/utils/helpers';

export function spanishLandingPath(path: string) {
  return path === DEFAULT_PATH ? '/es' : `/es/${path}`;
}

export function blogPath(locale: Locale, slug?: string) {
  return `${locale === 'es' ? '/es' : ''}/blog${slug ? `/${slug}` : ''}`;
}

const home = { en: `/${DEFAULT_PATH}`, es: '/es' };
const states = getAvailableJurisdictions();
const localizedPages = [
  ...states.map(({ path }) => ({
    en: `/${path}`,
    es: spanishLandingPath(path),
  })),
  ...states.map(({ path }) => ({
    en: formsPath('en', path),
    es: formsPath('es', path),
  })),
  { en: '/forms', es: '/es/forms' },
  { en: '/family', es: '/es/family' },
  { en: '/blog', es: '/es/blog' },
];

export const spanishSitemapPaths = localizedPages.map((page) => page.es);

export function formsPath(locale: Locale, path?: string) {
  return `${locale === 'es' ? '/es' : ''}${path ? `/${path}` : ''}/forms`;
}

export function topicPath(locale: Locale, path: string, topic: string) {
  return `${locale === 'es' ? '/es' : ''}/${path}/${topic}`;
}

export function formDetailsPath(locale: Locale, path: string, title: string) {
  return `/${path}/forms/${toUrlFriendlyString(title)}${locale === 'es' ? '?lang=es' : ''}`;
}

export function alternateLanguagePath(
  pathname: string,
  locale: Locale,
  translatedBlogSlugs: string[] = []
) {
  const otherLocale = locale === 'en' ? 'es' : 'en';
  const path = pathname.replace(/\/$/, '');
  const translated = localizedPages.find((page) => page[locale] === path);
  if (translated) return translated[otherLocale];
  const statePath = (locale === 'es' ? path.slice(4) : path.slice(1)).split(
    '/'
  );
  const [state, section, form] = statePath;
  if (states.some(({ path }) => path === state)) {
    if (
      statePath.length === 2 &&
      legalTopics.some((topic) => topic.name === section)
    ) {
      return topicPath(otherLocale, state, section);
    }
    if (locale === 'en' && section === 'forms' && form) {
      return `${formsPath('es', state)}#${form}`;
    }
  }
  const blogPrefix = `${blogPath(locale)}/`;
  if (path.startsWith(blogPrefix)) {
    const slug = path.slice(blogPrefix.length);
    return blogPath(
      otherLocale,
      translatedBlogSlugs.includes(slug) ? slug : undefined
    );
  }
  return home[otherLocale];
}

export function localizedMetadata(
  pathname: string,
  locale: Locale
): Metadata['alternates'] {
  const page = localizedPages.find((page) => page[locale] === pathname);
  if (!page) return undefined;
  return languageAlternates(page.en, page.es, locale);
}

export function languageAlternates(
  enPath: string,
  esPath: string,
  locale: Locale
): Metadata['alternates'] {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://courtformsonline.org';
  const en = new URL(enPath, baseUrl).href;
  const es = new URL(esPath, baseUrl).href;
  return { canonical: locale === 'en' ? en : es, languages: { en, es } };
}
