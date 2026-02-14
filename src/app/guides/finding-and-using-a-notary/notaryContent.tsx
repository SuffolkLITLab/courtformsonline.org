import type { ComponentType } from 'react';

interface LinkItem {
  label: string;
  href: string;
}

function NotaryLinks({ links }: { links: LinkItem[] }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Potentially shared notary information. Individual state pages can mix and
 * match these as they want.
 * */

function WhatIsNotarySection() {
  return (
    <section className="mb-4">
      <h2 id="what_is_a_notary">What is a notary?</h2>
      <p>
        A notary public is a person approved by the state to check identity and
        watch people sign important papers. Notarization helps prevent fraud.
      </p>
      <p>
        The notary must be neutral. A person who benefits from your document
        usually should not notarize it. In many states, a beneficiary or a party
        to the document may not be allowed to notarize. Even if a notary
        disagrees with what the document says, the notary can still notarize the
        document.
      </p>
    </section>
  );
}

function HowToFindNotarySection() {
  return (
    <section className="mb-4">
      <h2 id="how_to_find_a_notary">How to find a notary</h2>
      <p>There are multiple ways to find notaries.</p>
      <p>
        For example, sometimes notaries can come to your home. You can ask in
        your community to find out if someone you know is a notary.
      </p>
      <p>
        Also, some businesses or organizations have notaries in their building
        ready to watch people sign documents. You can often find a notary at:
      </p>
      <ul>
        <li>Banks and credit unions</li>
        <li>Shipping stores and office service centers</li>
        <li>Public libraries or city/town offices</li>
        <li>Law offices</li>
        <li>Online notary services (if your state and your form allow it)</li>
      </ul>
    </section>
  );
}

function HowToBecomeANotarySection() {
  return (
    <section className="mb-4">
      <h2 id="how_to_become_a_notary">How to become a notary</h2>
      <p>
        We are unable to cover the rules for becoming a notary in every state.
        For example, in Massachussetts, a person must be over 18 and live in or
        do regular business in Massachusetts. In Kansas, a person can live in a
        neighboring state too as long as they work regularly in Kansas.
      </p>
      <p>
        The{' '}
        <a href="https://www.asnnotary.org/">American Society of Notaries</a>{' '}
        has information about{' '}
        <a href="https://asnnotary.org/?form=stateinfo">
          becoming a notary in each state
        </a>
        .
      </p>
    </section>
  );
}

function HowToUseNotarySection() {
  return (
    <section className="mb-4">
      <h2 id="how_to_use_a_notary">How to use a notary</h2>
      <p>
        We are unable to give the instructions for every state, so ask a local
        notary for information specific to your situation. Here are some example
        tasks that are often useful to do before your appointment:
      </p>
      <ul>
        <li>Bring the full document, including all pages.</li>
        <li>Bring a valid government photo ID.</li>
        <li>Ask if you need witnesses and bring them if needed.</li>
        <li>Ask about the fee in advance.</li>
      </ul>
    </section>
  );
}

function WhenToSignSection() {
  return (
    <section className="mb-4">
      <div className="alert alert-warning" role="alert">
        <h2
          id="when_to_sign_if_your_document_needs_notarization"
          className="h4"
        >
          When to sign if your document needs notarization
        </h2>
        <p className="mb-2">
          Do not sign early unless your form instructions clearly say you can.
        </p>
        <p className="mb-0">
          Most notarized forms must be signed in front of the notary.
        </p>
      </div>
    </section>
  );
}

/**
 * Sections each state can customize
 * */

function MassachusettsOnlineSection() {
  return (
    <section className="mb-4">
      <h2>Online notarization in Massachusetts</h2>
      <p>
        Massachusetts law allows remote online notarization, but the state says
        notaries should not use remote platforms yet.
      </p>
      <p>
        For now, in-person notarization is usually the best option in
        Massachusetts.
      </p>
      <NotaryLinks
        links={[
          {
            label:
              'Massachusetts Secretary of the Commonwealth: Remote Online Notarization',
            href: 'https://www.sec.state.ma.us/divisions/commissions/remote-online.htm',
          },
        ]}
      />
    </section>
  );
}

function MassachusettsTermsSection() {
  return (
    <section className="mb-4">
      <h2>Different terms used in Massachusetts</h2>
      <p>
        Massachusetts law uses both &ldquo;justices of the peace&rdquo; and
        &ldquo;notaries public&rdquo; in the same chapter. In daily use, most
        people still ask for a notary public.
      </p>
    </section>
  );
}

function MassachusettsFindSection() {
  return (
    <section className="mb-4">
      <h2>How and where to find a notary in Massachusetts</h2>
      <p>
        Massachusetts gives guidance on where to find a notary, including city
        and town halls, courts, banks, law offices, and pharmacies.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Find a notary public (Mass.gov)',
            href: 'https://www.mass.gov/info-details/find-a-notary-public',
          },
          {
            label: 'Massachusetts Commissions Division (notary pages)',
            href: 'https://www.sec.state.ma.us/divisions/commissions/commissions.htm',
          },
        ]}
      />
    </section>
  );
}

