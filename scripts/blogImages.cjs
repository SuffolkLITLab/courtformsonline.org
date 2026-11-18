const fs = require('node:fs');
const path = require('node:path');

function blogImageRoots(projectRoot, locale) {
  const publicPrefix = locale === 'es' ? '/blog/es' : '/blog';
  return {
    sourceRoot: path.join(
      projectRoot,
      'content',
      locale === 'es' ? 'blog-es' : 'blog'
    ),
    publicRoot: path.join(projectRoot, 'public', publicPrefix),
    publicPrefix,
  };
}

function copyBlogAsset(source, destination) {
  if (
    fs.existsSync(destination) &&
    fs.statSync(source).mtimeMs <= fs.statSync(destination).mtimeMs
  )
    return;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function isInside(directory, file) {
  const relative = path.relative(directory, file);
  return (
    relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function resolveBlogImage(projectRoot, locale, postFile, slug, image) {
  if (image.startsWith('/')) return image;
  const { sourceRoot, publicRoot, publicPrefix } = blogImageRoots(
    projectRoot,
    locale
  );
  const filename = path.basename(image);
  const destination = path.join(publicRoot, slug, filename);
  if (!isInside(publicRoot, destination)) return undefined;

  const candidates = [
    path.resolve(path.dirname(postFile), image),
    path.resolve(sourceRoot, slug, image),
    path.resolve(sourceRoot, image),
    path.join(sourceRoot, filename),
  ];
  const source = candidates.find(
    (candidate) =>
      isInside(sourceRoot, candidate) &&
      fs.existsSync(candidate) &&
      fs.statSync(candidate).isFile()
  );
  if (!source) return undefined;

  copyBlogAsset(source, destination);
  return `${publicPrefix}/${slug}/${filename}`;
}

module.exports = { blogImageRoots, copyBlogAsset, resolveBlogImage };
