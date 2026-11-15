import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care for a child | Court Forms Online',
  description:
    'Free guided forms for caregiver authorizations, parental powers of attorney, and guardianship petitions. Choose from forms for 11 states.',
  alternates: { canonical: 'https://courtformsonline.org/care-for-a-child' },
};

// This collection includes forms across jurisdictions and LIST topics.
// Use the reviewed interview entry points, including the current North Dakota version.
const states = [
  {
    name: 'California',
    id: 'california',
    forms: [
      {
        title: 'Caregiver authorization affidavit',
        kind: 'Authorization',
        interview:
          'docassemble.CACaregiverAuthorizationAffidavitForm:data/questions/caregiver_authorization_affidavit_form_finalwithfields.yml',
      },
    ],
  },
  {
    name: 'Colorado',
    id: 'colorado',
    forms: [
      {
        title: 'Delegation of parental authority',
        kind: 'Authorization',
        interview:
          'docassemble.ColoradoDelegationOfGuardian1:colorado_delegation_of_guardian.yml',
      },
    ],
  },
  {
    name: 'Connecticut',
    id: 'connecticut',
    forms: [
      {
        title: 'Petition for appointment of a temporary guardian',
        kind: 'Court petition',
        interview:
          'docassemble.CTPetitionAppointmentOfTemporaryGuardianship:petition_appointment_of_tg_ct_pc504_with_fields.yml',
      },
    ],
  },
  {
    name: 'Georgia',
    id: 'georgia',
    forms: [
      {
        title: 'Petition for temporary guardianship of a minor',
        kind: 'Court petition',
        interview: 'docassemble.GATempGuardianForm:gpcsfwithfields_1.yml',
      },
    ],
  },
  {
    name: 'Maine',
    id: 'maine',
    forms: [
      {
        title: 'Power of attorney and delegation by a parent or guardian',
        kind: 'Authorization',
        interview:
          'docassemble.MEPowerOfAttorneyAndDelegationByParentOrGuardian:me_power_of_attorney_and_delegation_by_parent_or_guardian.yml',
      },
    ],
  },
  {
    name: 'Maryland',
    id: 'maryland',
    forms: [
      {
        title: 'Petition for guardianship of a minor',
        kind: 'Court petition',
        interview:
          'docassemble.PetitiontoGuardianshipMD_bestdraft3:PetitiontoGuardianshipMD.bestdreaft.yml',
      },
    ],
  },
  {
    name: 'Massachusetts',
    id: 'massachusetts',
    forms: [
      {
        title: 'Temporary agent authorization',
        kind: 'Authorization',
        interview:
          'docassemble.MACaregiverAuthorization:temporary_agent_esp_2.yml',
      },
    ],
  },
  {
    name: 'New Jersey',
    id: 'new-jersey',
    forms: [
      {
        title: 'Power of attorney and delegation of authority for a minor',
        kind: 'Authorization',
        interview:
          'docassemble.NJPOAForMinors:nj_power_of_attorney_delegation_fillablewithfieldswithfields919.yml',
      },
    ],
  },
  {
    name: 'North Dakota',
    id: 'north-dakota',
    forms: [
      {
        title: 'Power of attorney for care and custody of a minor',
        kind: 'Authorization',
        interview:
          'docassemble.NDPowerOfAttorneyForCareAndCustodyOfMinor:nd_power_of_attorney_minor.yml',
      },
    ],
  },
  {
    name: 'Rhode Island',
    id: 'rhode-island',
    forms: [
      {
        title:
          'Release of educational records and appointment of an educational guardian',
        kind: 'Authorization',
        description:
          'This authorization covers school matters and educational records.',
        interview:
          'docassemble.P2026RhodeIslandEducationalGuardianForm:test_rhode_island_educational_form_interviewwithfields.yml',
      },
      {
        title: "Power of attorney for a child's health care",
        kind: 'Authorization',
        interview:
          'docassemble.RIHealthCarePowerOfAttorneyMinor:ridurableminorwithfields.yml',
      },
    ],
  },
  {
    name: 'West Virginia',
    id: 'west-virginia',
    forms: [
      {
        title: 'Delegation of parental authority',
        kind: 'Authorization',
        interview:
          'docassemble.WVDelegationOfParentalAuthority:delegation_of_parental_authority_WV.yml',
      },
    ],
  },
];

export default function CareForAChild() {
  return (
    <main className="container">
      <h1>Care for a child</h1>
      <p className="lead">
        Free guided forms for parents, guardians, and adults caring for a child.
      </p>
      <p>
        Authorizations and court petitions follow different steps. Read the
        interview’s instructions for signing, witnesses or notarization, and any
        court filing.
      </p>
      <p>
        Some forms authorize another adult to make decisions for a child. Others
        ask a court to appoint a guardian. Choose the state where you need to
        use the form, then follow the interview to learn who can use it and what
        to do with the completed documents.
      </p>
      <nav aria-label="Choose a state" className="my-4">
        <h2 className="h4">Choose a state</h2>
        <ul className="d-flex flex-wrap gap-2 list-unstyled">
          {states.map((state) => (
            <li key={state.id}>
              <a className="btn btn-outline-primary" href={`#${state.id}`}>
                {state.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {states.map((state) => (
        <section
          key={state.id}
          id={state.id}
          className="mb-5"
          aria-labelledby={`${state.id}-heading`}
        >
          <h2 id={`${state.id}-heading`}>{state.name}</h2>
          <div className="row g-3">
            {state.forms.map((form) => (
              <div className="col-12 col-lg-6" key={form.interview}>
                <article className="card h-100">
                  <div className="card-body d-flex flex-column align-items-start">
                    <h3 className="h5">{form.title}</h3>
                    <p className="mb-2">{form.kind}</p>
                    {'description' in form && <p>{form.description}</p>}
                    <a
                      className="btn btn-primary mt-auto"
                      href={`https://apps.suffolklitlab.org/interview?i=${encodeURIComponent(form.interview)}`}
                      aria-label={`Start form: ${form.title} for ${state.name}`}
                    >
                      Start form
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
