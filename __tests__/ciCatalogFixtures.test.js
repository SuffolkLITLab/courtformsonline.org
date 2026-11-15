/** @jest-environment node */

import { formSources } from '../src/config/formSources.config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const {
  createCatalogFixtureFetch,
} = require('../scripts/ci-catalog-fetch.cjs');
const catalogs = require('../__fixtures__/catalogs.json');

describe('CI catalog build fixtures', () => {
  it('covers every configured provider with valid catalog entries', () => {
    for (const server of formSources.docassembleServers) {
      const catalog = catalogs[new URL(server.url).hostname];
      expect(catalog.interviews.length).toBeGreaterThan(0);
      expect(
        catalog.interviews.every((entry) => entry.filename && entry.metadata)
      ).toBe(true);
    }
  });

  it('serves the catalog for string, URL, and Request inputs without network access', async () => {
    const network = jest.fn();
    const fetch = createCatalogFixtureFetch(network, catalogs);
    for (const input of [
      'https://apps.suffolklitlab.org/list?json=1',
      new URL('https://apps.ptla.org//list?json=1'),
      new Request('https://interviews.gbls.org/list?json=1'),
    ]) {
      const response = await fetch(input);
      expect(response.ok).toBe(true);
      expect((await response.json()).interviews.length).toBeGreaterThan(0);
    }
    expect(network).not.toHaveBeenCalled();
  });

  it('fails explicitly for an unrecorded catalog instead of accessing a live server', async () => {
    const network = jest.fn();
    await expect(
      createCatalogFixtureFetch(
        network,
        catalogs
      )('https://new.example/list?json=1')
    ).rejects.toThrow('Missing CI catalog fixture');
    expect(network).not.toHaveBeenCalled();
  });

  it('leaves interview and other requests alone', async () => {
    const network = jest.fn().mockResolvedValue('real response');
    const fetch = createCatalogFixtureFetch(network, catalogs);
    const url = 'https://apps.suffolklitlab.org/interview?i=example';
    const options = { method: 'GET' };
    expect(await fetch(url, options)).toBe('real response');
    expect(network).toHaveBeenCalledWith(url, options);
  });

  it('does not enable the fixture adapter in the production deployment workflow', () => {
    const deployment = readFileSync(
      join(__dirname, '../.github/workflows/deploy.yml'),
      'utf8'
    );
    expect(deployment).not.toMatch(/CI_CATALOG_FIXTURES|ci-catalog-fetch/);
  });
});
