/** @jest-environment node */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

it('keeps a Spanish blog image override separate from the English image', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cfo-blog-images-'));
  const previousCwd = jest.spyOn(process, 'cwd').mockReturnValue(root);
  try {
    for (const [dir, title] of [
      ['blog', 'English'],
      ['blog-es', 'Español'],
    ]) {
      const folder = path.join(root, 'content', dir, '2026');
      fs.mkdirSync(folder, { recursive: true });
      fs.writeFileSync(
        path.join(folder, 'post.mdx'),
        `---\ntitle: ${title}\nimage: ./photo.svg\n---\nPost body.\n`
      );
      fs.writeFileSync(path.join(folder, 'photo.svg'), title);
    }

    jest.isolateModules(() => {
      const { getBlogPostBySlug } = require('../src/data/getBlogPosts');
      const english = getBlogPostBySlug('2026/post', 'en');
      const spanish = getBlogPostBySlug('2026/post', 'es');
      expect(english.image).toBe('/blog/2026/post/photo.svg');
      expect(spanish.image).toBe('/blog/es/2026/post/photo.svg');
      expect(
        fs.readFileSync(path.join(root, 'public', english.image), 'utf8')
      ).toBe('English');
      expect(
        fs.readFileSync(path.join(root, 'public', spanish.image), 'utf8')
      ).toBe('Español');
    });
  } finally {
    previousCwd.mockRestore();
    fs.rmSync(root, { recursive: true, force: true });
  }
});
