/**
 * MassLRF (Massachusetts Legal Resource Finder) module
 * Handles fetching triage taxonomy and building deep links to MassLRF triage tool
 */

interface TriageNode {
  id: string;
  name: string | { en: string; es?: string };
  nsmi?: string;
  redirect?: string;
  children?: TriageNode[];
}

interface TriageData {
  triage: TriageNode[];
}

// Cache for the triage data to avoid repeated API calls
let triageCache: TriageData | null = null;
let triageCachePromise: Promise<TriageData> | null = null;

/**
 * Fetches the triage taxonomy from MassLRF API
 * Uses caching to avoid repeated API calls
 */
async function fetchTriageTaxonomy(): Promise<TriageData> {
  // Return cached data if available
  if (triageCache) {
    return triageCache;
  }

  // If a fetch is already in progress, return that promise
  if (triageCachePromise) {
    return triageCachePromise;
  }

  // Initiate new fetch
  triageCachePromise = fetch(
    'https://mlrf-5f1d8.firebaseapp.com/api/get/triage'
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch triage data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      triageCache = data;
      return data;
    });

  return triageCachePromise;
}

/**
 * Finds a node in the triage tree by matching against an NSMI code
 * Returns the redirect mapping and root redirect if available
 * If the specific code isn't found, falls back to the root category code
 *
 * @param nsmiCode - The NSMI/LIST code to search for (e.g., 'HO-02-00-00-00')
 * @returns An object with rootRedirect and childRedirect, or null if root not found
 */
export async function findTriageNodeByNSMI(
  nsmiCode: string
): Promise<{ rootRedirect: string; childRedirect: string | null } | null> {
  const data = await fetchTriageTaxonomy();
  const normalizedCode = nsmiCode.trim().toUpperCase();

  // First, search through the triage structure for exact match
  for (const root of data.triage) {
    // Check if root NSMI matches the code
    if (root.nsmi && root.nsmi.toUpperCase() === normalizedCode) {
      return {
        rootRedirect: root.redirect || root.id,
        childRedirect: null, // No specific child
      };
    }

    // Check children of this root
    if (root.children) {
      for (const child of root.children) {
        // Check child NSMI
        if (child.nsmi && child.nsmi.toUpperCase() === normalizedCode) {
          return {
            rootRedirect: root.redirect || root.id,
            childRedirect: child.redirect || null, // Only include if redirect exists
          };
        }
      }
    }
  }

  // If exact code not found, try to find the root category
  // Extract the root part of the NSMI code (e.g., "HO" from "HO-05-00-00-00")
  const rootPrefix = normalizedCode.split('-')[0];
  if (rootPrefix) {
    // Find a node where the code starts with this prefix
    for (const root of data.triage) {
      if (root.nsmi && root.nsmi.toUpperCase().startsWith(rootPrefix)) {
        // Found the root category for this code
        return {
          rootRedirect: root.redirect || root.id,
          childRedirect: null,
        };
      }
    }
  }

  return null;
}

/**
 * Builds a MassLRF deep link URL for a given NSMI code
 *
 * @param nsmiCode - The NSMI/LIST code (e.g., 'HO-02-00-00-00')
 * @param rootOnly - If true, returns just the root category URL without deep link suffix
 * @returns The deep link URL, or null if code not found
 */
export async function getMassLRFDeepLink(
  nsmiCode: string,
  rootOnly: boolean = false
): Promise<string | null> {
  const nodes = await findTriageNodeByNSMI(nsmiCode);

  if (!nodes) {
    return null;
  }

  // If no child redirect exists, or rootOnly is requested, just use root
  if (!nodes.childRedirect || rootOnly) {
    return `https://masslrf.org/en/triage/start/${nodes.rootRedirect}`;
  }

  // If we have a child redirect, create a deep link
  return `https://masslrf.org/en/triage/start/${nodes.rootRedirect}-${nodes.childRedirect}`;
}

/**
 * Builds a MassLRF top-level category link for a given NSMI code
 * Used for topic pages where we only link to the root category without a specific deep link
 *
 * @param nsmiCode - The NSMI/LIST code (e.g., 'HO-00-00-00-00')
 * @returns The top-level category link URL, or null if code not found
 */
export async function getMassLRFTopLevelLink(
  nsmiCode: string
): Promise<string | null> {
  return getMassLRFDeepLink(nsmiCode, true);
}

/**
 * Gets the MassLRF root triage URL for a specific jurisdiction
 * Currently only Massachusetts (ma) is supported
 *
 * @param jurisdiction - The jurisdiction code (e.g., 'ma')
 * @returns The root triage URL or null if jurisdiction not supported
 */
export function getMassLRFRootUrl(jurisdiction: string): string | null {
  // Currently only Massachusetts is supported
  if (jurisdiction.toLowerCase() === 'ma') {
    return 'https://masslrf.org/en/triage/start';
  }
  return null;
}
