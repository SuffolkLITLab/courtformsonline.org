'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type Source = { filename: string; page: number; content: string };
type Answer = { answer: string; sources: Source[] };
type Metadata = {
  title: string;
  locked?: boolean;
  access_mode?: string;
  url?: string;
  welcome: string;
  footer: string;
  retention_days: number;
  uploads?: {
    enabled: boolean;
    extensions: string[];
    max_bytes: number;
    max_files: number;
  };
  profiles: { key: string; label: string; conversation_starters: string[] }[];
};
type Attachment = {
  id: string;
  filename: string;
  size: number;
  characters: number;
};
type Session = { id: string; token: string };
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
};

/** A client-only component compatible with Next.js output: 'export'. */
export default function AskLitChat({
  botId,
  apiBase = process.env.NEXT_PUBLIC_ASKLIT_API_URL || '',
}: {
  botId: string;
  apiBase?: string;
}) {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [profile, setProfile] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = useRef('');
  const popup = useRef<Window | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const session = useRef<Session | null>(null);
  const generation = useRef(0);
  const submitting = useRef(false);
  const retry = useRef<{ message: string; request_id: string } | null>(null);
  const controller = useRef<AbortController | null>(null);
  const base = apiBase.replace(/\/$/, '');

  useEffect(() => {
    const version = ++generation.current;
    const abort = new AbortController();
    session.current = null;
    accessToken.current = '';
    setPassword('');
    retry.current = null;
    controller.current?.abort();
    submitting.current = false;
    setBusy(false);
    setMessages([]);
    setAttachments([]);
    setMetadata(null);
    setError('');
    if (!base || !/^[a-f0-9]{32}$/.test(botId)) {
      setError('This assistant is not configured.');
      return;
    }
    fetch(`${base}/api/public/bots/${encodeURIComponent(botId)}`, {
      signal: abort.signal,
      credentials: 'omit',
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error('This assistant is not available right now.');
        const data: Metadata = await response.json();
        if (version !== generation.current) return;
        setMetadata(data);
        setProfile(data.profiles[0]?.key || 'default');
      })
      .catch((e) => {
        if (!abort.signal.aborted) setError(e.message);
      });
    return () => {
      ++generation.current;
      abort.abort();
      controller.current?.abort();
    };
  }, [base, botId]);

  useEffect(() => {
    const receive = async (event: MessageEvent) => {
      if (
        !base ||
        event.origin !== new URL(base).origin ||
        event.source !== popup.current ||
        event.data?.type !== 'asklit-access' ||
        event.data.botId !== botId ||
        typeof event.data.token !== 'string'
      )
        return;
      const version = generation.current;
      try {
        const response = await fetch(`${base}/api/public/bots/${botId}`, {
          credentials: 'omit',
          headers: { Authorization: 'Bearer ' + event.data.token },
        });
        if (!response.ok) throw new Error('Sign-in could not be completed.');
        const data: Metadata = await response.json();
        if (version !== generation.current) return;
        if (data.locked)
          throw new Error('Your account does not have access to this AskLit.');
        accessToken.current = event.data.token;
        setMetadata(data);
        setProfile(data.profiles[0]?.key || 'default');
        setError('');
      } catch (e) {
        if (version === generation.current)
          setError(e instanceof Error ? e.message : 'Sign-in failed.');
      }
    };
    window.addEventListener('message', receive);
    return () => window.removeEventListener('message', receive);
  }, [base, botId]);

  async function unlock(event: FormEvent) {
    event.preventDefault();
    if (submitting.current) return;
    const version = generation.current;
    submitting.current = true;
    setBusy(true);
    setError('');
    try {
      const response = await fetch(`${base}/api/public/bots/${botId}/access`, {
        method: 'POST',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.detail || 'Could not unlock this AskLit.');
      if (version !== generation.current) return;
      accessToken.current = result.token;
      setMetadata(result.metadata);
      setProfile(result.metadata.profiles[0]?.key || 'default');
      setPassword('');
    } catch (e) {
      if (version === generation.current)
        setError(
          e instanceof Error ? e.message : 'Could not unlock this AskLit.'
        );
    } finally {
      if (version === generation.current) {
        submitting.current = false;
        setBusy(false);
      }
    }
  }

  async function post<T>(
    path: string,
    body: unknown,
    token?: string,
    method = 'POST'
  ): Promise<T> {
    const version = generation.current;
    const response = await fetch(`${base}${path}`, {
      method,
      credentials: 'omit',
      signal: controller.current?.signal,
      headers: {
        ...(body && !(body instanceof FormData)
          ? { 'Content-Type': 'application/json' }
          : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body:
        body instanceof FormData
          ? body
          : body === undefined
            ? undefined
            : JSON.stringify(body),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      // Definitive failures can be retried as new turns. Network failures reuse
      // the same request ID so a lost response cannot duplicate a billed call.
      if (
        path.endsWith('/messages') &&
        !['turn_pending', 'conversation_busy'].includes(data.code)
      )
        retry.current = null;
      if (
        [403, 404].includes(response.status) &&
        version === generation.current
      ) {
        session.current = null;
        setAttachments([]);
        if (response.status === 403 || data.code === 'turn_failed') {
          accessToken.current = '';
          const current = await fetch(`${base}/api/public/bots/${botId}`, {
            credentials: 'omit',
          });
          if (current.ok) {
            const data: Metadata = await current.json();
            if (version !== generation.current)
              throw new Error('AskLit changed.');
            setMetadata(data);
            setProfile(data.profiles[0]?.key || 'default');
          }
        }
      }
      throw new Error(
        typeof data.detail === 'string'
          ? data.detail
          : 'The assistant could not answer. Please try again.'
      );
    }
    return response.json();
  }

  async function send(event: FormEvent) {
    event.preventDefault();
    if (submitting.current || !question.trim() || !metadata) return;
    submitting.current = true;
    setBusy(true);
    setError('');
    const version = generation.current;
    const message = question.trim();
    controller.current = new AbortController();
    const timeout = setTimeout(() => controller.current?.abort(), 120000);
    try {
      if (!session.current) {
        const created = await post<Session>(
          `/api/public/bots/${botId}/conversations`,
          {
            profile,
            ...(accessToken.current
              ? { access_token: accessToken.current }
              : {}),
          }
        );
        if (version !== generation.current) return;
        session.current = created;
      }
      if (metadata.uploads?.enabled) {
        const response = await fetch(
          `${base}/api/public/conversations/${session.current.id}/attachments`,
          {
            credentials: 'omit',
            signal: controller.current?.signal,
            headers: { Authorization: 'Bearer ' + session.current.token },
          }
        );
        if (!response.ok)
          throw new Error('Could not check the attached files. Try again.');
        const files: Attachment[] = await response.json();
        if (version !== generation.current) return;
        setAttachments(files);
      }
      const request =
        retry.current?.message === message
          ? retry.current
          : { message, request_id: crypto.randomUUID() };
      retry.current = request;
      const result = await post<Answer>(
        `/api/public/conversations/${session.current.id}/messages`,
        request,
        session.current.token
      );
      if (version !== generation.current) return;
      setMessages((old) => [
        ...old,
        { role: 'user', content: message },
        { role: 'assistant', content: result.answer, sources: result.sources },
      ]);
      retry.current = null;
      setQuestion('');
    } catch (e) {
      if (version === generation.current)
        setError(
          e instanceof Error && e.name !== 'AbortError'
            ? e.message
            : 'The response was interrupted. Send the same message to check its result.'
        );
    } finally {
      clearTimeout(timeout);
      if (version === generation.current) {
        submitting.current = false;
        setBusy(false);
      }
    }
  }

  async function changeAttachment(file?: File, removeId?: string) {
    if (submitting.current || !metadata?.uploads?.enabled) return;
    if (
      file &&
      (file.size > metadata.uploads.max_bytes ||
        attachments.length >= metadata.uploads.max_files)
    ) {
      setError(
        'Choose a file under 5 MB, with at most three files per conversation.'
      );
      return;
    }
    const version = generation.current;
    submitting.current = true;
    setBusy(true);
    setError('');
    controller.current = new AbortController();
    const timer = setTimeout(() => controller.current?.abort(), 120000);
    try {
      if (!session.current) {
        const created = await post<Session>(
          `/api/public/bots/${botId}/conversations`,
          { profile, access_token: accessToken.current }
        );
        if (version !== generation.current) return;
        session.current = created;
      }
      const current = session.current;
      const path = `/api/public/conversations/${current.id}/attachments`;
      try {
        if (file) {
          const body = new FormData();
          body.append('file', file);
          await post<Attachment>(path, body, current.token);
        } else if (removeId) {
          await post(path + '/' + removeId, undefined, current.token, 'DELETE');
        }
      } finally {
        if (version === generation.current && session.current === current) {
          const reconcile = new AbortController();
          const reconcileTimer = setTimeout(() => reconcile.abort(), 10000);
          try {
            const response = await fetch(base + path, {
              credentials: 'omit',
              signal: reconcile.signal,
              headers: { Authorization: 'Bearer ' + current.token },
            });
            if (response.ok) {
              const files: Attachment[] = await response.json();
              if (version === generation.current) setAttachments(files);
            }
          } finally {
            clearTimeout(reconcileTimer);
          }
        }
      }
      retry.current = null;
    } catch (e) {
      if (version === generation.current)
        setError(
          e instanceof Error && e.name !== 'AbortError'
            ? e.message
            : 'The upload was interrupted. Check the file list before trying again.'
        );
    } finally {
      clearTimeout(timer);
      if (version === generation.current) {
        submitting.current = false;
        setBusy(false);
      }
    }
  }

  async function clearConversation() {
    if (busy) return;
    if (session.current) {
      try {
        const response = await fetch(
          `${base}/api/public/conversations/${session.current.id}`,
          {
            method: 'DELETE',
            credentials: 'omit',
            headers: { Authorization: `Bearer ${session.current.token}` },
          }
        );
        if (!response.ok && response.status !== 404) {
          throw new Error('Conversation could not be deleted.');
        }
      } catch {
        setError(
          'Could not clear the saved conversation. Try again when connected.'
        );
        return;
      }
    }
    session.current = null;
    retry.current = null;
    setMessages([]);
    setAttachments([]);
    setQuestion('');
    setError('');
  }

  return (
    <section
      className="border rounded p-3 p-md-4 my-4"
      aria-label="AskLit assistant"
    >
      <h2>{metadata?.title || 'Ask a question'}</h2>
      {error && (
        <p role="alert" className="alert alert-warning">
          {error}
        </p>
      )}
      {!metadata && !error && <p role="status">Loading assistant…</p>}
      {metadata?.locked && metadata.access_mode === 'password' && (
        <form onSubmit={unlock}>
          <label className="form-label d-block">
            Password
            <input
              className="form-control"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              maxLength={200}
              required
              disabled={busy}
            />
          </label>
          <button className="btn btn-primary" disabled={busy}>
            Open AskLit
          </button>
        </form>
      )}
      {metadata?.locked && metadata.access_mode === 'organization' && (
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              popup.current = window.open(
                `${base}/a/${botId}?opener_origin=${encodeURIComponent(window.location.origin)}`,
                `asklit-${botId}`,
                'width=600,height=750'
              );
              if (!popup.current)
                setError(
                  'Allow the sign-in window, or open the AskLit directly.'
                );
            }}
          >
            Sign in to your organization
          </button>
          {metadata.url && (
            <p className="mt-2">
              <a href={metadata.url} target="_blank" rel="noopener noreferrer">
                Open AskLit directly
              </a>
            </p>
          )}
        </div>
      )}
      {metadata && !metadata.locked && (
        <>
          <p>{metadata.welcome}</p>
          <p className="small text-muted">
            Answers are AI-generated. Check the source passages. Conversations
            are retained for up to {metadata.retention_days} days; use “Clear
            conversation” to delete yours sooner.
          </p>
          {metadata.profiles.length > 1 && (
            <label className="form-label d-block">
              Topic
              <select
                className="form-select"
                value={profile}
                disabled={
                  busy || messages.length > 0 || session.current !== null
                }
                onChange={(e) => setProfile(e.target.value)}
              >
                {metadata.profiles.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            className="my-3"
          >
            {messages.map((message, index) => (
              <div key={index} className="border-bottom py-3">
                <strong>{message.role === 'user' ? 'You' : 'Assistant'}</strong>
                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
                  {message.content}
                </p>
                {message.sources?.map((source, i) => (
                  <details key={i} className="mb-2">
                    <summary>
                      {source.filename}, page {source.page}
                    </summary>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{source.content}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
          {!messages.length && (
            <div className="d-flex gap-2 flex-wrap mb-3">
              {metadata.profiles
                .find((p) => p.key === profile)
                ?.conversation_starters.map((starter, i) => (
                  <button
                    key={i}
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={busy}
                    onClick={() => setQuestion(starter)}
                  >
                    {starter}
                  </button>
                ))}
            </div>
          )}
          {attachments.length > 0 && (
            <ul
              className="list-unstyled d-flex gap-2 flex-wrap"
              aria-label="Attached files"
            >
              {attachments.map((file) => (
                <li key={file.id} className="border rounded px-2 py-1">
                  {file.filename}
                  <button
                    className="btn btn-sm"
                    type="button"
                    aria-label={'Remove ' + file.filename}
                    disabled={busy}
                    onClick={() => changeAttachment(undefined, file.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={send}>
            <div className="position-relative">
              <label className="form-label d-block">
                <span className="visually-hidden">Your question</span>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Ask a question…"
                  style={{
                    paddingRight: 64,
                    paddingBottom: metadata.uploads?.enabled ? 56 : undefined,
                    borderRadius: 16,
                    resize: 'vertical',
                  }}
                  maxLength={8000}
                  required
                  value={question}
                  disabled={busy}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      !e.shiftKey &&
                      !e.nativeEvent.isComposing &&
                      e.nativeEvent.keyCode !== 229 &&
                      !e.currentTarget.value.includes('\n')
                    ) {
                      e.preventDefault();
                      if (!e.repeat) e.currentTarget.form?.requestSubmit();
                    }
                  }}
                />
              </label>
              {metadata.uploads?.enabled && (
                <>
                  <input
                    ref={fileInput}
                    type="file"
                    hidden
                    accept={metadata.uploads.extensions.join(',')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      e.target.value = '';
                      if (file) void changeAttachment(file);
                    }}
                  />
                  <button
                    type="button"
                    className="btn position-absolute"
                    aria-label="Attach file"
                    title="Attach file"
                    style={{ left: 8, bottom: 12 }}
                    disabled={busy}
                    onClick={() => fileInput.current?.click()}
                  >
                    {/* ! Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2024 Fonticons, Inc.  */}
                    <svg
                      viewBox="0 0 448 512"
                      width="20"
                      height="20"
                      fill="currentColor"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
                    </svg>
                  </button>
                </>
              )}
              <button
                className="btn btn-primary rounded-circle position-absolute"
                style={{
                  right: 12,
                  bottom: 12,
                  width: 40,
                  height: 40,
                  padding: 8,
                }}
                aria-label="Send"
                title="Send"
                disabled={busy || !question.trim()}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5m-6 6 6-6 6 6" />
                </svg>
              </button>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                type="button"
                disabled={busy}
                onClick={clearConversation}
              >
                Clear conversation
              </button>
            </div>
            {busy && (
              <p role="status" className="mt-2">
                Working…
              </p>
            )}
          </form>
          {metadata.uploads?.enabled && (
            <p className="small text-muted mt-2">
              Up to 3 files, 5 MB each. Extracted text is sent to this AskLit’s
              model with your questions and retained with this conversation.
            </p>
          )}
          <p className="small text-muted mt-3 mb-0">{metadata.footer}</p>
        </>
      )}
    </section>
  );
}
