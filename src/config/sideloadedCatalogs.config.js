// Curated listings for tools whose catalogs do not supply discovery metadata.
// These are production content, independent of CI fixtures. Verify links and
// wording against the provider before updating; do not invent review dates,
// completion times, filing fees, or legal eligibility rules.
export const sideloadedCatalogs = [
  {
    key: 'legalAidWV',
    name: 'Legal Aid of West Virginia',
    url: 'https://docs.lawv.net',
    defaultJurisdiction: 'West Virginia',
    interviews: [
      {
        filename: 'docassemble.KinshipConnector:data/questions/kin.yml',
        link: '/start/Kinship%20Connector/',
        title: 'Kinship Connector',
        tags: ['ES-03-03-00-00'],
        metadata: {
          title: 'Kinship Connector',
          jurisdiction: 'NAM-US-US+WV',
          LIST_topics: ['ES-03-03-00-00'],
          description:
            'Get information and help preparing paperwork for temporary care agreements, guardianship, or adoption in West Virginia.',
          can_I_use_this_form:
            'For relatives who are caring for, or expect to care for, a child in West Virginia. This tool is not for children involved in an abuse and neglect case in court.',
          help_page_url: 'https://legalaidwv.org/kinship-connector/',
          help_page_title:
            'About Kinship Connector — Legal Aid of West Virginia',
        },
      },
    ],
  },
];
