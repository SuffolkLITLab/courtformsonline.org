export const pathToServerConfig = {
  ma: {
    path: 'ma',
    servers: ['Suffolk LIT Lab', 'Greater Boston Legal Services'],
    name: 'Massachusetts',
    // Optional link to an authoritative jurisdiction listing of court forms.
    moreFormsUrl: 'https://www.mass.gov/topics/court-forms',
  },
};

// Jurisdiction-specific deep links mapping
// Maps topic names to their corresponding resource finder URLs
export const deepLinks = {
  ma: {
    // MassLegalResource Finder deep links mapping
    // Maps topic names to their corresponding MassLRF URLs
    housing: ['https://masslrf.org/en/triage/start/housing'],
    family: [
      'https://masslrf.org/en/triage/start/family',
      'https://masslrf.org/en/triage/start/abuse_crime',
    ],
    consumer: ['https://masslrf.org/en/triage/start/debt_consumer'],
    benefits: ['https://masslrf.org/en/triage/start/benefits'],
    criminal: ['https://masslrf.org/en/triage/start/criminal'],
    education: ['https://masslrf.org/en/triage/start/education'],
    health: ['https://masslrf.org/en/triage/start/health'],
    immigration: ['https://masslrf.org/en/triage/start/immigration'],
    employment: ['https://masslrf.org/en/triage/start/employment'],
    wills: ['https://masslrf.org/en/triage/start/wills'],
  },
};

export const formSources = {
  docassembleServers: [
    {
      key: 'suffolkLITLab',
      url: 'https://apps.suffolklitlab.org',
      name: 'Suffolk LIT Lab',
    },
    {
      key: 'greaterBostonLegalService',
      url: 'https://interviews.gbls.org',
      name: 'Greater Boston Legal Services',
    },
  ],
};

export const excludedForms = {
  greaterBostonLegalService: [
    'docassemble.Collection:data/questions/validationOrDoNotCallLetterForAdvocates.yml',
    'docassemble.MAAffidavitofIndigency:data/questions/affidavit.yml',
    'docassemble.MAAffidavitofIndigency:data/questions/affidavit_advocate.yml',
    'docassemble.docsign:data/questions/upload_template.yml',
    'docassemble.Collection:data/questions/exemptOrNotQuestions.yml',
    'docassemble.docsign:data/questions/fill_generic_template.yml',
    'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml',
    'docassemble.HousingCodeChecklist:data/questions/housing_code_interview.yml',
    'docassemble.HousingCodeChecklist:data/questions/feedback.yml',
  ],
  suffolkLITLab: [
    // 'docassemble.MAPetitionToSealEviction:data/questions/petition_to_seal_eviction.yml', // TODO: REMOVE on May 4th 2025
  ],
};
