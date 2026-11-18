let fetchFamilyEmergencyForms: typeof import('../src/data/familyEmergencyForms').fetchFamilyEmergencyForms;
let fetchInterviews: typeof import('../src/data/fetchInterviewData').fetchInterviews;

const interview = (
  filename: string,
  jurisdiction: string,
  topics: string[],
  extra = {}
) => ({
  filename,
  title: 'Child care authorization',
  tags: [],
  metadata: { jurisdiction, LIST_topics: topics, ...extra },
});

describe('family emergency catalog membership', () => {
  const originalFetch = global.fetch;
  beforeEach(() => {
    jest.resetModules();
    fetchFamilyEmergencyForms =
      require('../src/data/familyEmergencyForms').fetchFamilyEmergencyForms;
    fetchInterviews = require('../src/data/fetchInterviewData').fetchInterviews;
  });
  afterEach(() => {
    global.fetch = originalFetch;
  });

  function catalog(rows: object[]) {
    global.fetch = jest.fn(async (url) => ({
      ok: true,
      json: async () => ({
        interviews: String(url).includes('apps.suffolklitlab.org') ? rows : [],
      }),
    })) as jest.Mock;
  }

  it('includes new states and equal titles, excludes unrelated and unlisted forms', async () => {
    catalog([
      interview('docassemble.NewPackage:california.yml', 'NAM-US-US+CA', [
        'ES-03-03-00-00',
      ]),
      interview('docassemble.NewPackage:new-jersey.yml', 'NAM-US-US+NJ', [
        'ES-03-03-05-00',
      ]),
      interview('docassemble.NewPackage:adult.yml', 'NAM-US-US+CA', [
        'ES-03-02-00-00',
      ]),
      interview('docassemble.NewPackage:school.yml', 'NAM-US-US+RI', [
        'ED-12-00-00-00',
      ]),
      interview(
        'docassemble.NewPackage:hidden.yml',
        'NAM-US-US+CA',
        ['ES-03-03-00-00'],
        { unlisted: true }
      ),
    ]);
    const forms = await fetchFamilyEmergencyForms();
    expect(forms.map((f) => f.jurisdiction)).toEqual([
      'California',
      'New Jersey',
    ]);
    expect(forms).toHaveLength(2);
    expect(forms.map((form) => form.detailsHref)).toEqual([
      '/ca/forms/child-care-authorization',
      '/nj/forms/child-care-authorization',
    ]);
    expect(forms[0].href).toContain(
      encodeURIComponent('docassemble.NewPackage:california.yml')
    );
    // Existing state pages keep their jurisdiction filter.
    expect((await fetchInterviews('ma')).interviewsByTopic.family).toHaveLength(
      0
    );
  });

  it('deduplicates aliases for the same interview and retains a new national form', async () => {
    catalog([
      interview('docassemble.Future:form.yml', 'NAM-US', ['ES-03-03-00-00']),
      interview('docassemble.Future:data/questions/form.yml', 'NAM-US', [
        'ES-03-03-00-00',
      ]),
    ]);
    const forms = await fetchFamilyEmergencyForms();
    expect(forms).toHaveLength(1);
    expect(forms[0].jurisdiction).toBe('United States');
  });

  it('uses Spanish metadata and launches with lang=es without changing the English slug', async () => {
    catalog([
      {
        ...interview(
          'docassemble.Future:form.yml',
          'NAM-US-US+MA',
          ['ES-03-03-00-00'],
          {
            title: {
              en: 'Child care authorization',
              es: 'Autorización de cuidado',
            },
            description: 'English description',
            es: {
              description: 'Descripción en español',
              before_you_start: 'Antes de empezar',
            },
            languages: ['en', 'es'],
          }
        ),
        link: '/start/family/?source=directory&lang=en#entry',
      },
      interview('docassemble.Future:other.yml', 'NAM-US', ['ES-03-03-00-00'], {
        description: 'English only',
        languages: ['en'],
      }),
    ]);

    const [english, spanish, localized] = await Promise.all([
      fetchFamilyEmergencyForms(),
      fetchFamilyEmergencyForms('es'),
      fetchInterviews('ma', { allJurisdictions: true, locale: 'es' }),
    ]);
    expect(english[0].title).toBe('Child care authorization');
    expect(new URL(english[0].href).searchParams.has('lang')).toBe(false);
    expect(spanish[0]).toMatchObject({
      title: 'Autorización de cuidado',
      titleLanguage: 'es',
      description: 'Descripción en español',
      descriptionLanguage: 'es',
      detailsHref: '/ma/forms/child-care-authorization?lang=es',
      href: 'https://apps.suffolklitlab.org/start/family/?source=directory&lang=es#entry',
    });
    expect(spanish[1]).toMatchObject({
      titleLanguage: 'en',
      description: 'English only',
      descriptionLanguage: 'en',
    });
    expect(new URL(spanish[1].href).searchParams.get('lang')).toBe('es');
    expect(new URL(spanish[1].href).searchParams.get('i')).toBe(
      'docassemble.Future:other.yml'
    );
    expect(
      localized.interviewsByTopic.family[0].metadata.before_you_start
    ).toBe('Antes de empezar');
  });

  it('fails a build instead of publishing an incomplete index after a catalog failure', async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 503,
    })) as jest.Mock;
    await expect(fetchFamilyEmergencyForms()).rejects.toThrow(
      'complete family emergency form catalog'
    );
    spy.mockRestore();
  });

  it('keeps an absent jurisdiction explicit instead of assigning the wrong state', async () => {
    catalog([
      interview('docassemble.Future:unknown.yml', '', ['ES-03-03-00-00']),
    ]);
    expect((await fetchFamilyEmergencyForms())[0].jurisdiction).toBe(
      'State not specified'
    );
    const {
      familyFormJurisdiction,
    } = require('../src/data/familyEmergencyForms');
    expect(familyFormJurisdiction(null)).toBe('State not specified');
    expect(familyFormJurisdiction(undefined)).toBe('State not specified');
  });
});
