/**
 * Legal Help Service
 *
 * Centralized service for jurisdiction-specific legal help linking.
 * This module provides a unified interface for getting deep links and
 * disclaimer components for each jurisdiction, eliminating the need for
 * scattered if/else chains throughout the codebase.
 *
 * To add a new jurisdiction:
 * 1. Create a utility module in src/utils/ (e.g., newstatelegalhelp.ts)
 * 2. Create a disclaimer component in src/app/components/
 * 3. Add the jurisdiction config to LEGAL_HELP_CONFIG below
 */

import React from 'react';
import { legalTopics } from '../config/topics.config';

// Import jurisdiction-specific modules
import { getMassLRFDeepLink, getMassLRFRootUrl } from './masslrf';
import {
  getMichiganLegalHelpDeepLink,
  getMichiganLegalHelpRootUrl,
} from './michiganlegalhelp';
import { getMaineLegalHelpLink } from './mainelegalhelp';
import { getMinnesotaLegalHelpLink } from './minnesotalegalhelp';
import { getMissouriLegalHelpLink } from './missourilegalhelp';

// Import disclaimer components
import MassLRFDisclaimerInfo from '../app/components/MassLRFDisclaimerInfo';
import MichiganLegalHelpDisclaimerInfo from '../app/components/MichiganLegalHelpDisclaimerInfo';
import MaineLegalHelpDisclaimerInfo from '../app/components/MaineLegalHelpDisclaimerInfo';
import MinnesotaLegalHelpDisclaimerInfo from '../app/components/MinnesotaLegalHelpDisclaimerInfo';
import MissouriLegalHelpDisclaimerInfo from '../app/components/MissouriLegalHelpDisclaimerInfo';

/**
 * Configuration for a jurisdiction's legal help integration
 */
interface LegalHelpJurisdictionConfig {
  /**
   * Function to get a deep link for a specific topic or NSMI code.
   * For form pages: receives topicOrCode (NSMI code or topic name) and optional listTopics array
   * For topic pages: receives topic name
   */
  getDeepLink: (
    topicOrCode: string | null | undefined,
    options?: {
      listTopics?: string[];
      isTopicPage?: boolean;
    }
  ) => Promise<string | null> | string | null;

  /**
   * Function to get the root/fallback URL when no topic-specific link is available
   */
  getRootUrl: () => string | null;

  /**
   * The React component to render as disclaimer info
   */
  DisclaimerComponent: React.ComponentType;

  /**
   * Whether this jurisdiction supports NSMI code-based deep linking
   */
  supportsNsmiCodes?: boolean;
}

/**
 * Central configuration for all jurisdiction legal help integrations.
 * Add new jurisdictions here to enable their legal help features.
 */