function MassachusettsStatutesSection() {
  return (
    <section className="mb-4">
      <h2>Massachusetts statutes and official references</h2>
      <p>
        If you want the legal text, use these links. Most people do not need to
        read statutes before getting a document notarized.
      </p>
      <NotaryLinks
        links={[
          {
            label:
              'M.G.L. c. 222, § 1A (justices of the peace and notaries public)',
            href: 'https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleI/Chapter222/Section1A',
          },
          {
            label: 'M.G.L. c. 222, § 28 (remote online notarization framework)',
            href: 'https://malegislature.gov/Laws/GeneralLaws/PartIII/TitleI/Chapter222/Section28',
          },
        ]}
      />
    </section>
  );
}

function MaineOnlineSection() {
  return (
    <section className="mb-4">
      <h2>Online notarization in Maine</h2>
      <p>Maine allows remote and electronic notarization.</p>
      <p>
        Before doing remote or electronic notarizations, a notarial officer must
        file notice with the Secretary of State and follow approved rules.
      </p>
      <NotaryLinks
        links={[
          {
            label:
              'Maine Secretary of State: Apply to be a remote/electronic notary',
            href: 'https://www.maine.gov/sos/corporations-commissions/commissions/apply-to-be-a-remote-electronic-notary',
          },
        ]}
      />
    </section>
  );
}

function MaineTermsSection() {
  return (
    <section className="mb-4">
      <h2>Different terms used in Maine</h2>
      <p>
        Maine law uses the broader term &ldquo;notarial officer,&rdquo; which
        includes notaries public and some other officials.
      </p>
      <p>
        Maine also has &ldquo;Dedimus Justices,&rdquo; but that is a separate
        role and not a replacement for normal notary services.
      </p>
    </section>
  );
}

function MaineFindSection() {
  return (
    <section className="mb-4">
      <h2>How and where to find a notary in Maine</h2>
      <p>
        Maine has an official notary search. You can filter for electronic and
        remote notarization.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Active Notary and Dedimus Justice Search (Maine)',
            href: 'https://apps1.web.maine.gov/cgi-bin/online/notary/search/mo_search.pl',
          },
          {
            label:
              'Maine Secretary of State: Notaries Public and Dedimus Justices',
            href: 'https://www.maine.gov/sos/corporations-commissions/commissions/notaries-public-and-dedimus-justice',
          },
        ]}
      />
    </section>
  );
}

function MaineStatutesSection() {
  return (
    <section className="mb-4">
      <h2>Maine statutes and official references</h2>
      <p>If you want the legal text, start with these Maine statutes.</p>
      <NotaryLinks
        links={[
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
        ]}
      />
    </section>
  );
}

function MichiganOnlineSection() {
  return (
    <section className="mb-4">
      <h2>Online notarization in Michigan</h2>
      <p>Michigan allows remote and electronic notarization.</p>
      <p>Michigan says only state-approved platforms may be used.</p>
      <NotaryLinks
        links={[
          {
            label:
              'Michigan notary services (methods, approved vendors, requirements)',
            href: 'https://www.michigan.gov/sos/notary-services',
          },
        ]}
      />
    </section>
  );
}

