'use client';

import { FormEvent, useEffect, useState } from 'react';

export default function AskLitInstructorNotes({
  botId,
  apiBase,
}: {
  botId: string;
  apiBase: string;
}) {
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setPassword('');
    setNotes('');
    setError('');
  }, [botId]);
  async function unlock(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await fetch(
        `${apiBase}/api/public/bots/${encodeURIComponent(botId)}/instructor-notes`,
        {
          method: 'POST',
          credentials: 'omit',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
        }
      );
      const value = await response.json();
      if (!response.ok)
        throw new Error(value.detail || 'Cannot open instructor notes.');
      setNotes(value.notes);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : 'Cannot open instructor notes.'
      );
    } finally {
      setPassword('');
      setBusy(false);
    }
  }
  return (
    <details className="my-3">
      <summary>Instructor notes</summary>
      {notes ? (
        <>
          <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {notes}
          </p>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setNotes('')}
          >
            Hide notes
          </button>
        </>
      ) : (
        <form onSubmit={unlock} className="my-2">
          <label className="form-label">
            Instructor password
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={200}
              autoComplete="off"
              required
            />
          </label>
          <div>
            <button className="btn btn-outline-secondary" disabled={busy}>
              Read instructor notes
            </button>
          </div>
        </form>
      )}
      {error && <p role="alert">{error}</p>}
    </details>
  );
}
