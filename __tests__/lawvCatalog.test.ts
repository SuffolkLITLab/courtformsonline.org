const catalog = require('../__fixtures__/catalogs.json')['docs.lawv.net'];

describe('Legal Aid of West Virginia catalog supplements', () => {
  const originalFetch = global.fetch;
  beforeEach(() => jest.resetModules());
  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });
  function serve(interviews = catalog.interviews) {
    global.fetch = jest.fn(async (url) => ({
      ok: true,
      json: async () => ({
        interviews: String(url).includes('docs.lawv.net') ? interviews : [],
      }),
    })) as jest.Mock;
  }

  it('includes all eight source interviews in WV, with six housing and two family tools', async () => {
    serve();
    const { fetchInterviews } = require('../src/data/fetchInterviewData');
    const {
      fetchFamilyEmergencyForms,
    } = require('../src/data/familyEmergencyForms');
    const result = await fetchInterviews('wv');
    const all = Object.values(result.interviewsByTopic).flat() as any[];
    expect(new Set(all.map((i) => i.filename))).toEqual(
      new Set(catalog.interviews.map((i) => i.filename))
    );
    expect(result.interviewsByTopic.housing).toHaveLength(6);
    expect(result.interviewsByTopic.family).toHaveLength(2);
    expect(all.every((i) => i.metadata.jurisdiction === 'NAM-US-US+WV')).toBe(
      true
    );
    expect(
      all.every((i) => !i.metadata.description.includes('Root file for logic'))
    ).toBe(true);
    expect((await fetchFamilyEmergencyForms()).map((i) => i.title)).toEqual([
      'Kinship Connector',
    ]);
    expect(
      (await fetchInterviews('ma')).interviewsByTopic.housing
    ).toHaveLength(0);
  });

  it('retains new source interviews without a local supplement under Other topics', async () => {
    serve([
      ...catalog.interviews,
      {
        filename: 'docassemble.Future:new.yml',
        title: 'A new WV tool',
        link: '/start/new/',
        metadata: {},
      },
    ]);
    const { fetchInterviews } = require('../src/data/fetchInterviewData');
    const result = await fetchInterviews('wv');
    expect(result.interviewsByTopic.other.map((i) => i.title)).toContain(
      'A new WV tool'
    );
    expect(result.hasFetchErrors).toBe(false);
  });

  it('honors source visibility and keeps the current source title and start link', async () => {
    const updated = catalog.interviews.map((i, index) =>
      index === 0
        ? {
            ...i,
            title: 'Updated Kinship title',
            link: '/start/current-alias/',
          }
        : i
    );
    serve(updated);
    const { fetchInterviews } = require('../src/data/fetchInterviewData');
    const current = (await fetchInterviews('wv')).interviewsByTopic.family.find(
      (i) => i.title === 'Updated Kinship title'
    );
    expect(current.link).toBe('/start/current-alias/');
    jest.resetModules();
    serve(
      updated.map((i, index) =>
        index === 0 ? { ...i, metadata: { ...i.metadata, unlisted: true } } : i
      )
    );
    const fetchAgain =
      require('../src/data/fetchInterviewData').fetchInterviews;
    expect(
      (await fetchAgain('wv')).interviewsByTopic.family.some((i) =>
        i.filename.includes('KinshipConnector')
      )
    ).toBe(false);
  });

  it('reports a source outage rather than substituting an old catalog', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(async (url) => {
      if (String(url).includes('docs.lawv.net')) throw new Error('offline');
      return { ok: true, json: async () => ({ interviews: [] }) };
    }) as jest.Mock;
    const { fetchInterviews } = require('../src/data/fetchInterviewData');
    const {
      fetchFamilyEmergencyForms,
    } = require('../src/data/familyEmergencyForms');
    expect((await fetchInterviews('wv')).hasFetchErrors).toBe(true);
    await expect(fetchFamilyEmergencyForms()).rejects.toThrow(
      'complete family emergency form catalog'
    );
  });
});