function MichiganTermsSection() {
  return (
    <section className="mb-4">
      <h2>Different terms used in Michigan</h2>
      <p>Michigan mainly uses the term &ldquo;Notary Public.&rdquo;</p>
      <p>
        The state says a &ldquo;notary signing agent&rdquo; is not a separate
        state-certified role with extra powers.
      </p>
    </section>
  );
}

function MichiganFindSection() {
  return (
    <section className="mb-4">
      <h2>How and where to find a notary in Michigan</h2>
      <p>
        The Michigan Secretary of State notary page is the main official source
        for rules and remote or electronic details.
      </p>
      <p>
        In person, many people still find notaries at banks, law offices, and
        shipping or copy businesses.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Michigan Secretary of State notary services',
            href: 'https://www.michigan.gov/sos/notary-services',
          },
          {
            label: 'Michigan notary FAQ',
            href: 'https://www.michigan.gov/sos/faqs/office-of-the-great-seal/notary',
          },
        ]}
      />
    </section>
  );
}

function MichiganStatutesSection() {
  return (
    <section className="mb-4">
      <h2>Michigan statutes and official references</h2>
      <p>If you need legal text, start with these Michigan law links.</p>
      <NotaryLinks
        links={[
          {
            label: 'Michigan law on notarial acts (Act 238 of 2003) index',
            href: 'https://www.legislature.mi.gov/Laws/Index?ObjectName=mcl-Act-238-of-2003',
          },
          {
            label: 'MCL 55.286b (remote electronic notarization platforms)',
            href: 'https://www.legislature.mi.gov/Laws/MCL?objectName=MCL-55-286B',
          },
        ]}
      />
    </section>
  );
}

function MinnesotaOnlineSection() {
  return (
    <section className="mb-4">
      <h2>Online notarization in Minnesota</h2>
      <p>Minnesota allows remote online notarization.</p>
      <p>
        The Secretary of State says this has been in effect since January 1,
        2019, and registration is required before remote acts.
      </p>
      <NotaryLinks
        links={[
          {
            label:
              'Minnesota Secretary of State: Remote online notarization authorization',
            href: 'https://sos.mn.gov/notary-apostille/notary-help/remote-online-notarization-authorization/',
          },
        ]}
      />
    </section>
  );
}

function MinnesotaTermsSection() {
  return (
    <section className="mb-4">
      <h2>Different terms used in Minnesota</h2>
      <p>
        Minnesota law uses both &ldquo;Notary Public&rdquo; and, in some places,
        &ldquo;Notarial Officer.&rdquo;
      </p>
    </section>
  );
}

function MinnesotaFindSection() {
  return (
    <section className="mb-4">
      <h2>How and where to find a notary in Minnesota</h2>
      <p>
        Minnesota has a Find a Notary search tool so you can verify status and
        authority.
      </p>
      <p>
        The Secretary of State help page also lists common places where people
        often find notaries.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Find a notary search tool (Minnesota)',
            href: 'https://notary.sos.mn.gov/',
          },
          {
            label: 'Minnesota Secretary of State: Find a Notary help page',
            href: 'https://www.sos.mn.gov/notary-apostille/notary-help/find-a-notary',
          },
        ]}
      />
    </section>
  );
}

function MinnesotaStatutesSection() {
  return (
    <section className="mb-4">
      <h2>Minnesota statutes and official references</h2>
      <p>
        These statute links are useful if you need legal details for a specific
        filing or dispute.
      </p>
      <NotaryLinks
        links={[
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
        ]}
      />
    </section>
  );
}

function MissouriOnlineSection() {
  return (
    <section className="mb-4">
      <h2>Online notarization in Missouri</h2>
      <p>Missouri law allows remote online notarization.</p>
      <p>
        A remote online notary must be physically in Missouri when doing the
        notarial act.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Missouri Secretary of State notary handbook',
            href: 'https://s1.sos.mo.gov/Business/Notary/handbook',
          },
        ]}
      />
    </section>
  );
}

