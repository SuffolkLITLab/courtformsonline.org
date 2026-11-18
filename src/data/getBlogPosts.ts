import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '../i18n/messages';
import { resolveBlogImage } from '../../scripts/blogImages.cjs';

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  summary: string;
  author: string;
  image?: string;
  imageAlt?: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  summary: string;
  author: string;
  image?: string;
  imageAlt?: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const SPANISH_BLOG_DIR = path.join(process.cwd(), 'content', 'blog-es');
/**
 * Recursively find all blog files in a directory
 */
function findBlogFiles(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findBlogFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      // Get path relative to baseDir for the slug
      const relativePath = path.relative(baseDir, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

/** Get all blog posts sorted by date, using a translation when available. */
export function getAllBlogPosts(locale: Locale = 'en'): BlogPostMeta[] {
  return getAllBlogSlugs()
    .map((slug) => getBlogPostBySlug(slug, locale))
    .filter((post): post is BlogPost => Boolean(post))
    .map(({ content, ...metadata }) => metadata)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function findPostFile(directory: string, slug: string) {
  return ['mdx', 'md']
    .map((extension) => path.join(directory, `${slug}.${extension}`))
    .find((file) => fs.existsSync(file));
}

export function getBlogPostBySlug(
  slug: string,
  locale: Locale = 'en'
): BlogPost | null {
  const file = findPostFile(BLOG_DIR, slug);
  if (!file) return null;
  const translatedFile =
    locale === 'es' ? findPostFile(SPANISH_BLOG_DIR, slug) : undefined;
  const original = matter(fs.readFileSync(file, 'utf-8'));
  const translated = translatedFile
    ? matter(fs.readFileSync(translatedFile, 'utf-8'))
    : original;
  const data = { ...original.data, ...translated.data };
  const hasTranslatedImage =
    translatedFile && Object.hasOwn(translated.data, 'image');
  const imageLocale = hasTranslatedImage ? 'es' : 'en';
  const imagePost = hasTranslatedImage ? translatedFile : file;
  return {
    slug,
    locale: translatedFile ? 'es' : 'en',
    title: data.title || slug,
    date: data.date || '',
    summary: data.summary || '',
    author: data.author || '',
    image: data.image
      ? resolveBlogImage(
          process.cwd(),
          imageLocale,
          imagePost,
          slug,
          data.image
        )
      : undefined,
    imageAlt: translated.data.imageAlt,
    content: translated.content,
  };
}

export function getLatestBlogPosts(
  count: number = 3,
  locale: Locale = 'en'
): BlogPostMeta[] {
  return getAllBlogPosts(locale).slice(0, count);
}

export function getAllBlogSlugs(locale: Locale = 'en'): string[] {
  const originalSlugs = findBlogFiles(BLOG_DIR).map((file) =>
    file
      .split(path.sep)
      .join('/')
      .replace(/\.mdx?$/, '')
  );
  return locale === 'en'
    ? originalSlugs
    : originalSlugs.filter((slug) => findPostFile(SPANISH_BLOG_DIR, slug));
}
