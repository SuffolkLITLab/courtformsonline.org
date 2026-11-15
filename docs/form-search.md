# Form search and FETCH

The static site searches its jurisdiction's form titles and descriptions locally.
Exact title words (case- and punctuation-insensitive, excluding common stop words)
appear first, followed by exact description keyword matches in the same
“Forms matching your keywords” group. All keyword matches stay above related
topics, including while topic results arrive asynchronously. A form listed in
multiple categories appears once in each keyword result group. FETCH's LIST
subcategories map to the site's broader categories, ranked by highest confidence.
Within each topic card, forms are ranked against the returned LIST codes using
`metadata.LIST_topics` and valid LIST-code tags. More specific ancestor/descendant
matches rank first, then exact matches and confidence; ties preserve catalog order.
Sibling codes do not count as specific matches, and broad-only topic responses
preserve the original form order. This improves the first three visible forms
without another AI call.

Sparse upstream metadata limits ranking. The metadata improvements in
[MADE #379](https://github.com/GBLS/docassemble-MAEvictionDefense/pull/379) and
[UpToCode #679](https://github.com/LemmaLegalConsulting/docassemble-HousingCodeChecklist/pull/679)
need package deployment and a catalog rebuild. No hardcoded form boosts or local
metadata overrides are applied.

The browser calls a Cloudflare Worker, never FETCH directly. The Worker owns the
credential and uses `https://fetch.courtformsonline.org/api/classify` on Suffolk's
`open-fetch-suffolk` Fly app. It requests the LIST taxonomy and the configured
ensemble, with `skip_followups`, `skip_semantic_merge`, and
`enable_screening_protocols: false`. No model list is pinned in the browser.

## Local preview

1. Run `npm ci`.
2. Create `workers/form-search/.dev.vars` (ignored by Git, permissions 0600):

   ```dotenv
   FETCH_API_TOKEN=your-dedicated-fetch-key
   ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

3. Run `npm run worker:dev`.
4. Run `NEXT_PUBLIC_FORM_SEARCH_URL=http://localhost:8787 npm run dev`.
5. Open http://localhost:3000/ma.

Use the same origin as the allowlist. The frontend URL is public configuration;
never put a token in a `NEXT_PUBLIC_*` variable.

## Production setup

1. Deploy `workers/form-search/wrangler.jsonc` to the Suffolk Cloudflare account
   using `npm run worker:deploy`. Review its exact origin allowlist first.
2. Set `FETCH_API_TOKEN` with `npx wrangler secret put FETCH_API_TOKEN --config
workers/form-search/wrangler.jsonc`; paste the dedicated Lab key at the prompt.
3. Set the GitHub Actions repository variable `NEXT_PUBLIC_FORM_SEARCH_URL` to
   the deployed HTTPS Worker URL, then rebuild the static site. A missing URL
   leaves local search available and reports topic matching as unavailable.
4. Remove the obsolete `NEXT_PUBLIC_SPOT_API_BEARER_TOKEN` Actions secret and
   rotate/revoke the old SPOT token exposed by the previous browser implementation.
   Coordinate rotation if other consumers use that key. The new Lab FETCH key
   does not replace FETCH's own server-side SPOT provider credential.
5. Verify CORS, real classification, rate limiting, and browser results on the
   deployed origin before retiring the previous Worker.

The versioned Worker is new; the old `spot-plus-keyword-5dc1` Worker source was
not in this repository and has not been overwritten. Neither this new Worker
nor the frontend is automatically published by local preview.

## Privacy and failure behavior

FETCH currently has no per-request save/retention option. The former “Use my
reply to help others” checkbox now explicitly controls sharing with FETCH.
Unchecked searches remain on the device; the Worker also refuses to forward
`save_data: false`. Checked searches use the dedicated
`suffolk-lit-lab-courtforms-production` credential (consumer `suffolk-lit-lab`,
production environment), configured with `capture_content: false` and no
telemetry destination. This disables FETCH content telemetry; it does not assert
that external model providers have no processing or retention. No unsupported
`save-text` flag is silently sent to FETCH. Future research-data collection needs
an explicit opt-in implementation in FETCH before restoring that checkbox label.

The Worker accepts only JSON POST requests from allowed origins, limits text to
4,000 characters and bodies to 24,000 bytes, times out upstream after 25 seconds,
and returns only LIST IDs, confidence scores, and a degradation flag. It does not
log descriptions, credentials, or upstream errors. Cloudflare rate limiting is
10 calls per minute per IP per location; this is approximate, not a global quota.
CORS is a browser restriction, not authentication. FETCH's scoped rate limiting
also applies. See [Cloudflare's rate limit documentation](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).

Keyword results appear immediately. Topic matching has a spinner and live status,
with a longer-wait message after eight seconds. Failure, timeout, and empty
results retain keyword results and allow returning to category browsing. Cancel
aborts the browser request and ignores late replies; it does not guarantee that
an upstream model call already in progress stops.

## Verification

Run `npm test -- --runInBand` and `npx tsc --noEmit -p tsconfig.build.json`.
Worker unit tests use Node's fetch types; local Wrangler/browser testing is also
needed because the Workers runtime differs (for example, redirects must use
`manual`, not `error`).

### Local end-to-end measurements, November 15, 2026

Playwright/Chromium against Next development mode and local Wrangler, using the
live Suffolk FETCH service with follow-ups and screening disabled:

| Search                                              |         Keyword UI visible | Topics visible | FETCH status  |
| --------------------------------------------------- | -------------------------: | -------------: | ------------- |
| eviction                                            |                     213 ms |         8.65 s | 200, degraded |
| fee waiver                                          |                      89 ms |         6.27 s | 200           |
| My landlord has not fixed the heat in my apartment. | 95 ms (no keyword matches) |         8.40 s | 200, degraded |

Direct FETCH calls for five synthetic descriptions took 5.19–8.60 seconds. All
returned zero follow-up questions. These are small-sample development timings,
not production percentiles. Browser checks also confirmed zero network requests
when sharing was unchecked, correct topic rendering, and no JavaScript errors.
Early calls after the Fly secret rollout returned transient 503s; the subsequent
full browser runs above succeeded. Degraded responses remain visible to users.
