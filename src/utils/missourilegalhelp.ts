/**
 * Missouri Legal Help module
 * Handles building links to Missouri LawHelp (Missouri Poverty Law Services)
 *
 * Currently uses a simple link to the main interviews page, but structured
 * to allow for future expansion if Missouri LawHelp develops
 * a more granular triage tool with topic-specific deep links.
 */

/**
 * Gets the Missouri LawHelp legal help URL
 * For now, this returns the same URL for all topics
 * Future: Could be expanded to support specific interview/topic URLs if Missouri LawHelp adds triage capability
 *
 * @param topic - The topic name (currently not used, but included for future expansion)
 * @returns The main Missouri LawHelp interviews URL
 */
export function getMissouriLegalHelpLink(topic?: string): string {
  // Currently returns the same URL for all topics
  // In the future, this could support topic-specific URLs if Missouri LawHelp adds more interviews
  return 'https://apps.molawhelp.org/list';
}

/**
 * Gets the Missouri legal help root URL
 *
 * @returns The main Missouri LawHelp interviews URL
 */
export function getMissouriLegalHelpRootUrl(): string {
  return 'https://apps.molawhelp.org/list';
}
