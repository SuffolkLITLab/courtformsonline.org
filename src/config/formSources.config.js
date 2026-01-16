export const pathToServerConfig = {
  ma: {
    path: 'ma',
    servers: ['Suffolk LIT Lab', 'Greater Boston Legal Services'],
    name: 'Massachusetts',
    // Optional link to an authoritative jurisdiction listing of court forms.
    moreFormsUrl: 'https://www.mass.gov/topics/court-forms',
  },
  me: {
    path: 'me',
    servers: ['Pine Tree Legal Assistance', 'Suffolk LIT Lab'],
    name: 'Maine',
    moreFormsUrl: 'https://www.courts.maine.gov/forms/index.html',
  },
  mi: {
    path: 'mi',
    servers: ['Michigan Legal Help', 'Suffolk LIT Lab'],
    name: 'Michigan',
    moreFormsUrl: 'https://www.courts.michigan.gov/SCAO-forms/',
  },
  mn: {
    path: 'mn',
    servers: ['Suffolk LIT Lab'],
    name: 'Minnesota',
    moreFormsUrl: 'https://www.mncourts.gov/GetForms.aspx',
  },
  mo: {
    path: 'mo',
    servers: ['Missouri Legal Help', 'Suffolk LIT Lab'],
    name: 'Missouri',
    moreFormsUrl: 'https://www.courts.mo.gov/page.jsp?id=321',
  },
  vt: {
    path: 'vt',
    servers: ['Vermont Court Forms', 'Suffolk LIT Lab'],
    name: 'Vermont',
    // Link updated to point at Vermont Judiciary's Court Divisions page
    moreFormsUrl: 'https://www.vermontjudiciary.org/court-divisions',
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
  Vermont: ['VT', 'NAM-US-US+VT', 'Vermont', 'vt'],
  Missouri: ['MO', 'NAM-US-US+MO', 'Missouri', 'mo'],
  // Add more jurisdictions as needed
};

/**
 * National jurisdiction codes that should appear on all jurisdiction-specific pages.
 *
 *
 * Forms with these jurisdiction codes will be displayed on EVERY state's jurisdiction page,
 * in addition to state-specific forms. This is useful for forms that:
 * - Apply to all states (e.g., immigration forms, federal rights)
 * - Relate to national rights (e.g., reasonable accommodation, civil rights)
 * - Are general templates that users from any state can use
 *
 * Examples:
 * - An immigration form might have jurisdiction "NAM-US" or "NAM-US-US"
 * - A form about reasonable accommodation under the ADA might use "NAM-US"
 *
 * When jurisdictionMatches() is called with one of these codes, it returns true for ANY
 * jurisdiction, allowing the form to appear on /ma/forms, /me/forms, /mi/forms, etc.
 *
 * You can add more codes to this array as needed for your use cases.
 */
export const nationalJurisdictions = ['NAM-US', 'NAM-US-US'];

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
  mi: {
    // Michigan Legal Help "Guide to Legal Help" deep links
    // Maps topic names to their corresponding issue IDs
    // Full URL format: https://michiganlegalhelp.org/guide-to-legal-help?issue=<ID>
    housing: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=11'],
    family: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=33'],
    consumer: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=29'],
    benefits: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=274'],
    criminal: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=279'],
    traffic: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=279'],
    education: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=272'],
    employment: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=275'],
    immigration: [
      'https://michiganlegalhelp.org/guide-to-legal-help?issue=281',
    ],
    wills: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=404'],
    courts: ['https://michiganlegalhelp.org/guide-to-legal-help?issue=2594'],
    government: [
      'https://michiganlegalhelp.org/guide-to-legal-help?issue=3048',
    ],
  },
  me: {
    // Maine Legal Help - Pine Tree Legal Assistance contact page
    // No detailed triage available, but structured for future expansion
    housing: ['https://www.ptla.org/contact-us'],
    family: ['https://www.ptla.org/contact-us'],
    consumer: ['https://www.ptla.org/contact-us'],
    benefits: ['https://www.ptla.org/contact-us'],
    criminal: ['https://www.ptla.org/contact-us'],
    traffic: ['https://www.ptla.org/contact-us'],
    education: ['https://www.ptla.org/contact-us'],
    employment: ['https://www.ptla.org/contact-us'],
    immigration: ['https://www.ptla.org/contact-us'],
    wills: ['https://www.ptla.org/contact-us'],
    courts: ['https://www.ptla.org/contact-us'],
    government: ['https://www.ptla.org/contact-us'],
  },
  mn: {
    // Minnesota Legal Help - LawHelpMN
    // No detailed triage available, but structured for future expansion
    housing: ['https://www.lawhelpmn.org/'],
    family: ['https://www.lawhelpmn.org/'],
    consumer: ['https://www.lawhelpmn.org/'],
    benefits: ['https://www.lawhelpmn.org/'],
    criminal: ['https://www.lawhelpmn.org/'],
    traffic: ['https://www.lawhelpmn.org/'],
    education: ['https://www.lawhelpmn.org/'],
    employment: ['https://www.lawhelpmn.org/'],
    immigration: ['https://www.lawhelpmn.org/'],
    wills: ['https://www.lawhelpmn.org/'],
    courts: ['https://www.lawhelpmn.org/'],
    government: ['https://www.lawhelpmn.org/'],
  },
  vt: {
    // Each link points directly to the final results page of the triage tool for a specific path.
    housing: ['https://vtlawhelp.org/triage_actions_process/8637'], // Foreclosure/mortgage payments -> behind in payments
    family: ['https://vtlawhelp.org/triage_actions_process/8523'], // Divorce: file for divorce -> how & where
    consumer: ['https://vtlawhelp.org/triage_actions_process/8441'], // Debt collection: sued by creditor
    benefits: ['https://vtlawhelp.org/triage_actions_process/8474'], // Unemployment benefits: how to apply
    criminal: ['https://vtlawhelp.org/triage/vt_triage?clear=true'], // no dedicated path; use triage start
    traffic: ['https://vtlawhelp.org/triage/vt_triage?clear=true'],
    education: ['https://vtlawhelp.org/triage/vt_triage?clear=true'],
    employment: ['https://vtlawhelp.org/triage/vt_triage?clear=true'],
    immigration: ['https://vtlawhelp.org/triage/vt_triage?clear=true'],
    wills: ['https://vtlawhelp.org/triage/vt_triage?clear=true'], // no wills-specific triage
    courts: ['https://vtlawhelp.org/triage/vt_triage?clear=true'],
    government: ['https://vtlawhelp.org/triage/vt_triage?clear=true'],
  },
  mo: {
    // Missouri LawHelp triage - Missouri Poverty Law Services
    // Maps topic names to their corresponding URLs
    housing: ['https://apps.molawhelp.org/list'],
    family: ['https://apps.molawhelp.org/list'],
    consumer: ['https://apps.molawhelp.org/list'],
    benefits: ['https://apps.molawhelp.org/list'],
    criminal: ['https://apps.molawhelp.org/list'],
    traffic: ['https://apps.molawhelp.org/list'],
    education: ['https://apps.molawhelp.org/list'],
    employment: ['https://apps.molawhelp.org/list'],
    immigration: ['https://apps.molawhelp.org/list'],
    wills: ['https://apps.molawhelp.org/list'],
    courts: ['https://apps.molawhelp.org/list'],
    government: ['https://apps.molawhelp.org/list'],
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
    {
      key: 'VTCourtForms',
      url: 'https://apps.vtcourtforms.org',
      name: 'Vermont Court Forms',
      defaultJurisdiction: 'Vermont', // Default for forms without jurisdiction metadata
    },
    {
      key: 'missouriLegalHelp',
      url: 'https://apps.molawhelp.org',
      name: 'Missouri Legal Help',
      defaultJurisdiction: 'Missouri', // Default for forms without jurisdiction metadata
    },
  ],
};

