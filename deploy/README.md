# AskLit static frontend on Fly.io

Deploy this static export to the Suffolk LIT Lab organization:

```sh
fly deploy --config fly.asklit.toml --remote-only --ha=false
```

`Dockerfile.asklit` builds the Next.js export with
`NEXT_PUBLIC_ASKLIT_API_URL=https://asklit-studio.fly.dev` and serves `out/` using
unprivileged nginx. The public page is https://asklit-chat.fly.dev/asklit; pass
`?bot=BOT_ID` to open an assistant. No API keys or Supabase credentials belong
in this image. `.env*` files are excluded from the Docker build context.

This deployment does not change courtformsonline.org DNS or its existing hosting.
See the AskLit repository's `docs/fly-hosted-deployment.md` for the Python API,
background worker, Supabase, and OAuth configuration.
