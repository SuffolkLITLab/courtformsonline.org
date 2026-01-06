import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
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
  title: string;
  date: string;
  summary: string;
  author: string;
  image?: string;
  imageAlt?: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Convert a relative image path to a public URL path
 * Supports both relative paths (./image.png) and absolute paths (/blog/images/...)
 */
function resolveImagePath(imagePath: string, postSlug: string): string {
  if (!imagePath) return '';

  // If it's already an absolute path, return as-is
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // Treat anything that isn't an absolute path as relative to the post folder
  const fileName = imagePath.replace(/^\.\/?/, '');
  const srcPath = path.join(BLOG_DIR, postSlug, fileName);
  const destDir = path.join(PUBLIC_DIR, 'blog', postSlug);
  const destPath = path.join(destDir, fileName);

  // Look for the image in the post folder, then fall back to the top-level
  // blog folder. If found, copy it into the public blog/<postSlug> folder so
  // Next.js can serve it directly (supports PNG, JPG, GIF, etc.).
  const candidates = [
    path.join(BLOG_DIR, postSlug, fileName),
    path.join(BLOG_DIR, fileName),
  ];

  try {
    for (const candidate of candidates) {
      if (fs.existsSync(candidate)) {
        fs.mkdirSync(destDir, { recursive: true });
        // Only copy if it doesn't exist or the source is newer than dest
        let shouldCopy = true;
        if (fs.existsSync(destPath)) {
          const srcStat = fs.statSync(candidate);
          const destStat = fs.statSync(destPath);
          shouldCopy = srcStat.mtimeMs > destStat.mtimeMs;
        }
        if (shouldCopy) {
          fs.copyFileSync(candidate, destPath);
        }
        break;
      }
    }
  } catch (e) {
    // Ignore copy errors; resolved path will still be returned so the caller
    // can decide what to do if the asset is missing.
  }

  return `/blog/${postSlug}/${fileName}`;
}

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

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = findBlogFiles(BLOG_DIR);
  const posts = files
    .map((relativePath) => {
      const filePath = path.join(BLOG_DIR, relativePath);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      // Convert path separators to forward slashes for URL and remove extension
      const slug = relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '');

      const resolvedImage = data.image
        ? resolveImagePath(data.image, slug)
        : undefined;

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        summary: data.summary || '',
        author: data.author || '',
        image: resolvedImage,
        imageAlt: data.imageAlt,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Get a single blog post by slug (supports subdirectories like "2026/my-post")
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  // Handle both forward slashes and path segments
  const normalizedSlug = slug.replace(/\//g, path.sep);
  const mdxPath = path.join(BLOG_DIR, `${normalizedSlug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${normalizedSlug}.md`);

  let filePath: string | null = null;
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  }

  if (!filePath) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const resolvedImage = data.image
    ? resolveImagePath(data.image, slug)
    : undefined;

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    summary: data.summary || '',
    author: data.author || '',
    image: resolvedImage,
    imageAlt: data.imageAlt,
    content,
  };
}

/**
 * Get the N most recent blog posts for previews
 */
export function getLatestBlogPosts(count: number = 3): BlogPostMeta[] {
  return getAllBlogPosts().slice(0, count);
}

/**
 * Get all slugs for static generation (supports subdirectories)
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = findBlogFiles(BLOG_DIR);
  return files.map((relativePath) =>
    relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, '')
  );
}
