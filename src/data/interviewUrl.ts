export function spanishInterviewUrl(
  server: string,
  filename?: string,
  link?: string
) {
  const base = new URL(`${server.replace(/\/+$/, '')}/`);
  if (link) {
    try {
      const url = new URL(link, base);
      if (url.origin === base.origin) {
        url.searchParams.set('lang', 'es');
        return url.href;
      }
    } catch {
      // Use the standard interview endpoint if a provider link is malformed.
    }
  }
  const fallback = new URL('interview', base);
  if (filename) fallback.searchParams.set('i', filename);
  fallback.searchParams.set('lang', 'es');
  return fallback.href;
}
