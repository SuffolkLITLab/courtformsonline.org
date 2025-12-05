import { toUrlFriendlyString } from '../app/utils/helpers';
import { fetchInterviews } from './fetchInterviewData';
import { getMaxListCodeSimilarity, getTopicNames } from './helpers';
import { MAX_RELATED_FORMS } from '../config/constants';
import { legalTopics } from '../config/topics.config';

interface RelatedForm {
  title: string;
  slug: string;
  similarity: number;
}

export async function getFormDetails(path: string, formSlug: string) {
  const { interviewsByTopic, isError } = await fetchInterviews(path);

  if (isError) {
    return { formDetails: null, formTopic: null, relatedForms: [] };
  }

  let formDetails = null;
  let formTopic: string | null = null;
  let formTopics: { name: string; long_name: string }[] = [];

  // Collect all interviews for finding related forms
  const allInterviews: { interview: any; topic: string }[] = [];

  Object.keys(interviewsByTopic).forEach((topic) => {
    interviewsByTopic[topic].forEach((interview) => {
      const formattedTitle = toUrlFriendlyString(interview.title);
      allInterviews.push({ interview, topic });
      if (formattedTitle === formSlug) {
        formDetails = interview;
        if (!formTopic) {
          formTopic = topic;
        }
      }
    });
  });

  // Find related forms based on LIST code similarity
  let relatedForms: RelatedForm[] = [];
  if (formDetails) {
    // Determine list of top-level topics that match this form. We will include duplicates
    // by mapping each code/tag to its top-level topic(s) in order.
    const currentCodes = [
      ...(formDetails.metadata?.LIST_topics || []),
      ...(formDetails.tags || []),
    ];

    // Use getTopicNames to derive a unique list of topic names, then map to topic objects
    // Build both a unique list of topics and a raw list allowing duplicates (one entry per code mapping)
    const uniqueTopicNames = getTopicNames(currentCodes);
    const uniqueTopics = uniqueTopicNames
      .map((tn) => legalTopics.find((t) => t.name === tn))
      .filter(Boolean)
      .map((t) => ({ name: t!.name, long_name: t!.long_name }));

    // Build raw topics (may contain duplicates) by mapping each code/tag to corresponding topic(s)
    const rawTopics: { name: string; long_name: string }[] = [];
    const cleanedTopicCodes = legalTopics.map((t) => ({
      name: t.name,
      long_name: t.long_name,
      codes: t.codes.map((c) => c.replace(/(-00)+$/, '')),
    }));

    for (const code of currentCodes) {
      const cleaned = (code || '').replace(/(-00)+$/, '');
      // First try matching via code prefixes
      for (const t of cleanedTopicCodes) {
        for (const c of t.codes) {
          if (cleaned.toUpperCase().startsWith(c.toUpperCase())) {
            rawTopics.push({ name: t.name, long_name: t.long_name });
            break; // break out of codes loop for this topic
          }
        }
      }
      // If a cleaned value appears to be a topic name (tag), add it directly
      const directTopic = legalTopics.find(
        (t) => t.name.toLowerCase() === cleaned.toLowerCase()
      );
      if (directTopic) {
        rawTopics.push({
          name: directTopic.name,
          long_name: directTopic.long_name,
        });
      }
    }

    // Deduplicate rawTopics while preserving order
    const seen = new Set<string>();
    const dedupedTopics: { name: string; long_name: string }[] = [];
    for (const t of rawTopics) {
      if (!seen.has(t.name)) {
        seen.add(t.name);
        dedupedTopics.push(t);
      }
    }
    // Ensure the main topic (formTopic) appears in the list once, at the front if not present
    if (formTopic) {
      const ftIndex = dedupedTopics.findIndex(
        (d) => d.name.toLowerCase() === formTopic!.toLowerCase()
      );
      if (ftIndex === -1) {
        const ft = legalTopics.find(
          (lt) => lt.name.toLowerCase() === formTopic!.toLowerCase()
        );
        if (ft)
          dedupedTopics.unshift({ name: ft.name, long_name: ft.long_name });
      }
    }
    formTopics = dedupedTopics.length > 0 ? dedupedTopics : uniqueTopics;
    // (currentCodes already defined above)

    if (currentCodes.length > 0) {
      // Calculate similarity for all other forms
      const formsWithSimilarity: RelatedForm[] = [];
      const seenTitles = new Set<string>();
      seenTitles.add(formDetails.title); // Exclude current form

      allInterviews.forEach(({ interview }) => {
        if (seenTitles.has(interview.title)) return;
        seenTitles.add(interview.title);

        const otherCodes = [
          ...(interview.metadata?.LIST_topics || []),
          ...(interview.tags || []),
        ];

        if (otherCodes.length > 0) {
          const similarity = getMaxListCodeSimilarity(currentCodes, otherCodes);
          if (similarity > 0) {
            formsWithSimilarity.push({
              title: interview.title,
              slug: toUrlFriendlyString(interview.title),
              similarity,
            });
          }
        }
      });

      // Sort by similarity (descending) and take top N
      relatedForms = formsWithSimilarity
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, MAX_RELATED_FORMS);
    }
  }

  return { formDetails, formTopic, formTopics, relatedForms };
}
