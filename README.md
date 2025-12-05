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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Atkinson Hyperlegible, a custom Google Font.

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