function MissouriTermsSection() {
  return (
    <section className="mb-4">
      <h2>Different terms used in Missouri</h2>
      <p>
        Missouri law includes both notaries public and commissioners of deeds in
        the same chapter.
      </p>
      <p>
        A commissioner of deeds is a separate role and not the same as a normal
        Missouri notary commission.
      </p>
    </section>
  );
}

function MissouriFindSection() {
  return (
    <section className="mb-4">
      <h2>How and where to find a notary in Missouri</h2>
      <p>
        Missouri provides an official notary search for currently commissioned
        notaries.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Search for a Notary Public (Missouri Secretary of State)',
            href: 'https://s1.sos.mo.gov/business/notary/search/notarysearch.aspx',
          },
          {
            label: 'Missouri Notaries and Commissions',
            href: 'https://www.sos.mo.gov/business/commissions/',
          },
        ]}
      />
    </section>
  );
}

function MissouriStatutesSection() {
  return (
    <section className="mb-4">
      <h2>Missouri statutes and official references</h2>
      <p>
        Use these links if you need the legal language behind Missouri notary
        and commissioner rules.
      </p>
      <NotaryLinks
        links={[
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
        ]}
      />
    </section>
  );
}

function VermontOnlineSection() {
  return (
    <section className="mb-4">
      <h2>Online notarization in Vermont</h2>
      <p>
        Vermont allows remote notarization, but the notary must have a special
        commission endorsement.
      </p>
      <p>
        Without that endorsement, a standard commission does not allow remote or
        electronic notarization.
      </p>
      <NotaryLinks
        links={[
          {
            label: 'Vermont Secretary of State notaries public',
            href: 'https://sos.vermont.gov/notaries-public/',
          },
        ]}
      />
    </section>
  );
}

function VermontTermsSection() {
  return (
    <section className="mb-4">
      <h2>Different terms used in Vermont</h2>
      <p>
        Vermont&apos;s definitions include &ldquo;notarial officer,&rdquo; but
        Vermont generally uses &ldquo;notary public&rdquo; as the main term.
      </p>
    </section>
  );
}

function VermontFindSection() {
  return (
    <section className="mb-4">
      <h2>How and where to find a notary in Vermont</h2>
      <p>
        Vermont&apos;s Office of Professional Regulation provides a license
        lookup and public roster options to help locate notaries.
      </p>
      <NotaryLinks
        links={[
          {
            label:
              'Find a Professional (Vermont Office of Professional Regulation)',
            href: 'https://sos.vermont.gov/opr/find-a-professional/',
          },
          {
            label: 'Vermont notary FAQs (includes roster guidance)',
            href: 'https://sos.vermont.gov/notaries-public/notary-faqs/',
          },
        ]}
      />
    </section>
  );
}

function VermontStatutesSection() {
  return (
    <section className="mb-4">
      <h2>Vermont statutes and official references</h2>
      <p>
        Use these links if you need statutory details about authority,
        definitions, and remote acts.
      </p>
      <NotaryLinks
        links={[
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
        ]}
      />
    </section>
  );
}

export type SharedNotarySectionKey =
  | 'what-is-a-notary'
  | 'how-to-find-a-notary'
  | 'how-to-become-a-notary'
  | 'how-to-use-a-notary'
  | 'when-to-sign';

export const sharedNotarySections: Record<
  SharedNotarySectionKey,
  ComponentType
> = {
  'what-is-a-notary': WhatIsNotarySection,
  'how-to-find-a-notary': HowToFindNotarySection,
  'how-to-become-a-notary': HowToBecomeANotarySection,
  'how-to-use-a-notary': HowToUseNotarySection,
  'when-to-sign': WhenToSignSection,
};

export const defaultSharedNotarySectionOrder: SharedNotarySectionKey[] = [
  'what-is-a-notary',
  'how-to-find-a-notary',
  'how-to-become-a-notary',
  'how-to-use-a-notary',
  'when-to-sign',
];

const usualSharedStateSpecificNotarySectionOrder: SharedNotarySectionKey[] = [
  'what-is-a-notary',
  'how-to-use-a-notary',
  'when-to-sign',
];

