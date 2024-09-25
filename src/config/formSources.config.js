export const pathToServerConfig = {
  ma: {
    path: 'ma',
    servers: ['Suffolk LIT Lab', 'Greater Boston Legal Services'],
    name: 'Massachusetts',
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
};
