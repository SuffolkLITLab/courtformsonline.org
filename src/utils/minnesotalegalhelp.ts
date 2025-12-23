/**
 * Minnesota Legal Help module
 * Handles building links to LawHelpMN (Minnesota legal aid resources)
 *
 * Currently uses a simple link to the main page, but structured
 * to allow for future expansion if LawHelpMN develops
 * a triage tool or deep linking capability.
 */

/**
 * Gets the LawHelpMN legal help URL
 * For now, this returns the same URL for all topics
 * Future: Could be expanded to support specific topic URLs if LawHelpMN adds triage capability
 *
 * @param topic - The topic name (currently not used, but included for future expansion)
 * @returns The main LawHelpMN URL
 */
export function getMinnesotaLegalHelpLink(topic?: string): string {
  // Currently returns the same URL for all topics
  // In the future, this could support topic-specific URLs if LawHelpMN adds triage capability
  return 'https://www.lawhelpmn.org/';
}

/**
 * Gets the Minnesota legal help root URL
 *
 * @returns The main LawHelpMN URL
 */
export function getMinnesotaLegalHelpRootUrl(): string {
  return 'https://www.lawhelpmn.org/';
}
