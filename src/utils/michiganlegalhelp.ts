/**
 * Michigan Legal Help module
 * Handles building deep links to the Michigan Legal Help "Guide to Legal Help" tool
 *
 * Deep links use the format: https://michiganlegalhelp.org/guide-to-legal-help?issue=<ID>
 * Issue IDs were gathered from the Resource Library pages for each legal topic.
 */

import { legalTopics } from '../config/topics.config';

/**
 * Michigan Legal Help issue ID mapping
 * Maps topic names (used in CourtFormsOnline) to Michigan Legal Help issue IDs
 */
interface MichiganIssueMapping {
  issueId: number;
  michiganTopicName: string;
}

/**
 * Maps CourtFormsOnline topic names to Michigan Legal Help issue IDs
 * Some CourtFormsOnline topics map to multiple Michigan topics or vice versa
 */
const topicToIssueId: Record<string, MichiganIssueMapping> = {
  // Family maps to Michigan's "Family" topic (issue ID 33)
  family: { issueId: 33, michiganTopicName: 'Family' },

  // Housing maps directly
  housing: { issueId: 11, michiganTopicName: 'Housing' },

  // Consumer/money issues map to "Money, Debt & Consumer Issues"
  consumer: { issueId: 29, michiganTopicName: 'Money, Debt & Consumer Issues' },

  // Public benefits maps to "Public Assistance"
  benefits: { issueId: 274, michiganTopicName: 'Public Assistance' },

  // Criminal maps to "Crime & Traffic"
  criminal: { issueId: 279, michiganTopicName: 'Crime & Traffic' },

  // Traffic also maps to "Crime & Traffic"
  traffic: { issueId: 279, michiganTopicName: 'Crime & Traffic' },

  // Education maps directly
  education: { issueId: 272, michiganTopicName: 'Education' },

  // Employment maps directly
  employment: { issueId: 275, michiganTopicName: 'Employment' },

  // Immigration maps directly
  immigration: { issueId: 281, michiganTopicName: 'Immigration' },

  // Wills/estates maps to "Wills & Life Planning"
  wills: { issueId: 404, michiganTopicName: 'Wills & Life Planning' },

  // Courts maps to "Going to Court"
  courts: { issueId: 2594, michiganTopicName: 'Going to Court' },

  // Government services could map to "Voting & Civil Rights"
  government: { issueId: 3048, michiganTopicName: 'Voting & Civil Rights' },
};

/**
 * Maps NSMI code prefixes to CourtFormsOnline topic names
 * Used when a form has LIST_topics but we need to look up the Michigan issue ID
 */
const nsmiPrefixToTopic: Record<string, string> = {
  FA: 'family',
  HO: 'housing',
  MO: 'consumer',
  BE: 'benefits',
  CR: 'criminal',
  TR: 'traffic',
  ED: 'education',
  WO: 'employment',
  IM: 'immigration',
  ES: 'wills',
  CO: 'courts',
  GO: 'government',
};

/**
 * Gets the topic name from an NSMI code
 *
 * @param nsmiCode - The NSMI/LIST code (e.g., 'HO-02-00-00-00')
 * @returns The topic name or null if not found
 */
function getTopicFromNSMI(nsmiCode: string): string | null {
  const prefix = nsmiCode.split('-')[0]?.toUpperCase();
  if (prefix && nsmiPrefixToTopic[prefix]) {
    return nsmiPrefixToTopic[prefix];
  }
  return null;
}

/**
 * Builds a Michigan Legal Help deep link URL for a given topic or NSMI code
 *
 * @param topicOrNsmiCode - Either a topic name (e.g., 'housing') or NSMI code (e.g., 'HO-00-00-00-00')
 * @returns The deep link URL, or null if no mapping exists
 */
export function getMichiganLegalHelpDeepLink(
  topicOrNsmiCode: string
): string | null {
  // First, check if it's a direct topic name match
  let topicName = topicOrNsmiCode.toLowerCase();

  // If it looks like an NSMI code (contains dashes and starts with letters), convert it
  if (topicOrNsmiCode.includes('-') && /^[A-Z]{2}-/i.test(topicOrNsmiCode)) {
    const mappedTopic = getTopicFromNSMI(topicOrNsmiCode);
    if (mappedTopic) {
      topicName = mappedTopic;
    }
  }

  // Look up the issue ID for this topic
  const mapping = topicToIssueId[topicName];
  if (!mapping) {
    return null;
  }

  return `https://michiganlegalhelp.org/guide-to-legal-help?issue=${mapping.issueId}`;
}

/**
 * Gets the Michigan Legal Help issue mapping for a given topic or NSMI code
 * Returns both the deep link and the Michigan topic name for display purposes
 *
 * @param topicOrNsmiCode - Either a topic name or NSMI code
 * @returns Object with deepLink and michiganTopicName, or null if no mapping exists
 */
export function getMichiganLegalHelpInfo(topicOrNsmiCode: string): {
  deepLink: string;
  michiganTopicName: string;
} | null {
  let topicName = topicOrNsmiCode.toLowerCase();

  // If it looks like an NSMI code, convert it
  if (topicOrNsmiCode.includes('-') && /^[A-Z]{2}-/i.test(topicOrNsmiCode)) {
    const mappedTopic = getTopicFromNSMI(topicOrNsmiCode);
    if (mappedTopic) {
      topicName = mappedTopic;
    }
  }

  const mapping = topicToIssueId[topicName];
  if (!mapping) {
    return null;
  }

  return {
    deepLink: `https://michiganlegalhelp.org/guide-to-legal-help?issue=${mapping.issueId}`,
    michiganTopicName: mapping.michiganTopicName,
  };
}

/**
 * Gets the base Michigan Legal Help Guide URL (without issue parameter)
 * Used when no specific topic mapping is available
 *
 * @returns The base Guide to Legal Help URL
 */
export function getMichiganLegalHelpRootUrl(): string {
  return 'https://michiganlegalhelp.org/guide-to-legal-help';
}
