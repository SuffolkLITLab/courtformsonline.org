/** @jest-environment node */

import { formSources } from '../src/config/formSources.config';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const {
  createCatalogFixtureFetch,
} = require('../scripts/ci-catalog-fetch.cjs');
const catalogs = require('../__fixtures__/catalogs.json');

describe('CI catalog build fixtures', () => {
  it('covers every configured provider with valid catalog entries', () => {
    for (const server of formSources.docassembleServers) {
      const catalog = catalogs[new URL(server.url).hostname];
      expect(catalog).toBeDefined();
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
      new URL('https://apps.ptla.org/list/?json=1'),
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

  it('delegates relative requests to the original fetch implementation', async () => {
    const network = jest.fn().mockResolvedValue('original response');
    expect(
      await createCatalogFixtureFetch(network, catalogs)('/api/example')
    ).toBe('original response');
    expect(network).toHaveBeenCalledWith('/api/example', undefined);
  });

  it('activates only for an explicit CI fixture build, including in Node child processes', () => {
    const preload = join(__dirname, '../scripts/ci-catalog-fetch.cjs');
    const env = { ...process.env, CI: 'true', CI_CATALOG_FIXTURES: '1' };
    const output = execFileSync(
      process.execPath,
      [
        '--require',
        preload,
        '-e',
        "fetch('https://apps.suffolklitlab.org/list?json=1').then(r => r.json()).then(c => console.log(c.interviews.length))",
      ],
      { env, encoding: 'utf8', timeout: 5000 }
    );
    expect(Number(output.trim())).toBe(
      catalogs['apps.suffolklitlab.org'].interviews.length
    );

    const inactive = execFileSync(
      process.execPath,
      [
        '-e',
        `const original = globalThis.fetch; require(${JSON.stringify(preload)}); console.log(original === globalThis.fetch)`,
      ],
      {
        env: { ...env, CI_CATALOG_FIXTURES: '' },
        encoding: 'utf8',
        timeout: 5000,
      }
    );
    expect(inactive.trim()).toBe('true');

    const rejected = spawnSync(
      process.execPath,
      ['--require', preload, '-e', ''],
      {
        env: { ...env, CI: '' },
        encoding: 'utf8',
        timeout: 5000,
      }
    );
    expect(rejected.status).not.toBe(0);
    expect(rejected.stderr).toContain('require an explicit CI environment');
  });

  it('does not enable the fixture adapter in the production deployment workflow', () => {
    const deployment = readFileSync(
      join(__dirname, '../.github/workflows/deploy.yml'),
      'utf8'
    );
    expect(deployment).not.toMatch(
      /CI_CATALOG_FIXTURES|ci-catalog-fetch|__fixtures__\//
    );
  });
});
