export interface NotaryLink {
  label: string;
  href: string;
}

export interface NotarySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: NotaryLink[];
}

export type SharedNotarySectionKey =
  | 'what-is-a-notary'
  | 'how-to-find-a-notary'
  | 'how-to-use-a-notary'
  | 'when-to-sign'
  | 'who-can-notarize';

export const sharedNotarySections: Record<
  SharedNotarySectionKey,
  NotarySection
> = {
  'what-is-a-notary': {
    heading: 'What is a notary?',
    paragraphs: [
      'A notary public is a person approved by the state to check identity and watch people sign important papers.',
      'Notarization helps prevent fraud. It does not mean the notary agrees with what the document says.',
    ],
  },
  'how-to-find-a-notary': {
    heading: 'How to find a notary',
    paragraphs: ['You can often find a notary at:'],
    bullets: [
      'Banks and credit unions',
      'Shipping stores and office service centers',
      'Public libraries or city/town offices',
      'Law offices',
      'Online notary services (if your state and your form allow it)',
    ],
  },
  'how-to-use-a-notary': {
    heading: 'How to use a notary',
    paragraphs: ['Before your appointment:'],
    bullets: [
      'Bring the full document, including all pages.',
      'Bring a valid government photo ID.',
      'Ask if you need witnesses and bring them if needed.',
      'Ask about the fee in advance.',
    ],
  },
  'when-to-sign': {
    heading: 'When to sign if your document needs notarization',
    paragraphs: [
      'Do not sign early unless your form instructions clearly say you can.',
      'Most notarized forms must be signed in front of the notary.',
    ],
  },
  'who-can-notarize': {
    heading: 'Who can notarize your documents',
    paragraphs: [
      'The notary must be neutral. A person who benefits from your document usually should not notarize it.',
      'For example, a beneficiary or a party to the document may not be allowed to notarize, depending on state law.',
    ],
  },
};

export const defaultSharedNotarySectionOrder: SharedNotarySectionKey[] = [
  'what-is-a-notary',
  'how-to-find-a-notary',
  'how-to-use-a-notary',
  'when-to-sign',
  'who-can-notarize',
];

const sharedNotarySectionOrderWithoutFind: SharedNotarySectionKey[] = [
  'what-is-a-notary',
  'how-to-use-a-notary',
  'when-to-sign',
  'who-can-notarize',
];

export type SharedBlockPlacement = 'before' | 'after' | 'omit';

export interface StateNotaryConfig {
  sharedBlockPlacement?: SharedBlockPlacement;
  sharedSectionOrder?: SharedNotarySectionKey[];
  stateSections?: NotarySection[];
}

const defaultStateSection = (stateName: string): NotarySection => ({
  heading: `${stateName}-specific notarization notes`,
  paragraphs: [
    `Notary rules in ${stateName} may be different for ID, fees, remote notarization, witness rules, and which forms qualify.`,
    'Check your form instructions and confirm requirements with the court or agency before your appointment.',
  ],
});