export type SharedBlockPlacement = 'before' | 'after' | 'omit';

export interface StateNotaryConfig {
  sharedBlockPlacement?: SharedBlockPlacement;
  sharedSectionOrder?: SharedNotarySectionKey[];
  stateSections?: ComponentType[];
}

/**
 * Dynamic state content
 * */

function DefaultStateSection({ stateName }: { stateName: string }) {
  return (
    <section className="mb-4">
      <h2>{stateName}-specific notarization notes</h2>
      <p>
        Notary rules in {stateName} may be different for ID, fees, remote
        notarization, witness rules, and which forms qualify.
      </p>
      <p>
        Check your form instructions and confirm requirements with the court or
        agency before your appointment.
      </p>
    </section>
  );
}

function HowToBecomeANotaryInStateSection({
  stateName,
  stateCode,
}: {
  stateName: string;
  stateCode: string;
}) {
  /** Return a paragraph about becoming a notary for a specific state.
   *
   * @param stateName {str} - Name of the state. Discuss dict instead.
   * @param stateCode {str} - 2-letter code for the state.
   *
   * */
  return (
    <section className="mb-4">
      <h2 id="how_to_become_a_notary">How to become a notary in {stateName}</h2>
      <p>
        We are unable to cover the rules for becoming a notary in every state.
        This is the American Society of Notaries page for{' '}
        <a
          href={
            'https://asnnotary.org/?form=stateinfo&statecode=' +
            stateCode.toUpperCase()
          }
        >
          how to become a notary in {stateName}
        </a>
        .
      </p>
    </section>
  );
}

export const stateNotaryOverrides: Record<string, StateNotaryConfig> = {
  ma: {
    sharedSectionOrder: usualSharedStateSpecificNotarySectionOrder,
    stateSections: [
      MassachusettsOnlineSection,
      MassachusettsTermsSection,
      MassachusettsFindSection,
      () => (
        <HowToBecomeANotaryInStateSection
          stateName="Massachusetts"
          stateCode="ma"
        />
      ),
      MassachusettsStatutesSection,
    ],
  },
  me: {
    sharedSectionOrder: usualSharedStateSpecificNotarySectionOrder,
    stateSections: [
      MaineOnlineSection,
      MaineTermsSection,
      MaineFindSection,
      () => (
        <HowToBecomeANotaryInStateSection stateName="Maine" stateCode="me" />
      ),
      MaineStatutesSection,
    ],
  },
  mi: {
    sharedSectionOrder: usualSharedStateSpecificNotarySectionOrder,
    stateSections: [
      MichiganOnlineSection,
      MichiganTermsSection,
      MichiganFindSection,
      () => (
        <HowToBecomeANotaryInStateSection stateName="Michigan" stateCode="mi" />
      ),
      MichiganStatutesSection,
    ],
  },
  mn: {
    sharedSectionOrder: usualSharedStateSpecificNotarySectionOrder,
    stateSections: [
      MinnesotaOnlineSection,
      MinnesotaTermsSection,
      MinnesotaFindSection,
      () => (
        <HowToBecomeANotaryInStateSection
          stateName="Minnesota"
          stateCode="mn"
        />
      ),
      MinnesotaStatutesSection,
    ],
  },
  mo: {
    sharedSectionOrder: usualSharedStateSpecificNotarySectionOrder,
    stateSections: [
      MissouriOnlineSection,
      MissouriTermsSection,
      MissouriFindSection,
      () => (
        <HowToBecomeANotaryInStateSection stateName="Missouri" stateCode="mo" />
      ),
      MissouriStatutesSection,
    ],
  },
  vt: {
    sharedSectionOrder: usualSharedStateSpecificNotarySectionOrder,
    stateSections: [
      VermontOnlineSection,
      VermontTermsSection,
      VermontFindSection,
      () => (
        <HowToBecomeANotaryInStateSection stateName="Vermont" stateCode="vt" />
      ),
      VermontStatutesSection,
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
    stateSections: override.stateSections ?? [
      () => <DefaultStateSection stateName={stateName} />,
    ],
  };
}
