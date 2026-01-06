import he from 'he';

export interface WordPressPost {
  title: string;
  link: string;
  date: string;
}

/**
 * Fetch and parse a WordPress RSS feed at build time
 * Returns syndicated post titles and links
 * @param feedUrl - The RSS feed URL to fetch
 * @param count - Maximum number of posts to return
 */
export async function getWordPressFeed(
  feedUrl: string,
  count: number = 5
): Promise<WordPressPost[]> {
  try {
    const response = await fetch(feedUrl);
    if (!response.ok) {
      console.error('Failed to fetch WordPress feed:', response.statusText);
      return [];
    }

    const xml = await response.text();
    const posts: WordPressPost[] = [];

    // Simple XML parsing for RSS items
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex =
      /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/;
    const linkRegex = /<link>(.*?)<\/link>/;
    const pubDateRegex = /<pubDate>(.*?)<\/pubDate>/;

    let match;
    while ((match = itemRegex.exec(xml)) !== null && posts.length < count) {
      const item = match[1];

      const titleMatch = item.match(titleRegex);
      const linkMatch = item.match(linkRegex);
      const dateMatch = item.match(pubDateRegex);

      if (titleMatch && linkMatch) {
        posts.push({
          title: he.decode(titleMatch[1] || titleMatch[2] || ''),
          link: linkMatch[1] || '',
          date: dateMatch ? dateMatch[1] : '',
        });
      }
    }

    return posts;
  } catch (error) {
    console.error('Error fetching WordPress feed:', error);
    return [];
  }
}
