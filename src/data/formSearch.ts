import { legalTopics } from '../config/topics.config';

export interface SearchLabel {
  id: string;
  confidence: number;
}
export interface SearchResults {
  labels: SearchLabel[];
  degraded?: boolean;
}
export interface SearchForm {
  title?: string;
  filename?: string;
  serverUrl?: string;
  tags?: string[];
  metadata?: { title?: string; description?: string; LIST_topics?: string[] };
}
export type InterviewsByTopic = Record<string, SearchForm[]>;

const words = (text: string) =>
  text.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
const stopWords = new Set(
  'a an and are as at be for from have i in is it me my of on or the to was with you your'.split(
    ' '
  )
);

export function keywordMatches(interviews: InterviewsByTopic, query: string) {
  const tokens = [
    ...new Set(words(query).filter((word) => !stopWords.has(word))),
  ];
  if (!tokens.length) return { titles: [], descriptions: [] };
  const unique = new Map<string, SearchForm>();
  Object.values(interviews)
    .flat()
    .forEach((form) => {
      const title = form.metadata?.title || form.title;
      if (title)
        unique.set(`${form.serverUrl || ''}:${form.filename || title}`, form);
    });
  const ranked = [...unique.values()].map((form) => {
    const title = words(form.metadata?.title || form.title || '');
    const titleWords = new Set(title);
    const description = new Set(words(form.metadata?.description || ''));
    const exact = tokens.every((word) => titleWords.has(word));
    const phrase = title.join(' ').includes(tokens.join(' '));
    return {
      form,
      exact,
      phrase,
      description: tokens.every((word) => description.has(word)),
    };
  });
  return {
    titles: ranked
      .filter((match) => match.exact)
      .sort((a, b) => Number(b.phrase) - Number(a.phrase))
      .map((match) => match.form),
    descriptions: ranked
      .filter((match) => !match.exact && match.description)
      .map((match) => match.form),
  };
}

export function matchingTopics(
  labels: SearchLabel[],
  interviews: InterviewsByTopic
) {
  const scores = new Map<string, number>();
  for (const label of labels) {
    for (const topic of legalTopics) {
      const matches = topic.codes.some((code) => {
        const parts = code.split('-');
        while (parts[parts.length - 1] === '00') parts.pop();
        return label.id === code || label.id.startsWith(parts.join('-') + '-');
      });
      if (matches && interviews[topic.name]?.length) {
        scores.set(
          topic.name,
          Math.max(scores.get(topic.name) ?? 0, label.confidence)
        );
      }
    }
  }
  return legalTopics
    .filter((topic) => scores.has(topic.name))
    .sort((a, b) => scores.get(b.name)! - scores.get(a.name)!);
}

// Compare complete taxonomy segments, not text prefixes (02 and 03 are siblings).
function listParts(code: string): string[] {
  if (!/^[A-Z]{2}(?:-\d{2}){4}$/.test(code)) return [];
  return code.replace(/(-00)+$/, '').split('-');
}

export function rankFormsByTopics(
  forms: SearchForm[],
  labels: SearchLabel[]
): SearchForm[] {
  const predictions = labels
    .map((label) => ({ ...label, parts: listParts(label.id) }))
    .filter((label) => label.parts.length > 1);
  const ranked = forms.map((form, index) => {
    const codes = [
      ...(form.metadata?.LIST_topics || []),
      ...(form.tags || []),
    ].map(listParts);
    let best = { depth: 0, exact: 0, confidence: 0 };
    for (const label of predictions) {
      for (const code of codes) {
        const depth = Math.min(code.length, label.parts.length);
        // Only an ancestor/descendant relationship is evidence of relevance.
        if (
          depth < 2 ||
          !code.slice(0, depth).every((part, i) => part === label.parts[i])
        )
          continue;
        const candidate = {
          depth,
          exact: Number(code.length === label.parts.length),
          confidence: label.confidence,
        };
        if (
          candidate.depth > best.depth ||
          (candidate.depth === best.depth && candidate.exact > best.exact) ||
          (candidate.depth === best.depth &&
            candidate.exact === best.exact &&
            candidate.confidence > best.confidence)
        )
          best = candidate;
      }
    }
    return { form, index, ...best };
  });
  return ranked
    .sort(
      (a, b) =>
        b.depth - a.depth ||
        b.exact - a.exact ||
        b.confidence - a.confidence ||
        a.index - b.index
    )
    .map((item) => item.form);
}
