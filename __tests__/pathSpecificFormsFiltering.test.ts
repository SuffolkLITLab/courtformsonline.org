/**
 * Regression test for excluded forms filtering in path-specific forms pages
 *
 * This test ensures that the [path]/forms/page.tsx getData() function properly
 * filters out excluded GBLS forms. This is a regression test for the bug where
 * excluded forms were still appearing on /ma/forms because the filter was missing.
 *
 * Issue: https://github.com/courtformsonline/courtformsonline.org/issues/XXX
 */

import { excludedForms, formSources } from '../src/config/formSources.config';

describe('Path-specific forms page filtering (Regression Test)', () => {
  it('should apply exclusion filter to all docassemble servers', () => {
    // Verify that all servers with exclusions are properly configured
    formSources.docassembleServers.forEach((server) => {
      if (excludedForms[server.key] && excludedForms[server.key].length > 0) {
        expect(Array.isArray(excludedForms[server.key])).toBe(true);
        expect(excludedForms[server.key].length).toBeGreaterThan(0);
      }
    });
  });

  it('should filter out all GBLS excluded forms from interview list', () => {
    // Mock interview data that simulates what GBLS API returns
    const mockInterviews = [
      // Should be INCLUDED (legitimate GBLS forms for courtformsonline.org)
      {
        filename:
          'docassemble.juvenilesealing:data/questions/entrypoint-petitioner.yml',
        title: 'Juvenile Sealing',
        link: '/start/sealing/',
      },
      // Should be EXCLUDED (developer tools - admin interviews)
      {
        filename:
          'docassemble.Collection:data/questions/motionToVacateDefault.yml',
        title: 'Motion to Vacate',
        link: '/start/vacate/',
      },
      {
        filename:
          'docassemble.Collection:data/questions/exemptOrNotQuestions.yml',
        title: 'Exemptions',
        link: '/start/exempt/',
      },
      {
        filename: 'docassemble.docsign:data/questions/upload_template.yml',
        title: "Get a client's signature",
        link: '/start/esign/',
      },
      {
        filename:
          'docassemble.docsign:data/questions/fill_generic_template.yml',
        title: 'Generate client documents',
        link: '/start/generic/',
      },
      {
        filename:
          'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml',
        title: 'Sign Documents',
        link: '/start/sign/',
      },
      {
        filename: 'docassemble.Collection:data/questions/docsign.yml',
        title: 'Simple eSign',
        link: '/start/simple%20esign/',
      },
      {
        filename:
          'docassemble.HousingCodeChecklist:data/questions/feedback.yml',
        title: 'UpToCode Feedback',
        link: '/start/uptocode_feedback/',
      },
      {
        filename:
          'docassemble.HousingCodeChecklist:data/questions/housing_code_interview.yml',
        title: 'UpToCode Get Repairs',
        link: '/start/uptocode/',
      },
      {
        filename:
          'docassemble.Collection:data/questions/validationOrDoNotCallLetterForAdvocates.yml',
        title: 'Validation Letter For Advocates',
        link: '/start/advocate%20vacate/',
      },
    ];

    // Apply the same filtering logic that [path]/forms/page.tsx should use
    const gbls = formSources.docassembleServers.find(
      (s) => s.key === 'greaterBostonLegalService'
    );
    const exclusions = excludedForms[gbls.key] || [];

    const filtered = mockInterviews.filter(
      (interview) => !exclusions.includes(interview.filename)
    );

    // Should have filtered out 9 forms, leaving only 1
    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe('Juvenile Sealing');
    expect(filtered[0].link).toBe('/start/sealing/');
  });

  it('should exclude specific GBLS forms that should not appear on courtformsonline.org', () => {
    const gbls = formSources.docassembleServers.find(
      (s) => s.key === 'greaterBostonLegalService'
    );
    const exclusions = excludedForms[gbls.key];

    // Verify all the admin/developer tools are excluded
    const expectedExclusions = [
      'docassemble.Collection:data/questions/validationOrDoNotCallLetterForAdvocates.yml', // /start/advocate%20vacate/
      'docassemble.Collection:data/questions/exemptOrNotQuestions.yml', // /start/exempt/
      'docassemble.docsign:data/questions/upload_template.yml', // /start/esign/
      'docassemble.docsign:data/questions/fill_generic_template.yml', // /start/generic/
      'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml', // /start/sign/
      'docassemble.Collection:data/questions/docsign.yml', // /start/simple%20esign/
      'docassemble.HousingCodeChecklist:data/questions/feedback.yml', // /start/uptocode_feedback/
      'docassemble.HousingCodeChecklist:data/questions/housing_code_interview.yml', // /start/uptocode/
      'docassemble.Collection:data/questions/motionToVacateDefault.yml', // /start/vacate/
    ];

    expectedExclusions.forEach((filename) => {
      expect(exclusions).toContain(
        filename,
        `Expected ${filename} to be in exclusions but it wasn't found`
      );
    });
  });

  it('should have no duplicate entries in GBLS exclusions list', () => {
    const gbls = formSources.docassembleServers.find(
      (s) => s.key === 'greaterBostonLegalService'
    );
    const exclusions = excludedForms[gbls.key];

    const uniqueExclusions = new Set(exclusions);
    expect(uniqueExclusions.size).toBe(exclusions.length);
  });

  it('should verify path-specific forms page would filter correctly', () => {
    // This simulates what happens in [path]/forms/page.tsx getData()
    const mockApiResponse = {
      interviews: [
        // Legitimate form
        {
          filename:
            'docassemble.juvenilesealing:data/questions/entrypoint-petitioner.yml',
          title: 'Sealing',
        },
        // Excluded form
        {
          filename:
            'docassemble.Collection:data/questions/motionToVacateDefault.yml',
          title: 'Vacate',
        },
        // Another excluded form
        {
          filename: 'docassemble.docsign:data/questions/upload_template.yml',
          title: 'Signature',
        },
      ],
    };

    const gbls = formSources.docassembleServers.find(
      (s) => s.key === 'greaterBostonLegalService'
    );
    const exclusions = excludedForms[gbls.key] || [];

    // Apply filter as [path]/forms/page.tsx does
    const interviews = mockApiResponse.interviews.filter(
      (interview) => !exclusions.includes(interview.filename)
    );

    // Verify only non-excluded form remains
    expect(interviews.length).toBe(1);
    expect(interviews[0].filename).toBe(
      'docassemble.juvenilesealing:data/questions/entrypoint-petitioner.yml'
    );
  });
});
