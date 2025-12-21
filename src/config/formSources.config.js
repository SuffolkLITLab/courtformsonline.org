export const pathToServerConfig = {
  ma: {
    path: 'ma',
    servers: ['Suffolk LIT Lab', 'Greater Boston Legal Services'],
    name: 'Massachusetts',
    // Optional link to an authoritative jurisdiction listing of court forms.
    moreFormsUrl: 'https://www.mass.gov/topics/court-forms',
  },
  mn: {
    path: 'mn',
    servers: ['Suffolk LIT Lab'],
    name: 'Minnesota',
    moreFormsUrl: 'https://mncourts.gov/getforms',
  },
  me: {
    path: 'me',
    servers: ['Pine Tree Legal Assistance'],
    name: 'Maine',
    moreFormsUrl: 'https://www.courts.maine.gov/maine_courts/forms/index.html',
  },
  mi: {
    path: 'mi',
    servers: ['Michigan Legal Help'],
    name: 'Michigan',
    moreFormsUrl:
      'https://www.michigan.gov/courts/0,4601,7-412-2297_2310---,00.html',
  },
};

/**
 * Jurisdiction code mapping.
 * Maps standardized state names to various codes that might appear in metadata.
 * Includes SALI/FOLIO location codes (e.g., NAM-US-US+MA) and two-letter state codes.
 */
export const jurisdictionAliases = {
  Massachusetts: ['MA', 'NAM-US-US+MA', 'Massachusetts', 'ma'],
  Minnesota: ['MN', 'NAM-US-US+MN', 'Minnesota', 'mn'],
  Maine: ['ME', 'NAM-US-US+ME', 'Maine', 'me'],
  Michigan: ['MI', 'NAM-US-US+MI', 'Michigan', 'mi'],
  // Add more jurisdictions as needed
};

/**
 * Default jurisdiction when none is specified in form metadata
 */
export const DEFAULT_JURISDICTION = 'Massachusetts';

/**
 * Default path for the default jurisdiction
 */
export const DEFAULT_PATH = 'ma';

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
      defaultJurisdiction: 'Massachusetts', // Default for forms without jurisdiction metadata
    },
    {
      key: 'greaterBostonLegalService',
      url: 'https://interviews.gbls.org',
      name: 'Greater Boston Legal Services',
      defaultJurisdiction: 'Massachusetts', // Default for forms without jurisdiction metadata
    },
    {
      key: 'pineTreeLegalAssistance',
      url: 'https://apps.ptla.org/',
      name: 'Pine Tree Legal Assistance',
      defaultJurisdiction: 'Maine', // Default for forms without jurisdiction metadata
    },
    {
      key: 'michiganLegalHelp',
      url: 'https://forms.michiganlegalhelp.org/',
      name: 'Michigan Legal Help',
      defaultJurisdiction: 'Michigan', // Default for forms without jurisdiction metadata
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
  pineTreeLegalAssistance: [
    // Add any forms to exclude from Pine Tree Legal Assistance server
  ],
  michiganLegalHelp: [
    // Add any forms to exclude from Michigan Legal Help server
  ],
};
