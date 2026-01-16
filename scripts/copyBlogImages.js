const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const PUBLIC_BLOG_DIR = path.join(process.cwd(), 'public', 'blog');
const ALLOWED_EXT = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
]);

function walkDir(dir, cb) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full, cb);
    } else {
      cb(full);
    }
  }
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

console.log('Copying blog images to public folder...');

walkDir(BLOG_DIR, (file) => {
  const ext = path.extname(file).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return;

  // Determine relative path from BLOG_DIR
  const rel = path.relative(BLOG_DIR, file);
  const parts = rel.split(path.sep);
  // The public location should mirror the blog folder structure
  const destDir = path.join(PUBLIC_BLOG_DIR, path.dirname(rel));
  const destPath = path.join(destDir, path.basename(file));

  try {
    ensureDir(destDir);
    // Only copy if missing or source is newer
    let shouldCopy = true;
    if (fs.existsSync(destPath)) {
      const srcStat = fs.statSync(file);
      const destStat = fs.statSync(destPath);
      shouldCopy = srcStat.mtimeMs > destStat.mtimeMs;
    }
    if (shouldCopy) {
      fs.copyFileSync(file, destPath);
      console.log('Copied:', rel);
    }
  } catch (e) {
    console.warn('Failed to copy', file, e);
  }
});

// Additionally, scan MDX files for frontmatter image references that point to
// images at the top-level blog folder, and copy those into the corresponding
// public/blog/<slug> folder so posts referencing './image.jpg' will work when
// images are placed at content/blog/<image.jpg>.
const matter = require('gray-matter');

walkDir(BLOG_DIR, (file) => {
  if (!file.endsWith('.mdx') && !file.endsWith('.md')) return;
  try {
    const content = fs.readFileSync(file, 'utf8');
    const { data } = matter(content);
    if (data && data.image) {
      const imagePath = String(data.image || '').replace(/^\.\//, '');
      const fileName = path.basename(imagePath);
      const slug = path
        .relative(BLOG_DIR, file)
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '');

      // First try to find the image next to the MDX file (relative path)
      const srcDir = path.dirname(file);
      const srcRelative = path.join(srcDir, imagePath);

      // Fall back to top-level blog folder
      const srcTop = path.join(BLOG_DIR, fileName);

      // Use whichever exists
      let srcFile = null;
      if (fs.existsSync(srcRelative)) {
        srcFile = srcRelative;
      } else if (fs.existsSync(srcTop)) {
        srcFile = srcTop;
      }

      if (srcFile) {
        const destDir = path.join(PUBLIC_BLOG_DIR, slug);
        const destPath = path.join(destDir, fileName);
        ensureDir(destDir);
        let shouldCopy = true;
        if (fs.existsSync(destPath)) {
          const srcStat = fs.statSync(srcFile);
          const destStat = fs.statSync(destPath);
          shouldCopy = srcStat.mtimeMs > destStat.mtimeMs;
        }
        if (shouldCopy) {
          fs.copyFileSync(srcFile, destPath);
          console.log('Copied frontmatter image for', slug, fileName);
        }
      }
    }
  } catch (e) {
    // ignore
  }
});

console.log('Done.');
