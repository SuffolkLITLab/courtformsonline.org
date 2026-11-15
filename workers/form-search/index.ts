interface Env {
  FETCH_API_TOKEN: string;
  ALLOWED_ORIGINS: string;
  RATE_LIMITER: {
    limit(options: { key: string }): Promise<{ success: boolean }>;
  };
}

const MAX_BODY_BYTES = 24000;
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGINS.split(',')
      .map((value) => value.trim())
      .includes(origin);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      Vary: 'Origin',
      ...(allowed ? { 'Access-Control-Allow-Origin': origin } : {}),
    };
    const reply = (status: number, body: object) =>
      new Response(JSON.stringify(body), { status, headers });
    if (!origin || !allowed)
      return reply(403, { error: 'Origin not allowed.' });
    if (new URL(request.url).pathname !== '/')
      return reply(404, { error: 'Not found.' });
    if (request.method === 'OPTIONS')
      return new Response(null, {
        status: 204,
        headers: {
          ...headers,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    if (request.method !== 'POST') return reply(405, { error: 'Use POST.' });
    if (
      request.headers.get('Content-Type')?.split(';')[0].trim() !==
      'application/json'
    )
      return reply(415, { error: 'Use application/json.' });
    try {
      const { success } = await env.RATE_LIMITER.limit({
        key: request.headers.get('CF-Connecting-IP') || 'unknown',
      });
      if (!success) {
        headers['Retry-After'] = '60';
        return reply(429, { error: 'Too many requests.' });
      }
    } catch {
      return reply(503, { error: 'Search unavailable.' });
    }
    if (Number(request.headers.get('Content-Length')) > MAX_BODY_BYTES)
      return reply(413, { error: 'Request too large.' });
    let input;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400, { error: 'Missing request.' });
      let size = 0;
      let body = '';
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BODY_BYTES) {
          await reader.cancel();
          return reply(413, { error: 'Request too large.' });
        }
        body += decoder.decode(value, { stream: true });
      }
      input = JSON.parse(body + decoder.decode());
    } catch {
      return reply(400, { error: 'Invalid JSON.' });
    }
    if (
      !input ||
      typeof input.text !== 'string' ||
      !input.text.trim() ||
      input.text.length > 4000 ||
      typeof input.save_data !== 'boolean'
    )
      return reply(400, {
        error: 'Enter 1 to 4000 characters and a sharing preference.',
      });
    // FETCH has no per-request retention control. Never submit an opted-out query.
    if (!input.save_data) return reply(200, { labels: [] });
    if (!env.FETCH_API_TOKEN)
      return reply(503, { error: 'Search unavailable.' });
    try {
      const response = await fetch(
        'https://fetch.courtformsonline.org/api/classify',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.FETCH_API_TOKEN}`,
          },
          body: JSON.stringify({
            text: input.text.trim(),
            taxonomy_name: 'list',
            taxonomy_format: 'list',
            decision_mode: 'vote',
            skip_followups: true,
            skip_semantic_merge: true,
            enable_screening_protocols: false,
            include_debug_details: false,
          }),
          signal: AbortSignal.timeout(25000),
          redirect: 'manual',
        }
      );
      if (!response.ok)
        return reply(502, { error: 'Topic search unavailable.' });
      const data = (await response.json()) as {
        labels?: { id?: string; confidence?: number }[];
        degraded?: boolean;
      };
      if (!Array.isArray(data.labels))
        return reply(502, { error: 'Invalid topic response.' });
      const labels = data.labels
        .filter(
          (label) =>
            typeof label.id === 'string' &&
            /^[A-Z]{2}(?:-\d{2}){4}$/.test(label.id)
        )
        .map((label) => ({
          id: label.id,
          confidence:
            typeof label.confidence === 'number' &&
            Number.isFinite(label.confidence)
              ? label.confidence
              : 0,
        }));
      return reply(200, { labels, degraded: data.degraded === true });
    } catch {
      return reply(502, { error: 'Topic search unavailable.' });
    }
  },
};
