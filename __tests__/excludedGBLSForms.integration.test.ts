/**
 * Integration test to verify excluded forms don't appear on landing pages
 */
import { fetchInterviews } from '../src/data/fetchInterviewData';
import { excludedForms } from '../src/config/formSources.config';

// Mock global fetch to return a GBLS interview list
global.fetch = jest.fn((url: string) => {
  if (url.includes('interviews.gbls.org')) {
    // Return a minimal mock with forms that should be excluded
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          interviews: [
            {
              filename:
                'docassemble.Collection:data/questions/motionToVacateDefault.yml',
              title: 'Motion to Vacate Default for Lack of Notice',
              link: '/start/vacate/',
              metadata: {
                LIST_topics: [],
              },
            },
            {
              filename:
                'docassemble.Collection:data/questions/validationOrDoNotCallLetter.yml',
              title: 'Validation or Do Not Call Letter',
              link: '/start/validation/',
              metadata: {
                LIST_topics: [],
              },
            },
            {
              filename: 'docassemble.Collection:data/questions/docsign.yml',
              title: 'Some E-Signature Tool',
              link: '/start/simple%20esign/',
              metadata: {
                LIST_topics: [],
              },
            },
            {
              filename:
                'docassemble.docsign:data/questions/fill_generic_template.yml',
              title: 'Generic Form Filler',
              link: '/start/generic/',
              metadata: {
                LIST_topics: [],
              },
            },
            {
              filename:
                'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml',
              title: 'Case Start Documents',
              link: '/start/sign/',
              metadata: {
                LIST_topics: [],
              },
            },
            {
              filename:
                'docassemble.HousingCodeChecklist:data/questions/feedback.yml',
              title: 'Housing Code Feedback',
              link: '/start/uptocode_feedback/',
              metadata: {
                LIST_topics: [],
              },
            },
            // Include a form that should NOT be excluded, to verify filtering works
            {
              filename: 'docassemble.SomeOtherForm:data/questions/other.yml',
              title: 'Some Other Form That Should Appear',
              link: '/start/someform/',
              metadata: {
                LIST_topics: ['HO-00-00-00-00'],
              },
            },
          ],
        }),
    } as any);
  }

  // For other URLs, return empty
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ interviews: [] }),
  } as any);
});

describe('Excluded GBLS forms filtering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not return excluded GBLS forms in interview list for Massachusetts', async () => {
    const { interviewsByTopic } = await fetchInterviews('ma');

    // Flatten all interviews
    const allInterviews: any[] = [];
    Object.values(interviewsByTopic).forEach((interviews) => {
      allInterviews.push(...(interviews || []));
    });

    const gbsExclusions = excludedForms.greaterBostonLegalService;

    // Check that no excluded filenames appear
    const foundExcluded = allInterviews.filter((interview) =>
      gbsExclusions.includes(interview.filename)
    );

    expect(foundExcluded).toHaveLength(0);
  });

  it('should still include non-excluded GBLS forms', async () => {
    const { interviewsByTopic } = await fetchInterviews('ma');

    // Flatten all interviews
    const allInterviews: any[] = [];
    Object.values(interviewsByTopic).forEach((interviews) => {
      allInterviews.push(...(interviews || []));
    });

    // This form should NOT be excluded
    const nonExcludedForm = allInterviews.find(
      (i) => i.filename === 'docassemble.SomeOtherForm:data/questions/other.yml'
    );

    expect(nonExcludedForm).toBeDefined();
    expect(nonExcludedForm?.title).toBe('Some Other Form That Should Appear');
  });
});