export const excludedForms = {
  greaterBostonLegalService: [
    // GBLS forms we don't want on courtformsonline.org (developer/admin tools)
    'docassemble.Collection:data/questions/validationOrDoNotCallLetterForAdvocates.yml', // /start/advocate%20vacate/
    'docassemble.Collection:data/questions/exemptOrNotQuestions.yml', // /start/exempt/
    'docassemble.Collection:data/questions/docsign.yml', // /start/simple%20esign/
    'docassemble.Collection:data/questions/motionToVacateDefault.yml', // /start/vacate/
    'docassemble.Collection:data/questions/validationOrDoNotCallLetter.yml', // /start/validation/
    'docassemble.docsign:data/questions/upload_template.yml', // /start/esign/
    'docassemble.docsign:data/questions/fill_generic_template.yml', // /start/generic/
    'docassemble.startOfCaseDocs:data/questions/caseStartDocs.yml', // /start/sign/
    'docassemble.HousingCodeChecklist:data/questions/housing_code_interview.yml', // /start/uptocode/
    'docassemble.HousingCodeChecklist:data/questions/feedback.yml', // /start/uptocode_feedback/
    // Other GBLS forms we don't want on courtformsonline.org
    'docassemble.MAAffidavitofIndigency:data/questions/affidavit.yml',
    'docassemble.MAAffidavitofIndigency:data/questions/affidavit_advocate.yml',
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
  VTCourtForms: [
    // Add any forms to exclude from Vermont Court Forms server
  ],
  missouriLegalHelp: [
    // Add any forms to exclude from Missouri Legal Help server
  ],
};
