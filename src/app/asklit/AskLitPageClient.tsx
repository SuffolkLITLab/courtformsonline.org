'use client';

import { FormEvent, useEffect, useState } from 'react';
import AskLitChat from '../components/AskLitChat';

type Item = {
  id: string;
  title: string;
  description: string;
  organization: string;
  organization_slug: string;
  slug: string;
};
type Gallery = {
  organization: { name: string; slug: string } | null;
  items: Item[];
  has_more: boolean;
};
const apiBase = (process.env.NEXT_PUBLIC_ASKLIT_API_URL || '').replace(
  /\/$/,
  ''
);

export default function AskLitPageClient() {
  const [route, setRoute] = useState<{
    bot: string;
    org: string;
    slug: string;
  } | null>(null);
  const [botId, setBotId] = useState('');
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setRoute({
      bot: q.get('bot') || '',
      org: q.get('org') || '',
      slug: q.get('slug') || '',
    });
  }, []);
  useEffect(() => {
    if (!route) return;
    const abort = new AbortController();
    setError('');
    setGallery(null);
    setBotId('');
    if (!apiBase) {
      setError('AskLit is not configured for this site.');
      return;
    }
    if (route.bot) {
      if (/^[a-f0-9]{32}$/.test(route.bot)) setBotId(route.bot);
      else setError('This assistant link is invalid.');
      return;
    }
    const path =
      route.org && route.slug
        ? `/api/public/organizations/${encodeURIComponent(route.org)}/bots/${encodeURIComponent(route.slug)}`
        : `/api/public/gallery?${new URLSearchParams({ organization: route.org, q: query, page: String(page) })}`;
    fetch(apiBase + path, { credentials: 'omit', signal: abort.signal })
      .then(async (response) => {
        if (!response.ok)
          throw new Error('This AskLit or gallery is not available.');
        const value = await response.json();
        if (abort.signal.aborted) return;
        if (route.org && route.slug) setBotId(value.id);
        else setGallery(value);
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      });
    return () => abort.abort();
  }, [route, query, page]);
  function submit(event: FormEvent) {
    event.preventDefault();
    setPage(1);
    setQuery(search);
  }
  if (error) return <p role="alert">{error}</p>;
  if (botId) return <AskLitChat botId={botId} />;
  if (!gallery) return <p role="status">Loading…</p>;
  return (
    <>
      <h1>{gallery.organization?.name || 'AskLit gallery'}</h1>
      <form onSubmit={submit} className="d-flex gap-2 my-4">
        <label className="visually-hidden" htmlFor="asklit-search">
          Search AskLits
        </label>
        <input
          id="asklit-search"
          className="form-control"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search AskLits"
          maxLength={100}
        />
        <button className="btn btn-primary">Search</button>
      </form>
      {gallery.organization && (
        <p>
          <a
            href={`${apiBase}/o/${encodeURIComponent(gallery.organization.slug)}`}
          >
            Open organization gallery with sign-in
          </a>
        </p>
      )}
      <div className="row g-3">
        {gallery.items.map((item) => (
          <div className="col-md-6 col-lg-4" key={item.id}>
            <a
              className="card p-3 h-100 text-decoration-none"
              href={`/asklit?${new URLSearchParams({ org: item.organization_slug, slug: item.slug })}`}
            >
              <h2 className="h5">{item.title}</h2>
              {item.description && <p>{item.description}</p>}
              <span className="small text-muted">{item.organization}</span>
            </a>
          </div>
        ))}
      </div>
      {!gallery.items.length && <p>No AskLits to show.</p>}
      <div className="d-flex gap-2 my-4">
        {page > 1 && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        )}
        {gallery.has_more && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}
