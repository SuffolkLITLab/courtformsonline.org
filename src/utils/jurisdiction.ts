import {
  pathToServerConfig,
  formSources,
  jurisdictionAliases,
  DEFAULT_JURISDICTION,
  DEFAULT_PATH,
} from '../config/formSources.config';

/**
 * Normalizes a jurisdiction code to a standardized state name.
 * Handles FOLIO codes (e.g., NAM-US-US+MN), two-letter codes (e.g., MN), and full names.
 *
 * @param code - The jurisdiction code from form metadata
 * @returns The standardized jurisdiction name, or undefined if not recognized
 */
export function normalizeJurisdiction(
  code: string | undefined
): string | undefined {
  if (!code) return undefined;

  const normalizedCode = code.trim();

  for (const [standard, aliases] of Object.entries(jurisdictionAliases)) {
    if (
      aliases.some(
        (alias) => alias.toLowerCase() === normalizedCode.toLowerCase()
      )
    ) {
      return standard;
    }
  }

  // If not found in aliases, return the original (could be a new jurisdiction)
  return normalizedCode;
}

/**
 * Gets the default jurisdiction for a server.
 *
 * @param serverUrl - The server URL
 * @returns The default jurisdiction for that server, or global default
 */
export function getServerDefaultJurisdiction(serverUrl: string): string {
  const server = formSources.docassembleServers.find(
    (s) => s.url === serverUrl
  );
  return server?.defaultJurisdiction || DEFAULT_JURISDICTION;
}

/**
 * Gets the default jurisdiction for a server key.
 *
 * @param serverKey - The server key
 * @returns The default jurisdiction for that server, or global default
 */
export function getServerDefaultJurisdictionByKey(serverKey: string): string {
  const server = formSources.docassembleServers.find(
    (s) => s.key === serverKey
  );
  return server?.defaultJurisdiction || DEFAULT_JURISDICTION;
}

/**
 * Gets the expected jurisdiction name for a given URL path.
 *
 * @param path - The URL path segment (e.g., 'ma', 'mn')
 * @returns The jurisdiction name from config, or default jurisdiction
 */
export function getJurisdictionFromPath(path: string): string {
  const config = pathToServerConfig[path];
  return config?.name || DEFAULT_JURISDICTION;
}

/**
 * Gets the URL path for a given jurisdiction name.
 *
 * @param jurisdictionName - The jurisdiction name (e.g., 'Massachusetts')
 * @returns The URL path (e.g., 'ma'), or default path
 */
export function getPathFromJurisdiction(jurisdictionName: string): string {
  for (const [path, config] of Object.entries(pathToServerConfig)) {
    if ((config as any).name === jurisdictionName) {
      return path;
    }
  }
  return DEFAULT_PATH;
}

/**
 * Checks if a form's jurisdiction matches the expected jurisdiction for a path.
 * Forms without a jurisdiction default to the server's default jurisdiction.
 *
 * @param formJurisdiction - The jurisdiction from form metadata
 * @param expectedJurisdiction - The expected jurisdiction for the current path
 * @param serverUrl - The server URL the form came from (for default jurisdiction)
 * @returns True if the form should be shown for this jurisdiction
 */
export function jurisdictionMatches(
  formJurisdiction: string | undefined,
  expectedJurisdiction: string,
  serverUrl?: string
): boolean {
  const normalized = normalizeJurisdiction(formJurisdiction);

  // If no jurisdiction specified, use server's default jurisdiction
  if (!normalized) {
    const serverDefault = serverUrl
      ? getServerDefaultJurisdiction(serverUrl)
      : DEFAULT_JURISDICTION;
    return expectedJurisdiction === serverDefault;
  }

  return normalized === expectedJurisdiction;
}

/**
 * Gets all available jurisdictions from config.
 *
 * @returns Array of jurisdiction objects with path and name
 */
export function getAvailableJurisdictions(): Array<{
  path: string;
  name: string;
}> {
  return Object.entries(pathToServerConfig).map(([path, config]) => ({
    path,
    name: (config as any).name,
  }));
}

// Re-export config for consumers that need it directly
export { DEFAULT_JURISDICTION, DEFAULT_PATH, jurisdictionAliases };
