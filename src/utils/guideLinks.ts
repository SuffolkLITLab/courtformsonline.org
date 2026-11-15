// These guides have individually authored state pages. Newly supported form
// jurisdictions should use the general guide until a state page is written.
const stateGuidePaths = {
  'find-your-court': ['ma', 'me', 'mi', 'mn', 'mo', 'vt'],
  'how-to-file': ['ma', 'me', 'mi', 'mn', 'vt'],
};

export function getGuideHref(
  guide: keyof typeof stateGuidePaths,
  jurisdiction: string
): string {
  const base = `/guides/${guide}`;
  return stateGuidePaths[guide].includes(jurisdiction)
    ? `${base}/${jurisdiction}`
    : base;
}
