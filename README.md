This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The development command loads the bundled public CA chain needed to validate
the Legal Aid of West Virginia catalog connection, as the production deployment
does. See [the certificate documentation](certificates/README.md) for details.

Use `npm run dev` to preview current source changes, including the Massachusetts
checkup at `/ma/checkup`. `npm start` serves the last static export from `out/`;
new routes and edits will not appear there until `npm run build` succeeds.
If port 3000 is already in use, stop that server or run
`npm run dev -- --port 3001` and open http://localhost:3001 instead.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to load bundled Albert Sans fonts. See [branding notes](docs/branding.md) for font sources and logo details.

## Form Sources Config

The `formSources.config.js` file allows new paths and server sources to be added to courtformsonline. There are two main components to this config file:

### Form source example

`{
  key: 'newServerKey',
  url: 'https://newserver.example.com',
  name: 'New Server Name',
},`

### Path to server config example

`yourPath: {
  path: 'yourPath',
  servers: ['New Server Name', 'Existing Server Name'],
},`

## Sitemap Generation

This project uses Next.js [Metadata Route](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) to generate `sitemap.xml`.

- **Development**: The sitemap is available at `/sitemap.xml` and is generated dynamically on request.
- **Production (Static Export)**: When running `npm run build`, Next.js automatically generates `sitemap.xml` in the output directory based on the logic in `src/app/sitemap.ts`. No manual scripts are required.

## Tracking 404s on GitHub Pages

Because this site is a static export, there is no server-side 404 log. Instead, the `not-found` page can send client-side events to an external endpoint.

Set this environment variable at build time:

```bash
NEXT_PUBLIC_404_LOG_ENDPOINT=https://your-endpoint.example/log-404
```

When configured, every 404 page view sends a small JSON payload (`pathname`, `referrer`, `timestamp`) to that endpoint. You can store those events (for example in a simple database or spreadsheet pipeline) and review them periodically to add redirects or new landing pages.

## Spanish translations

Next.js builds the state landing pages, form indexes, family emergency page,
and blog under `/es` using the same React components as the English routes.
Shared interface messages and family emergency page copy are keyed by ID in
`src/i18n/en.json` and `src/i18n/es.json`.

To translate a blog post, add an MDX file under `content/blog-es` with the same
relative path as the English post under `content/blog`. The translation inherits
the English post's date and image unless its frontmatter supplies replacements.
For a Spanish image override, place the image alongside the Spanish MDX file and
set `image` to its relative path. Supply Spanish `imageAlt` when the image needs
an additional description.

```bash
python3 scripts/translation-xliff.py export /tmp/messages.es.xlf
python3 scripts/translation-xliff.py import /tmp/messages.es.xlf
```

The export flags changed English strings and includes their old Spanish text as
a reference. Importing a reviewed file checks the English source and placeholders
and records the source in `src/i18n/es.sources.json`. If you edit both catalogs
directly, update the source snapshot for a message once its translation matches
the revised English.

The Spanish directories use Spanish titles and descriptions supplied by form
providers when available. Interview links from those directories pass `lang=es`.
The interview must support the language and use that argument to select it.
