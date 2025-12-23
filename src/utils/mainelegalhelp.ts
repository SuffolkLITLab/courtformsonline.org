/**
 * Maine Legal Help module
 * Handles building links to Pine Tree Legal Assistance contact page
 *
 * Currently uses a simple link to the main contact page, but structured
 * to allow for future expansion if Pine Tree Legal Assistance develops
 * a triage tool similar to MassLRF or Michigan Legal Help.
 */

/**
 * Gets the Pine Tree Legal Assistance contact/help URL
 * For now, this returns the same URL for all topics
 * Future: Could be expanded to support specific issue IDs if PTLA develops a triage tool
 *
 * @param topic - The topic name (currently not used, but included for future expansion)
 * @returns The contact page URL
 */
export function getMaineLegalHelpLink(topic?: string): string {
  // Currently returns the same contact URL for all topics
  // In the future, this could support topic-specific URLs if PTLA adds triage capability
  return 'https://www.ptla.org/contact-us';
}

/**
 * Gets the Maine legal help root/contact URL
 *
 * @returns The contact page URL
 */
export function getMaineLegalHelpRootUrl(): string {
  return 'https://www.ptla.org/contact-us';
}
