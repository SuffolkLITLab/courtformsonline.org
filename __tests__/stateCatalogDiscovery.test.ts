import {
  getAvailableJurisdictions,
  jurisdictionMatches,
} from '../src/utils/jurisdiction';

const newStates = [
  ['ca', 'California'],
  ['co', 'Colorado'],
  ['ct', 'Connecticut'],
  ['ga', 'Georgia'],
  ['md', 'Maryland'],
  ['nj', 'New Jersey'],
  ['nd', 'North Dakota'],
  ['ri', 'Rhode Island'],
  ['wv', 'West Virginia'],
];

const sample = (code: string) => ({
  filename: `docassemble.Test:${code}.yml`,
  title: `${code} child care form`,
  tags: [],
  metadata: {
    title: `${code} child care form`,
    jurisdiction: `NAM-US-US+${code.toUpperCase()}`,
    LIST_topics: ['ES-03-03-00-00'],
  },
});

describe('state navigation and catalog discovery', () => {
  const originalFetch = global.fetch;
  beforeEach(() => {
    jest.resetModules();
    global.fetch = jest.fn(async (url) => {
      if (String(url).includes('docs.lawv.net')) {
        throw new Error('Sideloaded listings must not need the provider API');
      }
      return {
        ok: true,
        json: async () => ({
          interviews: String(url).includes('apps.suffolklitlab.org')
            ? [
                ...newStates.map(([code]) => sample(code)),
                {
                  ...sample('national'),
                  metadata: {
                    ...sample('national').metadata,
                    jurisdiction: 'NAM-US',
                  },
                },
              ]
            : [],
        }),
      };
    }) as jest.Mock;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it.each(newStates)(
    'makes %s forms discoverable through its own jurisdiction, with national forms',
    async (code, name) => {
      expect(getAvailableJurisdictions()).toContainEqual({ path: code, name });
      expect(jurisdictionMatches(`nam-us-us+${code}`, name)).toBe(true);
      const { fetchInterviews } = require('../src/data/fetchInterviewData');
      const result = await fetchInterviews(code);
      const forms = result.interviewsByTopic.family;
      expect(forms.map((f) => f.filename)).toContain(
        `docassemble.Test:${code}.yml`
      );
      expect(forms.map((f) => f.filename)).toContain(
        'docassemble.Test:national.yml'
      );
      expect(
        forms.every((f) =>
          ['NAM-US', `NAM-US-US+${code.toUpperCase()}`].includes(
            f.metadata.jurisdiction
          )
        )
      ).toBe(true);
      expect(result.hasFetchErrors).toBe(false);
    }
  );

  it('lists Kinship Connector once on WV and the family index without fetching LAWV', async () => {
    const { fetchInterviews } = require('../src/data/fetchInterviewData');
    const {
      fetchFamilyEmergencyForms,
    } = require('../src/data/familyEmergencyForms');
    const wv = await fetchInterviews('wv');
    const kinship = wv.interviewsByTopic.family.filter(
      (f) => f.title === 'Kinship Connector'
    );
    expect(kinship).toHaveLength(1);
    expect(kinship[0].serverUrl + kinship[0].link).toBe(
      'https://docs.lawv.net/start/Kinship%20Connector/'
    );
    expect(kinship[0].metadata.help_page_url).toBe(
      'https://legalaidwv.org/kinship-connector/'
    );
    const family = await fetchFamilyEmergencyForms();
    const listing = family.filter((f) => f.title === 'Kinship Connector');
    expect(listing).toHaveLength(1);
    expect(listing[0].jurisdiction).toBe('West Virginia');
    expect(listing[0].href).toContain('https://docs.lawv.net/interview?i=');
    expect(
      (await fetchInterviews('ma')).interviewsByTopic.family.some(
        (f) => f.title === 'Kinship Connector'
      )
    ).toBe(false);
    expect(
      (global.fetch as jest.Mock).mock.calls.every(
        ([url]) => !String(url).includes('docs.lawv.net')
      )
    ).toBe(true);
  });
});