export const stateNotaryOverrides: Record<string, StateNotaryConfig> = {
  ma: {
    sharedSectionOrder: sharedNotarySectionOrderWithoutFind,
    stateSections: [
      {
        heading: 'Online notarization in Massachusetts',
        paragraphs: [
          'Massachusetts law allows remote online notarization, but the state says notaries should not use remote platforms yet.',
          'For now, in-person notarization is usually the best option in Massachusetts.',
        ],
        links: [
          {
            label:
              'Massachusetts Secretary of the Commonwealth: Remote Online Notarization',
            href: 'https://www.sec.state.ma.us/divisions/commissions/remote-online.htm',
          },
        ],
      },
      {
        heading: 'Different terms used in Massachusetts',
        paragraphs: [
          'Massachusetts law uses both “justices of the peace” and “notaries public” in the same chapter. In everyday use, most people still ask for a notary public.',
        ],
      },
      {
        heading: 'How and where to find a notary in Massachusetts',
        paragraphs: [
          'Massachusetts gives guidance on where to find a notary, including city and town halls, courts, banks, law offices, and pharmacies.',
        ],
        links: [
          {
            label: 'Find a notary public (Mass.gov)',
            href: 'https://www.mass.gov/info-details/find-a-notary-public',
          },
          {
            label: 'Massachusetts Commissions Division (Notary pages)',
            href: 'https://www.sec.state.ma.us/divisions/commissions/commissions.htm',
          },
        ],
      },
      {
        heading: 'Massachusetts statutes and official references',
        paragraphs: [
          'If you want the legal text, use these links. Most people do not need to read statutes before getting a document notarized.',
        ],
        links: [
          {
            label:
              'M.G.L. c. 222, § 1A (justices of the peace and notaries public)',
            href: 'https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleI/Chapter222/Section1A',
          },
          {
            label: 'M.G.L. c. 222, § 28 (remote online notarization framework)',
            href: 'https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleI/Chapter222/Section28',
          },
        ],
      },
    ],
  },
  me: {
    sharedSectionOrder: sharedNotarySectionOrderWithoutFind,
    stateSections: [
      {
        heading: 'Online notarization in Maine',
        paragraphs: [
          'Maine allows remote and electronic notarization.',
          'Before doing remote or electronic notarizations, a notarial officer must file notice with the Secretary of State and follow approved rules.',
        ],
        links: [
          {
            label:
              'Maine Secretary of State: Apply to be a remote/electronic notary',
            href: 'https://www.maine.gov/sos/corporations-commissions/commissions/apply-to-be-a-remote-electronic-notary',
          },
        ],
      },
      {
        heading: 'Different terms used in Maine',
        paragraphs: [
          'Maine law uses the broader term “notarial officer,” which includes notaries public and certain other officials authorized to perform notarial acts.',
          'Maine also has “Dedimus Justices,” but they are a separate role with a limited function and are not a replacement for ordinary notary services.',
        ],
      },
      {
        heading: 'How and where to find a notary in Maine',
        paragraphs: [
          'Maine has an official notary search. You can filter for electronic and remote notarization.',
        ],
        links: [
          {
            label: 'Active Notary and Dedimus Justice Search (Maine)',
            href: 'https://apps1.web.maine.gov/cgi-bin/online/notary/search/mo_search.pl',
          },
          {
            label:
              'Maine Secretary of State: Notaries Public and Dedimus Justices',
            href: 'https://www.maine.gov/sos/corporations-commissions/commissions/notaries-public-and-dedimus-justice',
          },
        ],
      },
      {
        heading: 'Maine statutes and official references',
        paragraphs: [
          'If you want the legal text, start with these Maine statutes.',
        ],
        links: [
          {
            label:
              '4 M.R.S. § 1902 (definitions, including “notarial officer”)',
            href: 'https://legislature.maine.gov/statutes/4/title4sec1902.html',
          },
          {
            label: '4 M.R.S. § 1904 (authority/conflict of interest rules)',
            href: 'https://legislature.maine.gov/statutes/4/title4sec1904.html',
          },
          {
            label: '4 M.R.S. § 1910 (who may perform notarial acts in Maine)',
            href: 'https://legislature.maine.gov/legis/statutes/4/title4sec1910.html',
          },
          {
            label: '4 M.R.S. § 1915 (remote notarization)',
            href: 'https://legislature.maine.gov/statutes/4/title4sec1915.html',
          },
        ],
      },
    ],
  },
  mi: {
    sharedSectionOrder: sharedNotarySectionOrderWithoutFind,
    stateSections: [
      {
        heading: 'Online notarization in Michigan',
        paragraphs: [
          'Michigan allows remote and electronic notarization.',
          'Michigan says only state-approved platforms may be used.',
        ],
        links: [
          {
            label:
              'Michigan Notary Services (methods, approved vendors, requirements)',
            href: 'https://www.michigan.gov/sos/notary-services',
          },
        ],
      },
      {
        heading: 'Different terms used in Michigan',
        paragraphs: [
          'Michigan mainly uses the term “Notary Public.”',
          'The state says a “notary signing agent” is not a separate state-certified role with extra powers.',
        ],
      },
      {
        heading: 'How and where to find a notary in Michigan',
        paragraphs: [
          'Michigan’s notary services page is the main official source for rules and remote/electronic details.',
          'In person, many people still find notaries at banks, law offices, and shipping or copy businesses.',
        ],
        links: [
          {
            label: 'Michigan Secretary of State Notary Services',
            href: 'https://www.michigan.gov/sos/notary-services',
          },
          {
            label: 'Michigan Notary FAQ',
            href: 'https://www.michigan.gov/sos/faqs/office-of-the-great-seal/notary',
          },
        ],
      },
      {
        heading: 'Michigan statutes and official references',
        paragraphs: [
          'If you need legal text, start with these Michigan law links.',
        ],
        links: [
          {
            label: 'Michigan Law on Notarial Acts (Act 238 of 2003) index',
            href: 'https://www.legislature.mi.gov/Laws/Index?ObjectName=mcl-Act-238-of-2003',
          },
          {
            label: 'MCL 55.286b (remote electronic notarization platforms)',
            href: 'https://www.legislature.mi.gov/Laws/MCL?objectName=MCL-55-286B',
          },
        ],
      },
    ],
  },
  mn: {
    sharedSectionOrder: sharedNotarySectionOrderWithoutFind,
    stateSections: [
      {
        heading: 'Online notarization in Minnesota',
        paragraphs: [
          'Minnesota allows remote online notarization.',
          'The Secretary of State says this has been in effect since January 1, 2019, and registration is required before remote acts.',
        ],
        links: [
          {
            label:
              'Minnesota Secretary of State: Remote online notarization authorization',
            href: 'https://sos.mn.gov/notary-apostille/notary-help/remote-online-notarization-authorization/',
          },
        ],
      },
      {
        heading: 'Different terms used in Minnesota',
        paragraphs: [
          'Minnesota law uses both “Notary Public” and, in some contexts, “Notarial Officer” (for ex officio notaries).',
        ],
      },
      {
        heading: 'How and where to find a notary in Minnesota',
        paragraphs: [
          'Minnesota has a Find a Notary search tool so you can verify status and authority.',
          'The Secretary of State help page also lists common places where people often find notaries.',
        ],
        links: [
          {
            label: 'Find A Notary search tool (Minnesota)',
            href: 'https://notary.sos.mn.gov/',
          },
          {
            label: 'Minnesota Secretary of State: Find a Notary help page',
            href: 'https://www.sos.mn.gov/notary-apostille/notary-help/find-a-notary',
          },
        ],
      },
      {
        heading: 'Minnesota statutes and official references',
        paragraphs: [
          'These statute links are useful if you need legal details for a specific filing or dispute.',
        ],
        links: [
          {
            label: 'Minn. Stat. § 358.645 (remote online notarization)',
            href: 'https://www.revisor.mn.gov/statutes/cite/358.645',
          },
          {
            label:
              'Minn. Stat. § 359.03 (official stamp; “Notarial Officer” language)',
            href: 'https://www.revisor.mn.gov/statutes/cite/359.03',
          },
          {
            label: 'Minn. Stat. § 358.15 (ex officio notaries public)',
            href: 'https://www.revisor.mn.gov/statutes/cite/358.15',
          },
        ],
      },
    ],
  },
  mo: {
    sharedSectionOrder: sharedNotarySectionOrderWithoutFind,
    stateSections: [
      {
        heading: 'Online notarization in Missouri',
        paragraphs: [
          'Missouri law allows remote online notarization.',
          'A remote online notary must be physically in Missouri when doing the notarial act.',
        ],
        links: [
          {
            label: 'Missouri Secretary of State Notary Handbook',
            href: 'https://s1.sos.mo.gov/Business/Notary/handbook',
          },
        ],
      },
      {
        heading: 'Different terms used in Missouri',
        paragraphs: [
          'Missouri law includes both notaries public and commissioners of deeds within the same chapter. A commissioner of deeds is a distinct role and not the same as a standard Missouri notary commission.',
        ],
      },
      {
        heading: 'How and where to find a notary in Missouri',
        paragraphs: [
          'Missouri provides an official notary search for currently commissioned notaries.',
        ],
        links: [
          {
            label: 'Search for a Notary Public (Missouri Secretary of State)',
            href: 'https://s1.sos.mo.gov/business/notary/search/notarysearch.aspx',
          },
          {
            label: 'Missouri Notaries & Commissions',
            href: 'https://www.sos.mo.gov/business/commissions/',
          },
        ],
      },
      {
        heading: 'Missouri statutes and official references',
        paragraphs: [
          'Use these links if you need the legal language behind Missouri notary and commissioner rules.',
        ],
        links: [
          {
            label:
              'RSMo Chapter 486 (Commissioners of Deeds and Notaries Public)',
            href: 'https://revisor.mo.gov/main/OneChapter.aspx?chapter=486',
          },
          {
            label: 'RSMo § 486.1155 (remote online notarization)',
            href: 'https://revisor.mo.gov/main/OneSection.aspx?section=486.1155',
          },
          {
            label: 'RSMo § 486.130 (commissioner powers)',
            href: 'https://revisor.mo.gov/main/OneSection.aspx?section=486.130',
          },
        ],
      },
    ],
  },
  vt: {
    sharedSectionOrder: sharedNotarySectionOrderWithoutFind,
    stateSections: [
      {
        heading: 'Online notarization in Vermont',
        paragraphs: [
          'Vermont allows remote notarization, but the notary must have a special commission endorsement.',
          'Without that endorsement, a standard commission does not allow remote or electronic notarization.',
        ],
        links: [
          {
            label: 'Vermont Secretary of State Notaries Public',
            href: 'https://sos.vermont.gov/notaries-public/',
          },
        ],
      },
      {
        heading: 'Different terms used in Vermont',
        paragraphs: [
          'Vermont’s definitions include “notarial officer,” but Vermont generally uses “notary public” as the core role for notarial acts in-state.',
        ],
      },
      {
        heading: 'How and where to find a notary in Vermont',
        paragraphs: [
          'Vermont’s Office of Professional Regulation provides license lookup tools and public roster options to help locate notaries.',
        ],
        links: [
          {
            label: 'Find a Professional (Vermont OPR license lookup)',
            href: 'https://sos.vermont.gov/opr/find-a-professional/',
          },
          {
            label: 'Vermont Notary FAQs (includes roster guidance)',
            href: 'https://sos.vermont.gov/notaries-public/notary-faqs/',
          },
        ],
      },
      {
        heading: 'Vermont statutes and official references',
        paragraphs: [
          'Use these links if you need statutory details about authority, definitions, and remote acts.',
        ],
        links: [
          {
            label: '26 V.S.A. § 5304 (definitions)',
            href: 'https://legislature.vermont.gov/statutes/section/26/103/05304',
          },
          {
            label:
              '26 V.S.A. § 5361 (who may perform notarial acts in Vermont)',
            href: 'https://legislature.vermont.gov/statutes/section/26/103/05361',
          },
          {
            label: '26 V.S.A. § 5379 (remote notarization)',
            href: 'https://legislature.vermont.gov/statutes/section/26/103/05379',
          },
        ],
      },
    ],
  },
};

export function getStateNotaryConfig(
  path: string,
  stateName: string
): Required<StateNotaryConfig> {
  const override = stateNotaryOverrides[path] ?? {};

  return {
    sharedBlockPlacement: override.sharedBlockPlacement ?? 'before',
    sharedSectionOrder:
      override.sharedSectionOrder ?? defaultSharedNotarySectionOrder,
    stateSections: override.stateSections ?? [defaultStateSection(stateName)],
  };
}
