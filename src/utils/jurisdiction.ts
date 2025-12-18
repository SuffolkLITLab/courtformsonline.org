import { pathToServerConfig } from '../config/formSources.config';

/**
 * Jurisdiction code mapping.
 * Maps standardized state names to various codes that might appear in metadata.
 * Includes SALI/FOLIO location codes (e.g., NAM-US-US+MA) and two-letter state codes.
 */
const jurisdictionAliases: Record<string, string[]> = {
  Massachusetts: ['MA', 'NAM-US-US+MA', 'Massachusetts', 'ma'],
  Minnesota: ['MN', 'NAM-US-US+MN', 'Minnesota', 'mn'],
  // Add more jurisdictions as needed
};

/**
 * Default jurisdiction when none is specified in form metadata
 */
export const DEFAULT_JURISDICTION = 'Massachusetts';

/**
 * Default path for the default jurisdiction
 */
export const DEFAULT_PATH = 'ma';

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
 * Forms without a jurisdiction default to Massachusetts.
 *
 * @param formJurisdiction - The jurisdiction from form metadata
 * @param expectedJurisdiction - The expected jurisdiction for the current path
 * @returns True if the form should be shown for this jurisdiction
 */
export function jurisdictionMatches(
  formJurisdiction: string | undefined,
  expectedJurisdiction: string
): boolean {
  const normalized = normalizeJurisdiction(formJurisdiction);

  // If no jurisdiction specified, default to Massachusetts
  if (!normalized) {
    return expectedJurisdiction === DEFAULT_JURISDICTION;
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
