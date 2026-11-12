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

## Manage CFO assistants in Studio

Create and maintain the assistant at https://asklit.suffolklitlab.org. Select its
organization, add knowledge bases and instructions, preview/evaluate, then Save
and Publish. In **Settings → Sharing**, choose **Unlisted** and use **Save access
& link** when the assistant should be available publicly through CFO without
appearing in a gallery. Unlisted is public by link, not an access restriction.
An organization gallery is optional and can remain disabled.

Use **Settings → Sharing → Integration → Copy bot ID** and add the copied value to
the existing form record's `metadata.asklit_id`, or link directly to
`/asklit?bot=BOT_ID`. The ID stays stable when Studio publishes a new version.
New conversations use the current publication; existing conversations can remain
on their original version. Changing the content does not require a CFO rebuild.
Changing build-time configuration or build-time form mappings does.

The generic `/asklit` page has gallery behavior when opened without an assistant
parameter. CFO does not need to link to that gallery: form pages and custom pages
can render `AskLitChat` directly, with CFO's own navigation around it.

The production build value is:

```sh
NEXT_PUBLIC_ASKLIT_API_URL=https://asklit.suffolklitlab.org npm run build
```

Allow the exact deployed CFO origins in the backend's `ASKLIT_CORS_ORIGINS`.
The build value is the origin without `/api`; it contains no secret. Neither a
Supabase service key nor model credentials belong in this frontend.

The AssemblyLine documentation has dedicated guides for
[authors](https://assemblyline.suffolklitlab.org/docs/asklits/studio),
[administrators](https://assemblyline.suffolklitlab.org/docs/asklits/studio-administration),
[CFO integration](https://assemblyline.suffolklitlab.org/docs/asklits/court-forms-online),
and [deployment](https://assemblyline.suffolklitlab.org/docs/asklits/studio-deployment).
