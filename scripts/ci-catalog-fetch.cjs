// Loaded only by the CI build step. Production builds use the live catalogs.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

function createCatalogFixtureFetch(actualFetch, catalogs) {
  return async function catalogFixtureFetch(input, init) {
    let url;
    try {
      url = new URL(typeof input === 'string' ? input : input.url || input);
    } catch {
      return actualFetch(input, init);
    }
    if (
      url.pathname.replace(/\/+/g, '/').replace(/\/+$/, '') === '/list' &&
      url.searchParams.get('json') === '1'
    ) {
      if (!Object.hasOwn(catalogs, url.hostname)) {
        throw new Error(`Missing CI catalog fixture for ${url.hostname}`);
      }
      const catalog = catalogs[url.hostname];
      return new Response(JSON.stringify(catalog), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }
    return actualFetch(input, init);
  };
}

if (process.env.CI_CATALOG_FIXTURES === '1') {
  if (!process.env.CI) {
    throw new Error('Catalog fixtures require an explicit CI environment');
  }
  const catalogs = JSON.parse(
    readFileSync(join(__dirname, '../__fixtures__/catalogs.json'), 'utf8')
  );
  globalThis.fetch = createCatalogFixtureFetch(globalThis.fetch, catalogs);
}

module.exports = { createCatalogFixtureFetch };
