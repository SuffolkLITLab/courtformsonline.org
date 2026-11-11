# AskLit assistants

The site can display published AskLit assistants while remaining a Next.js static
export. Set `NEXT_PUBLIC_ASKLIT_API_URL` to the dedicated AskLit backend's HTTPS
origin at build time, then add this site's exact origin to the backend's
`ASKLIT_CORS_ORIGINS`.

The generic page is `/asklit?bot=BOT_ID`, where `BOT_ID` is the 32-character ID
shown when publishing in AskLit Studio. Because the query is read client-side,
new bots do not require new static routes or a site rebuild.

A form may also provide `metadata.asklit_id` to display its assistant on its
existing form landing page. With no bot ID or API origin configured, the panel
is omitted. Only the bot identifier is accepted from form metadata; the trusted
backend origin comes from the build environment.

`src/app/components/AskLitChat.tsx` handles metadata, new conversations, messages,
citations and deletion directly from the browser. Tokens stay in memory; no
cookies, provider keys, Next.js server routes, or user-supplied bot code are
needed. Responses are rendered as text. The backend owns prompts, documents,
model selection, credentials, spending limits and immutable published versions.

The reusable component source and backend deployment guide live in the sibling
AskLit repository under `integrations/nextjs/` and `docs/hosted-deployment.md`.

`tsconfig.build.json` limits the production build's type check to application
sources. The existing Jest tests keep using the normal test configuration.

```sh
NEXT_PUBLIC_ASKLIT_API_URL=https://YOUR-ASKLIT-HOST npm run build
```

Serve `out/` through ordinary static hosting with clean URL support. No Node.js
runtime is required after building.
