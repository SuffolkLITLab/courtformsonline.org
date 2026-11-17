import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../css/FamilyEmergency.module.css';
import FamilyPlanningTools from '../components/FamilyPlanningTools';
import { fetchFamilyEmergencyForms } from '../../data/familyEmergencyForms';

export const metadata: Metadata = {
  alternates: { canonical: 'https://courtformsonline.org/family' },
  title: 'Family emergency planning | Court Forms Online',
  description:
    'Find free child caregiving forms and family preparedness plans for ICE detention, deportation, hospitalization, and other temporary separations.',
};

export default async function FamilyEmergencyPlanning() {
  const forms = await fetchFamilyEmergencyForms();
  return (
    <main>
      <section className={styles.heroSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <span className="badge bg-primary mb-2">
                Family Emergency Planning
              </span>
              <h1 className="display-4 fw-bold mb-3">
                Plan for your family in an emergency
              </h1>
              <p className="lead mb-4">
                Prepare documents about who can care for your child if you are
                detained by ICE, deported, hospitalized, or otherwise
                unavailable. Find free, step-by-step tools for the states listed
                below.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#tools" className="btn btn-primary btn-lg">
                  Find your form
                </a>
                <a
                  href="#more-forms"
                  className="btn btn-outline-primary btn-lg"
                >
                  More forms and printable packets
                </a>
                <Link href="/" className="btn btn-outline-secondary btn-lg">
                  Back to Court Forms Online
                </Link>
              </div>
            </div>
            <div
              className="col-lg-4 d-none d-lg-block text-center"
              aria-hidden="true"
            >
              <i
                className="fa-solid fa-shield-heart text-primary"
                style={{ fontSize: '8rem', opacity: 0.8 }}
              />
            </div>
          </div>
        </div>
      </section>
      <FamilyPlanningTools forms={forms} />
      <section
        id="more-forms"
        className="py-5 container"
        aria-labelledby="more-forms-heading"
      >
        <h2 id="more-forms-heading">More forms and printable packets</h2>
        <p>
          Don’t see your state or the form you need? These nonprofit legal
          organizations offer additional forms, PDF packets, and planning guides
          for families facing detention or deportation.
        </p>
        <p>
          Choose forms for the state where your child lives and follow the
          signing instructions. A form from another state may not work for your
          family. <Link href="/guides/find-a-lawyer">Find legal help</Link> if
          you need help choosing a form.
        </p>
        <div className="row g-4">
          <div className="col-md-6">
            <article className={`card p-4 ${styles.cardHover}`}>
              <h3 className="h5">CLINIC: Find resources by state</h3>
              <p>
                The Catholic Legal Immigration Network’s directory covers all 50
                states and Washington, D.C. Find links to guardianship and power
                of attorney resources, legal help, and consulates.
              </p>
              <a href="https://www.cliniclegal.org/epif" className="mt-auto">
                Browse CLINIC’s state-by-state directory
              </a>
            </article>
          </div>
          <div className="col-md-6">
            <article className={`card p-4 ${styles.cardHover}`}>
              <h3 className="h5">Appleseed: Child safety plans by state</h3>
              <p>
                Download English and Spanish PDF guides with sample legal forms
                for selected states. The Appleseed Network also links to other
                organizations’ state-specific family planning packets.
              </p>
              <a
                href="https://deportationpreparation.org/state-child-safety-plans/"
                className="mt-auto"
              >
                Find Appleseed’s state guides and forms
              </a>
            </article>
          </div>
          <div className="col-md-6">
            <article className={`card p-4 ${styles.cardHover}`}>
              <h3 className="h5">ILRC: Family preparedness toolkit</h3>
              <p>
                The Immigrant Legal Resource Center offers a fillable, printable
                toolkit with emergency contacts, children’s information sheets,
                and a document checklist. Its caregiver authorization affidavit
                is for California only.
              </p>
              <a
                href="https://www.ilrc.org/community-resources/know-your-rights/step-step-family-preparedness-plan"
                className="mt-auto"
              >
                Get ILRC’s toolkit and translations
              </a>
              <a href="https://www.ilrc.org/sites/default/files/2026-04/Step-by-Step-Family-Preparedness-Plan-ENG.pdf">
                Download ILRC’s toolkit (English PDF)
              </a>
            </article>
          </div>
          <div className="col-md-6">
            <article className={`card p-4 ${styles.cardHover}`}>
              <h3 className="h5">Massachusetts Legal Help: Planning packet</h3>
              <p>
                Massachusetts forms from the Massachusetts Law Reform Institute
                and legal services partners include caregiver authorization,
                temporary agent appointment, and child information sheets. PDF
                packets are available in English, Spanish, Portuguese, Haitian
                Creole, and Arabic.
              </p>
              <a
                href="https://www.masslegalhelp.org/family-emergency"
                className="mt-auto"
              >
                Get Massachusetts forms and PDF packets
              </a>
            </article>
          </div>
        </div>
      </section>
      <section
        id="family-planning-faq"
        className="py-5 bg-light"
        aria-labelledby="family-planning-faq-heading"
      >
        <div className="container">
          <h2 id="family-planning-faq-heading">
            Questions about family emergency planning
          </h2>
          <p>
            Plan ahead for who will care for your children and make school,
            medical, and other decisions if you cannot be there.
          </p>
          {/* Keep every answer in the exported HTML, including when closed. */}
          <details className={styles.faqItem}>
            <summary>
              <h3>
                How can I plan for my children if I am detained by ICE or
                deported?
              </h3>
            </summary>
            <div className="px-4 pb-4">
              <p>
                If you are at risk of immigration detention or deportation,
                choose a trusted adult who agrees to care for your children.
                Talk about both a short separation and a longer absence: where
                the children would live, how to stay in contact, and who could
                make school and medical decisions. A family preparedness plan
                puts these arrangements and important contacts in writing.
              </p>
              <p className="mb-0">
                Use{' '}
                <a href="https://deportationpreparation.org/state-child-safety-plans/">
                  Appleseed’s state child safety plans
                </a>{' '}
                to explore care arrangements and sample forms. If a parent is
                already detained or deported,{' '}
                <Link href="/guides/find-a-lawyer">
                  seek legal help promptly
                </Link>{' '}
                about the child’s care and any urgent court steps.
              </p>
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary>
              <h3>
                Can these forms help during surgery, a hospital stay, or another
                temporary absence?
              </h3>
            </summary>
            <div className="px-4 pb-4">
              <p>
                You may need someone else to care for your child while you
                recover from surgery, receive treatment for a serious illness,
                or are away for work or travel. Depending on your state and
                situation, a caregiver authorization or temporary agent
                appointment may let that person make decisions while you are
                unavailable.
              </p>
              <p className="mb-0">
                Check which situations the form covers and when it starts and
                ends. Different forms may apply to immigration emergencies and
                other absences. For example, Massachusetts Legal Help explains{' '}
                <a href="https://www.masslegalhelp.org/children-families-divorce/guardians-other-caregivers/appointing-temporary-agent-my-child">
                  appointing a temporary agent for work, sickness, or travel
                </a>{' '}
                separately from its immigration emergency packet.
              </p>
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary>
              <h3>
                What is the difference between a caregiver authorization, power
                of attorney, and guardianship?
              </h3>
            </summary>
            <div className="px-4 pb-4">
              <p>
                A caregiver authorization may let another adult make school and
                health care decisions. A temporary agent appointment or parental
                power of attorney may allow additional decisions. The names,
                powers, and time limits vary by state. A court-appointed
                guardian has a different legal role and may be needed for
                longer-term care. Guardianship can affect a parent’s right to
                make decisions and may require a court order to end.
              </p>
              <p className="mb-0">
                The right choice depends on state law, existing custody orders,
                and the other parent’s rights. Read each form’s instructions and{' '}
                <Link href="/guides/find-a-lawyer">get legal help</Link> if you
                are unsure which arrangement fits your family.
              </p>
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary>
              <h3>
                What information should I leave with my child’s caregiver?
              </h3>
            </summary>
            <div className="px-4 pb-4">
              <p>
                Write down emergency contacts, school and doctor information,
                medications, allergies, health insurance, and your child’s daily
                needs. Gather important documents such as birth certificates,
                relevant custody orders, and signed caregiving forms. Keep them
                in a safe place your chosen caregiver can access, and explain
                how to reach you and your lawyer if you have one.
              </p>
              <p className="mb-0">
                The <a href="#more-forms">printable planning packets above</a>{' '}
                include checklists and child information sheets to help you
                organize these details.
              </p>
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary>
              <h3>
                Can I also plan for bills, property, or other family members who
                depend on me?
              </h3>
            </summary>
            <div className="px-4 pb-4">
              <p className="mb-0">
                Yes. Detention, deportation, or a medical emergency may also
                interrupt rent payments, access to money, or care for an adult
                dependent. You may need separate arrangements or legal documents
                for those needs.{' '}
                <a href="https://www.cliniclegal.org/epif">
                  CLINIC’s emergency preparedness directory
                </a>{' '}
                links to state resources about guardianship, powers of attorney,
                and financial planning, as well as legal help.
              </p>
            </div>
          </details>
          <details className={styles.faqItem}>
            <summary>
              <h3>Where can I find forms if my state is not listed?</h3>
            </summary>
            <div className="px-4 pb-4">
              <p className="mb-0">
                Our <a href="#tools">guided forms</a> cover the states listed in
                the form finder. For other states or additional documents, use
                the <a href="#more-forms">forms and printable packets</a> from
                nonprofit legal organizations above. Choose a resource for your
                state; a caregiver or guardianship form from another state may
                have different requirements.
              </p>
            </div>
          </details>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <h2>More help with planning</h2>
          <div className="list-group">
            <Link
              href="/guides/find-a-lawyer"
              className="list-group-item list-group-item-action p-4"
            >
              <h3 className="h5">Find legal help</h3>
              <p className="mb-0">
                Find legal aid organizations and lawyer referral services.
              </p>
            </Link>
            <Link
              href="/guides/how-interviews-work"
              className="list-group-item list-group-item-action p-4"
            >
              <h3 className="h5">How guided forms work</h3>
              <p className="mb-0">
                Learn about answering interview questions and preparing your
                documents.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
