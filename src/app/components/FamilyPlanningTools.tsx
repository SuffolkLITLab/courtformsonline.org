'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { FamilyEmergencyForm } from '../../data/familyEmergencyForms';
import styles from '../css/FamilyEmergency.module.css';

export default function FamilyPlanningTools({
  forms,
}: {
  forms: FamilyEmergencyForm[];
}) {
  const [state, setState] = useState('');
  const states = Array.from(new Set(forms.map((form) => form.jurisdiction)))
    .filter((name) => !['United States', 'State not specified'].includes(name))
    .sort();
  const visible = forms.filter(
    (form) =>
      !state ||
      form.jurisdiction === state ||
      form.jurisdiction === 'United States'
  );
  return (
    <>
      <div className="container">
        <div className={styles.stateSelector}>
          <label htmlFor="family-planning-state" className="h4 d-block">
            Find forms for your state
          </label>
          <select
            id="family-planning-state"
            className="form-select form-select-lg"
            value={state}
            onChange={(event) => setState(event.target.value)}
          >
            <option value="">All available states</option>
            {states.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section
        id="tools"
        className="py-5 mt-4 container"
        aria-labelledby="family-tools-heading"
      >
        <h2 id="family-tools-heading">
          Forms for child caregiving and guardianship
        </h2>
        <p>
          Some forms authorize another adult to make decisions for a child.
          Others ask a court to appoint a guardian. Follow each interview’s
          instructions for eligibility, signing, and any court filing.
        </p>
        <p role="status" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'form' : 'forms'} available
          {state ? ` for ${state}` : ''}.
        </p>
        <div className="row g-4">
          {visible.map((form) => (
            <div className="col-md-6 col-xl-4" key={form.id}>
              <article className={`card p-4 ${styles.cardHover}`}>
                <h3 className="h5 fw-bold">{form.title}</h3>
                <p>{form.jurisdiction}</p>
                <a
                  href={form.href}
                  className="btn btn-primary mt-auto"
                  aria-label={`Start interview: ${form.title} (${form.jurisdiction})`}
                >
                  Start interview
                </a>
                <Link
                  href={form.detailsHref}
                  className="btn btn-outline-primary mt-2"
                  aria-label={`View form details: ${form.title} (${form.jurisdiction})`}
                >
                  View form details
                </Link>
              </article>
            </div>
          ))}
        </div>
        {forms.length === 0 && (
          <p>
            No guided forms are currently listed. Use the resources below for
            help.
          </p>
        )}
      </section>
    </>
  );
}
