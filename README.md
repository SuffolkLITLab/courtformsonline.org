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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Form Sources Config

The `formSources.config.js` file allows new paths and server sources to be added to courtformsonline. There are two main components to this config file:

- pathToServerConfig: Maps paths to servers, which facilitates adding new paths or modifying existing connections to different servers.
- formSources: Contains the details of the servers, including URLs and names, used by the application.

### Form source example

`{
  key: 'newServerKey',
  url: 'https://newserver.example.com',
  name: 'New Server Name',
},`

### Path to server config example

`
yourPath: {
  path: 'yourPath',
  servers: ['New Server Name', 'Existing Server Name'],
},
`


