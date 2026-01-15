import { excludedForms } from '../src/config/formSources.config';

describe('Excluded GBLS forms', () => {
  it('should have all GBLS forms that should not appear on courtformsonline.org in the exclusion list', () => {
    const gbsExclusions = excludedForms.greaterBostonLegalService;

    // These specific forms should be excluded from interviews.gbls.org
    // They were requested to not be on courtformsonline.org
    const requiredExclusions = [
      'docassemble.Collection:data/questions/docsign.yml', // /start/simple%20esign/
      'docassemble.Collection:data/questions/motionToVacateDefault.yml', // /start/vacate/
      'docassemble.Collection:data/questions/validationOrDoNotCallLetter.yml', // /start/validation/
      'docassemble.docsign:data/questions/fill_generic_template.yml', // /start/generic/
      'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml', // /start/sign/
      'docassemble.HousingCodeChecklist:data/questions/feedback.yml', // /start/uptocode_feedback/
    ];

    requiredExclusions.forEach((form) => {
      expect(gbsExclusions).toContain(
        form,
        `Expected ${form} to be in the excludedForms list`
      );
    });
  });

  it('should not allow landing pages for excluded GBLS forms', () => {
    // This is a documentation test to ensure we remember WHY
    // these forms are excluded: they should not appear as landing pages
    // on courtformsonline.org
    const gbsExclusions = excludedForms.greaterBostonLegalService;

    const excludedLinks = [
      '/start/vacate/',
      '/start/uptocode_feedback/',
      '/start/validation/',
      '/start/simple%20esign/',
      '/start/sign/',
      '/start/generic/',
    ];

    // Map of link -> filename for clarity
    const linkToFilename: Record<string, string> = {
      '/start/vacate/':
        'docassemble.Collection:data/questions/motionToVacateDefault.yml',
      '/start/uptocode_feedback/':
        'docassemble.HousingCodeChecklist:data/questions/feedback.yml',
      '/start/validation/':
        'docassemble.Collection:data/questions/validationOrDoNotCallLetter.yml',
      '/start/simple%20esign/':
        'docassemble.Collection:data/questions/docsign.yml',
      '/start/sign/':
        'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml',
      '/start/generic/':
        'docassemble.docsign:data/questions/fill_generic_template.yml',
    };

    // Verify all excluded links have their filenames in the exclusion list
    excludedLinks.forEach((link) => {
      const filename = linkToFilename[link];
      if (filename) {
        expect(gbsExclusions).toContain(
          filename,
          `Form ${filename} for link ${link} must be in excludedForms list`
        );
      }
    });
  });
});
