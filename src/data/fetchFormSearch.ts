import { SearchResults } from './formSearch';

export async function fetchFormSearch(
  text: string,
  saveData: boolean,
  signal?: AbortSignal
): Promise<SearchResults> {
  const endpoint = process.env.NEXT_PUBLIC_FORM_SEARCH_URL;
  if (!endpoint) throw new Error('Topic search is not configured.');
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, save_data: saveData }),
    signal,
    credentials: 'omit',
  });
  if (!response.ok)
    throw new Error(
      response.status === 429
        ? 'Please wait a minute before trying topic search again.'
        : 'Topic search is unavailable.'
    );
  const data = await response.json();
  if (
    !Array.isArray(data.labels) ||
    !data.labels.every(
      (label) =>
        typeof label.id === 'string' &&
        typeof label.confidence === 'number' &&
        Number.isFinite(label.confidence)
    )
  ) {
    throw new Error('Topic search is unavailable.');
  }
  return data;
}
