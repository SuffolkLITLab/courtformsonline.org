const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const {
  blogImageRoots,
  copyBlogAsset,
  resolveBlogImage,
} = require('./blogImages.cjs');

const projectRoot = process.cwd();
const imageExtensions = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.avif',
]);

function walkDir(directory, visit) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walkDir(file, visit);
    else visit(file);
  }
}

console.log('Copying blog images to public folder...');
for (const locale of ['en', 'es']) {
  const { sourceRoot, publicRoot } = blogImageRoots(projectRoot, locale);
  walkDir(sourceRoot, (file) => {
    const ext = path.extname(file);
    const relativePath = path.relative(sourceRoot, file);
    try {
      if (imageExtensions.has(ext.toLowerCase())) {
        copyBlogAsset(file, path.join(publicRoot, relativePath));
      } else if (ext === '.mdx' || ext === '.md') {
        const { data } = matter(fs.readFileSync(file, 'utf8'));
        if (typeof data.image === 'string' && data.image) {
          const slug = relativePath
            .split(path.sep)
            .join('/')
            .replace(/\.mdx?$/, '');
          const url = resolveBlogImage(
            projectRoot,
            locale,
            file,
            slug,
            data.image
          );
          if (!url)
            console.warn('Blog image not found:', relativePath, data.image);
        }
      }
    } catch (error) {
      console.warn('Failed to copy blog image:', relativePath, error.message);
    }
  });
}
console.log('Done.');
