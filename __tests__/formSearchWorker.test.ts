/** @jest-environment node */
import worker from '../workers/form-search';
const origin = 'https://courtformsonline.org';
const env = () => ({
  FETCH_API_TOKEN: 'server-only-test-key',
  ALLOWED_ORIGINS: origin,
  RATE_LIMITER: { limit: jest.fn().mockResolvedValue({ success: true }) },
});
const request = (
  body: unknown = { text: 'eviction', save_data: true },
  headers = {}
) =>
  new Request('https://worker.example/', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  });
let fetchMock: jest.SpyInstance;
beforeEach(() => {
  fetchMock = jest
    .spyOn(global, 'fetch')
    .mockResolvedValue(
      Response.json({
        labels: [{ id: 'HO-02-00-00-00', confidence: 0.9 }],
        follow_up_questions: ['private'],
        degraded: false,
      })
    );
});
afterEach(() => jest.restoreAllMocks());

test('authenticates only upstream, uses LIST ensemble without followups, and strips extra fields', async () => {
  const response = await worker.fetch(request(), env());
  expect(response.status).toBe(200);
  expect(response.headers.get('Cache-Control')).toBe('no-store');
  expect(await response.json()).toEqual({
    labels: [{ id: 'HO-02-00-00-00', confidence: 0.9 }],
    degraded: false,
  });
  const [url, init] = fetchMock.mock.calls[0];
  expect(url).toBe('https://fetch.courtformsonline.org/api/classify');
  expect(init.headers.Authorization).toBe('Bearer server-only-test-key');
  expect(JSON.parse(init.body)).toMatchObject({
    taxonomy_name: 'list',
    taxonomy_format: 'list',
    skip_followups: true,
    skip_semantic_merge: true,
    enable_screening_protocols: false,
  });
  expect(JSON.parse(init.body).enabled_models).toBeUndefined();
});

test.each([
  null,
  {},
  { text: '', save_data: true },
  { text: 'test', save_data: 0 },
  { text: 'x'.repeat(4001), save_data: true },
])('rejects invalid input %j', async (body) => {
  expect((await worker.fetch(request(body), env())).status).toBe(400);
  expect(fetchMock).not.toHaveBeenCalled();
});

test('blocks disallowed origins and oversized bodies', async () => {
  expect(
    (
      await worker.fetch(
        request(undefined, { Origin: 'https://evil.example' }),
        env()
      )
    ).status
  ).toBe(403);
  expect(
    (
      await worker.fetch(
        request({ text: 'x'.repeat(25000), save_data: true }),
        env()
      )
    ).status
  ).toBe(413);
  expect(fetchMock).not.toHaveBeenCalled();
});

test('never forwards an opted-out description', async () => {
  expect(
    await (
      await worker.fetch(request({ text: 'eviction', save_data: false }), env())
    ).json()
  ).toEqual({ labels: [] });
  expect(fetchMock).not.toHaveBeenCalled();
});

test('rate limits before calling FETCH and fails closed on binding errors', async () => {
  const bindings = env();
  bindings.RATE_LIMITER.limit.mockResolvedValue({ success: false });
  const response = await worker.fetch(request(), bindings);
  expect(response.status).toBe(429);
  expect(response.headers.get('Retry-After')).toBe('60');
  bindings.RATE_LIMITER.limit.mockRejectedValue(new Error('unavailable'));
  expect((await worker.fetch(request(), bindings)).status).toBe(503);
  expect(fetchMock).not.toHaveBeenCalled();
});

test('does not expose upstream errors or malformed responses', async () => {
  fetchMock.mockResolvedValue(
    new Response('sensitive upstream detail', { status: 500 })
  );
  expect(await (await worker.fetch(request(), env())).text()).not.toContain(
    'sensitive'
  );
  fetchMock.mockResolvedValue(Response.json({ unexpected: true }));
  expect((await worker.fetch(request(), env())).status).toBe(502);
});

test('answers preflight without upstream calls', async () => {
  const response = await worker.fetch(
    new Request('https://worker.example/', {
      method: 'OPTIONS',
      headers: { Origin: origin },
    }),
    env()
  );
  expect(response.status).toBe(204);
  expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin);
  expect(fetchMock).not.toHaveBeenCalled();
});