const LEGAL_HELP_CONFIG: Record<string, LegalHelpJurisdictionConfig> = {
  ma: {
    getDeepLink: async (topicOrCode, options) => {
      // Massachusetts supports NSMI code-based deep linking via MassLRF API
      // Try all provided LIST_topics until we find one that works

      // Build a list of NSMI codes to try, in order of priority
      const codesToTry: string[] = [];

      // First, add all provided LIST_topics
      if (options?.listTopics && options.listTopics.length > 0) {
        codesToTry.push(...options.listTopics);
      }

      // If no listTopics, fall back to topicOrCode
      if (codesToTry.length === 0 && topicOrCode) {
        // Check if it looks like an NSMI code
        if (topicOrCode.includes('-') && /^[A-Z]{2}-/i.test(topicOrCode)) {
          codesToTry.push(topicOrCode);
        } else {
          // Fall back to looking up topic's primary code
          const matchingTopic = legalTopics.find(
            (t) => t.name.toLowerCase() === topicOrCode.toLowerCase()
          );
          if (matchingTopic && matchingTopic.codes.length > 0) {
            codesToTry.push(...matchingTopic.codes);
          }
        }
      }

      // Try each code until one returns a valid deep link
      for (const nsmiCode of codesToTry) {
        try {
          const deepLink = await getMassLRFDeepLink(
            nsmiCode,
            options?.isTopicPage ?? false
          );
          if (deepLink) {
            return deepLink;
          }
        } catch (err) {
          // Continue to next code
          console.error(
            `Error fetching MassLRF deep link for ${nsmiCode}:`,
            err
          );
        }
      }

      return null;
    },
    getRootUrl: () => getMassLRFRootUrl('ma'),
    DisclaimerComponent: MassLRFDisclaimerInfo,
    supportsNsmiCodes: true,
  },

  mi: {
    getDeepLink: (topicOrCode, options) => {
      // Michigan supports topic-based deep linking
      if (options?.listTopics && options.listTopics.length > 0) {
        return getMichiganLegalHelpDeepLink(options.listTopics[0]);
      }
      if (topicOrCode) {
        return getMichiganLegalHelpDeepLink(topicOrCode);
      }
      return null;
    },
    getRootUrl: () => getMichiganLegalHelpRootUrl(),
    DisclaimerComponent: MichiganLegalHelpDisclaimerInfo,
    supportsNsmiCodes: true,
  },

  me: {
    getDeepLink: (topicOrCode) => {
      // Maine uses a single contact URL for all topics
      return getMaineLegalHelpLink(topicOrCode ?? undefined);
    },
    getRootUrl: () => getMaineLegalHelpLink(),
    DisclaimerComponent: MaineLegalHelpDisclaimerInfo,
    supportsNsmiCodes: false,
  },

  mn: {
    getDeepLink: (topicOrCode) => {
      // Minnesota uses a single URL for all topics
      return getMinnesotaLegalHelpLink(topicOrCode ?? undefined);
    },
    getRootUrl: () => getMinnesotaLegalHelpLink(),
    DisclaimerComponent: MinnesotaLegalHelpDisclaimerInfo,
    supportsNsmiCodes: false,
  },

  mo: {
    getDeepLink: (topicOrCode) => {
      // Missouri uses a single URL for all topics
      return getMissouriLegalHelpLink(topicOrCode ?? undefined);
    },
    getRootUrl: () => getMissouriLegalHelpLink(),
    DisclaimerComponent: MissouriLegalHelpDisclaimerInfo,
    supportsNsmiCodes: false,
  },
};

/**
 * Result from getLegalHelpInfo containing all legal help data for a jurisdiction
 */
export interface LegalHelpInfo {
  deepLink: string | null;
  DisclaimerComponent: React.ComponentType | null;
}

/**
 * Options for getting legal help info
 */
export interface GetLegalHelpOptions {
  /** The jurisdiction path (e.g., 'ma', 'mi', 'me', 'mn') */
  jurisdiction: string;
  /** The topic name (e.g., 'housing', 'family') */
  topic?: string | null;
  /** LIST_topics array from form metadata */
  listTopics?: string[];
  /** Whether this is for a topic page (affects link generation for some jurisdictions) */
  isTopicPage?: boolean;
}

/**
 * Gets legal help information for a jurisdiction.
 * This is the main entry point for the legal help feature.
 *
 * @param options - Configuration for getting legal help info
 * @returns Object containing deepLink and DisclaimerComponent
 *
 * @example
 * // For a form page
 * const { deepLink, DisclaimerComponent } = await getLegalHelpInfo({
 *   jurisdiction: 'ma',
 *   topic: 'housing',
 *   listTopics: formDetails.metadata?.LIST_topics,
 * });
 *
 * @example
 * // For a topic page
 * const { deepLink, DisclaimerComponent } = await getLegalHelpInfo({
 *   jurisdiction: 'mi',
 *   topic: 'family',
 *   isTopicPage: true,
 * });
 */
export async function getLegalHelpInfo(
  options: GetLegalHelpOptions
): Promise<LegalHelpInfo> {
  const config = LEGAL_HELP_CONFIG[options.jurisdiction];

  if (!config) {
    return { deepLink: null, DisclaimerComponent: null };
  }

  // Get the deep link (may be async for some jurisdictions like MA)
  let deepLink = await config.getDeepLink(options.topic, {
    listTopics: options.listTopics,
    isTopicPage: options.isTopicPage,
  });

  // Fall back to root URL if no deep link was found
  if (!deepLink) {
    deepLink = config.getRootUrl();
  }

  return {
    deepLink,
    DisclaimerComponent: config.DisclaimerComponent,
  };
}

/**
 * Checks if a jurisdiction has legal help support configured
 *
 * @param jurisdiction - The jurisdiction path to check
 * @returns true if the jurisdiction has legal help configured
 */
export function hasLegalHelpSupport(jurisdiction: string): boolean {
  return jurisdiction in LEGAL_HELP_CONFIG;
}

/**
 * Gets all supported jurisdiction paths
 *
 * @returns Array of jurisdiction paths with legal help support
 */
export function getSupportedJurisdictions(): string[] {
  return Object.keys(LEGAL_HELP_CONFIG);
}
