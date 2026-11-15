/** @jest-environment node */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getGuideHref } from '../src/utils/guideLinks';
import { pathToServerConfig } from '../src/config/formSources.config';

it('points every supported state to an existing filing and courthouse guide', () => {
  for (const state of Object.keys(pathToServerConfig)) {
    for (const guide of ['how-to-file', 'find-your-court'] as const) {
      const href = getGuideHref(guide, state);
      expect(existsSync(join(process.cwd(), 'src/app', href, 'page.tsx'))).toBe(
        true
      );
    }
  }
});

it('retains existing state guidance and uses a general guide where no state page exists', () => {
  expect(getGuideHref('find-your-court', 'ma')).toBe(
    '/guides/find-your-court/ma'
  );
  expect(getGuideHref('how-to-file', 'wv')).toBe('/guides/how-to-file');
  expect(getGuideHref('find-your-court', 'ca')).toBe('/guides/find-your-court');
});
