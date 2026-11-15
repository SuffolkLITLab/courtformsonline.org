// Explicit metadata supplements for public catalogs that lack discovery fields.
// Source links/titles, availability, and interview lists still come from the provider.
// Keep keys provider-scoped and never add unlisted, review dates, or maturity ratings.
export const supplementalCatalogMetadata = {
  legalAidWV: {
    'docassemble.KinshipConnector:data/questions/kin.yml': {
      LIST_topics: ['ES-03-03-00-00'],
      jurisdiction: 'NAM-US-US+WV',
      description:
        'Get information and help preparing paperwork for temporary care agreements, guardianship, or adoption in West Virginia.',
      can_I_use_this_form:
        'For relatives who are caring for, or expect to care for, a child in West Virginia. This tool is not for children involved in an abuse and neglect case in court.',
      help_page_url: 'https://legalaidwv.org/kinship-connector/',
      help_page_title: 'About Kinship Connector — Legal Aid of West Virginia',
    },
    'docassemble.LAWVRentersRightsWestVirginia:data/questions/wrongful_occ_answer.yml':
      {
        LIST_topics: ['HO-00-00-00-00'],
        jurisdiction: 'NAM-US-US+WV',
        description:
          'Prepare an answer to an eviction (wrongful occupation) case in West Virginia Magistrate Court.',
        help_page_url: 'https://legalaidwv.org/renters-rights-west-virginia',
        help_page_title:
          'Renters Rights West Virginia — Legal Aid of West Virginia',
      },
    'docassemble.LAWVRentersRightsWestVirginia:data/questions/warranty_of_habitability.yml':
      {
        LIST_topics: ['HO-00-00-00-00'],
        jurisdiction: 'NAM-US-US+WV',
        description:
          'Write a letter asking your landlord to repair unsafe or unhealthy conditions in your rental home.',
        help_page_url: 'https://legalaidwv.org/renters-rights-west-virginia',
        help_page_title:
          'Renters Rights West Virginia — Legal Aid of West Virginia',
      },
    'docassemble.LAWVRentersRightsWestVirginia:data/questions/informal_hearing_request.yml':
      {
        LIST_topics: ['HO-00-00-00-00'],
        jurisdiction: 'NAM-US-US+WV',
        description:
          'Write to your housing authority to request an informal hearing before an eviction case is filed.',
        help_page_url: 'https://legalaidwv.org/renters-rights-west-virginia',
        help_page_title:
          'Renters Rights West Virginia — Legal Aid of West Virginia',
      },
    'docassemble.LAWVNameChange:data/questions/name_change.yml': {
      LIST_topics: ['FA-11-00-00-00'],
      jurisdiction: 'NAM-US-US+WV',
      description: 'Prepare a petition for a name change in West Virginia.',
    },
    'docassemble.LAWVRentersRightsWestVirginia:data/questions/petition_for_appeal.yml':
      {
        LIST_topics: ['HO-00-00-00-00'],
        jurisdiction: 'NAM-US-US+WV',
        description:
          'Prepare a petition to appeal an eviction decision from Magistrate Court to Circuit Court in West Virginia.',
        help_page_url: 'https://legalaidwv.org/renters-rights-west-virginia',
        help_page_title:
          'Renters Rights West Virginia — Legal Aid of West Virginia',
      },
    'docassemble.LAWVRentersRightsWestVirginia:data/questions/return_personal_property.yml':
      {
        LIST_topics: ['HO-00-00-00-00'],
        jurisdiction: 'NAM-US-US+WV',
        description:
          'Write a letter to your former landlord giving notice that you plan to collect personal property left at your rental home.',
        help_page_url: 'https://legalaidwv.org/renters-rights-west-virginia',
        help_page_title:
          'Renters Rights West Virginia — Legal Aid of West Virginia',
      },
    'docassemble.LAWVRentersRightsWestVirginia:data/questions/return_of_security_deposit.yml':
      {
        LIST_topics: ['HO-00-00-00-00'],
        jurisdiction: 'NAM-US-US+WV',
        description:
          'Write to your former landlord about your security deposit, the condition of your old rental home, and your new contact information.',
        help_page_url: 'https://legalaidwv.org/renters-rights-west-virginia',
        help_page_title:
          'Renters Rights West Virginia — Legal Aid of West Virginia',
      },
  },
};
